// const { PrismaClient } = require("@prisma/client");
// const { faker } = require("@faker-js/faker");

// const prisma = new PrismaClient();

// const createSlug = (text) => {
//   return text
//     .toLowerCase()
//     .replace(/ /g, "-")
//     .replace(/[^\w-]+/g, "");
// };

// // --- Data Pools for Seeding ---
// const badgePool = [
//   "LOW_KMS",
//   "PREMIUM",
//   "RARE_FIND",
//   "MINT_CONDITION",
//   "CUSTOM_BUILD",
//   "ONE_OWNER",
// ];
// const tuningStagePool = ["STAGE1", "STAGE2", "STAGE3"];
// const collectionTypePool = ["YBT", "DESIGNER", "WORKSHOP", "TORQUE_TUNER"];

// // --- Main Seeding Function ---
// async function main() {
//   console.log("🌱 Starting the comprehensive seeding process...");

//   // 1. CLEAR DATABASE
//   console.log("🗑️  Clearing previous data...");
//   // await prisma.car.deleteMany({});
//   // await prisma.workshop.deleteMany({});
//   // await prisma.designer.deleteMany({});
//   // await prisma.dealer.deleteMany({});

//   // 2. SEED DEALERS
//   console.log("🤵 Seeding Dealers...");
//   const dealersToCreate = [];
//   for (let i = 0; i < 5; i++) {
//     const companyName = faker.company.name();
//     dealersToCreate.push({
//       name: `${companyName} Motors`,
//       email: faker.internet.email({ firstName: companyName.split(" ")[0] }),
//       phone: faker.phone.number(),
//       address: faker.location.streetAddress(),
//       city: faker.location.city(),
//       state: faker.location.state(),
//     });
//   }
//   await prisma.dealer.createMany({ data: dealersToCreate });
//   const dealers = await prisma.dealer.findMany();
//   const dealerIds = dealers.map((d) => d.id);
//   console.log(`✅ Seeded ${dealers.length} dealers.`);

//   // 3. SEED DESIGNERS
//   console.log("🎨 Seeding Designers...");
//   const designersToCreate = [];
//   for (let i = 0; i < 3; i++) {
//     const name = faker.person.fullName();
//     designersToCreate.push({
//       name: name,
//       slug: createSlug(name),
//       title: faker.person.jobTitle(),
//       description: faker.lorem.paragraph(),
//       image: faker.image.avatar(),
//       stats: {
//         projects: faker.number.int({ min: 10, max: 150 }),
//         experience: faker.number.int({ min: 10, max: 25 }),
//         awards: faker.number.int({ min: 5, max: 15 }),
//       },
//     });
//   }
//   await prisma.designer.createMany({ data: designersToCreate });
//   const designers = await prisma.designer.findMany();
//   const designerIds = designers.map((d) => d.id);
//   console.log(`✅ Seeded ${designers.length} designers.`);

//   // 4. SEED WORKSHOPS
//   console.log("🔧 Seeding Workshops...");
//   const workshopsToCreate = [];
//   for (let i = 0; i < 4; i++) {
//     const name = `${faker.company.name()} Auto Works`;
//     workshopsToCreate.push({
//       name: name,
//       slug: createSlug(name),
//       title: "Certified Performance Center",
//       description: faker.lorem.paragraphs(2),
//       image: faker.image.urlLoremFlickr({ category: "technics" }),
//       stats: {
//         projects: faker.number.int({ min: 10, max: 150 }),
//         experience: faker.number.int({ min: 10, max: 25 }),
//         specialists: faker.number.int({ min: 10, max: 150 }),
//       },
//     });
//   }
//   await prisma.workshop.createMany({ data: workshopsToCreate });
//   const workshops = await prisma.workshop.findMany();
//   const workshopIds = workshops.map((w) => w.id);
//   console.log(`✅ Seeded ${workshops.length} workshops.`);

