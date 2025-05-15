import { TRPCError } from "@trpc/server";
import { z } from "zod";

import {
  and,
  asc,
  count,
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
import { getPagination, paginateInputSchema } from "../utils";

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
    .input(paginateInputSchema.and(z.object({ query: z.string().optional() })))
    .query(async ({ ctx, input }) => {
      const { pageIndex, pageSize, query } = input;
      const { offset } = getPagination(pageIndex, pageSize);

      const queryCond = or(
        ilike(user.name, `%${query}%`),
        ilike(user.email, `%${query}%`),
      );

      const customers = await ctx.db.query.user.findMany({
        columns: {
          role: false,
        },
        where: and(eq(user.role, "customer"), queryCond),
        limit: pageSize,
        offset,
      });

      const aggr = await ctx.db.query.user
        .findMany({
          columns: {},
          extras: ({ id }) => {
            return {
              count: count(id).mapWith(Number).as("count"),
            };
          },
          where: and(eq(user.role, "customer"), queryCond),
        })
        .then((r) => r.at(0));

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

      return {
        items: finalResult,
        pageCount: Math.ceil((aggr?.count ?? 0) / pageSize),
        pageIndex: offset,
        pageSize,
      };
    }),

  /** Get's partners list */
  getPartners: publicProcedure
    .input(paginateInputSchema.and(z.object({ query: z.string().optional() })))
    .query(async ({ ctx, input }) => {
      const { pageIndex, pageSize, query } = input;
      const { offset } = getPagination(pageIndex, pageSize);

      const queryCond = or(
        ilike(user.name, `%${query}%`),
        ilike(user.email, `%${query}%`),
      );

      const customers = await ctx.db.query.user.findMany({
        columns: {
          role: false,
        },
        limit: pageSize,
        offset,
        orderBy: desc(user.created_at),
        where: and(eq(user.role, "partner"), queryCond),
      });

      const aggr = await ctx.db.query.user
        .findMany({
          columns: {},
          extras: ({ id }) => {
            return {
              count: count(id).mapWith(Number).as("count"),
            };
          },
          where: and(eq(user.role, "partner"), queryCond),
        })
        .then((r) => r.at(0));

      return {
        items: customers,
        pageCount: Math.ceil((aggr?.count ?? 0) / pageSize),
        pageIndex: offset,
        pageSize,
      };
    }),

  /**
   * Get all available partner to assign to package request
   */
  getAvailablePartners: publicProcedure
    .input(paginateInputSchema.and(z.object({ query: z.string().optional() })))
    .query(async ({ ctx, input }) => {
      const { pageIndex, pageSize, query } = input;
      const { offset } = getPagination(pageIndex, pageSize);

      const queryCond = or(
        ilike(user.name, `%${query}%`),
        ilike(user.email, `%${query}%`),
      );

      const customers = await ctx.db.query.user.findMany({
        columns: {
          role: false,
        },
        limit: pageSize,
        offset,
        orderBy: desc(user.created_at),
        where: and(eq(user.role, "partner"), queryCond),
      });

      const aggr = await ctx.db.query.user
        .findMany({
          columns: {},
          extras: ({ id }) => {
            return {
              count: count(id).mapWith(Number).as("count"),
            };
          },
          where: and(eq(user.role, "partner"), queryCond),
        })
        .then((r) => r.at(0));

      return {
        items: customers,
        pageCount: Math.ceil((aggr?.count ?? 0) / pageSize),
        pageIndex: offset,
        pageSize,
      };
    }),

  updateUserRole: protectedProcedure
    .input(userInsertSchema.pick({ role: true }))
    .mutation(async ({ input, ctx }) => {
      await ctx.supabase.auth.updateUser({
        data: {
          user_role: input.role,
        },
      });
      return await ctx.db
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
