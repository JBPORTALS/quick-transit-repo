import { address, addressInsertSchema, and, eq } from "@qt/db";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const addressRouter = createTRPCRouter({
  create: protectedProcedure
    .input(addressInsertSchema.omit({ customerId: true }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.insert(address).values({
        street: input.street,
        customerId: ctx.user.id,
        pincode: input.pincode,
        type: input.type,
        phone: input.phone,
      });
    }),
  getByUser: protectedProcedure
    .input(addressInsertSchema.pick({ type: true }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.query.address.findFirst({
        where: and(
          eq(address.customerId, ctx.user.id),
          eq(address.type, input.type),
        ),
      });
    }),
  getAllByType: protectedProcedure
    .input(addressInsertSchema.pick({ type: true }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.query.address.findMany({
        where: and(
          eq(address.customerId, ctx.user.id),
          eq(address.type, input.type),
        ),
      });
    }),
  update: protectedProcedure
    .input(addressInsertSchema.omit({ customerId: true }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.insert(address).values({
        street: input.street,
        customerId: ctx.user.id,
        pincode: input.pincode,
        type: input.type,
        phone: input.phone,
      });
    }),
});
