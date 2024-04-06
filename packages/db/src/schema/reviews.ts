import { text, timestamp, uuid } from "drizzle-orm/pg-core";
import { pgTable } from "./_table";
import { users } from "./users";
import { requests } from "./requests";

export const reviews = pgTable("reviews", {
  id: uuid("id").primaryKey().defaultRandom(),
  request_id: uuid("request_id").references(() => requests.id, { onDelete: "cascade", onUpdate: "no action" }),
  users_id: uuid("users_id").references(() => users.id, { onDelete: "cascade", onUpdate: "no action" }),
  text: text("text").notNull(),
  ratings: text("ratings"),
  created_at: timestamp("created_at").defaultNow(),
});
