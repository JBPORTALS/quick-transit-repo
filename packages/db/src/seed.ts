import { faker } from "@faker-js/faker";

import { db } from ".";
import { notification } from "./schema/notification";
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

  await Promise.all(
    usersData.map(async (user) => {
      for (let i = 0; i < 5; i++) {
        await db.insert(notification).values({
          sub_text: faker.lorem.lines(1),
          text: faker.lorem.word(),
          type: faker.helpers.arrayElement([
            "delivery",
            "package_assign",
            "package_rise",
          ]),
          user_id: user.id,
        });
      }
    }),
  );
}

main()
  .then(() => console.log("Data has been seed ✅"))
  .catch((e) => console.log("Something went wrong ❌", e))
  .finally(() => process.exit(0));
