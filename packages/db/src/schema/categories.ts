import { relations } from "drizzle-orm";
import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";

import { packages } from "./packages";

export const categories = pgTable("categories", {
  id: uuid("id").defaultRandom().primaryKey().notNull(),
  name: text("name").notNull(),
  created_at: timestamp("created_at").defaultNow(),
});

export const categoryInsertSchema = createInsertSchema(categories);
export const categorySelectSchema = createInsertSchema(categories);

export const categoriesRelations = relations(categories, ({ many }) => ({
  packages: many(packages),
}));
