ALTER TABLE "packages" ADD COLUMN "height" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "packages" ADD COLUMN "width" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "packages" ADD COLUMN "breadth" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "packages" DROP COLUMN IF EXISTS "dimensions";