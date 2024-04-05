
import {
    integer,
    timestamp,
    uuid,
} from "drizzle-orm/pg-core";

import { pgTable } from "./_table";
export const bill_details = pgTable("bill_details", {
    id: uuid("id").notNull().primaryKey(),
    service_charge: integer("service_charge").notNull(),
    insurance_charge: integer("insurance_charge").notNull(),
    gst_charges: integer("gst_charges").notNull(),
    created_at:timestamp ("created_at").notNull(),
});