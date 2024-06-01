DO $$ BEGIN
 CREATE TYPE "public"."addressTypeEnum" AS ENUM('pickup', 'franchise', 'delivery');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."statusEnum" AS ENUM('requested', 'confirmed', 'picking', 'shipping', 'delivered', 'cancelled', 'rejected');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."userRoleEnum" AS ENUM('customer', 'manager', 'partner', 'user');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "address" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"customerId" uuid NOT NULL,
	"phone" varchar(10) NOT NULL,
	"street" text NOT NULL,
	"city" text DEFAULT 'Banglore',
	"pincode" integer NOT NULL,
	"type" "addressTypeEnum" NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "bill_details" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"service_charge" numeric NOT NULL,
	"insurance_charge" numeric NOT NULL,
	"gst_charges" numeric NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "categories" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "couriers" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "package_image" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"package_id" uuid NOT NULL,
	"image_url" text NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "packages" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"customer_id" uuid NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"courier_id" uuid NOT NULL,
	"bill_id" uuid NOT NULL,
	"height" integer NOT NULL,
	"width" integer NOT NULL,
	"breadth" integer NOT NULL,
	"weight" integer NOT NULL,
	"category_id" uuid NOT NULL,
	"delivery_date" timestamp NOT NULL,
	"from_time" time NOT NULL,
	"to_time" time NOT NULL,
	"is_insurance_required" boolean DEFAULT false,
	"pick_up_address_id" uuid NOT NULL,
	"franchise_address_id" uuid NOT NULL,
	"destination_address_id" uuid NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "requests" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"package_id" uuid NOT NULL,
	"tracking_number" varchar(50) NOT NULL,
	"current_status" "statusEnum" DEFAULT 'requested' NOT NULL,
	"requested_at" timestamp DEFAULT now(),
	"confirmed_at" timestamp,
	"picking_at" timestamp,
	"shipping_at" timestamp,
	"delivered_at" timestamp,
	"cacelled_at" timestamp,
	"rejected_at" timestamp,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user" (
	"id" uuid REFERENCES auth.users ON DELETE cascade NOT NULL PRIMARY KEY,
	"name" text,
	"email" text,
	"role" "userRoleEnum" DEFAULT 'user' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);



--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "address" ADD CONSTRAINT "address_customerId_user_id_fk" FOREIGN KEY ("customerId") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "package_image" ADD CONSTRAINT "package_image_package_id_packages_id_fk" FOREIGN KEY ("package_id") REFERENCES "public"."packages"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "packages" ADD CONSTRAINT "packages_customer_id_user_id_fk" FOREIGN KEY ("customer_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "packages" ADD CONSTRAINT "packages_courier_id_couriers_id_fk" FOREIGN KEY ("courier_id") REFERENCES "public"."couriers"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "packages" ADD CONSTRAINT "packages_bill_id_bill_details_id_fk" FOREIGN KEY ("bill_id") REFERENCES "public"."bill_details"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "packages" ADD CONSTRAINT "packages_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "packages" ADD CONSTRAINT "packages_pick_up_address_id_address_id_fk" FOREIGN KEY ("pick_up_address_id") REFERENCES "public"."address"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "packages" ADD CONSTRAINT "packages_franchise_address_id_address_id_fk" FOREIGN KEY ("franchise_address_id") REFERENCES "public"."address"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "packages" ADD CONSTRAINT "packages_destination_address_id_address_id_fk" FOREIGN KEY ("destination_address_id") REFERENCES "public"."address"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "requests" ADD CONSTRAINT "requests_package_id_packages_id_fk" FOREIGN KEY ("package_id") REFERENCES "public"."packages"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

-- Let's have connection between supabase auth schema to manage the user table

-- This trigger automatically creates a profile entry when a new user signs up via Supabase Auth.
-- See https://supabase.com/docs/guides/auth/managing-user-data#using-triggers for more details.
create or replace function public.handle_user_data()
returns trigger as $$
begin
  insert into public.user (id, name,email)
  values (new.id, new.raw_user_meta_data->>'full_name',new.email) on conflict (id) do update set name=new.raw_user_meta_data->>'full_name',email=new.email;
  return new;
end;
$$ language plpgsql security definer;

create or replace function public.handle_update_user_data()
returns trigger as $$
begin
  update public.user set name=new.raw_user_meta_data->>'full_name',email=new.email where id=new.id;
  return new;
end;
$$ language plpgsql security definer;

create trigger on_user_created
  after insert on auth.users
  for each row execute procedure public.handle_user_data();

create trigger on_user_updated
  after update on auth.users
  for each row execute procedure public.handle_user_data();