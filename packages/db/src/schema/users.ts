import { pgEnum, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { pgTable } from "./_table";

export const usersTypeEnum = pgEnum("role", ["customer", "manager", "partner"]); 

export const users = pgTable("user", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name"),
  role: usersTypeEnum("role").default("manager"), 
  phone_number: text("phone_number").notNull(),
  created_at: timestamp("created_at").defaultNow(),
});
