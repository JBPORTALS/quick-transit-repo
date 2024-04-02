import {
    text,
    uuid,
} from "drizzle-orm/pg-core";

import { pgTable } from "./_table";

export const categories = pgTable("categories", {
    id:  uuid("id").notNull().primaryKey(),
    name: text("name").notNull(),
  });