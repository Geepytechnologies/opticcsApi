// services/serviceDelivery.service.ts

import {
  CreateServiceDeliveryDto,
  ICreateReferralDTO,
} from "../interfaces/enumeration.interface";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const createServiceDelivery = async (
  data: CreateServiceDeliveryDto,
  submittedById: string
) => {
  return prisma.$transaction(async (tx) => {
    const serviceDelivery = await tx.enumerationServiceDelivery.create({
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
                  connectOrCreate: data.anc.commoditiesDispensed.map(
                    (name) => ({
                      where: { name },
                      create: { name },
                    })
                  ),
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
                  connectOrCreate: data.labour.commoditiesDispensed.map(
                    (name) => ({
                      where: { name },
                      create: { name },
                    })
                  ),
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

    if (data.anc?.dateOfNextAppointment) {
      schedulesToCreate.push({
        clientNumber: data.clientNumber,
        scheduleType: "anc",
        scheduleDate: new Date(data.anc.dateOfNextAppointment),
      });
    }

    if (data.pnc?.dateOfNextAppointment) {
      schedulesToCreate.push({
        clientNumber: data.clientNumber,
        scheduleType: "pnc",
        scheduleDate: new Date(data.pnc.dateOfNextAppointment),
      });
    }

    if (schedulesToCreate.length > 0) {
      await tx.enumerationClientSchedule.createMany({
        data: schedulesToCreate,
        skipDuplicates: true, // just in case of duplicate scheduleDates
      });
    }

    return serviceDelivery;
  });
};

export const getServiceDeliveriesByClientNumber = async (
  clientNumber: string
) => {
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
};

export const createReferralProcess = async (
  data: ICreateReferralDTO,
  submittedById: string
) => {
  return prisma.enumerationReferrals.create({
    data: {
      clientNumber: data.clientNumber,
      referredto: data.referredto,
      nameOfReferralFacility: data.nameOfReferralFacility,
      modeOfTransportation: data.modeOfTransportation,
      otherModeOfTransportation: data.otherModeOfTransportation ?? "",
      reasonForReferral: data.reasonForReferral,
      otherReasonForReferral: data.otherReasonForReferral ?? "",
      dateOfReferral: data.dateOfReferral,
      submittedBy: { connect: { userID: submittedById } },
    },
  });
};
export const getReferralsByClientNumber = async (clientNumber: string) => {
  return prisma.enumerationReferrals.findMany({
    where: { clientNumber },
  });
};

export const getSchedulesByClientNumber = async (clientNumber: string) => {
  return prisma.enumerationClientSchedule.findMany({
    where: { clientNumber },
  });
};

export const getEnumerationByClientNumber = async (clientNumber: string) => {
  return prisma.enumerationData.findMany({
    where: { clientNumber },
  });
};
