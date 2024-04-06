import { faker } from "@faker-js/faker";
import { db } from ".";
import { categories } from "./schema/categories";
import { notification } from "./schema/notification";
import { users } from "./schema/users";
import { address } from "./schema/address";
import { bill_details } from "./schema/bill_details";
import { packages } from "./schema/packages";
import { packages_images } from "./schema/packages_images";
import { requests } from "./schema/requests";
import { reviews } from "./schema/reviews";
import { post } from "./schema/post";


async function main() {
  // Clear existing data in the tables
  await Promise.all([
    db.delete(users),
    db.delete(notification),
    db.delete(categories),
    db.delete(address),
    db.delete(bill_details),
    db.delete(requests),
    db.delete(reviews),
    db.delete(packages_images),
    db.delete(address),
    db.delete(packages),
  ]);

  // Seed data into `users` table
  console.log("Seeding into `users` 🌱...");
  for (let i = 0; i < 10; i++) {
    await db.insert(users).values({
      name: faker.person.fullName(),
      phone_number: faker.phone.number(),
      role: faker.helpers.arrayElement(["manager", "customer", "partner"]),
    });
  }

  // Retrieve seeded users data
  const usersData = await db.select().from(users);

  // Seed data into `notification` table
  console.log("Seeding into `notification` 🌱...");
  await Promise.all(
    usersData.map(async (user) => {
      for (let i = 0; i < 5; i++) {
        await db.insert(notification).values({
          sub_text: faker.lorem.lines(1),
          text: faker.lorem.word(),
          notification_type: faker.helpers.arrayElement([
            "delivery",
            "package_assign",
            "package_rise",
          ]),
          user_id: user.id,
        });
      }
    }),
  );


  // Seed data into `categories` table
  console.log("Seeding into `categories` 🌱...");
  for (let i = 0; i < 5; i++) {
    await db.insert(categories).values({
      name: faker.person.fullName(),
    });
  }



  // Seed data into `address` table
  console.log("Seeding into `address` 🌱...");
  for (let i = 0; i < 5; i++) {
    await db.insert(address).values({
      name: faker.person.fullName(),
      phone_number: faker.phone.number(),
      address_line: faker.location.streetAddress(),
      city: faker.location.city(),
      pincode: faker.location.zipCode(),
      address_type: faker.helpers.arrayElement([
        "delivery",
        "package",
        "franchise"
      ]),
    });
  }

  // Seed data into `bill_details` table
  console.log("Seeding into `bill_details` 🌱...");
  for (let i = 0; i < 5; i++) {
    await db.insert(bill_details).values({
      service_charge: faker.finance.amount(),
      insurance_charge: faker.finance.amount(),
      gst_charges: faker.finance.amount()
    })
  }

  // // Seed data into `requests` table
  // console.log("Seeding into `requests` 🌱...");
  // for (let i = 0; i < 5; i++) {
  //   await db.insert(requests).values({
  //     image_of_receipt: faker.image.url(),
  //     invoice_img: faker.image.url(),
  //     sub_status: faker.helpers.arrayElement(["pickup", "genrate invoice", "verify Payment", "delivery package", "complete request"]),
  //     status: faker.helpers.arrayElement(["pending", "progress", "complete"]),
  //     createdAt: faker.date.past(),
  //   });
  // }



  // Retrieve seeded package data
  const packagesData = await db.select().from(packages);

  // Seed data into `requests` table
  console.log("Seeding into `requests` 🌱...");
  await Promise.all(
    usersData.map(async (user) => {
      for (let i = 0; i < 5; i++) {
        await db.insert(requests).values({
          partner_id: faker.helpers.arrayElement(usersData).id,
          image_of_receipt: faker.image.url(),
          invoice_img: faker.image.url(),
          sub_status: faker.helpers.arrayElement(["pickup", "genrate invoice", "verify Payment", "delivery package", "complete request"]),
          status: faker.helpers.arrayElement(["pending", "progress", "complete"]),
        });
      }
    })
  );



  // // Retrieve seeded package data
  // const packagesData = await db.select().from(packages);

  // // Seed data into `requests` table
  // console.log("Seeding into `requests` 🌱...");
  // await Promise.all(
  //   usersData.map(async (users) => {
  //     for (let i = 0; i < 5; i++) {
  //       await db.insert(requests).values({
  //         id: faker.helpers.arrayElement(packagesData).id,
  //         partner_id: users.id,
  //         image_of_receipt: faker.image.url(),
  //         invoice_img: faker.image.url(),
  //         sub_status: faker.helpers.arrayElement(["pickup", "genrate invoice", "verify Payment", "delivery package", "complete request"]),
  //         status: faker.helpers.arrayElement(["pending", "progress", "complete"]),
  //       });
  //     }
  //   })
  // );






  // Retrieve seeded request and user data
  const requestData = await db.select().from(requests);
  const userData = await db.select().from(users);

  // Seed data into `reviews` table
  console.log("Seeding into `reviews` 🌱...");
  await Promise.all(
    requestData.map(async (requests) => {
      for (let i = 0; i < 5; i++) {
        await db.insert(reviews).values({
          request_id: requests.id,
          users_id: faker.helpers.arrayElement(userData).id,
          text: faker.lorem.word(),
          ratings: faker.number.octal(),
        });
      }
    }),
  );



  // Retrieve seeded categories data
  const categoriesData = await db.select().from(categories);

  // Retrieve seeded address data
  const addressData = await db.select().from(address);

  // Retrieve seeded bill details data
  const billDetailsData = await db.select().from(bill_details);

  // Seed data into `packages` table
  console.log("Seeding into `packages` 🌱...");
  await Promise.all(
    usersData.map(async (user) => {
      for (let i = 0; i < 5; i++) {
        await db.insert(packages).values({
          title: faker.lorem.words(3),
          description: faker.lorem.sentence(),
          courier_service: faker.commerce.department(),
          dimensions: faker.database.column(),
          weight: faker.number.int() + "kg",
          category_id: faker.helpers.arrayElement(categoriesData).id,
          delivery_date: faker.date.future(),
          from_time: faker.date.future(),
          to_time: faker.date.future(),
          is_insurance_required: faker.datatype.boolean() ? "Yes" : "No",
          pick_up_address_id: faker.helpers.arrayElement(addressData).id,
          franchise_address_id: faker.helpers.arrayElement(addressData).id,
          destination_address_id: faker.helpers.arrayElement(addressData).id,
          bill_id: faker.helpers.arrayElement(billDetailsData).id,
          customer_id: user.id,
        });
      }
    }),
  );


  // Seed data into `post` table
  console.log("Seeding into `post` 🌱...");
  await Promise.all(
    usersData.map(async (user) => {
      for (let i = 0; i < 5; i++) {
        await db.insert(post).values({
          title: faker.lorem.words(3),
          content: faker.lorem.sentence(),
          createdAt: faker.date.past(),
          updatedAt: faker.date.recent(),
        });
      }
    }),
  );



   

  // // Seed data into `packages_images` table
  // console.log("Seeding into `packages_images` 🌱...");
  // await Promise.all(
  //   packagesData.map(async (packages) => {
  //     for (let i = 0; i < 3; i++) {
  //       await db.insert(packages_images).values({
  //         package_id: faker.helpers.arrayElement(packagesData).id,
  //         image_url: faker.image.url(),
  //       });
  //     }
  //   })
  // );










}
main()
  .then(() => console.log("Data has been seeded successfully ✅"))
  .catch((e) => console.log("Something went wrong ❌", e))
  .finally(() => process.exit(0));
