
import {
    integer,
    text,
    uuid,
} from "drizzle-orm/pg-core";


import { pgTable } from "./_table";
export const address = pgTable("address", {
    id: uuid("id").primaryKey().defaultRandom(),
    name: text("name"),
    phone_number:text ("phone_number").notNull(),
    address_line: text(" address_line").notNull(),
    city: text("city").notNull(),
    pincode:text("pincode").notNull(),
    type: text("type").$type< "delivery"  | "package"| "franchise">().notNull(),
});

