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
  user,
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

  const addresses = await Promise.all(
    users.map(async (user) => {
      await Promise.all(
        Array.from({ length: 5 }).map(
          async () =>
            await db.insert(address).values({
              customerId: user.id,
              type: faker.helpers.arrayElement([
                "delivery",
                "franchise",
                "pickup",
              ]),
              phone: faker.helpers.fromRegExp("xxxxxxxxxx"),
              street: ` ${faker.location.buildingNumber()}, ${faker.location.streetAddress({ useFullAddress: true })},  ${faker.location.city()}`,
              pincode: parseInt(faker.location.zipCode("######")),
              city: faker.location.city(),
            }),
        ),
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
