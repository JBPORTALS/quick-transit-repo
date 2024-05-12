import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) throw new Error("No DB connnection string ❌");
const client = postgres(connectionString, { max: 1 });
const db = drizzle(client);
await migrate(db, { migrationsFolder: "drizzle" });
await client.end();
