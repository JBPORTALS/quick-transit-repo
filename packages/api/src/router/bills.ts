import { z } from "zod";

import { bill_details, billDetialsInsertSchema } from "@qt/db";

import { createTRPCRouter, protectedProcedure, t } from "../trpc";

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
});

export const billsRouterCaller = t.createCallerFactory(billsRouter);
