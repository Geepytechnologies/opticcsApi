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
exports.getEnumerationByClientNumber = exports.getSchedulesByClientNumber = exports.getReferralsByClientNumber = exports.createReferralProcess = exports.getServiceDeliveriesByClientNumber = exports.createServiceDelivery = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createServiceDelivery = (data, submittedById) => __awaiter(void 0, void 0, void 0, function* () {
    return prisma.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b;
        const serviceDelivery = yield tx.enumerationServiceDelivery.create({
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
                                    where: { name },
                                    create: { name },
                                })),
                            },
                            commoditiesDispensed: {
                                connectOrCreate: data.anc.commoditiesDispensed.map((name) => ({
                                    where: { name },
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
                                connectOrCreate: data.labour.commoditiesDispensed.map((name) => ({
                                    where: { name },
                                    create: { name },
                                })),
                            },
                            pregnancyOutcome: {
                                connectOrCreate: data.labour.pregnancyOutcome.map((name) => ({
                                    where: { result: name },
                                    create: { result: name },
                                })),
                            },
                            outcomeOfVisit: {
                                connectOrCreate: data.labour.outcomeOfVisit.map((name) => ({
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
                                connectOrCreate: data.others.outcomeOfVisit.map((name) => ({
                                    where: { outcome: name },
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
        // Schedule creation
        const schedulesToCreate = [];
        if ((_a = data.anc) === null || _a === void 0 ? void 0 : _a.dateOfNextAppointment) {
            schedulesToCreate.push({
                clientNumber: data.clientNumber,
                scheduleType: "anc",
                scheduleDate: new Date(data.anc.dateOfNextAppointment),
            });
        }
        if ((_b = data.pnc) === null || _b === void 0 ? void 0 : _b.dateOfNextAppointment) {
            schedulesToCreate.push({
                clientNumber: data.clientNumber,
                scheduleType: "pnc",
                scheduleDate: new Date(data.pnc.dateOfNextAppointment),
            });
        }
        if (schedulesToCreate.length > 0) {
            yield tx.enumerationClientSchedule.createMany({
                data: schedulesToCreate,
                skipDuplicates: true, // just in case of duplicate scheduleDates
            });
        }
        return serviceDelivery;
    }));
});
exports.createServiceDelivery = createServiceDelivery;
const getServiceDeliveriesByClientNumber = (clientNumber) => __awaiter(void 0, void 0, void 0, function* () {
    return prisma.enumerationServiceDelivery.findMany({
        where: { clientNumber },
        include: {
            anc: true,
            deliveryAndLabour: true,
            pnc: true,
            others: true,
            submittedBy: true, // optionally include who submitted
        },
    });
});
exports.getServiceDeliveriesByClientNumber = getServiceDeliveriesByClientNumber;
const createReferralProcess = (data, submittedById) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    return prisma.enumerationReferrals.create({
        data: {
            clientNumber: data.clientNumber,
            referredto: data.referredto,
            nameOfReferralFacility: data.nameOfReferralFacility,
            modeOfTransportation: data.modeOfTransportation,
            otherModeOfTransportation: (_a = data.otherModeOfTransportation) !== null && _a !== void 0 ? _a : "",
            reasonForReferral: data.reasonForReferral,
            otherReasonForReferral: (_b = data.otherReasonForReferral) !== null && _b !== void 0 ? _b : "",
            dateOfReferral: data.dateOfReferral,
            submittedBy: { connect: { userID: submittedById } },
        },
    });
});
exports.createReferralProcess = createReferralProcess;
const getReferralsByClientNumber = (clientNumber) => __awaiter(void 0, void 0, void 0, function* () {
    return prisma.enumerationReferrals.findMany({
        where: { clientNumber },
    });
});
exports.getReferralsByClientNumber = getReferralsByClientNumber;
const getSchedulesByClientNumber = (clientNumber) => __awaiter(void 0, void 0, void 0, function* () {
    return prisma.enumerationClientSchedule.findMany({
        where: { clientNumber },
    });
});
exports.getSchedulesByClientNumber = getSchedulesByClientNumber;
const getEnumerationByClientNumber = (clientNumber) => __awaiter(void 0, void 0, void 0, function* () {
    return prisma.enumerationData.findMany({
        where: { clientNumber },
    });
});
exports.getEnumerationByClientNumber = getEnumerationByClientNumber;
