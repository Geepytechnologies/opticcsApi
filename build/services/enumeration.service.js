"use strict";
// services/serviceDelivery.service.ts
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
exports.createServiceDelivery = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createServiceDelivery = (data, submittedById) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    return prisma.enumerationServiceDelivery.create({
        data: {
            clientNumber: data.clientNumber,
            nameOfHealthFacility: data.nameOfHealthFacility,
            purposeOfVisit: data.purposeOfVisit,
            submittedBy: { connect: { userID: submittedById } },
            anc: data.anc
                ? {
                    create: {
                        dateOfVisit: data.anc.dateOfVisit,
                        ancVisit: data.anc.ancVisit,
                        dateOfNextAppointment: data.anc.dateOfNextAppointment,
                        servicesProvided: {
                            connectOrCreate: data.anc.servicesProvided.map((name) => ({
                                where: { name: name },
                                create: { name },
                            })),
                        },
                        commoditiesDispensed: {
                            connectOrCreate: data.anc.commoditiesDispensed.map((name) => ({
                                where: { name: name },
                                create: { name },
                            })),
                        },
                        outcomeOfVisit: {
                            connectOrCreate: data.anc.outcomeOfVisit.map((name) => ({
                                where: { outcome: name },
                                create: { outcome: name },
                            })),
                        },
                    },
                }
                : undefined,
            deliveryAndLabour: data.labour
                ? {
                    create: {
                        dateOfVisit: data.labour.dateOfVisit,
                        otherCommodities: data.labour.otherCommodities,
                        receivedMamaKit: data.labour.receivedMamaKit,
                        deliveryDate: data.labour.deliveryDate,
                        NumberOfNewBorn: data.labour.NumberOfNewBorn,
                        commoditiesDispensed: {
                            connectOrCreate: (_a = data.labour) === null || _a === void 0 ? void 0 : _a.commoditiesDispensed.map((name) => ({
                                where: { name: name },
                                create: { name: name },
                            })),
                        },
                        pregnancyOutcome: {
                            connectOrCreate: (_b = data.labour) === null || _b === void 0 ? void 0 : _b.pregnancyOutcome.map((name) => ({
                                where: { result: name },
                                create: { result: name },
                            })),
                        },
                        outcomeOfVisit: {
                            connectOrCreate: (_c = data.labour) === null || _c === void 0 ? void 0 : _c.outcomeOfVisit.map((name) => ({
                                where: { outcome: name },
                                create: { outcome: name },
                            })),
                        },
                    },
                }
                : undefined,
            pnc: data.pnc
                ? {
                    create: {
                        dateOfVisit: data.pnc.dateOfVisit,
                        detailsOfVisit: data.pnc.detailsOfVisit,
                        dateOfNextAppointment: data.pnc.dateOfNextAppointment,
                        outcomeOfVisit: {
                            connectOrCreate: data.pnc.outcomeOfVisit.map((name) => ({
                                where: { outcome: name },
                                create: { outcome: name },
                            })),
                        },
                    },
                }
                : undefined,
            others: data.others
                ? {
                    create: {
                        dateOfVisit: data.others.dateOfVisit,
                        detailsOfVisit: data.others.detailsOfVisit,
                        outcomeOfVisit: {
                            connectOrCreate: (_d = data.others) === null || _d === void 0 ? void 0 : _d.outcomeOfVisit.map((name) => ({
                                where: { outcome: name }, // Replace 'uniqueField' with the actual unique field in your schema
                                create: { outcome: name },
                            })),
                        },
                    },
                }
                : undefined,
        },
        include: {
            anc: true,
            deliveryAndLabour: true,
            pnc: true,
            others: true,
        },
    });
});
exports.createServiceDelivery = createServiceDelivery;
