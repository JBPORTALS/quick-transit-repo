import {
  
      integer,
      text,
      timestamp,
      uuid,
     
    } from "drizzle-orm/pg-core";
    
    import { pgTable } from "./_table";
    
    export const users = pgTable("user", {
      id: uuid("id").notNull().primaryKey(),
      name:text("name"),
      role:text("role").$type< "customer"  | "manager"| "partner">().notNull(),
      phone_number: integer("phone_number").notNull(),
      created_at:timestamp ("created_at").notNull(),
    
    });