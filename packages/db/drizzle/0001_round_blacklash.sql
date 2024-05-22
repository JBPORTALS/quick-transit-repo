DO $$ BEGIN
 CREATE TYPE "public"."addressTypeEnum" AS ENUM('pickup', 'franchise', 'delivery');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "address" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"customerId" uuid NOT NULL,
	"street" text NOT NULL,
	"city" text DEFAULT 'Banglore',
	"pincode" integer NOT NULL,
	"type" "addressTypeEnum" NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "address" ADD CONSTRAINT "address_customerId_user_id_fk" FOREIGN KEY ("customerId") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

create extension if not exists moddatetime schema extensions;

create trigger
  handle_updated_at before update
on "address"
for each row execute
  procedure moddatetime(updated_at);
