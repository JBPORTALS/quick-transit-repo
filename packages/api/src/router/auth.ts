import { TRPCError } from "@trpc/server";
import { z } from "zod";

import {
  and,
  desc,
  eq,
  ilike,
  or,
  packages,
  sql,
  user,
  userInsertSchema,
} from "@qt/db";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const authRouter = createTRPCRouter({
  getUser: publicProcedure.query(async ({ ctx }) => {
    if (!ctx.user) return null;

    const userProfileData = await ctx.db.query.user.findFirst({
      where: eq(user.id, ctx.user.id),
    });
    return { ...ctx.user, ...userProfileData };
  }),

  getUserById: publicProcedure
    .input(z.object({ id: z.string().min(1) }))
    .query(async ({ ctx, input }) => {
      const userProfileData = await ctx.db.query.user.findFirst({
        where: eq(user.id, input.id),
      });
      const { data, error } = await ctx.supabase.auth.admin.getUserById(
        input.id,
      );
      if (error)
        throw new TRPCError({
          message: error.message,
          code: "INTERNAL_SERVER_ERROR",
          cause: error.cause,
        });
      return { ...data.user, ...userProfileData };
    }),

  getCustomers: publicProcedure
    .input(z.object({ query: z.string().optional() }).optional())
    .query(async ({ ctx, input }) => {
      const customers = await ctx.db.query.user.findMany({
        columns: {
          role: false,
        },
        where: input?.query
          ? and(
              eq(user.role, "partner"),
              or(
                ilike(user.name, `%${input.query}%`),
                ilike(user.email, `%${input.query}%`),
              ),
            )
          : eq(user.role, "partner"),
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
  getPartners: publicProcedure
    .input(z.object({ query: z.string().optional() }).optional())
    .query(async ({ ctx, input }) => {
      const customers = await ctx.db.query.user.findMany({
        columns: {
          role: false,
        },
        orderBy: desc(user.created_at),
        where: input?.query
          ? and(
              eq(user.role, "partner"),
              or(
                ilike(user.name, `%${input.query}%`),
                ilike(user.email, `%${input.query}%`),
              ),
            )
          : eq(user.role, "partner"),
      });

      return customers;
    }),
  updateUserRole: protectedProcedure
    .input(userInsertSchema.pick({ role: true }))
    .mutation(({ input, ctx }) => {
      return ctx.db
        .update(user)
        .set({ role: input.role })
        .where(eq(user.id, ctx.user.id));
    }),
  getSecretMessage: protectedProcedure.query(() => {
    // testing type validation of overridden next-auth Session in @qt/auth package
    return "you can see this secret message from TRPC!";
  }),
  getUserRole: publicProcedure.query(async ({ ctx }) => {
    const session = ctx.user;
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

  createUser: protectedProcedure
    .input(
      userInsertSchema.pick({
        email: true,
        name: true,
        role: true,
        picture: true,
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { data, error } = await ctx.supabase.auth.admin.createUser({
        email: input.email,
        user_metadata: {
          full_name: input.name,
          user_role: input.role,
          picture: input.picture,
        },
      });
      if (error)
        throw new TRPCError({
          message: error.message,
          code: "INTERNAL_SERVER_ERROR",
          cause: error.cause,
        });
      return data.user;
    }),
});
