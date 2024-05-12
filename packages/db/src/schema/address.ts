import { relations } from "drizzle-orm";
import {
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";

import { user } from "./users";

export const addressTypeEnum = pgEnum("addressTypeEnum", [
  "pickup",
  "franchise",
  "delivery",
]);

export const address = pgTable("address", {
  id: uuid("id").defaultRandom().primaryKey().notNull(),
  customerId: uuid("customerId")
    .notNull()
    .references(() => user.id),
  phone: varchar("phone", { length: 10 }).notNull(),
  street: text("street").notNull(),
  city: text("city").default("Banglore"),
  pincode: integer("pincode").notNull(),
  type: addressTypeEnum("type").notNull(),
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at").defaultNow(),
});

export const addressInsertSchema = createInsertSchema(address);

export const addressRealations = relations(address, ({ one }) => ({
  customer: one(user, {
    fields: [address.customerId],
    references: [user.id],
  }),
}));
