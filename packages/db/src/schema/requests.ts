import { relations } from "drizzle-orm";
import {
  boolean,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";

import { user } from ".";
import { packages } from "./packages";

export const statusEnum = pgEnum("statusEnum", [
  "requested",
  "confirmed",
  "pickedup",
  "delivered",
  "cancelled",
  "rejected",
]);

export const requests = pgTable("requests", {
  id: uuid("id").defaultRandom().primaryKey().notNull(),
  package_id: uuid("package_id")
    .notNull()
    .references(() => packages.id, { onDelete: "cascade" }),
  partner_id: uuid("partner_id").references(() => user.id),
  tracking_number: varchar("tracking_number", { length: 50 }).notNull(),
  franchise_tracking_id: varchar("franchise_tracking_id", {
    length: 255,
  }),
  franchise_reciept_url: text("franchise_reciept_url"),
  one_time_code: varchar("one_time_code"),
  is_verified: boolean("is_verified").default(false),
  current_status: statusEnum("current_status").notNull().default("requested"),
  requested_at: timestamp("requested_at").defaultNow(),
  confirmed_at: timestamp("confirmed_at"),
  picked_at: timestamp("picked_at"),
  delivered_at: timestamp("delivered_at"),
  cacelled_at: timestamp("cacelled_at"),
  rejected_at: timestamp("rejected_at"),
  created_at: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdateFn(() => new Date(Date.now())),
});

export const requestsInsertSchema = createInsertSchema(requests);
export const requestsSelectSchema = createInsertSchema(requests);

export const requestsRelations = relations(requests, ({ one }) => ({
  package: one(packages, {
    fields: [requests.package_id],
    references: [packages.id],
  }),
  partner: one(user, {
    fields: [requests.partner_id],
    references: [user.id],
    relationName: "partner",
  }),
}));
