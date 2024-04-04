
import {
    text,
    uuid,
  } from "drizzle-orm/pg-core";
  
import { pgTable } from "./_table";
import { users } from "./users";


export const notification = pgTable("notification", {
    id: uuid("id").primaryKey().defaultRandom(),
    user_id:uuid(" user_id").defaultRandom().references(()=>users.id,{onDelete:"cascade",onUpdate:"no action"}),
    text:text("text").notNull(),
    sub_text:text("sub_text").notNull(),
    type: text("type").$type< "delivery"  | "package_assign"| "package_rise">().notNull(),
  });

  