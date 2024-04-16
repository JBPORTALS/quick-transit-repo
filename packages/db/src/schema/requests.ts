import { integer, pgEnum, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { pgTable } from "./_table";
import { packages } from "./packages";
import { users } from "./users";

export const subStatusTypeEnum = pgEnum("sub_status", ["pickup", "genrate invoice", "verify Payment", "delivery package", "complete request"]);
export const statusTypeEnum = pgEnum("status", ["pending","progress","complete"]);

export const requests = pgTable("requests", {
  id: uuid("id").primaryKey().defaultRandom(),
  package_id: uuid("package_id").references(() => packages.id, { onDelete: "cascade", onUpdate: "no action" }),
  partner_id: uuid("partner_id").references(() => users.id, { onDelete: "cascade", onUpdate: "no action" }),
  package_otp: integer("package_otp"),
  tracking_id:text("tracking_id"),
  image_of_receipt: text("image_of_receipt").notNull(),
  invoice_img: text("invoice_img").notNull(),
  sub_status: subStatusTypeEnum("sub_status").default("pickup"),
  status: statusTypeEnum("status").default("complete"),
  createdAt: timestamp("created_at").defaultNow(),
});