import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import { user } from "./schema/users";

export const schema = {
  ...user,
};

export * from "drizzle-orm";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) throw new Error("No DB connnection string ❌");

const client = postgres(connectionString);
export const db = drizzle(client);
