DO $$ BEGIN
 CREATE TYPE "public"."statusEnum" AS ENUM('requested', 'confirmed', 'picking', 'shipping', 'delivered', 'cancelled', 'rejected');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
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
DO $$ BEGIN
 ALTER TABLE "requests" ADD CONSTRAINT "requests_package_id_packages_id_fk" FOREIGN KEY ("package_id") REFERENCES "public"."packages"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
