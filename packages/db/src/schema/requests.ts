import { relations } from "drizzle-orm";
import { pgEnum, pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";

import { packages } from "./packages";

export const statusEnum = pgEnum("statusEnum", [
  "requested",
  "confirmed",
  "picking",
  "shipping",
  "delivered",
  "cancelled",
  "rejected",
]);

export const requests = pgTable("requests", {
  id: uuid("id").defaultRandom().primaryKey().notNull(),
  package_id: uuid("package_id")
    .notNull()
    .references(() => packages.id, { onDelete: "cascade" }),
  tracking_number: varchar("tracking_number", { length: 50 }).notNull(),
  current_status: statusEnum("current_status").notNull().default("requested"),
  requested_at: timestamp("requested_at").defaultNow(),
  confirmed_at: timestamp("confirmed_at"),
  picking_at: timestamp("picking_at"),
  shipping_at: timestamp("shipping_at"),
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
  packages: one(packages, {
    fields: [requests.package_id],
    references: [packages.id],
  }),
}));
