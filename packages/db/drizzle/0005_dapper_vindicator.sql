ALTER TABLE "packages" RENAME COLUMN "customerId" TO "customer_id";--> statement-breakpoint
ALTER TABLE "packages" DROP CONSTRAINT "packages_customerId_user_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "packages" ADD CONSTRAINT "packages_customer_id_user_id_fk" FOREIGN KEY ("customer_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
