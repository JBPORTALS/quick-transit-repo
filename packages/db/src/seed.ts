import { faker } from "@faker-js/faker";

import { db } from ".";
import { users } from "./schema/users";

async function main() {
  for (let i = 0; i < 10; i++) {
    await db.insert(users).values({
      name: faker.person.fullName(),
      phone_number: faker.phone.number(),
      role: faker.helpers.arrayElement(["manager", "customer", "partner"]),
    });
  }
}

main()
  .then(() => console.log("Data has been seed ✅"))
  .catch(() => console.log("Something went wrong ❌"))
  .finally(() => process.exit(0));
