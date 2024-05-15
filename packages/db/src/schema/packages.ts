import { relations } from "drizzle-orm";
import {
  boolean,
  integer,
  pgTable,
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
import { package_image } from "./package_images";
import { user } from "./users";

export const packages = pgTable("packages", {
  id: uuid("id").defaultRandom().primaryKey().notNull(),
  customer_id: uuid("customer_id")
    .notNull()
    .references(() => user.id),
  title: text("title").notNull(),
  description: text("description").notNull(),
  courier_id: uuid("courier_id")
    .notNull()
    .references(() => couriers.id),
  bill_id: uuid("bill_id")
    .notNull()
    .references(() => bill_details.id),
  height: integer("height").notNull(),
  width: integer("width").notNull(),
  breadth: integer("breadth").notNull(),
  weight: integer("weight").notNull(),
  category_id: uuid("category_id")
    .notNull()
    .references(() => categories.id),
  delivery_date: timestamp("delivery_date").notNull(),
  from_time: time("from_time").notNull(),
  to_time: time("to_time").notNull(),
  is_insurance_required: boolean("is_insurance_required").default(false),
  pick_up_address_id: uuid("pick_up_address_id")
    .notNull()
    .references(() => address.id),
  franchise_address_id: uuid("franchise_address_id")
    .notNull()
    .references(() => address.id),
  destination_address_id: uuid("destination_address_id")
    .notNull()
    .references(() => address.id),
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at").defaultNow(),
});

export const packageInsertSchema = createInsertSchema(packages);
export const packageSelectSchema = createSelectSchema(packages);

export const packageRealations = relations(packages, ({ one, many }) => ({
  packageImages: many(package_image),
  category_id_fk: one(categories, {
    fields: [packages.category_id],
    references: [categories.id],
  }),
  courier_id_fk: one(couriers, {
    fields: [packages.courier_id],
    references: [couriers.id],
  }),
  bill_id_fk: one(bill_details, {
    fields: [packages.bill_id],
    references: [bill_details.id],
  }),
  pick_up_address_fk: one(address, {
    fields: [packages.pick_up_address_id],
    references: [address.id],
    relationName: "pick_up_address_fk",
  }),
  franchise_address_fk: one(address, {
    fields: [packages.franchise_address_id],
    references: [address.id],
    relationName: "franchise_address_fk",
  }),
  destination_address_fk: one(address, {
    fields: [packages.destination_address_id],
    references: [address.id],
    relationName: "destination_address_fk",
  }),
}));
