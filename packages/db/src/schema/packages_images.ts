import {
    text,
    uuid,
} from "drizzle-orm/pg-core";

import { pgTable } from "./_table";
import { packages } from "./packages";


export const packages_images = pgTable("packages_images", {
    id:uuid("id").primaryKey().defaultRandom().references(()=>packages.id,{onDelete:"cascade",onUpdate:"no action"}),
    package_id:uuid("id").primaryKey().defaultRandom(),
    image_url: text("image_url"),
});

