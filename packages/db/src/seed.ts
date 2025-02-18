import { faker } from "@faker-js/faker";
import { createClient } from "@supabase/supabase-js";

import {
  address,
  bill_details,
  categories,
  couriers,
  db,
  eq,
  getTableName,
  packages,
  requests,
  reviews,
  sql,
  Table,
  timeslots,
  user,
} from "./index";

if (!process.env.SEED_MODE)
  throw new Error("Not in a SEED MODE, set a SEED_MODE env variable ❌");

if (!process.env.NEXT_PUBLIC_SUPABASE_URL)
  throw new Error("set a SHALLOW_SUPABASE_URL env variable ❌");

if (!process.env.SUPABASE_SERVICE_ROLE_KEY)
  throw new Error("set a SHALLOW_SUPABASE_SERVICE_ROLE_KEY env variable ❌");

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
  const query =
  `DO $$
    BEGIN
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_name = '${getTableName(table)}') THEN
    TRUNCATE TABLE ${getTableName(table)} RESTART IDENTITY CASCADE;
    END IF;
  END $$;`;
  return db.execute(sql.raw(query));
}

async function main() {
  console.log("Reset the tables 🧹");
  for (const table of [
    packages,
    bill_details,
    timeslots,
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
          picture: faker.image.urlLoremFlickr({
            category: "people",
            width: 100,
            height: 100,
          }),
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
            pincode: faker.location.zipCode("######"),
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
      { name: "Essential Shipments" },
      { name: "Liquid Non-Dg chemicals" },
      { name: "Solid Chemicals" },
      { name: "Consumer Electronics & Accessories" },
      { name: "Gift Items & Personal Effects" },
      { name: "Auto Components & Machine Parts" },
      { name: "Electrical Equipement" },
      { name: "Paper Based Material" },
      { name: "Consumer Eelectronics & Accessories" },
      { name: "Agricultural / Horticultural Items" },
      { name: "House Hold Items" },
      { name: "Others" },
    ]);

  console.log("Seeding into `couriers` 🌱");
  await db
    .insert(couriers)
    .values([{ name: "DTDC" }, { name: "Delhivery.com" }]);
  
    console.log("Seeding into `timeslots` 🌱");
    await db
      .insert(timeslots)
    .values([
      { from_time:"9:30",to_time:"10:30" },
      { from_time:"12:30",to_time:"13:30" },
      { from_time:"14:30",to_time:"18:30" }
    ]);
  
  console.log("Seeding into `Pakages` 🌱");
  const addresses = await db.query.address.findMany();
  const categories_data = await db.query.categories.findMany();
  const couriers_data = await db.query.couriers.findMany();
  const timeslots_data = await db.query.timeslots.findMany();
  const partners = await db.query.user.findMany({
    where: (col, opt) => opt.eq(col.role, "partner"),
  });

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

          const status = faker.helpers.arrayElement<
            typeof requests.$inferInsert.current_status
          >(["requested", "confirmed", "pickedup", "delivered", "cancelled"]);

          const package_detail = await db
            .insert(packages)
            .values({
              customer_id: user.id,
              title: faker.commerce.productName(),
              description: faker.commerce.productDescription(),
              pick_up_address_id: faker.helpers.arrayElement(addresses).id,
              destination_address_id: faker.helpers.arrayElement(addresses).id,
              category_id: faker.helpers.arrayElement(categories_data).id,
              is_insurance_required: faker.helpers.arrayElement([true, false]),
              height: faker.number.int({ min: 20, max: 40 }),
              width: faker.number.int({ min: 20, max: 40 }),
              breadth: faker.number.int({ min: 20, max: 40 }),
              courier_id: faker.helpers.arrayElement(couriers_data).id,
              pickup_date: faker.date.future(),
              weight: faker.number.int({ min: 20, max: 40 }),
              bill_id: faker.helpers.arrayElement(bill_details_data).id,
              created_at: faker.date.between({
                from: "2024-06-01T00:00:00.000Z",
                to: "2024-06-30T00:00:00.000Z",
              }),
              timeslot_id: faker.helpers.arrayElement(timeslots_data).id
            })
            .returning();
          //create request
          await db.insert(requests).values({
            package_id: faker.helpers.arrayElement(package_detail).id,
            current_status: status,
            partner_id:
              status !== "requested"
                ? faker.helpers.arrayElement(partners).id
                : null,

            tracking_number: faker.number
              .int({
                min: 111111111111,
                max: 999999999999,
              })
              .toString(),
            one_time_code: faker.finance.pin(6),
            is_verified:
              status === "requested" || status === "confirmed" ? false : true,
            requested_at: [
              "requested",
              "confirmed",
              "pickedup",
              "delivered",
              "cancelled",
              "rejected",
            ].includes(status ?? "")
              ? faker.date.recent({ days: 4 })
              : null,
            confirmed_at: ["pickedup", "delivered", "confirmed"].includes(
              status ?? "",
            )
              ? faker.date.recent({ days: 3 })
              : null,
            picked_at: ["pickedup", "delivered"].includes(status ?? "")
              ? faker.date.recent({ days: 2 })
              : null,
            delivered_at: status === "delivered" ? faker.date.recent() : null,
            cacelled_at: faker.date.recent(),
          });
          
        }),
      );
    }),
  );

  console.log("Seeding into `Reviews` 🌱");
  const allRequests = await db.query.requests.findMany({
    where: eq(requests.current_status, "delivered"),
  });

  //console.log("Delivered Requests:", allRequests);

  await Promise.all(
    allRequests.map(async (request) => {
      await db.insert(reviews).values({
        request_id: request.id,
        type: faker.helpers.arrayElement(["partner", "application"]),
        rating: faker.number.int({ min: 1, max: 5 }),
        comment: faker.lorem.sentence(),
        review_date: faker.date.recent(),
      });
    }),
  );

  //console.log("Reviews have been successfully inserted.");
}

main()
  .then(() => console.log("Seed Completed Successful ✅"))
  .catch((e) => {
    console.log(e);
  })
  .finally(() => process.exit(0));
