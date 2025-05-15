import { relations, sql } from "drizzle-orm";
import {
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";

import { requests } from "./requests";

export const reviewTypeEnum = pgEnum("reviewTypeEnum", [
  "partner",
  "application",
]);

export const reviews = pgTable(
  "reviews",
  {
    id: uuid("id").defaultRandom().primaryKey().notNull(),
    request_id: uuid("request_id")
      .notNull()
      .references(() => requests.id, { onDelete: "cascade" }),
    type: reviewTypeEnum("type").notNull(),
    rating: integer("rating").notNull(),
    comment: text("comment"),
    review_date: timestamp("review_date").defaultNow(),
  },
  (table) => {
    return {
      ratingCheck: sql`CHECK(${table.rating} BETWEEN 1 AND 5)`,
    };
  },
);
export const reviewsInsertSchema = createInsertSchema(reviews);
export const reviewsSelectSchema = createInsertSchema(reviews);

export const reviewsRelations = relations(reviews, ({ one }) => ({
  request: one(requests, {
    fields: [reviews.request_id],
    references: [requests.id],
  }),
}));
