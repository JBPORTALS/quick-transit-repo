import { TRPCError } from "@trpc/server";
import { sql } from "drizzle-orm";
import { z } from "zod";

import {
  and,
  count,
  desc,
  eq,
  ilike,
  inArray,
  notInArray,
  or,
  packages,
  requests,
  requestsInsertSchema,
  user,
} from "@qt/db";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const requestsRouter = createTRPCRouter({
  getByStatusWithOffset: protectedProcedure
    .input(
      z.object({
        offset: z.number(),
        omitStatus: z
          .enum(["cancelled", "rejected", "requested", "delivered"])
          .array()
          .nonempty(),
        fetchByUserId: z.boolean().default(false),
      }),
    )
    .query(async ({ ctx, input: { offset, omitStatus, fetchByUserId } }) => {
      const res = await ctx.db
        .select({ totalRecords: count(packages.id) })
        .from(requests)
        .leftJoin(packages, eq(packages.id, requests.package_id))
        .where(
          and(
            notInArray(requests.current_status, omitStatus),
            fetchByUserId ? eq(packages.customer_id, ctx.user.id) : undefined,
          ),
        );

      const requestsResponse = await ctx.db
        .select()
        .from(requests)
        .leftJoin(packages, eq(requests.package_id, packages.id))
        .leftJoin(user, eq(requests.partner_id, user.id))
        .where(
          fetchByUserId
            ? and(
                notInArray(requests.current_status, omitStatus),
                eq(packages.customer_id, ctx.user.id),
              )
            : notInArray(requests.current_status, omitStatus),
        )
        .orderBy(desc(packages.created_at))
        .offset(offset);

      const mappedPackageDetials = requestsResponse.flatMap(
        ({ packages, requests, user: partner }) => ({
          package: packages,
          partner,
          ...requests,
        }),
      );

      return {
        packageDetails: mappedPackageDetials.at(0),
        totalRecords: res[0]?.totalRecords ?? 0,
      };
    }),
  getByPackageId: protectedProcedure
    .input(z.object({ package_id: z.string() }))
    .query(async ({ ctx, input }) => {
      const requestsResponse = await ctx.db
        .select()
        .from(requests)
        .leftJoin(packages, eq(requests.package_id, packages.id))
        .leftJoin(user, eq(requests.partner_id, user.id))
        .where(eq(packages.id, input.package_id));

      const mappedPackageDetials = requestsResponse
        .flatMap(({ packages, requests, user: partner }) => ({
          package: packages,
          partner,
          ...requests,
        }))
        .at(0);

      return mappedPackageDetials;
    }),

  assignPartner: protectedProcedure
    .input(z.object({ partnerId: z.string(), packageId: z.string() }))
    .mutation(({ ctx, input: { packageId, partnerId } }) => {
      return ctx.db
        .update(requests)
        .set({
          partner_id: partnerId,
          current_status: "confirmed",
          confirmed_at: new Date(Date.now()),
        })
        .where(eq(requests.package_id, packageId))
        .returning();
    }),

  getAllByPartnerId: protectedProcedure
    .input(
      z.object({
        offset: z.number(),
        query: z.string().optional(),
        date: z.date().optional(),
      }),
    )
    .query(async ({ ctx, input: { offset } }) => {
      const packagesDetials = await ctx.db.query.requests.findMany({
        with: {
          package: true,
        },
        where: and(eq(requests.partner_id, ctx.user.id)),
        orderBy: ({ created_at }) => desc(created_at),
        offset,
      });

      return {
        packages: packagesDetials,
      };
    }),

  find: protectedProcedure
    .input(
      z.object({
        offset: z.number().optional(),
        query: z.string(),
      }),
    )
    .query(async ({ ctx, input: { query } }) => {
      const whereClause = and(
        eq(requests.partner_id, ctx.user.id),
        or(
          ilike(requests.tracking_number, `${query}%`),
          ilike(packages.title, `${query}%`),
        ),
      );

      const packagesDetails = await ctx.db
        .select({
          id: requests.id,
          package_id: requests.package_id,
          tracking_number: requests.tracking_number,
          current_status: requests.current_status,
          created_at: requests.created_at,
          package: {
            id: packages.id,
            title: packages.title,
            description: packages.description,
          },
        })
        .from(requests)
        .leftJoin(packages, eq(requests.package_id, packages.id))
        .where(whereClause)
        .orderBy(desc(requests.created_at));
      // .offset(offset)
      // .limit(10); // Add a limit to avoid fetching too many results

      const totalCount = await ctx.db
        .select({ count: count() })
        .from(requests)
        .leftJoin(packages, eq(requests.package_id, packages.id))
        .where(whereClause)
        .then((res) => res[0]?.count ?? 0);

      return {
        packages: packagesDetails,
        totalCount,
      };
    }),

  //Verify the customer with associated package
  verify: protectedProcedure
    .input(
      z.object({
        otp: z.string().min(6).max(6),
        package_id: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      //Get the request of package
      const request = await ctx.db.query.requests.findFirst({
        where: and(
          eq(requests.partner_id, ctx.user.id),
          eq(requests.package_id, input.package_id),
        ),
      });

      if (request?.one_time_code !== input.otp)
        throw new TRPCError({ code: "BAD_REQUEST", message: "Invalid Code" });

      //Update the request status
      await ctx.db
        .update(requests)
        .set({
          is_verified: true,
        })
        .where(eq(requests.package_id, input.package_id));
    }),

  //Update the final details derived from the courier office
  update: protectedProcedure
    .input(
      requestsInsertSchema
        .partial()
        .omit({ id: true })
        .and(z.object({ request_id: z.string().min(1) })),
    )
    .mutation(async ({ ctx, input: { request_id, ...values } }) => {
      //Get the request of package
      const request = await ctx.db
        .update(requests)
        .set(values)
        .where(eq(requests.id, request_id));

      return request;
    }),

  /**
   * Get today's analytics for partner
   * @context Partner
   */
  getTodayAnalyticsForPartner: protectedProcedure.query(async ({ ctx }) => {
    const [deliveredRes, shippingRes, totalPackagesRes] = await Promise.all([
      ctx.db
        .select({
          deliveredCount: count().as("deliveredCount"),
        })
        .from(requests)
        .leftJoin(packages, eq(requests.package_id, packages.id))
        .where(
          and(
            eq(requests.partner_id, ctx.user.id),
            eq(requests.current_status, "delivered"),
            eq(
              sql`DATE(${packages.pickup_date})`,
              sql`DATE(${new Date().toDateString()})`,
            ),
          ),
        ),
      ctx.db
        .select({ shippingCount: count(requests.id).as("shippingCount") })
        .from(requests)
        .leftJoin(packages, eq(requests.package_id, packages.id))
        .where(
          and(
            eq(requests.partner_id, ctx.user.id),
            notInArray(requests.current_status, ["confirmed", "pickedup"]),
            eq(
              sql`DATE(${packages.pickup_date})`,
              sql`DATE(${new Date().toDateString()})`,
            ),
          ),
        ),
      ctx.db
        .select({
          totalPackagesCount: count(requests.id).as("totalPackagesCount"),
        })
        .from(requests)
        .leftJoin(packages, eq(requests.package_id, packages.id))
        .where(
          and(
            eq(requests.partner_id, ctx.user.id),
            inArray(requests.current_status, [
              "confirmed",
              "pickedup",
              "delivered",
              "cancelled",
            ]),
            eq(
              sql`DATE(${packages.pickup_date})`,
              sql`DATE(${new Date().toDateString()})`,
            ),
          ),
        ),
    ]);

    return {
      deliveredCount: deliveredRes.at(0)?.deliveredCount,
      shippingCount: shippingRes.at(0)?.shippingCount,
      totalPackagesCount: totalPackagesRes.at(0)?.totalPackagesCount,
    };
  }),
});
