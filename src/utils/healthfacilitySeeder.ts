const fs = require("fs");
const path = require("path");
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function healthfacilityseeder() {
  try {
    const filePath = path.join(__dirname, "data/Healthfacility-complete.json");
    const data = fs.readFileSync(filePath, "utf8");
    const hfs = JSON.parse(data);

    for (const hf of hfs) {
      const existingRecord = await prisma.enumerationHealthfacilities.findFirst(
        {
          where: {
            state: hf.state,
            lga: hf.lga,
            ward: hf.wards,
            facilityName: hf.name,
            geocoordinate: hf.geocoordinate,
            latitude: String(hf.latitude) || "",
            longitude: String(hf.longitude) || "",
            altitude: String(hf.altitude) || "",
            precision: String(hf.precision) || "",
          },
        }
      );

      if (!existingRecord) {
        await prisma.enumerationHealthfacilities.create({
          data: {
            state: hf.state || "",
            lga: hf.lga || "",
            ward: hf.wards || "",
            facilityName: hf.name || "",
            geocoordinate: hf.geocoordinate || "",
            latitude: String(hf.latitude) || "",
            longitude: String(hf.longitude) || "",
            altitude: String(hf.altitude) || "",
            precision: String(hf.precision) || "",
          },
        });
        console.log(`Seeded: ${hf.state} in ${hf.ward}, ${hf.lga}, ${hf.name}`);
      } else {
        console.log(`Skipped: ${hf.name} already exists`);
      }
    }

    console.log("Seeding healthfacility completed.");
  } catch (error) {
    console.error("Error seeding data:", error);
  } finally {
    await prisma.$disconnect();
  }
}

healthfacilityseeder();
