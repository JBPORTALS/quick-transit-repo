import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import * as schema from "./schema";

export * from "drizzle-orm";
export * from "./schema";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) throw new Error("No DB connnection string ❌");

export const client = postgres(connectionString, {
  max: process.env.SEED_MODE ? 1 : undefined,
  onnotice: process.env.SEED_MODE ? () => {} : console.log, // suppress notices in seed
});
export const db = drizzle(client, { schema });

export type db = typeof db;
