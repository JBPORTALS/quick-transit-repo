import {
  
      integer,
      text,
      timestamp,
      uuid,
     
    } from "drizzle-orm/pg-core";
    
    import { pgTable } from "./_table";
    
    export const users = pgTable("user", {
      id: uuid("id").primaryKey().defaultRandom(),
      name:text("name"),
      role:text("role").$type< "customer"  | "manager"| "partner">().notNull(),
      phone_number:text("phone_number").notNull(),
      created_at:timestamp ("created_at").defaultNow(),
    
    });

