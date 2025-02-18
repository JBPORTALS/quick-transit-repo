import { relations } from "drizzle-orm";
import { pgTable, text, time, timestamp, uuid } from "drizzle-orm/pg-core";

import { packages } from "./packages";

export const timeslots = pgTable("timeslots", {
  id: uuid("id").defaultRandom().primaryKey().notNull(),
    from_time: time("from_time").defaultNow(),
  to_time: time("to_time").defaultNow()
});


export const timeslotsRelations = relations(timeslots, ({ many }) => ({
  packages: many(packages),
}));
