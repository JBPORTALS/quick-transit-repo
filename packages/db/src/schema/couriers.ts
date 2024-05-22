import { relations } from "drizzle-orm";
import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";

import { packages } from "./packages";

export const couriers = pgTable("couriers", {
  id: uuid("id").defaultRandom().primaryKey().notNull(),
  name: text("name").notNull(),
  created_at: timestamp("created_at").defaultNow(),
});

export const couriersInsertSchema = createInsertSchema(couriers);
export const couriersSelectSchema = createInsertSchema(couriers);

export const couriersRelations = relations(couriers, ({ many }) => ({
  packages: many(packages),
}));
