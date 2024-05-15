import { faker } from "@faker-js/faker";

import {
  address,
  bill_details,
  categories,
  couriers,
  db,
  getTableName,
  package_image,
  packages,
  sql,
  Table,
} from "./index";

if (!process.env.SEED_MODE)
  throw new Error("Not in a SEED MODE, set a SEED_MODE env variable ❌");

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

  // Insert fake data into the database
  console.log("Checking for existing users 🌱");
  const users = await db.query.user.findMany();
  if (!users) {
    throw new Error(
      "Please create a user data by signing in with Customer, Manager or Partner App ❌",
    );
  }

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
              service_charge: parseInt(
                faker.commerce.price({ min: 500, max: 1000 }),
              ),
              insurance_charge: parseInt(
                faker.commerce.price({ min: 200, max: 600 }),
              ),
              gst_charges: parseInt(
                faker.commerce.price({ min: 10, max: 100 }),
              ),
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
