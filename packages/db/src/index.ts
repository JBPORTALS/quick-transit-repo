import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";


import { bill_details } from "./schema/bill_details";
import { categories } from "./schema/categories";
import { users } from "./schema/users";
import { reviews } from "./schema/reviews";
import { packages_images } from "./schema/packages_images";
import { packages } from "./schema/packages";
import { notification } from "./schema/notification";
import { requests } from "./schema/request";
import { post } from "./schema/post";
import { address } from "./schema/address";

export const schema = {...post,  ...address,...bill_details ,...categories , ...users , ...reviews , ...packages_images , ...packages , ...notification , ...requests };

export { pgTable as tableCreator } from "./schema/_table";

export * from "drizzle-orm";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) throw new Error("No DB connnection string ❌");

const client = postgres(connectionString);
export const db = drizzle(client);