//   // 5. SEED CARS
//   console.log("\n🚗 Seeding Cars with consistent data...");
//   const numberOfCars = 100;
//   const carsToCreate = [];
//   const carImagePool = [
//     "https://images.unsplash.com/photo-1503376780353-7e6692767b70",
//     "https://images.unsplash.com/photo-1502877338535-766e1452684a",
//   ];

//   for (let i = 0; i < numberOfCars; i++) {
//     const brand = faker.vehicle.manufacturer();
//     const model = faker.vehicle.model();
//     const carImages = faker.helpers.arrayElements(carImagePool, {
//       min: 2,
//       max: 5,
//     });

//     // ✨ NEW: Logic to ensure collection data is consistent
//     const collectionType = faker.helpers.arrayElement(collectionTypePool);
//     let designerId = null;
//     let workshopId = null;
//     let tuningStage = null;

//     switch (collectionType) {
//       case "DESIGNER":
//         designerId = faker.helpers.arrayElement(designerIds);
//         break;
//       case "WORKSHOP":
//         workshopId = faker.helpers.arrayElement(workshopIds);
//         break;
//       case "TORQUE_TUNER":
//         tuningStage = faker.helpers.arrayElement(tuningStagePool);
//         break;
//       // For 'YBT' and other types, all special fields remain null
//     }

//     const carData = {
//       // --- Relations (now consistent) ---
//       dealerId: faker.helpers.arrayElement(dealerIds),
//       designerId,
//       workshopId,

//       // --- Core Info ---
//       title: `${brand} ${model}`,
//       description: faker.lorem.paragraph(),
//       status: faker.helpers.arrayElement([
//         "AVAILABLE",
//         "SOLD",
//         "PENDING",
//         "RESERVED",
//       ]),
//       collectionType,

//       // --- ✨ NEWLY ADDED FIELDS ✨ ---
//       tuningStage,
//       badges: faker.helpers.arrayElements(badgePool, { min: 0, max: 2 }),

//       // --- Other fields... ---
//       sellingPrice: parseFloat(
//         faker.commerce.price({ min: 500000, max: 5000000 })
//       ),
//       cutOffPrice: parseFloat(
//         faker.commerce.price({ min: 450000, max: 4800000 })
//       ),
//       ybtPrice: parseFloat(faker.commerce.price({ min: 480000, max: 4900000 })),
//       registrationYear: faker.date.past({ years: 10 }).getFullYear(),
//       registrationNumber: `${faker.location.state({
//         abbreviated: true,
//       })}${faker.string.numeric(2)}${faker.string
//         .alpha(2)
//         .toUpperCase()}${faker.string.numeric(4)}`,
//       kmsDriven: faker.number.int({ min: 10000, max: 150000 }),
//       brand,
//       city: faker.location.city(),
//       engine: `${faker.number.int({ min: 1000, max: 5000 })} cc`,
//       thumbnail: carImages[0],
//       carImages,
//     };
//     carsToCreate.push(carData);
//   }

//   await prisma.car.createMany({ data: carsToCreate });
//   console.log(`✅ Seeded ${carsToCreate.length} cars.`);
// }

// // --- Execute the Main Function ---
// main()
//   .catch((e) => {
//     console.error("💥 FAILED TO SEED DATABASE:", e);
//     process.exit(1);
//   })
//   .finally(async () => {
//     console.log("\n👋 Seeding finished. Disconnecting Prisma Client.");
//     await prisma.$disconnect();
//   });
///////////////////////////////////////////////////////////////////////////////////
const { PrismaClient } = require("@prisma/client");
const { faker } = require("@faker-js/faker");

const prisma = new PrismaClient();

