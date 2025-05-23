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
            state: String(settlement.state),
            lga: String(settlement.lga),
            ward: String(settlement.ward),
            settlement: String(settlement.settlement),
          },
        });

        if (!existingRecord) {
          await prisma.enumerationSettlements.create({
            data: {
              state: String(settlement.state),
              lga: String(settlement.lga),
              ward: String(settlement.ward),
              settlement: String(settlement.settlement),
              teamCode: String(settlement.teamCode) || "",
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
