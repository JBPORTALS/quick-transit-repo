import { relations } from "drizzle-orm";
import { integer, pgTable, timestamp, uuid } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

import { packages } from "./packages";

export const bill_details = pgTable("bill_details", {
  id: uuid("id").defaultRandom().primaryKey().notNull(),
  service_charge: integer("service_charge").notNull(),
  insurance_charge: integer("insurance_charge").notNull(),
  gst_charges: integer("gst_charges").notNull(),
  created_at: timestamp("created_at").defaultNow(),
});

export const billDetialsInsertSchema = createInsertSchema(bill_details);
export const billDetialsSelectSchema = createSelectSchema(bill_details);

export const billDetailsRealations = relations(bill_details, ({ many }) => ({
  packages: many(packages),
}));
