import { TRPCError } from "@trpc/server";
import { z } from "zod";

import {
  and,
  eq,
  requests,
  reviews,
  reviewsInsertSchema,
  reviewsSelectSchema,
  sql,
} from "@qt/db";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

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

  getReviewsByType: publicProcedure
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

  getAverageRatingForPartner: publicProcedure
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
    }),
});
