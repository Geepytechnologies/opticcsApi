const { PrismaClient } = require("@prisma/client");
const fs = require("fs");
const path = require("path");

const prisma = new PrismaClient();

async function seed() {
  try {
    // Read the JSON file
    const filePath = path.join(__dirname, "settlement.json");
    const data = fs.readFileSync(filePath, "utf8");
    const settlements = JSON.parse(data);

    // Seed the data into the database
    for (const settlement of settlements) {
      await prisma.enumerationSettlements.create({
        data: {
          state: settlement.state,
          lga: settlement.lga,
          ward: settlement.ward,
          settlement: settlement.settlement,
          teamCode: settlement.teamCode || "",
        },
      });
    }

    console.log("Data seeded successfully");
  } catch (error) {
    console.error("Error seeding data:", error);
  } finally {
    await prisma.$disconnect();
  }
}

seed();
