import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import * as schema from "./schema";

export * from "drizzle-orm";
export * from "./schema";

const globalForDb = globalThis as unknown as {
  db?: ReturnType<typeof drizzle>;
  client?: ReturnType<typeof postgres>;
};

const connectionString = process.env.DATABASE_URL;

if (!connectionString) throw new Error("No DB connnection string ❌");

export const client = postgres(connectionString, {
  max: process.env.SEED_MODE ? 1 : undefined,
  onnotice: process.env.SEED_MODE ? () => {} : console.log, // suppress notices in seed
  prepare: false,
  connect_timeout: 10, // ⬅️ wait 10 seconds before giving up
  idle_timeout: 60, // ⬅️ keep idle connections longer
});
export const db = globalForDb.db ?? drizzle(client, { schema });

export type db = typeof db;

if (process.env.NODE_ENV !== "production") {
  globalForDb.client = client;
  globalForDb.db = db;
}
