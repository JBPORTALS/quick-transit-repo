import { z } from "zod";

import {
  address,
  addressInsertSchema,
  addressSelectSchema,
  and,
  eq,
} from "@qt/db";

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
  getById: protectedProcedure
    .input(addressSelectSchema.pick({ id: true }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.query.address.findFirst({
        where: and(
          eq(address.customerId, ctx.user.id),
          eq(address.id, input.id),
        ),
      });
    }),
  update: protectedProcedure
    .input(
      z.object({
        addressId: z.string().min(1),
        data: addressInsertSchema.omit({ customerId: true, id: true }),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db
        .update(address)
        .set(input.data)
        .where(eq(address.id, input.addressId));
    }),
});
