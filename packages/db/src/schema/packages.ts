
import {
  
    integer,
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
    id: uuid("id").notNull().primaryKey(),
    title: text("title").notNull(),
    description: text("description").notNull(),
    courier_service :text("courier_service").notNull(),
    dimenstions : text("dimenstions ").notNull(),
    weight :integer("weight ").notNull(),
    category_id: uuid("category_id").notNull().references(()=>categories.id ,{onDelete:"cascade",onUpdate:"no action"}),
    delivery_date:timestamp("expires", { mode: "date" }).notNull(),
    from_time:timestamp("expires", { mode: "date" }).notNull(),
    to_time:timestamp("expires", { mode: "date" }).notNull(),
    is_insurance_required:text("is_insurance_required").notNull(),
    pick_up_address_id:uuid("pick_up_address_id").notNull().references(()=>address.id,{onDelete:"cascade",onUpdate:"no action"}),
    franchise_address_id:uuid("franchise_address_id").notNull().references(()=>address.id ,{onDelete:"cascade",onUpdate:"no action"}),
    destination_address_id:uuid("destination_address_id").references(()=>address.id,{onDelete:"cascade",onUpdate:"no action"}),
    bill_id:uuid("bill_id").notNull().references(()=>bill_details.id,{onDelete:"cascade",onUpdate:"no action"}),
    customer_id: uuid(" customer_id").notNull().references(()=>users.id,{onDelete:"cascade",onUpdate:"no action"}),
  });
  
  