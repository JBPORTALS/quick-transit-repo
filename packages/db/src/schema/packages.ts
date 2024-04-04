
import {
    text,
    timestamp,
    uuid,
  } from "drizzle-orm/pg-core";
  
  import { pgTable } from "./_table";
import {  categories } from "./categories";
import { address} from "./address";
import { bill_details } from "./bill_details";
import { users } from "./users";


export const packages = pgTable("packages", {
    id: uuid("id").primaryKey().defaultRandom(),
    title: text("title").notNull(),
    description: text("description").notNull(),
    courier_service :text("courier_service").notNull(),
    dimenstions : text("dimenstions ").notNull(),
    weight :text("weight ").notNull(),
    category_id: uuid("category_id").defaultRandom().references(()=>categories.id ,{onDelete:"cascade",onUpdate:"no action"}),
    delivery_date:timestamp("expires", { mode: "date" }).defaultNow(),
    from_time:timestamp("expires", { mode: "date" }).defaultNow(),
    to_time:timestamp("expires", { mode: "date" }).defaultNow(),
    is_insurance_required:text("is_insurance_required").notNull(),
    pick_up_address_id:uuid("pick_up_address_id").defaultRandom().references(()=>address.id,{onDelete:"cascade",onUpdate:"no action"}),
    franchise_address_id:uuid("franchise_address_id").defaultRandom().references(()=>address.id ,{onDelete:"cascade",onUpdate:"no action"}),
    destination_address_id:uuid("destination_address_id").defaultRandom().references(()=>address.id,{onDelete:"cascade",onUpdate:"no action"}),
    bill_id:uuid("bill_id").defaultRandom().references(()=>bill_details.id,{onDelete:"cascade",onUpdate:"no action"}),
    customer_id: uuid(" customer_id").defaultRandom().references(()=>users.id,{onDelete:"cascade",onUpdate:"no action"}),
  });

