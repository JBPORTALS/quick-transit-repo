
import type { Config } from "drizzle-kit";
import * as dotenv from "dotenv";
dotenv.config({ path: "./.env" });

const connectionString = process.env.DATABASE_URL;

if (!connectionString) throw new Error("No pg connection string ❌");

export default {
  schema: "./src/schema",
  driver: "pg",
  out: "./drizzle",
  dbCredentials: { connectionString },
  tablesFilter: ["t3turbo_*"],
} satisfies Config;






