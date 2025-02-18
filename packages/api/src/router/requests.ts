import { Acme } from "next/font/google";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

import {
  and,
  count,
  desc,
  eq,
  ilike,
  notInArray,
  or,
  packages,
  requests,
  reviews,
  sql,
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
        .from(packages)
        .leftJoin(requests, eq(packages.id, requests.package_id))
        .where(
          and(
            // notInArray(sql`requests.current_status`, omitStatus),
            fetchByUserId ? eq(packages.customer_id, ctx.user.id) : undefined,
          ),
        );

      const requestsResponse = await ctx.db
        .select()
        .from(requests)
        .innerJoin(packages, eq(packages.id, requests.package_id))
        .innerJoin(user, eq(user.id, requests.partner_id))
        .where(
          and(
            // notInArray(sql`requests.current_status`, omitStatus),
            fetchByUserId ? eq(packages.customer_id, ctx.user.id) : undefined,
          ),
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

      // const packageDetails = await ctx.db.query.requests.findFirst({
      //   where: and(
      //     notInArray(requests.current_status, omitStatus),
      //     fetchByUserId ? eq(requests, ctx.user.id) : undefined,
      //   ),
      //   with: {
      //     package: true,
      //     partner: true,
      //     reviews: true,
      //   },
      //   orderBy: ({ created_at }) => desc(created_at),
      //   offset,
      // });

      return {
        packageDetails: mappedPackageDetials.at(0),
        totalRecords: res[0]?.totalRecords ?? 0,
      };
    }),
  getByPackageId: protectedProcedure
    .input(z.object({ package_id: z.string() }))
    .query( async ({ ctx, input }) => {
      

      
      
      const requestsResponse = await ctx.db.query.requests.findFirst({
        where: eq(requests.package_id, input.package_id),
        with: {
          package: true,
          partner: true,
          reviews: true
          }
        })

     

      return  requestsResponse
    }),

  assignPartner: protectedProcedure
    .input(z.object({ partnerId: z.string(), packageId: z.string() }))
    .mutation(async ({ ctx, input: { packageId, partnerId } }) => {
      return await ctx.db
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
  updateTrackingDetails: protectedProcedure
    .input(
      z.object({
        tracking_id: z.string(),
        // image_url: z.string().min(6).max(6),
        package_id: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      //Get the request of package
      const request = await ctx.db
        .update(requests)
        .set({
          franchise_tracking_id: input.tracking_id,
          current_status: "delivered",
        })
        .where(eq(requests.package_id, input.package_id));

      return request;
    }),

  //Get requests
});
