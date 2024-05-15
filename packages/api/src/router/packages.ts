import { desc, eq, packageInsertSchema, packages } from "@qt/db";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const packagesRouter = createTRPCRouter({
  getRecentPackages: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db.query.packages.findMany({
      where: eq(packages.customer_id, ctx.session.user.id),
      orderBy: desc(packages.created_at),
    });
  }),
  addPackage: protectedProcedure
    .input(packageInsertSchema.omit({ customer_id: true }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.insert(packages).values({
        customer_id: ctx.session.user.id,
        ...input,
      });
    }),
});
