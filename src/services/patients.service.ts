import { PoolConnection, RowDataPacket } from "mysql2/promise";
import { patientRepository } from "../repositories/PatientRepository";
import logger from "../logger";
import { firstvisitDTO, returnvisitDTO } from "../entities/patient";

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
        if (result[0].length) {
          return true;
        } else {
          return false;
        }
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
  async createpatient(data: firstvisitDTO, personalinformation_id: string) {
    const result = await this.patientRepo.createpatient(
      data,
      personalinformation_id
    );
    return result;
  }
  async createfirstvisitdata(data: firstvisitDTO, patient_id: string) {
    const result = await this.patientRepo.createfirstvisit(data, patient_id);
    return result;
  }
  async createdailyhabit(data: firstvisitDTO, firstvisit_id: string) {
    const result = await this.patientRepo.createdailyhabit(data, firstvisit_id);
    return result;
  }
  async createobstetric(data: firstvisitDTO, firstvisit_id: string) {
    const result = await this.patientRepo.createobstetric(data, firstvisit_id);
    return result;
  }
  async createmedicationHistory(data: firstvisitDTO, firstVisit_id: string) {
    const result = await this.patientRepo.createmedicalhistory(
      data,
      firstVisit_id
    );
    return result;
  }

  async createpastmedicalHistory(data: firstvisitDTO, firstvisit_id: string) {
    const result = await this.patientRepo.createpastmedicalhistory(
      data,
      firstvisit_id
    );
    return result;
  }
  async createfamilyHistory(data: firstvisitDTO, firstvisit_id: string) {
    const result = await this.patientRepo.createfamilyhistory(
      data,
      firstvisit_id
    );
    return result;
  }
  async createdrugHistory(data: firstvisitDTO, firstvisit_id: string) {
    const result = await this.patientRepo.createdrughistory(
      data,
      firstvisit_id
    );
    return result;
  }
  async createphysicalexamination(data: firstvisitDTO, firstvisit_id: string) {
    const result = await this.patientRepo.createphysicalexamination(
      data,
      firstvisit_id
    );
    return result;
  }
  async getnewlycreatedpatientrecord(patient_id: string) {
    const result = await this.patientRepo.getnewlycreatedpatientrecord(
      patient_id
    );
    return result;
  }

  async createPatientFirstvisit(data: firstvisitDTO) {
    try {
      const createdrecord: any = await this.personalRecord(data);
      const personalInformation_id = createdrecord[0].insertId;
      const patientcreate: any = await this.createpatient(
        data,
        personalInformation_id
      );
      const patientID = patientcreate[0].insertId;
      const firstvisitcreation: any = await this.createfirstvisitdata(
        data,
        patientID
      );
      const firstvisitID = firstvisitcreation[0].insertId;

      await this.createpastmedicalHistory(data, firstvisitID);
      await this.createfamilyHistory(data, firstvisitID);
      await this.createdailyhabit(data, firstvisitID);
      await this.createobstetric(data, firstvisitID);
      await this.createmedicationHistory(data, firstvisitID);
      await this.createdrugHistory(data, firstvisitID);
      await this.createphysicalexamination(data, firstvisitID);

      return patientID;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async createPatientReturnvisit(data: returnvisitDTO) {
    const patientexists =
      await this.patientRepo.checkIfPatientRecordExistsInReturnvisit(
        data.patient_id
      );
    const anc: any = patientexists.lastanc;

    if (patientexists.value) {
      const result = await this.patientRepo.createReturnVisitWithANC(data, anc);
      return result;
    } else {
      const result = await this.patientRepo.createReturnVisit(data);
      return result;
    }
  }
}
