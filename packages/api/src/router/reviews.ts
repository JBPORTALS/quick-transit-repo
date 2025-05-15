import { TRPCError } from "@trpc/server";
import { z } from "zod";

import {
  and,
  desc,
  eq,
  getTableColumns,
  lte,
  packages,
  requests,
  reviews,
  reviewsInsertSchema,
  reviewsSelectSchema,
  sql,
  user,
} from "@qt/db";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { cursorPaginateInputSchema } from "../utils";

export const reviewsRouter = createTRPCRouter({
  getReviewsByRequestId: publicProcedure
    .input(reviewsInsertSchema.pick({ request_id: true }))
    .query(async ({ ctx, input }) => {
      const reviewsForRequest = await ctx.db.query.reviews.findMany({
        where: eq(reviews.request_id, input.request_id),
        with: {
          request: true,
        },
      });

      if (reviewsForRequest.length === 0) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "No reviews found for this request",
        });
      }

      return reviewsForRequest;
    }),

  createReview: protectedProcedure
    .input(reviewsInsertSchema)
    .mutation(async ({ ctx, input }) => {
      const newReview = await ctx.db.insert(reviews).values(input).returning();
      return newReview[0];
    }),

  deleteReview: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const deletedReview = await ctx.db
        .delete(reviews)
        .where(eq(reviews.id, input.id))
        .returning();

      if (deletedReview.length === 0) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Review not found",
        });
      }

      return deletedReview[0];
    }),

  getReviewsByType: protectedProcedure
    .input(reviewsInsertSchema.pick({ type: true, request_id: true }))
    .query(async ({ ctx, input }) => {
      const reviewsByType = await ctx.db.query.reviews.findFirst({
        where: and(
          eq(reviews.type, input.type),
          eq(reviews.request_id, input.request_id),
        ),
        with: {
          request: true,
        },
      });
      return reviewsByType;
    }),

  getAverageRatingForPartner: protectedProcedure
    .input(z.object({ partner_id: reviewsInsertSchema.shape.request_id }))
    .query(async ({ ctx, input }) => {
      const result = await ctx.db
        .select({
          averageRating: sql<number>`CAST(AVG(${reviews.rating}) AS DECIMAL(10,2))`,
          totalReviews: sql<number>`COUNT(${reviews.id})`,
        })
        .from(reviews)
        .innerJoin(requests, eq(reviews.request_id, requests.id))
        .where(
          and(
            eq(requests.partner_id, input.partner_id),
            eq(reviews.type, "partner"),
          ),
        );

      return result.at(0);
    }),

  getRatingsOfPartner: protectedProcedure.query(({ ctx }) =>
    ctx.db
      .select({
        averageRating: sql<number>`CAST(AVG(${reviews.rating}) AS DECIMAL(10,2))`,
        totalReviews: sql<number>`COUNT(${reviews.id})`,
      })
      .from(reviews)
      .innerJoin(requests, eq(reviews.request_id, requests.id))
      .where(
        and(eq(requests.partner_id, ctx.user.id), eq(reviews.type, "partner")),
      )
      .then((r) => r.at(0)),
  ),

  /** Get all reviews for partner */
  getInfiniteForPartner: protectedProcedure
    .input(cursorPaginateInputSchema.optional())
    .query(async ({ ctx, input }) => {
      const cursor = input?.cursor;
      const limit = input?.limit ?? 10;

      const cursorCond = cursor ? lte(reviews.id, cursor) : undefined;

      const reviewsList = await ctx.db
        .select({
          ...getTableColumns(reviews),
          customer: { ...getTableColumns(user) },
          package_details: { ...getTableColumns(packages) },
        })
        .from(reviews)
        .innerJoin(requests, eq(requests.id, reviews.request_id))
        .innerJoin(packages, eq(packages.id, requests.package_id))
        .innerJoin(user, eq(user.id, packages.customer_id))
        .where(
          and(
            eq(reviews.type, "partner"),
            eq(requests.partner_id, ctx.user.id),
            cursorCond,
          ),
        )
        .orderBy(desc(reviews.id), desc(reviews.review_date))
        .limit(limit + 1);

      const nextCursor =
        reviewsList.length > limit ? reviewsList.pop()?.id : undefined;

      return {
        items: reviewsList,
        nextCursor,
        limit,
      };
    }),
});
