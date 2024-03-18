import { PoolConnection } from "mysql2/promise";
import { patientRepository } from "../repositories/PatientRepository";
import logger from "../logger";
import { firstvisitDTO } from "../entities/patient";

export class PatientService {
  private patientRepo: patientRepository;

  constructor(patientRepository: patientRepository) {
    this.patientRepo = patientRepository;
  }
  async checkIfPatientWithPhoneNumberExists(phone: string) {
    try {
      const result = await this.patientRepo.checkifpatientwithphonenumberexists(
        phone
      );
      if (Array.isArray(result[0])) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      logger.error({
        method: "checkIfPatientWithPhoneNumberExists",
        error: error,
      });
    }
  }

  async personalRecord(data: firstvisitDTO) {
    const patientexists = await this.checkIfPatientWithPhoneNumberExists(
      data.phone
    );
    if (!patientexists) {
      const result = await this.patientRepo.createPersonalrecord(data);
      return result;
    } else {
      throw new Error(`Patient with phone number ${data.phone} already exists`);
    }
  }
  async createPatientFirstvisit() {}
}
