import { TRPCError } from "@trpc/server";
import OrderId from "order-id";
import { generateOTP } from "otp-agent";
import { z } from "zod";

import {
  and,
  between,
  count,
  desc,
  eq,
  ilike,
  notInArray,
  or,
  packageInsertSchema,
  packages,
  requests,
  requestsSelectSchema,
  sql,
  user,
} from "@qt/db";

import { createTRPCRouter, protectedProcedure } from "../trpc";
import { billsRouterCaller } from "./bills";

export const packagesRouter = createTRPCRouter({
  getRecentPackages: protectedProcedure
    .input(z.object({ requireAll: z.boolean().optional() }).optional())
    .query(async ({ ctx, input }) => {
      return await ctx.db.query.packages.findMany({
        where: input?.requireAll
          ? undefined
          : and(eq(packages.customer_id, ctx.user.id)),
        orderBy: desc(packages.created_at),
        with: {
          request: {
            columns: {
              tracking_number: true,
              current_status: true,
            },
            with: {
              partner: true,
            },
          },
          bill: {
            extras(fields, operators) {
              return {
                totalAmount:
                  operators.sql<number>`${fields.gst_charges}+${fields.insurance_charge}+${fields.service_charge}`.as(
                    "totalAmount",
                  ),
              };
            },
          },
        },
      });
    }),
  getAllByUserId: protectedProcedure
    .input(z.object({ query: z.boolean().optional() }).optional())
    .query(async ({ ctx, input }) => {
      return await ctx.db.query.packages.findMany({
        where: input?.query
          ? and(
              eq(packages.customer_id, ctx.user.id),
              ilike(packages.title, `%${input.query}%`),
            )
          : eq(packages.customer_id, ctx.user.id),
        orderBy: desc(packages.created_at),
        with: {
          request: {
            columns: {
              tracking_number: true,
              current_status: true,
            },
            with: {
              partner: true,
            },
          },
          bill: {
            extras(fields, operators) {
              return {
                totalAmount:
                  operators.sql<number>`${fields.gst_charges}+${fields.insurance_charge}+${fields.service_charge}`.as(
                    "totalAmount",
                  ),
              };
            },
          },
        },
      });
    }),

  getAll: protectedProcedure
    .input(z.object({ query: z.string().optional() }).optional())
    .query(async ({ ctx, input }) => {
      return await ctx.db.query.packages.findMany({
        where: input?.query
          ? or(ilike(packages.title, `%${input.query}%`))
          : undefined,
        orderBy: desc(packages.created_at),
        with: {
          request: {
            columns: {
              tracking_number: true,
              current_status: true,
            },
            with: {
              partner: true,
            },
          },
          bill: {
            extras(fields, operators) {
              return {
                totalAmount:
                  operators.sql<number>`${fields.gst_charges}+${fields.insurance_charge}+${fields.service_charge}`.as(
                    "totalAmount",
                  ),
              };
            },
          },
        },
      });
    }),
  getByCustomerId: protectedProcedure
    .input(z.object({ query: z.string().optional() }).optional())
    .query(async ({ ctx, input }) => {
      return await ctx.db.query.packages.findMany({
        where: input?.query
          ? and(
              eq(packages.customer_id, ctx.user.id),
              ilike(packages.title, `%${input.query}%`),
            )
          : eq(packages.customer_id, ctx.user.id),
        orderBy: desc(packages.created_at),
        with: {
          request: {
            columns: {
              tracking_number: true,
              current_status: true,
            },
            with: {
              partner: true,
            },
          },
          bill: {
            extras(fields, operators) {
              return {
                totalAmount:
                  operators.sql<number>`${fields.gst_charges}+${fields.insurance_charge}+${fields.service_charge}`.as(
                    "totalAmount",
                  ),
              };
            },
          },
        },
      });
    }),
  getById: protectedProcedure
    .input(z.object({ id: z.string(), isAdmin: z.boolean().optional() }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.query.packages.findFirst({
        where: and(
          input.isAdmin ? undefined : eq(packages.customer_id, ctx.user.id),
          eq(packages.id, input.id),
        ),

        with: {
          customer: input.isAdmin ? true : undefined,
          request: {
            with: {
              partner: true,
            },
          },
          pick_up_address: true,
          destination_address: true,
          category: true,
          courier: true,
          timeslot:true,
          bill: {
            extras(fields, operators) {
              return {
                total:
                  operators.sql<number>`${fields.gst_charges}+${fields.insurance_charge}+${fields.service_charge}`.as(
                    "total",
                  ),
              };
            },
          },
        },
      });
    }),
  getByPartnerId: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.query.requests.findMany({
        where: and(eq(requests.partner_id, input.id)),
        with: {
          package: {
            with: {
              customer: true,
              bill: {
                extras(fields, operators) {
                  return {
                    total:
                      operators.sql<number>`${fields.gst_charges}+${fields.insurance_charge}+${fields.service_charge}`.as(
                        "total",
                      ),
                  };
                },
              },
            },
          },
          reviews: true,
        },
      });
    }),
  addPackage: protectedProcedure
    .input(packageInsertSchema.omit({ customer_id: true, bill_id: true }))
    .mutation(async ({ ctx, input }) => {
      //create bill
      const { gst, service_charge, insurance_charge } = await billsRouterCaller(
        ctx,
      ).getSummaryDetails({
        weight: input.weight,
        insurance_required: input.is_insurance_required ?? false,
      });
      const bill = await billsRouterCaller(ctx).createBill({
        gst_charges: gst.toString(),
        service_charge: service_charge.toString(),
        insurance_charge: insurance_charge?.toString() ?? "0",
      });

      if (!bill)
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Bill parse error!",
        });

      const package_details = await ctx.db
        .insert(packages)
        .values({
          ...input,
          customer_id: ctx.user.id,
          bill_id: bill,
        })
        .returning({ id: packages.id })
        .then((res) => res[0]);

      if (!package_details)
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Package couldn't able to create!",
        });

      //Create a request
      const oi = OrderId("my-super-secrete");
      const tracking_number = oi.generate();

      const otp = generateOTP();

      const request = await ctx.db.insert(requests).values({
        package_id: package_details.id,
        tracking_number,
        one_time_code: otp,
      });

      if (request) return { code: "Created", message: "Created successfully" };
    }),
  getTrackingDetails: protectedProcedure
    .input(z.object({ package_id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.query.packages.findFirst({
        where: eq(packages.id, input.package_id),
        with: {
          request: {
            with: {
              partner: true,
            },
          },
        },
      });
    }),
  cancelRequest: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input, ctx }) => {
      return await ctx.db
        .update(requests)
        .set({ current_status: "cancelled", cacelled_at: new Date(Date.now()) })
        .where(eq(requests.package_id, input.id))
        .returning();
    }),
  getAllTrackingDetails: protectedProcedure
    .input(z.object({ offset: z.number() }))
    .query(async ({ ctx, input: { offset } }) => {
      const res = await ctx.db
        .select({ totalRecords: count(packages.id) })
        .from(packages)
        .where(eq(packages.customer_id, ctx.user.id));

      const packageDetails = await ctx.db.query.packages.findFirst({
        with: {
          request: {
            with: {
              partner: true,
            },
          },
        },
        where: ({ customer_id }) => eq(customer_id, ctx.user.id),
        orderBy: ({ created_at }) => desc(created_at),
        offset,
      });
      return {
        packageDetails,
        totalRecords: res[0]?.totalRecords ?? 0,
      };
    }),
  getByStatusWithOffset: protectedProcedure
    .input(
      z.object({
        offset: z.number(),
        omitStatus: z
          .enum(["cancelled", "rejected", "requested"])
          .array()
          .nonempty(),
      }),
    )
    .query(async ({ ctx, input: { offset, omitStatus } }) => {
      const res = await ctx.db
        .select({ totalRecords: count(packages.id) })
        .from(packages)
        .leftJoin(requests, eq(packages.id, requests.package_id))
        .where(notInArray(sql`requests.current_status`, omitStatus));

      const packageDetails = await ctx.db.query.requests.findFirst({
        where: notInArray(requests.current_status, omitStatus),
        with: {
          package: true,
          partner: true,
          reviews: true,
        },
        orderBy: ({ created_at }) => desc(created_at),
        offset,
      });

      return {
        packageDetails,
        totalRecords: res[0]?.totalRecords ?? 0,
      };
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
  getAllCountByDate: protectedProcedure.query(async ({ input, ctx }) => {
    return ctx.db
      .select({
        raised: sql<number>`COUNT(*)`.mapWith(Number).as("raised"),
        cancelled:
          sql<number>`SUM(CASE WHEN requests.current_status = 'cancelled' THEN 1 ELSE 0 END)`
            .mapWith(Number)
            .as("cancelled"),
        date: sql<string>`DATE(${packages.created_at})`.as("date"),
      })
      .from(packages)
      .leftJoin(requests, eq(requests.package_id, packages.id))
      .groupBy(sql`date`);
  }),
  getAllAssignedPackages: protectedProcedure
    .input(z.object({ offset: z.number(), query: z.string().optional() }))
    .query(async ({ ctx, input: { offset, query } }) => {
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
  search: protectedProcedure
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
});
