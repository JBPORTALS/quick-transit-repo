import { faker } from "@faker-js/faker";

import { db } from ".";
import { requests } from "./schema/request";
import { users } from "./schema/users";

async function main() {
  await db.delete(users);

  for (let i = 0; i < 10; i++) {
    await db.insert(users).values({
      name: faker.person.fullName(),
      phone_number: faker.phone.number(),
      role: faker.helpers.arrayElement(["manager", "customer", "partner"]),
    });
  }

  const usersData = await db.select().from(users);

  usersData.map(async (user) => {
    for (let i = 0; i < 5; i++) {
      await db.insert(requests).values({
        image_of_receipt: faker.image.url(),
        invoice_img: faker.image.url(),
        status: faker.helpers.arrayElement(["pending", "approved", "rejected"]),
        partner_id: user.id,
        sub_status: faker.helpers.arrayElement([
          "complete request",
          "complete ",
        ]),
      });
    }
  });
}

main()
  .then(() => console.log("Data has been seed ✅"))
  .catch(() => console.log("Something went wrong ❌"))
  .finally(() => process.exit(0));
