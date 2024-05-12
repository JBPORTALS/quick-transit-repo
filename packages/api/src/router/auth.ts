import { TRPCError } from "@trpc/server";

import { eq, user } from "@qt/db";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const authRouter = createTRPCRouter({
  getUser: protectedProcedure.query(({ ctx }) => {
    return ctx.session.user;
  }),
  getSecretMessage: protectedProcedure.query(() => {
    // testing type validation of overridden next-auth Session in @qt/auth package
    return "you can see this secret message!";
  }),
  getUserRole: protectedProcedure.query(async ({ ctx }) => {
    const data = await ctx.db.query.user.findFirst({
      where: eq(user.id, ctx.session.user.id),
      columns: {
        role: true,
      },
    });

    if (!data)
      return new TRPCError({ code: "CONFLICT", message: "User role not set" });
    return data.role;
  }),
});
