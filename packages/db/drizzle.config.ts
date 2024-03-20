import type { Config } from "drizzle-kit";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) throw new Error("No pg connection string ❌");

export default {
  schema: "./src/schema",
  driver: "pg",
  dbCredentials: { connectionString },
  tablesFilter: ["t3turbo_*"],
} satisfies Config;
