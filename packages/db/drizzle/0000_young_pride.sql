DO $$ BEGIN
 CREATE TYPE "userRoleEnum" AS ENUM('customer', 'manager', 'partner', 'user');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL REFERENCES auth.users ON DELETE CASCADE,
	"name" text NOT NULL,
	"role" "userRoleEnum" DEFAULT 'user' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);

-- Let's have connection between supabase auth schema to manage the user table

-- This trigger automatically creates a profile entry when a new user signs up via Supabase Auth.
-- See https://supabase.com/docs/guides/auth/managing-user-data#using-triggers for more details.
create or replace function public.handle_new_oauth_user()
returns trigger as $$
begin
  insert into public.user (id, name)
  values (new.id, new.raw_user_meta_data->>'full_name');
  return new;
end;
$$ language plpgsql security definer;

create trigger on_oauth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_oauth_user();
