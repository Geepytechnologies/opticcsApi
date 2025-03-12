const fs = require("fs");
const path = require("path");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function seed() {
  try {
    const folderPath = path.join(__dirname, "data/allsettlements");
    const files = fs
      .readdirSync(folderPath)
      .filter((file: string) => file.endsWith(".json"));

    for (const file of files) {
      const filePath = path.join(folderPath, file);
      const data = fs.readFileSync(filePath, "utf8");
      const settlements = JSON.parse(data);

      for (const settlement of settlements) {
        const existingRecord = await prisma.enumerationSettlements.findFirst({
          where: {
            state: settlement.state,
            lga: settlement.lga,
            ward: settlement.ward,
            settlement: settlement.settlement,
          },
        });

        if (!existingRecord) {
          await prisma.enumerationSettlements.create({
            data: {
              state: settlement.state,
              lga: settlement.lga,
              ward: settlement.ward,
              settlement: settlement.settlement,
              teamCode: settlement.teamCode || "",
            },
          });
          console.log(
            `Seeded: ${settlement.settlement} in ${settlement.ward}, ${settlement.lga}, ${settlement.state}`
          );
        } else {
          console.log(`Skipped: ${settlement.settlement} already exists`);
        }
      }
    }

    console.log("Seeding settlement completed.");
  } catch (error) {
    console.error("Error seeding data:", error);
  } finally {
    await prisma.$disconnect();
  }
}

seed();
