import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import { address } from "./schema/address";
import { bill_details } from "./schema/bill_details";
import { categories } from "./schema/categories";
import { notification } from "./schema/notification";
import { packages } from "./schema/packages";
import { packages_images } from "./schema/packages_images";
import { post } from "./schema/post";
import { requests } from "./schema/request";
import { reviews } from "./schema/reviews";
import { users } from "./schema/users";

export const schema = {
  ...post,
  ...address,
  ...bill_details,
  ...categories,
  ...users,
  ...reviews,
  ...packages_images,
  ...packages,
  ...notification,
  ...requests,
};

export { pgTable as tableCreator } from "./schema/_table";

export * from "drizzle-orm";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) throw new Error("No DB connnection string ❌");

const client = postgres(connectionString);
export const db = drizzle(client);
