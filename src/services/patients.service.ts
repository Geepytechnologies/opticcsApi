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
      const patientcreate: any = await this.patientRepo.createpatient(
        data,
        personalInformation_id
      );
      const patientID = patientcreate[0].insertId;
      const firstvisitcreation: any = await this.patientRepo.createfirstvisit(
        data,
        patientID
      );
      const firstvisitID = firstvisitcreation[0].insertId;

      await this.patientRepo.createmedicalhistory(data, firstvisitID);
      await this.patientRepo.createfamilyhistory(data, firstvisitID);
      await this.patientRepo.createdailyhabit(data, firstvisitID);
      await this.patientRepo.createobstetric(data, firstvisitID);
      await this.patientRepo.createmedicalhistory(data, firstvisitID);
      await this.patientRepo.createdrughistory(data, firstvisitID);
      await this.patientRepo.createphysicalexamination(data, firstvisitID);

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

  async deleteAPatient(id: string) {
    try {
      const result = await this.patientRepo.deleteAPatient(id);
      return result;
    } catch (error: any) {
      throw new Error(error);
    }
  }
  async getPatientRecord(id: string) {
    try {
      const result = await this.patientRepo.deleteAPatient(id);
      return result;
    } catch (error: any) {
      throw new Error(error);
    }
  }
  async getAllPatientsAndHealthworker(
    query: any,
    pageSize: number,
    offset: number
  ) {
    const state = query.state;
    const lga = query.lga;
    const healthfacility = query.healthfacility;
    console.log(state);
    try {
      if (state && state !== "") {
        console.log("i ran");
        const result =
          await this.patientRepo.getPatientsWithHealthworkerFilteredByState(
            pageSize,
            offset,
            state
          );
        return result;
      } else if (lga && lga !== "") {
        const result =
          await this.patientRepo.getPatientsWithHealthworkerFilteredByLga(
            pageSize,
            offset,
            lga
          );
        return result;
      } else if (healthfacility && healthfacility !== "") {
        const result =
          await this.patientRepo.getPatientsWithHealthworkerFilteredByHealthfacility(
            pageSize,
            offset,
            healthfacility
          );
        return result;
      } else {
        const result = await this.patientRepo.getPatientsWithHealthworker(
          pageSize,
          offset
        );
        return result;
      }
    } catch (error: any) {
      throw new Error(error);
    }
  }
  async getPatientCount() {
    try {
      const result = await this.patientRepo.getPatientCount();
      return result;
    } catch (error: any) {
      throw new Error(error);
    }
  }
}
