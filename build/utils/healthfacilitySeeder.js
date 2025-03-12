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
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function healthfacilityseeder() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const filePath = path.join(__dirname, "data/Healthfacility-complete.json");
            const data = fs.readFileSync(filePath, "utf8");
            const hfs = JSON.parse(data);
            for (const hf of hfs) {
                const existingRecord = yield prisma.enumerationHealthfacilities.findFirst({
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
                });
                if (!existingRecord) {
                    yield prisma.enumerationHealthfacilities.create({
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
                }
                else {
                    console.log(`Skipped: ${hf.name} already exists`);
                }
            }
            console.log("Seeding healthfacility completed.");
        }
        catch (error) {
            console.error("Error seeding data:", error);
        }
        finally {
            yield prisma.$disconnect();
        }
    });
}
healthfacilityseeder();
