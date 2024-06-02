import { faker } from "@faker-js/faker";
import { createClient } from "@supabase/supabase-js";

import {
  address,
  bill_details,
  categories,
  couriers,
  db,
  getTableName,
  package_image,
  packages,
  requests,
  sql,
  Table,
  user,
} from "./index";

if (!process.env.SEED_MODE)
  throw new Error("Not in a SEED MODE, set a SEED_MODE env variable ❌");

if (
  !process.env.NEXT_PUBLIC_SUPABASE_URL ||
  !process.env.SUPABASE_SERVICE_ROLE_KEY
)
  throw new Error("set a SUPABASE env variable ❌");

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  },
);

async function reset(db: db, table: Table) {
  const query = `TRUNCATE TABLE ${getTableName(table)} RESTART IDENTITY CASCADE`;
  return db.execute(sql.raw(query));
}

async function main() {
  console.log("Reset the tables 🧹");
  for (const table of [
    package_image,
    packages,
    bill_details,
    couriers,
    categories,
    address,
  ]) {
    await reset(db, table);
  }

  console.log("Clear the users 🧹");
  const supaUsers = await supabase.auth.admin.listUsers();

  await Promise.all(
    supaUsers.data.users.map((user) =>
      supabase.auth.admin.deleteUser(user.id, false),
    ),
  );

  // Insert fake data into the database
  console.log("Creating fake users via supabase admin 🌱");
  const data = await Promise.all(
    Array.from({ length: 10 }).map(() => {
      const full_name = faker.internet.displayName();
      return supabase.auth.admin.createUser({
        email: faker.internet.email({ firstName: full_name }),
        email_confirm: true,
        user_metadata: {
          full_name,
          user_role: faker.helpers.arrayElement<typeof user.$inferInsert.role>([
            "partner",
            "customer",
          ]),
        },
      });
    }),
  );

  console.log(data.map((v) => v.data.user?.email));
  const users = await db.query.user.findMany();

  console.log("Seeding into address 🌱");

  await Promise.all(
    users.map(async (user) => {
      return Promise.all(
        Array.from({ length: 5 }).map(() =>
          db.insert(address).values({
            customerId: user.id,
            type: faker.helpers.arrayElement([
              "delivery",
              "franchise",
              "pickup",
            ]),
            phone: faker.helpers.fromRegExp(
              /[0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]/,
            ),
            street: ` ${faker.location.buildingNumber()}, ${faker.location.street()},  ${faker.location.city()}`,
            pincode: parseInt(faker.location.zipCode("######")),
            city: faker.location.city(),
          }),
        ),
      );
    }),
  );

  console.log("Seeding into `category` 🌱");
  await db
    .insert(categories)
    .values([
      { name: "Question Papers" },
      { name: "Others" },
      { name: "Answer Papaers" },
      { name: "Miscelaneous" },
    ]);

  console.log("Seeding into `couriers` 🌱");
  await db
    .insert(couriers)
    .values([
      { name: "FastX" },
      { name: "SpeedX" },
      { name: "Super Express" },
      { name: "Shift Box" },
    ]);
  console.log("Seeding into `Pakages` 🌱");
  const addresses = await db.query.address.findMany();
  const categories_data = await db.query.categories.findMany();
  const couriers_data = await db.query.couriers.findMany();

  await Promise.all(
    users.map(async (user) => {
      return Promise.all(
        Array.from({ length: 5 }).map(async () => {
          //Generating bill
          const bill_details_data = await db
            .insert(bill_details)
            .values({
              service_charge: faker.commerce.price({ min: 500, max: 1000 }),
              insurance_charge: faker.commerce.price({ min: 200, max: 600 }),
              gst_charges: faker.commerce.price({ min: 10, max: 100 }),
            })
            .returning();

          const package_detail = await db
            .insert(packages)
            .values({
              customer_id: user.id,
              title: faker.commerce.productName(),
              description: faker.commerce.productDescription(),
              pick_up_address_id: faker.helpers.arrayElement(addresses).id,
              franchise_address_id: faker.helpers.arrayElement(addresses).id,
              destination_address_id: faker.helpers.arrayElement(addresses).id,
              category_id: faker.helpers.arrayElement(categories_data).id,
              is_insurance_required: faker.helpers.arrayElement([true, false]),
              height: faker.number.int({ min: 20, max: 40 }),
              width: faker.number.int({ min: 20, max: 40 }),
              breadth: faker.number.int({ min: 20, max: 40 }),
              courier_id: faker.helpers.arrayElement(couriers_data).id,
              delivery_date: faker.date.future(),
              to_time: faker.date.anytime().toLocaleTimeString(),
              from_time: faker.date.anytime().toLocaleTimeString(),
              weight: faker.number.int({ min: 20, max: 40 }),
              bill_id: faker.helpers.arrayElement(bill_details_data).id,
            })
            .returning();
          //create request
          await db.insert(requests).values({
            package_id: faker.helpers.arrayElement(package_detail).id,
            current_status: faker.helpers.arrayElement([
              "requested",
              "confirmed",
              "picking",
              "shipping",
              "delivered",
              "cancelled",
              "rejected",
            ]),
            tracking_number: faker.number
              .int({
                min: 111111111111,
                max: 999999999999,
              })
              .toString(),
            requested_at: faker.date.recent({ days: 4 }),
            confirmed_at: faker.date.recent({ days: 3 }),
            picking_at: faker.date.recent({ days: 2 }),
            delivered_at: faker.date.recent(),
            cacelled_at: faker.date.recent(),
          });
          //inserting 3 images minimum
          await Promise.all(
            Array.from({ length: 3 }).map(() =>
              db.insert(package_image).values({
                image_url: faker.image.urlLoremFlickr({
                  category: "parcel",
                }),
                package_id: faker.helpers.arrayElement(package_detail).id,
              }),
            ),
          );
        }),
      );
    }),
  );
}

main()
  .then(() => console.log("Seed Completed Successful ✅"))
  .catch((e) => {
    console.log(e);
  })
  .finally(() => process.exit(0));
