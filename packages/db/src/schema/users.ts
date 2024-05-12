import { pgEnum, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const userRoleEnum = pgEnum("userRoleEnum", [
  "customer",
  "manager",
  "partner",
  "user",
]);

export const user = pgTable("user", {
  id: uuid("id").defaultRandom().primaryKey().notNull(),
  name: text("name").notNull(),
  role: userRoleEnum("role").default("user").notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
});
