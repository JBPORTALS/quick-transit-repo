import { text, timestamp, uuid ,} from "drizzle-orm/pg-core";

import { pgTable } from "./_table";
import { packages } from "./packages";
import { users } from "./users";

export const requests = pgTable("requests", {
  id: uuid("id").defaultRandom().references(()=>packages.id ,{onDelete:"cascade",onUpdate:"no action"}),
  package_id : uuid("package_id").defaultRandom(),
  partner_id: uuid("partner_id").defaultRandom().references(() => users.id, {onDelete:"cascade",onUpdate:"no action"}),
  package_otp : uuid("package_otp").defaultRandom(),
  tracking_id : uuid("tracking_id").defaultRandom(),
  image_of_receipt: text("image_of_receipt").notNull(),
  invoice_img : text("invoice_img").notNull(),
  sub_status : text("sub_status").$type< "pickup"  | "genrate innovice"| "verify Payment" | "delivery package"| "complete request">().notNull(),
  status :text("status").$type< "pending"  | "progress"| "complete">().notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});
