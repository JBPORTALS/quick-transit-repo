DO $$ BEGIN
 CREATE TYPE "addressTypeEnum" AS ENUM('delivery', 'package', 'franchise');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
