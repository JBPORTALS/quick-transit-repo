import { pgEnum, text, uuid } from "drizzle-orm/pg-core";
import { pgTable } from "./_table";
import { users } from "./users";

export const notificationTypeEnum = pgEnum("notification_type", ["delivery","package_assign","package_rise"]);

export const notification = pgTable("notification", {
  id: uuid("id").primaryKey().defaultRandom(),
  user_id: uuid("user_id").references(() => users.id, {
    onDelete: "cascade",
    onUpdate: "no action",
  }),
  text: text("text").notNull(),
  sub_text: text("sub_text").notNull(),
  notification_type: notificationTypeEnum("notification_type").default("package_assign")
});
