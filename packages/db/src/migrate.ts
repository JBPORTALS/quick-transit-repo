import "dotenv/config";

import { migrate } from "drizzle-orm/postgres-js/migrator";

import { client, db, handle_user_data } from ".";

// This will run migrations on the database, skipping the ones already applied
await migrate(db, { migrationsFolder: "./drizzle" });

// Custome sql queries
await db.execute(handle_user_data);

await client.end();

console.log("Migration completed ✅");
process.exit(0);
