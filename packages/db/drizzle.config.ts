import { defineConfig } from "drizzle-kit";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) throw new Error("No pg connection string ❌");

export default defineConfig({
  schema: "./src/schema",
  dialect: "postgresql",
  out: "./drizzle",
  dbCredentials: {
    url: connectionString,
  },
  casing: "snake_case",
});
