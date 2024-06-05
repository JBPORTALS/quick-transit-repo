import { TRPCError } from "@trpc/server";

import {
  and,
  count,
  eq,
  not,
  packages,
  requests,
  sql,
  user,
  userInsertSchema,
} from "@qt/db";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const authRouter = createTRPCRouter({
  getUser: publicProcedure.query(async ({ ctx }) => {
    const {
      data: { user },
    } = await ctx.supabase.auth.getUser();
    return user;
  }),
  getCustomers: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db
      .select({
        id: user.id,
        name: user.name,
        email: user.email,
        picture: user.picture,
        created_at: user.created_at,
        total_requests: sql<number>`(select count(${packages.id}))`,
        pending: sql<number>`(select count(${requests.id}) where ${not(eq(requests.current_status, "delivered"))})`,
      })
      .from(user)
      .where(
        and(
          eq(user.role, "customer"),
          not(eq(requests.current_status, "delivered")),
        ),
      )
      .leftJoin(packages, eq(user.id, packages.customer_id))
      .leftJoin(requests, eq(packages.id, requests.package_id))
      .groupBy(user.id, requests.current_status);
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
