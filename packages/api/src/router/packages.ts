import { TRPCError } from "@trpc/server";
import OrderId from "order-id";
import { z } from "zod";

import {
  and,
  between,
  count,
  desc,
  eq,
  packageInsertSchema,
  packages,
  requests,
  sql,
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
          franchise_address: true,
          destination_address: true,
          category: true,
          courier: true,
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

      const request = await ctx.db.insert(requests).values({
        package_id: package_details.id,
        tracking_number,
      });

      if (request) return { code: "Created", message: "Created successfully" };
    }),
  getTrackingDetails: protectedProcedure
    .input(z.object({ package_id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.query.requests.findFirst({
        where: eq(requests.package_id, input.package_id),
        with: {
          partner: true,
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
  getAllPackagesWithTracking: protectedProcedure
    .input(z.object({ offset: z.number() }))
    .query(async ({ ctx, input: { offset } }) => {
      const res = await ctx.db
        .select({ totalRecords: count(packages.id) })
        .from(packages);

      const packageDetails = await ctx.db.query.packages.findFirst({
        with: {
          request: {
            with: {
              partner: true,
            },
          },
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
  getPackagesAnalytics: protectedProcedure
    .input(z.object({ by: z.enum(["week", "month", "all"]) }))
    .query(async ({ input, ctx }) => {
      function getWeekRange() {
        const now = new Date();
        const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay())); // Set to the beginning of the week
        startOfWeek.setHours(0, 0, 0, 0); // Set to midnight

        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6); // End of the week
        endOfWeek.setHours(23, 59, 59, 999); // End of the day

        return {
          start: startOfWeek,
          end: endOfWeek,
        };
      }

      function getMonthRange() {
        const now = new Date();
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        startOfMonth.setHours(0, 0, 0, 0);

        const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
        endOfMonth.setHours(23, 59, 59, 999);

        return {
          start: startOfMonth,
          end: endOfMonth,
        };
      }

      const weekrage = getWeekRange();
      const monthrange = getMonthRange();

      const modifiedBetween =
        input.by === "week"
          ? between(packages.created_at, weekrage.start, weekrage.end)
          : input.by === "month"
            ? between(packages.created_at, monthrange.start, monthrange.end)
            : undefined;

      return ctx.db
        .select({
          count: sql<number>`COUNT(*)`.as("count"),
          date: sql`DATE(${packages.created_at})`.as("date"),
        })
        .from(packages)
        .where(modifiedBetween)
        .groupBy(sql`date`);
    }),
});
