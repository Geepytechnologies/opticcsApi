"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const fs = require("fs");
const path = require("path");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
function seed() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const folderPath = path.join(__dirname, "data/settlements");
            const files = fs
                .readdirSync(folderPath)
                .filter((file) => file.endsWith(".json"));
            for (const file of files) {
                const filePath = path.join(folderPath, file);
                const data = fs.readFileSync(filePath, "utf8");
                const settlements = JSON.parse(data);
                for (const settlement of settlements) {
                    const existingRecord = yield prisma.enumerationSettlements.findFirst({
                        where: {
                            state: settlement.state,
                            lga: settlement.lga,
                            ward: settlement.ward,
                            settlement: settlement.settlement,
                        },
                    });
                    if (!existingRecord) {
                        yield prisma.enumerationSettlements.create({
                            data: {
                                state: settlement.state,
                                lga: settlement.lga,
                                ward: settlement.ward,
                                settlement: settlement.settlement,
                                teamCode: settlement.teamCode || "",
                            },
                        });
                        console.log(`Seeded: ${settlement.settlement} in ${settlement.ward}, ${settlement.lga}, ${settlement.state}`);
                    }
                    else {
                        console.log(`Skipped: ${settlement.settlement} already exists`);
                    }
                }
            }
            console.log("Seeding settlement completed.");
        }
        catch (error) {
            console.error("Error seeding data:", error);
        }
        finally {
            yield prisma.$disconnect();
        }
    });
}
seed();
