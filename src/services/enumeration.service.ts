// services/serviceDelivery.service.ts

import { CreateServiceDeliveryDto } from "../interfaces/enumeration.interface";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const createServiceDelivery = async (
  data: CreateServiceDeliveryDto,
  submittedById: string
) => {
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
                connectOrCreate: data.labour?.commoditiesDispensed.map(
                  (name) => ({
                    where: { name: name },
                    create: { name: name },
                  })
                ),
              },
              pregnancyOutcome: {
                connectOrCreate: data.labour?.pregnancyOutcome.map((name) => ({
                  where: { result: name },
                  create: { result: name },
                })),
              },
              outcomeOfVisit: {
                connectOrCreate: data.labour?.outcomeOfVisit.map((name) => ({
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
                connectOrCreate: data.others?.outcomeOfVisit.map((name) => ({
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
};
