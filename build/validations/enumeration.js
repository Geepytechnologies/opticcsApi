"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnumerationUpdateSchema = void 0;
const zod_1 = require("zod");
exports.EnumerationUpdateSchema = zod_1.z.object({
    clientNumber: zod_1.z.string(),
    firstName: zod_1.z.string().optional(),
    middleName: zod_1.z.string().optional(),
    surName: zod_1.z.string().optional(),
    phone: zod_1.z.string().optional(),
    age: zod_1.z.number().optional(),
    alternatePhone: zod_1.z.string().optional(),
    address: zod_1.z.string().optional(),
    state: zod_1.z.string().optional(),
    lga: zod_1.z.string().optional(),
    ward: zod_1.z.string().optional(),
    settlement: zod_1.z.string().optional(),
    servingHealthcareFacility: zod_1.z.string().optional(),
    gravidity: zod_1.z.string().optional(),
    parity: zod_1.z.string().optional(),
    lmp: zod_1.z.string().optional(),
    edd: zod_1.z.string().optional(),
    ega: zod_1.z.string().optional(),
    attendedAncVisit: zod_1.z.string().optional(),
    numberOfAncVisits: zod_1.z.number().optional(),
    ancVisits: zod_1.z
        .array(zod_1.z.object({
        anc: zod_1.z.string(),
        date: zod_1.z.string().datetime(),
    }))
        .optional(),
    receivedTetanusVaccination: zod_1.z.string().optional(),
    tetanusVaccinationReceived: zod_1.z
        .array(zod_1.z.object({
        name: zod_1.z.string(),
        date: zod_1.z.string().datetime(),
    }))
        .optional(),
    latitude: zod_1.z.number().optional(),
    longitude: zod_1.z.number().optional(),
});
