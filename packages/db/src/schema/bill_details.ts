import { relations, sql } from "drizzle-orm";
import {
  decimal,
  integer,
  pgTable,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

import { packages } from "./packages";

export const bill_details = pgTable("bill_details", {
  id: uuid("id").defaultRandom().primaryKey().notNull(),
  service_charge: decimal("service_charge").notNull(),
  insurance_charge: decimal("insurance_charge").notNull(),
  gst_charges: decimal("gst_charges").notNull(),
  paid_at: timestamp("paid_at").$defaultFn(()=> sql`NUll`),
  created_at: timestamp("created_at").defaultNow(),
});

export const billDetialsInsertSchema = createInsertSchema(bill_details);
export const billDetialsSelectSchema = createSelectSchema(bill_details);

export const billDetailsRealations = relations(bill_details, ({ many }) => ({
  packages: many(packages),
}));
