import { z } from "zod";

export const EnumerationUpdateSchema = z.object({
  clientNumber: z.string(),
  firstName: z.string().optional(),
  middleName: z.string().optional(),
  surName: z.string().optional(),
  phone: z.string().optional(),
  age: z.number().optional(),
  alternatePhone: z.string().optional(),
  address: z.string().optional(),
  state: z.string().optional(),
  lga: z.string().optional(),
  ward: z.string().optional(),
  settlement: z.string().optional(),
  servingHealthcareFacility: z.string().optional(),
  gravidity: z.string().optional(),
  parity: z.string().optional(),
  lmp: z.string().optional(),
  edd: z.string().optional(),
  ega: z.string().optional(),
  attendedAncVisit: z.string().optional(),
  numberOfAncVisits: z.number().optional(),
  ancVisits: z
    .array(
      z.object({
        anc: z.string(),
        date: z.string().datetime(),
      })
    )
    .optional(),
  receivedTetanusVaccination: z.string().optional(),
  tetanusVaccinationReceived: z
    .array(
      z.object({
        name: z.string(),
        date: z.string().datetime(),
      })
    )
    .optional(),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
});
