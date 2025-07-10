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
    console.log({ createServiceDelivery: data });
    const serviceDelivery = await tx.enumerationServiceDelivery.create({
      data: {
        clientNumber: data.clientNumber,
        nameOfHealthFacility: data.nameOfHealthFacility,
        howclientcametoseekcareatfacility:
          data.howclientcametoseekcareatfacility,
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
                whatNumberIsThisVisit: data.pnc.whatNumberIsThisVisit,
                whatServicesWereProvided: data.pnc.whatServicesWereProvided,
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
                purposeOfUnscheduledVisit:
                  data.others.purposeOfUnscheduledVisit,
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
export async function getUnifiedServiceDeliveryData(filters: {
  state?: string;
  lga?: string;
  ward?: string;
  settlement?: string;
  servingHealthcareFacility?: string;
}) {
  // First get the filtered client numbers
  const enumerationDataWhere = {
    ...(filters.state && {
      state: {
        equals: filters.state.trim(),
        mode: "insensitive", // Makes the comparison case-insensitive
      },
    }),
    ...(filters.lga && {
      lga: {
        equals: filters.lga.trim(),
        mode: "insensitive",
      },
    }),
    ...(filters.ward && {
      ward: {
        equals: filters.ward.trim(),
        mode: "insensitive",
      },
    }),
    ...(filters.settlement && {
      settlement: {
        equals: filters.settlement.trim(),
        mode: "insensitive",
      },
    }),
    ...(filters.servingHealthcareFacility && {
      servingHealthcareFacility: {
        equals: filters.servingHealthcareFacility.trim(),
        mode: "insensitive",
      },
    }),
  };

  const clientNumbers = await prisma.enumerationData.findMany({
    where: enumerationDataWhere,
    select: { clientNumber: true },
  });

  // Then get the service deliveries with related data
  const serviceDeliveries = await prisma.enumerationServiceDelivery.findMany({
    where: {
      clientNumber: {
        in: clientNumbers.map((c) => c.clientNumber),
      },
    },
    select: {
      id: true,
      clientNumber: true,
      nameOfHealthFacility: true,
      howclientcametoseekcareatfacility: true,
      purposeOfVisit: true,
      anc: {
        select: {
          dateOfVisit: true,
          dateOfNextAppointment: true,
          servicesProvided: {
            select: {
              name: true,
            },
          },
          commoditiesDispensed: {
            select: {
              name: true,
            },
          },
          outcomeOfVisit: {
            select: {
              outcome: true,
            },
          },
        },
      },
      deliveryAndLabour: {
        select: {
          dateOfVisit: true,
          otherCommodities: true,
          receivedMamaKit: true,
          deliveryDate: true,
          NumberOfNewBorn: true,
          commoditiesDispensed: {
            select: {
              name: true,
            },
          },
          pregnancyOutcome: {
            select: {
              result: true,
            },
          },
          outcomeOfVisit: {
            select: {
              outcome: true,
            },
          },
        },
      },
      pnc: {
        select: {
          dateOfNextAppointment: true,
          dateOfVisit: true,
          detailsOfVisit: true,
          whatServicesWereProvided: true,
          whatNumberIsThisVisit: true,
          outcomeOfVisit: {
            select: {
              outcome: true,
            },
          },
        },
      },
      others: {
        select: {
          purposeOfUnscheduledVisit: true,
          dateOfVisit: true,
          detailsOfVisit: true,
          outcomeOfVisit: {
            select: {
              outcome: true,
              others: {
                select: {
                  purposeOfUnscheduledVisit: true,
                  dateOfVisit: true,
                  detailsOfVisit: true,
                },
              },
            },
          },
        },
      },
      submittedBy: {
        select: {
          name: true,
          phone: true,
          state: true,
          lga: true,
          ward: true,
          settlement: true,
          healthFacility: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });

  // Finally, combine the data
  return Promise.all(
    serviceDeliveries.map(async (delivery) => {
      const enumerationData = await prisma.enumerationData.findUnique({
        where: { clientNumber: delivery.clientNumber },
      });
      return {
        ...delivery,
        //enumerationData,
      };
    })
  );
}
export const getServiceDeliveriesByClientNumber = async (
  clientNumber: string
) => {
  return prisma.enumerationServiceDelivery.findMany({
    where: { clientNumber },
    include: {
      submittedBy: true,
      anc: {
        include: {
          servicesProvided: true,
          commoditiesDispensed: true,
          outcomeOfVisit: true,
        },
      },
      deliveryAndLabour: {
        include: {
          commoditiesDispensed: true,
          pregnancyOutcome: true,
          outcomeOfVisit: true,
        },
      },
      pnc: {
        include: {
          outcomeOfVisit: true,
        },
      },
      others: {
        include: {
          outcomeOfVisit: true,
        },
      },
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
      referredto: data.referredTo,
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
