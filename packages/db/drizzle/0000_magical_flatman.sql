CREATE TABLE IF NOT EXISTS "qt_address" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text,
	"phone_number" text NOT NULL,
	"address_line" text NOT NULL,
	"city" text NOT NULL,
	"pincode" text NOT NULL,
	"address_type" "addressTypeEnum" DEFAULT 'delivery'
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "qt_bill_details" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"service_charge" numeric NOT NULL,
	"insurance_charge" numeric NOT NULL,
	"gst_charges" numeric NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "qt_categories" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "qt_notification" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid,
	"text" text NOT NULL,
	"sub_text" text NOT NULL,
	"notification_type" "notification_type" DEFAULT 'package_assign'
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "qt_packages" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"courier_service" text NOT NULL,
	"dimensions" text NOT NULL,
	"weight" text NOT NULL,
	"category_id" uuid,
	"delivery_date" timestamp DEFAULT now() NOT NULL,
	"from_time" timestamp DEFAULT now() NOT NULL,
	"to_time" timestamp DEFAULT now() NOT NULL,
	"is_insurance_required" text NOT NULL,
	"pick_up_address_id" uuid,
	"franchise_address_id" uuid,
	"destination_address_id" uuid,
	"bill_id" uuid,
	"customer_id" uuid
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "qt_packages_images" (
	"id" uuid PRIMARY KEY NOT NULL,
	"package_id" uuid,
	"image_url" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "qt_post" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(256) NOT NULL,
	"content" varchar(256) NOT NULL,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updatedAt" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "qt_requests" (
	"id" uuid,
	"package_id" uuid DEFAULT gen_random_uuid(),
	"partner_id" uuid,
	"package_otp" uuid DEFAULT gen_random_uuid(),
	"tracking_id" uuid DEFAULT gen_random_uuid(),
	"image_of_receipt" text NOT NULL,
	"invoice_img" text NOT NULL,
	"sub_status" "sub_status" DEFAULT 'pickup',
	"status" "status" DEFAULT 'complete',
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "qt_reviews" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"request_id" uuid,
	"users_id" uuid,
	"text" text NOT NULL,
	"ratings" text,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "qt_user" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text,
	"role" "role" DEFAULT 'manager',
	"phone_number" text NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "qt_notification" ADD CONSTRAINT "qt_notification_user_id_qt_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "qt_user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "qt_packages" ADD CONSTRAINT "qt_packages_category_id_qt_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "qt_categories"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "qt_packages" ADD CONSTRAINT "qt_packages_pick_up_address_id_qt_address_id_fk" FOREIGN KEY ("pick_up_address_id") REFERENCES "qt_address"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "qt_packages" ADD CONSTRAINT "qt_packages_franchise_address_id_qt_address_id_fk" FOREIGN KEY ("franchise_address_id") REFERENCES "qt_address"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "qt_packages" ADD CONSTRAINT "qt_packages_destination_address_id_qt_address_id_fk" FOREIGN KEY ("destination_address_id") REFERENCES "qt_address"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "qt_packages" ADD CONSTRAINT "qt_packages_bill_id_qt_bill_details_id_fk" FOREIGN KEY ("bill_id") REFERENCES "qt_bill_details"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "qt_packages" ADD CONSTRAINT "qt_packages_customer_id_qt_user_id_fk" FOREIGN KEY ("customer_id") REFERENCES "qt_user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "qt_packages_images" ADD CONSTRAINT "qt_packages_images_package_id_qt_packages_id_fk" FOREIGN KEY ("package_id") REFERENCES "qt_packages"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "qt_requests" ADD CONSTRAINT "qt_requests_id_qt_packages_id_fk" FOREIGN KEY ("id") REFERENCES "qt_packages"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "qt_requests" ADD CONSTRAINT "qt_requests_partner_id_qt_user_id_fk" FOREIGN KEY ("partner_id") REFERENCES "qt_user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "qt_reviews" ADD CONSTRAINT "qt_reviews_request_id_qt_requests_id_fk" FOREIGN KEY ("request_id") REFERENCES "qt_requests"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "qt_reviews" ADD CONSTRAINT "qt_reviews_users_id_qt_user_id_fk" FOREIGN KEY ("users_id") REFERENCES "qt_user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