// --- Data Pools for Seeding ---
const badgePool = [
  "LOW_KMS",
  "RARE_FIND",
  "MINT_CONDITION",
  "CUSTOM_BUILD",
  "ONE_OWNER",
];
const bikeBrandPool = [
  "Royal Enfield",
  "Harley-Davidson",
  "Ducati",
  "BMW",
  "Kawasaki",
  "Yamaha",
];
const bikeSpecPool = [
  "Dual-Channel ABS",
  "LED Lighting",
  "Slipper Clutch",
  "Ride-by-Wire",
  "Quick Shifter",
];
const bikeImagePool = [
  "https://images.unsplash.com/photo-1558981403-c5f9899a28bc",
  "https://images.unsplash.com/photo-1625043834839-a8a5a1907a3c",
];

// --- Main Seeding Function ---
async function main() {
  console.log("🌱 Starting the additive seeding process for bikes...");

  // This script is additive. To clear bike data first, uncomment the line below:
  // await prisma.bike.deleteMany({});

  // 1. ENSURE YBT DEALER EXISTS
  // =============================================
  console.log("🤵 Ensuring 'YBT Superbikes' dealer exists...");
  const ybtDealerName = "YBT";
  // ✨ MODIFICATION: Use upsert to create the specific YBT dealer if it doesn't exist
  await prisma.dealer.upsert({
    where: { name: ybtDealerName },
    update: {},
    create: {
      name: ybtDealerName,
      city: "Pune",
      state: "Maharashtra",
      email: "contact@ybt.com",
      phone: faker.phone.number(),
      address: faker.location.streetAddress(),
    },
  });

  // 2. FETCH THE YBT DEALER ID
  // =============================================
  const ybtDealer = await prisma.dealer.findUnique({
    where: { name: ybtDealerName },
  });

  if (!ybtDealer) {
    console.error("💥 Could not find or create the YBT Dealer. Exiting.");
    process.exit(1);
  }
  console.log(`✅ Found YBT Dealer (ID: ${ybtDealer.id}) to link bikes to.`);

  // 3. SEED BIKES
  // =============================================
  console.log("\n🏍️  Seeding Bikes...");
  const numberOfBikes = 50;
  const bikesToCreate = [];

  for (let i = 0; i < numberOfBikes; i++) {
    const brand = faker.helpers.arrayElement(bikeBrandPool);
    const model = faker.vehicle.model();
    const bikeImages = faker.helpers.arrayElements(bikeImagePool, {
      min: 1,
      max: 3,
    });

    const bikeData = {
      // ✨ MODIFICATION: Assign all bikes to the specific YBT Dealer ID
      dealerId: ybtDealer.id,

      // --- Core Info ---
      title: `${brand} ${model}`,
      description: faker.lorem.paragraph(),
      status: faker.helpers.arrayElement(["AVAILABLE", "SOLD", "PENDING"]),
      collectionType: "YBT",
      brand,
      bikeUSP: faker.lorem.sentence(),
      ybtPrice: parseFloat(faker.commerce.price({ min: 80000, max: 1500000 })),
      registrationYear: faker.date.past({ years: 8 }).getFullYear(),
      registrationNumber: `MH${faker.string.numeric(2)}${faker.string
        .alpha(2)
        .toUpperCase()}${faker.string.numeric(4)}`,
      kmsDriven: faker.number.int({ min: 5000, max: 90000 }),
      badges: faker.helpers.arrayElements(badgePool, { min: 0, max: 2 }),
      specs: faker.helpers.arrayElements(bikeSpecPool, { min: 1, max: 3 }),
      engine: `${faker.number.int({ min: 150, max: 1200 })} cc`,
      thumbnail: bikeImages[0],
      bikeImages,
    };
    bikesToCreate.push(bikeData);
  }

  await prisma.bike.createMany({ data: bikesToCreate, skipDuplicates: true });
  console.log(
    `✅ Added ${numberOfBikes} new bikes to the database, all linked to YBT.`
  );
}

// --- Execute the Main Function ---
main()
  .catch((e) => {
    console.error("💥 FAILED TO SEED DATABASE:", e);
    process.exit(1);
  })
  .finally(async () => {
    console.log("\n👋 Seeding finished. Disconnecting Prisma Client.");
    await prisma.$disconnect();
  });
