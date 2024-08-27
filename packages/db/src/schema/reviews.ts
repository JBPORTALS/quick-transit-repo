import { relations } from "drizzle-orm";
import {
  pgTable,
  uuid,
  integer,
  text,
  timestamp,
  pgEnum,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { sql } from "drizzle-orm";

import { requests } from "./requests";

export const reviewTypeEnum = pgEnum("reviewTypeEnum", ["partner", "application"]);

export const reviews = pgTable("reviews", {
  id: uuid("id").defaultRandom().primaryKey().notNull(),
  request_id: uuid("request_id")
    .notNull()
    .references(() => requests.id, { onDelete: "cascade" }),
  type: reviewTypeEnum("type").notNull(),
  rating: integer("rating").notNull(),
  comment: text("comment"),
  review_date: timestamp("review_date").defaultNow(),
}, (table) => {
  return {
    ratingCheck: sql`check (${table.rating} between 1 and 5)`,
  }
});
export const reviewsInsertSchema = createInsertSchema(reviews);
export const reviewsSelectSchema = createInsertSchema(reviews);

export const reviewsRelations = relations(reviews, ({ one }) => ({
  request: one(requests, {
    fields: [reviews.request_id],
    references: [requests.id],
  }),
}));
