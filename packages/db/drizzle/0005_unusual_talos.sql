ALTER TYPE "statusEnum" ADD VALUE 'pickedup';--> statement-breakpoint
ALTER TABLE "requests" RENAME COLUMN "picking_at" TO "picked_at";--> statement-breakpoint
ALTER TABLE "requests" DROP COLUMN IF EXISTS "shipping_at";