import { decimal,timestamp,uuid} from "drizzle-orm/pg-core";
import { pgTable } from "./_table";

export const bill_details = pgTable("bill_details", {
    id: uuid("id").primaryKey().defaultRandom(),
    service_charge: decimal("service_charge").notNull(),
    insurance_charge: decimal("insurance_charge").notNull(),
    gst_charges:  decimal("gst_charges").notNull(),
    created_at: timestamp("created_at").defaultNow()
});
