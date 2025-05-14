import { z } from "zod";

import {
  and,
  bill_details,
  billDetialsInsertSchema,
  billDetialsSelectSchema,
  count,
  desc,
  eq,
  ilike,
  inArray,
  or,
  packages,
  requests,
  sql,
  sum,
  user,
} from "@qt/db";

import { createTRPCRouter, protectedProcedure, t } from "../trpc";
import { getPagination, paginateInputSchema } from "../utils";

export const billsRouter = createTRPCRouter({
  createBill: protectedProcedure
    .input(billDetialsInsertSchema)
    .mutation(async ({ ctx, input }) => {
      const bill = await ctx.db
        .insert(bill_details)
        .values(input)
        .returning({ id: bill_details.id });

      return bill.at(0)?.id;
    }),
  getSummaryDetails: protectedProcedure
    .input(z.object({ weight: z.number(), insurance_required: z.boolean() }))
    .query(({ input }) => {
      const service_charge = input.weight * 65;
      const gst = Math.floor((service_charge / 100) * 18);
      const insurance_charge = input.insurance_required
        ? Math.floor(input.weight * 100)
        : undefined;

      return {
        service_charge,
        gst,
        total: Math.floor(service_charge + gst + (insurance_charge ?? 0)),
        insurance_charge,
      };
    }),
  update: protectedProcedure
    .input(
      billDetialsSelectSchema
        .pick({ paid_at: true })
        .and(z.object({ bill_id: z.string().min(1) })),
    )
    .mutation(({ input: { bill_id, ...values }, ctx }) =>
      ctx.db
        .update(bill_details)
        .set(values)
        .where(eq(bill_details.id, bill_id))
        .returning(),
    ),

  getAll: protectedProcedure
    .input(paginateInputSchema.and(z.object({ query: z.string().optional() })))
    .query(async ({ ctx, input }) => {
      const { pageIndex, pageSize, query } = input;
      const { offset } = getPagination(pageIndex, pageSize);

      const queryCond = or(
        ilike(packages.title, `%${query}%`),
        ilike(user.name, `%${query}%`),
        ilike(user.email, `%${query}%`),
        ilike(requests.tracking_number, `%${query}%`),
      );
      const bills = await ctx.db
        .select()
        .from(bill_details)
        .leftJoin(packages, eq(packages.bill_id, bill_details.id))
        .leftJoin(requests, eq(requests.package_id, packages.id))
        .leftJoin(user, eq(user.id, packages.customer_id))
        .where(
          and(
            eq(user.role, "customer"),
            inArray(requests.current_status, ["pickedup", "delivered"]),
            queryCond,
          ),
        )
        .limit(pageSize)
        .offset(offset)
        .orderBy(desc(bill_details.paid_at));

      const totalRecords = await ctx.db
        .select({ count: count() })
        .from(bill_details)
        .leftJoin(packages, eq(packages.bill_id, bill_details.id))
        .leftJoin(requests, eq(requests.package_id, packages.id))
        .leftJoin(user, eq(user.id, packages.customer_id))
        .where(
          and(
            eq(user.role, "customer"),
            inArray(requests.current_status, ["pickedup", "delivered"]),
            queryCond,
          ),
        )
        .then((r) => r.at(0)?.count);

      const mappedResults = await Promise.all(
        bills.map(async (b) => {
          const res = await ctx.db
            .select({
              totalAmount:
                sql`${bill_details.gst_charges}+${bill_details.insurance_charge}+${bill_details.service_charge}`
                  .mapWith(Number)
                  .as("totalAmount"),
            })
            .from(bill_details)
            .where(eq(bill_details.id, b.bill_details.id))
            .then((r) => r.at(0));

          return {
            ...b.bill_details,
            totalAmount: res?.totalAmount ?? 0,
            package_details: { ...b.packages },
            customer: { ...b.user },
          };
        }),
      );

      return {
        items: mappedResults,
        pageCount: Math.ceil((totalRecords ?? 0) / pageSize),
        pageSize: pageSize,
        pageIndex: offset,
      };
    }),
});

export const billsRouterCaller = t.createCallerFactory(billsRouter);
