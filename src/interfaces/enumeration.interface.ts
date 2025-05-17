export interface Filters {
  state?: string;
  lga?: string;
  ward?: string;
  settlement?: string;
  createdAt?: { gte: Date };
}

export interface QueryParams {
  state?: string;
  lga?: string;
  ward?: string;
  settlement?: string;
  createdAt?: string;
  pageNumber?: string;
  pageSize?: string;
}

// dto/CreateServiceDeliveryDto.ts
export interface CreateServiceDeliveryDto {
  clientNumber: string;
  nameOfHealthFacility: string;
  purposeOfVisit: string;
  anc?: {
    dateOfVisit: Date;
    ancVisit: string;
    servicesProvided: string[]; // FK IDs
    commoditiesDispensed: string[];
    outcomeOfVisit: string[];
    dateOfNextAppointment: Date;
  };

  labour?: {
    dateOfVisit: Date;
    commoditiesDispensed: string[];
    otherCommodities: string;
    receivedMamaKit: string;
    pregnancyOutcome: string[];
    deliveryDate: Date;
    NumberOfNewBorn: number;
    outcomeOfVisit: string[];
  };

  pnc?: {
    dateOfVisit: Date;
    detailsOfVisit: string;
    outcomeOfVisit: string[];
    dateOfNextAppointment: Date;
  };

  others?: {
    dateOfVisit: Date;
    detailsOfVisit: string;
    outcomeOfVisit: string[];
  };
}
