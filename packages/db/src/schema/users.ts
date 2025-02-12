import { relations, sql } from "drizzle-orm";
import {
  index,
  pgEnum,
  pgSchema,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

import { address } from "./address";
import { packages } from "./packages";

export const userRoleEnum = pgEnum("userRoleEnum", [
  "customer",
  "manager",
  "partner",
  "user",
]);

const authUsers = pgSchema("auth").table("users", {
  id: uuid("id").primaryKey(),
  email: varchar("email"),
});

export const user = pgTable(
  "user",
  {
    id: uuid("id")
      .primaryKey()
      .references(() => authUsers.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    name: text("name").notNull(),
    email: text("email").notNull(),
    picture: text("picture"),
    role: userRoleEnum("role").default("user").notNull(),
    created_at: timestamp("created_at").defaultNow().notNull(),
  },
  (t) => ({
    roleIndex: index("roleIndex").on(t.role),
  }),
);

export const userRelations = relations(user, ({ many }) => ({
  addresses: many(address),
  packages: many(packages),
}));

export const userInsertSchema = createInsertSchema(user);
export const userSelectSchema = createSelectSchema(user);

export const handle_user_data = sql`
create or replace function public.handle_user_data()
returns trigger as $$
declare
  user_role "public"."userRoleEnum";
begin
  user_role := coalesce((new.raw_user_meta_data->>'user_role')::"public"."userRoleEnum", 'user');

  insert into public.user (id, name, email, role,picture)
  values (new.id, new.raw_user_meta_data->>'full_name', new.email, user_role,new.raw_user_meta_data->>'picture') on conflict(id)
  do update set email=new.email,name=new.raw_user_meta_data->>'full_name',role=user_role,picture=new.raw_user_meta_data->>'picture';

  return new;
exception
  when others then
    raise warning 'Error in handle_user_data function: %', sqlerrm;
    return null; -- Return NULL to indicate failure
end;
$$ language plpgsql security definer;

create or replace trigger on_user_created
  after insert on auth.users
  for each row execute procedure public.handle_user_data();

create or replace trigger on_user_updated
  after update on auth.users
  for each row execute procedure public.handle_user_data();
`;
