import { TRPCError } from "@trpc/server";

import { eq, user, userInsertSchema } from "@qt/db";
import { profileInformationSchema } from "@qt/validators";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const authRouter = createTRPCRouter({
  getUser: publicProcedure.query(async ({ ctx }) => {
    const {
      data: { user },
    } = await ctx.supabase.auth.getUser();
    return user;
  }),
  updateUserRole: protectedProcedure
    .input(userInsertSchema.pick({ role: true }))
    .mutation(({ ctx, input }) => {
      return ctx.supabase.auth.updateUser({
        data: {
          user_role: input.role,
        },
      });
    }),
  getSecretMessage: protectedProcedure.query(() => {
    // testing type validation of overridden next-auth Session in @qt/auth package
    return "you can see this secret message!";
  }),
  getUserRole: publicProcedure.query(async ({ ctx }) => {
    const {
      data: { user: session },
    } = await ctx.supabase.auth.getUser();
    if (!session) return new TRPCError({ code: "UNAUTHORIZED" });
    const data = await ctx.db.query.user.findFirst({
      where: eq(user.id, session.id),
      columns: {
        role: true,
      },
    });

    if (!data)
      return new TRPCError({ code: "CONFLICT", message: "User role not set" });
    return data.role;
  }),
});
