import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import * as schema from "./schema";

export * from "drizzle-orm";
export * from "./schema";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) throw new Error("No DB connnection string ❌");

const client = postgres(connectionString);
export const db = drizzle(client, { schema, logger: true });
