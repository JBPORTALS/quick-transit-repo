import { createTRPCRouter, protectedProcedure } from "../trpc";

export const timeslotsRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db.query.timeslots.findMany();
  }),
});
