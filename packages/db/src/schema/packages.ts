import { relations } from "drizzle-orm";
import {
  boolean,
  decimal,
  integer,
  pgTable,
  real,
  text,
  time,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

import { address } from "./address";
import { bill_details } from "./bill_details";
import { categories } from "./categories";
import { couriers } from "./couriers";
import { requests } from "./requests";
import { user } from "./users";

export const packages = pgTable("packages", {
  id: uuid("id").defaultRandom().primaryKey().notNull(),
  customer_id: uuid("customer_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  description: text("description").notNull(),
  courier_id: uuid("courier_id")
    .notNull()
    .references(() => couriers.id, { onDelete: "set null" }),
  bill_id: uuid("bill_id")
    .notNull()
    .references(() => bill_details.id, { onDelete: "set null" }),
  height: real("height").notNull(),
  width: real("width").notNull(),
  breadth: real("breadth").notNull(),
  weight: real("weight").notNull(),
  category_id: uuid("category_id")
    .notNull()
    .references(() => categories.id, { onDelete: "set null" }),
  delivery_date: timestamp("delivery_date").notNull(),
  from_time: time("from_time").notNull(),
  to_time: time("to_time").notNull(),
  is_insurance_required: boolean("is_insurance_required").default(false),
  pick_up_address_id: uuid("pick_up_address_id").references(() => address.id, {
    onDelete: "set null",
    onUpdate: "cascade",
  }),
  destination_address_id: uuid("destination_address_id").references(
    () => address.id,
    { onDelete: "set null", onUpdate: "cascade" },
  ),
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at").defaultNow(),
});

export const packageInsertSchema = createInsertSchema(packages);
export const packageSelectSchema = createSelectSchema(packages);

export const packageRealations = relations(packages, ({ one, many }) => ({
  customer: one(user, {
    fields: [packages.customer_id],
    references: [user.id],
  }),
  request: one(requests, {
    fields: [packages.id],
    references: [requests.package_id],
  }),
  category: one(categories, {
    fields: [packages.category_id],
    references: [categories.id],
  }),
  courier: one(couriers, {
    fields: [packages.courier_id],
    references: [couriers.id],
  }),
  bill: one(bill_details, {
    fields: [packages.bill_id],
    references: [bill_details.id],
  }),
  pick_up_address: one(address, {
    fields: [packages.pick_up_address_id],
    references: [address.id],
    relationName: "pick_up_address_fk",
  }),
  destination_address: one(address, {
    fields: [packages.destination_address_id],
    references: [address.id],
    relationName: "destination_address_fk",
  }),
}));
