import { createTRPCRouter, protectedProcedure } from "../trpc";

export const courierRouter = createTRPCRouter({
  getCouriers: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db.query.couriers.findMany();
  }),
});
