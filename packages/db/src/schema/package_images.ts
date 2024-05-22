import { relations } from "drizzle-orm";
import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

import { packages } from "./packages";

export const package_image = pgTable("package_image", {
  id: uuid("id").defaultRandom().primaryKey().notNull(),
  package_id: uuid("package_id")
    .notNull()
    .references(() => packages.id),
  image_url: text("image_url").notNull(),
  created_at: timestamp("created_at").defaultNow(),
});

export const packagImageInsertSchema = createInsertSchema(package_image);
export const packageImageSelectSchema = createSelectSchema(package_image);

export const packageImageRealations = relations(package_image, ({ one }) => ({
  packages: one(packages, {
    fields: [package_image.package_id],
    references: [packages.id],
  }),
}));
