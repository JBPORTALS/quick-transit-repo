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
    const customers = await ctx.db.query.user.findMany({
      columns: {
        role: false,
      },
      where: eq(user.role, "customer"),
    });

    const finalResult = await Promise.all(
      customers.map(async (customer) => {
        //for each customer calculate the total packages raised by them
        const data = await ctx.db.query.packages.findFirst({
          columns: {},
          where: eq(packages.customer_id, customer.id),
          extras() {
            return {
              total_requests: sql<number>`COUNT(${packages.id})`.as(
                "total_requests",
              ),
            };
          },
        });
        //finally merge the data together
        return {
          ...customer,
          total_requests: data?.total_requests ?? 0,
        };
      }),
    );

    return finalResult;
  }),
  getPartners: publicProcedure.query(async ({ ctx }) => {
    const customers = await ctx.db.query.user.findMany({
      columns: {
        role: false,
      },
      where: eq(user.role, "partner"),
    });

    return customers;
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
