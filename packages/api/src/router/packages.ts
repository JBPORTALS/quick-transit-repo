import { TRPCError } from "@trpc/server";
import OrderId from "order-id";
import { generateOTP } from "otp-agent";
import { z } from "zod";

import {
  and,
  bill_details,
  count,
  desc,
  eq,
  getTableColumns,
  ilike,
  lte,
  notInArray,
  or,
  packageInsertSchema,
  packages,
  requests,
  sql,
  user,
} from "@qt/db";

import { createTRPCRouter, protectedProcedure } from "../trpc";
import {
  cursorPaginateInputSchema,
  getPagination,
  paginateInputSchema,
} from "../utils";
import { billsRouterCaller } from "./bills";

export const packagesRouter = createTRPCRouter({
  /**
   * Get recently raised packages
   */
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

  /**
   * Get's all packages based on the current logged in user role
   */
  getAll: protectedProcedure
    .input(
      paginateInputSchema.and(
        z.object({
          query: z.string().optional(),
        }),
      ),
    )
    .query(async ({ ctx, input }) => {
      const { pageIndex, pageSize, query } = input;
      const { offset } = getPagination(pageIndex, pageSize);

      const queryCond = or(
        ilike(packages.title, `%${query}%`),
        ilike(sql`"requests"."tracking_number"`, `%${query}%`),
      );

      // Find wheather user is manager or customer

      const userRow = await ctx.db.query.user.findFirst({
        where: eq(user.id, ctx.user.id),
      });

      if (!userRow)
        throw new TRPCError({ message: "User not found", code: "BAD_REQUEST" });

      const userCond =
        userRow.role === "customer"
          ? eq(packages.customer_id, userRow.id)
          : undefined;

      const packagesList = await ctx.db
        .select({
          ...getTableColumns(packages),
          request: {
            tracking_number: requests.tracking_number,
            current_status: requests.current_status,
          },
          bill: {
            totalAmount:
              sql<number>`${bill_details.gst_charges}+${bill_details.insurance_charge}+${bill_details.service_charge}`.as(
                "totalAmount",
              ),
          },
        })
        .from(packages)
        .innerJoin(requests, eq(requests.package_id, packages.id))
        .leftJoin(bill_details, eq(bill_details.id, packages.bill_id))
        .where(and(queryCond, userCond))
        .limit(pageSize)
        .offset(offset);

      const aggr = await ctx.db
        .select({ count: count(packages.id).as("count") })
        .from(packages)
        .innerJoin(requests, eq(requests.package_id, packages.id))
        .where(and(queryCond, userCond))
        .then((r) => r.at(0));

      return {
        items: packagesList,
        pageCount: Math.ceil((aggr?.count ?? 0) / pageSize),
        pageIndex: offset,
        pageSize,
      };
    }),

  /**
   * Get package details by given package ID
   */
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
          timeslot: true,
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

  /**
   * Get all packages assigned to partner
   */
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

  /**
   * Add package by the customer
   */
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

  /**
   *  Get's tracking information
   */
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

  /** Cancell the request */
  cancelRequest: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input, ctx }) => {
      return await ctx.db
        .update(requests)
        .set({ current_status: "cancelled", cacelled_at: new Date(Date.now()) })
        .where(eq(requests.package_id, input.id))
        .returning();
    }),

  /**
   * Get all packages with tracking information
   */
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

  /**
   * Get packages with offset and status
   */
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

  /** Assign a partner to the requested package */
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

  /**
   * Get raised packages count by date for analytics
   */
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

  /**
   * Get all assigned packages with partner context
   */
  getAllAssignedPackages: protectedProcedure
    .input(
      cursorPaginateInputSchema
        .and(z.object({ query: z.string().optional() }))
        .optional(),
    )
    .query(async ({ ctx, input }) => {
      const cursor = input?.cursor;
      const limit = input?.limit ?? 10;
      const cursorCond = cursor ? lte(requests.id, cursor) : undefined;

      const packagesList = await ctx.db.query.requests.findMany({
        with: {
          package: true,
        },
        where: and(eq(requests.partner_id, ctx.user.id), cursorCond),
        orderBy: ({ created_at, id }) => [desc(id), desc(created_at)],
        limit: limit + 1,
      });

      const nextCursor =
        packagesList.length > limit ? packagesList.pop()?.id : undefined;

      return {
        items: packagesList,
        nextCursor,
        limit,
      };
    }),

  /**
   * Get all assigned packages for today with partner context
   */
  getAllAssignedPackagesForToday: protectedProcedure
    .input(cursorPaginateInputSchema.optional())
    .query(async ({ ctx, input }) => {
      const cursor = input?.cursor;
      const limit = input?.limit ?? 10;
      const cursorCond = cursor ? lte(requests.id, cursor) : undefined;

      const packagesList = await ctx.db
        .select()
        .from(requests)
        .fullJoin(packages, eq(requests.package_id, packages.id))
        .where(
          and(
            eq(requests.partner_id, ctx.user.id),
            eq(
              sql`DATE(${packages.pickup_date})`,
              sql`${new Date().toDateString()}`,
            ),
            cursorCond,
          ),
        )
        .orderBy(desc(requests.id), desc(requests.current_status))
        .limit(limit + 1);

      const mappedPackagesList = packagesList.map(({ packages, requests }) => ({
        ...requests,
        package: packages,
      }));

      const nextCursor =
        mappedPackagesList.length > limit
          ? mappedPackagesList.pop()?.id
          : undefined;

      return {
        items: mappedPackagesList,
        nextCursor,
        limit,
      };
    }),

  /**
   * Get packages with specified query string
   */
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

  /**
   * Verify the package with presented otp to the customer
   */
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

  /**
   * Update tracking details of any package request
   */
  updateTrackingDetails: protectedProcedure
    .input(
      z.object({
        tracking_id: z.string(),
        image_url: z.string(),
        package_id: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      //Get the request of package
      const request = await ctx.db
        .update(requests)
        .set({
          franchise_reciept_url: input.image_url,
          franchise_tracking_id: input.tracking_id,
          current_status: "delivered",
        })
        .where(eq(requests.package_id, input.package_id));

      return request;
    }),

  /**
   * Get's total delivered packages count for partner
   * @context Partner
   */
  getDeliveredCountForPartner: protectedProcedure.query(({ ctx }) =>
    ctx.db
      .select({ count: count(requests.partner_id) })
      .from(requests)
      .where(
        and(
          eq(requests.partner_id, ctx.user.id),
          eq(requests.current_status, "delivered"),
        ),
      )
      .then((s) => s.at(0)?.count),
  ),
});
