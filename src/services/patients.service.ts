import { PoolConnection, RowDataPacket } from "mysql2/promise";
import { patientRepository } from "../repositories/PatientRepository";
import logger from "../logger";
import {
  ancvisitDTO,
  firstvisitDTO,
  returnvisitDTO,
} from "../entities/patient";
import { ParsedQs } from "qs";
import { Patientconditions } from "../utils/patients";
import { AncvisitRepository } from "../repositories/AncvisitRepository";

export class PatientService {
  private patientRepo: patientRepository;
  private ancvisitRepo: AncvisitRepository;

  constructor(
    patientRepository: patientRepository,
    connection: PoolConnection
  ) {
    this.patientRepo = patientRepository;
    this.ancvisitRepo = new AncvisitRepository(connection);
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
    const [result] = await this.patientRepo.getnewlycreatedpatientrecord(
      patient_id
    );
    return result;
  }

  async createPatientFirstvisit(data: firstvisitDTO) {
    logger.info(data);

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

      //creating a new ancvisit record for the first visit
      const ancdata: ancvisitDTO = {
        patient_id: patientID,
        healthpersonnel_id: data.healthpersonnel_id,
        anc_number: "1",
        lastANC: "1",
        missed: "0",
        attended: "1",
      };
      await this.ancvisitRepo.createancvisit(ancdata);
      return patientID;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async createPatientReturnvisit(
    data: returnvisitDTO,
    healthpersonnel_id: string
  ) {
    //check if patient has completed anc
    const patientHasCompletedANC =
      await this.patientRepo.checkIfPatientHasCompletedANC(data.patient_id);
    if (!patientHasCompletedANC) {
      const result = await this.patientRepo.createReturnVisit(data);

      //get the patients last ancvisit number
      const ancvisit = await this.ancvisitRepo.getUserLastANC(data.patient_id);
      //creating a new ancvisit record for the return visit
      const currentanc = ancvisit.lastANC + 1;
      const ancdata: ancvisitDTO = {
        patient_id: ancvisit.patient_id,
        healthpersonnel_id: healthpersonnel_id,
        anc_number: currentanc,
        lastANC: currentanc,
        missed: ancvisit.missed,
        attended: ancvisit.attended + 1,
      };
      await this.ancvisitRepo.updateancvisit(ancdata);
      return result;
    } else {
      throw new Error("Patient has completed ANC");
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
    const state = query.state || "";
    const lga = query.lga || "";
    const healthfacility = query.healthfacility || "";
    const from = query.from || "";
    const to = query.to || "";
    console.log(state);
    console.log(lga);
    console.log(healthfacility);
    try {
      if (Patientconditions.allStates(state, lga, healthfacility)) {
        logger.warn("state");
        if (Patientconditions.datesAreNotEmpty(from, to)) {
          const result =
            await this.patientRepo.getPatientsWithHealthworkerFilteredByStatewithdate(
              pageSize,
              offset,
              state,
              from,
              to
            );
          const [count]: any =
            await this.patientRepo.getPatientsWithHealthworkerFilteredByStateCountwithdate(
              state,
              from,
              to
            );
          const data = { result: result, count: count.total_count };
          return data;
        } else {
          const result: any =
            await this.patientRepo.getPatientsWithHealthworkerFilteredByState(
              pageSize,
              offset,
              state
            );
          const [count]: any =
            await this.patientRepo.getPatientsWithHealthworkerFilteredByStateCount(
              state
            );
          const data = { result: result, count: count.total_count };
          return data;
        }
      }
      //::: lga ::://
      if (Patientconditions.allLga(state, lga)) {
        logger.warn("lga");
        if (Patientconditions.datesAreNotEmpty(from, to)) {
          const result: any =
            await this.patientRepo.getPatientsWithHealthworkerFilteredByLgawithdate(
              pageSize,
              offset,
              state,
              lga,
              from,
              to
            );
          const [count]: any =
            await this.patientRepo.getPatientsWithHealthworkerFilteredByLgaCountwithdate(
              state,
              lga,
              from,
              to
            );
          const data = { result: result, count: count.total_count };
          return data;
        } else {
          const result: any =
            await this.patientRepo.getPatientsWithHealthworkerFilteredByLga(
              pageSize,
              offset,
              state,
              lga
            );
          const [count]: any =
            await this.patientRepo.getPatientsWithHealthworkerFilteredByLgaCount(
              state,
              lga
            );
          const data = { result: result, count: count.total_count };
          return data;
        }
      }
      if (Patientconditions.allHealthFacility(state, lga, healthfacility)) {
        logger.warn("healthfacility");
        if (Patientconditions.datesAreNotEmpty(from, to)) {
          const result: any =
            await this.patientRepo.getPatientsWithHealthworkerFilteredByHealthfacilitywithdate(
              pageSize,
              offset,
              state,
              lga,
              healthfacility,
              from,
              to
            );
          const [count]: any =
            await this.patientRepo.getPatientsWithHealthworkerFilteredByHealthfacilityCountwithdate(
              state,
              lga,
              healthfacility,
              from,
              to
            );
          const data = { result: result, count: count.total_count };
          return data;
        } else {
          const result: any =
            await this.patientRepo.getPatientsWithHealthworkerFilteredByHealthfacility(
              pageSize,
              offset,
              state,
              lga,
              healthfacility
            );
          const [count]: any =
            await this.patientRepo.getPatientsWithHealthworkerFilteredByHealthfacilityCount(
              state,
              lga,
              healthfacility
            );
          const data = { result: result, count: count.total_count };
          return data;
        }
      }
      if (Patientconditions.national1(state, lga, healthfacility)) {
        logger.warn("general");
        if (Patientconditions.datesAreNotEmpty(from, to)) {
          const result: any =
            await this.patientRepo.getPatientsWithHealthworkerwithdate(
              pageSize,
              offset,
              from,
              to
            );
          const result2 = await this.patientRepo.getPatientCountwithdate(
            from,
            to
          );
          const data = { result: result, count: result2 };
          return data;
        } else {
          const result: any =
            await this.patientRepo.getPatientsWithHealthworker(
              pageSize,
              offset
            );
          const result2 = await this.patientRepo.getPatientCount();
          const data = { result: result, count: result2 };
          return data;
        }
      }
      if (Patientconditions.national2(state, lga, healthfacility)) {
        logger.warn("general");
        if (Patientconditions.datesAreNotEmpty(from, to)) {
          const result: any =
            await this.patientRepo.getPatientsWithHealthworkerwithdate(
              pageSize,
              offset,
              from,
              to
            );
          const result2 = await this.patientRepo.getPatientCountwithdate(
            from,
            to
          );
          const data = { result: result, count: result2 };
          return data;
        } else {
          const result: any =
            await this.patientRepo.getPatientsWithHealthworker(
              pageSize,
              offset
            );
          const result2 = await this.patientRepo.getPatientCount();
          const data = { result: result, count: result2 };
          return data;
        }
      }
      const result: any = await this.patientRepo.getPatientsWithHealthworker(
        pageSize,
        offset
      );
      const result2 = await this.patientRepo.getPatientCount();
      const data = { result: result, count: result2 };
      return data;
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
  async numberofwomenwith4visits(
    state: string,
    lga: string,
    healthfacility: string,
    from: string,
    to: string
  ) {
    try {
      let result;
      if (state == "" && lga == "" && healthfacility == "") {
        //general
        logger.warn("general");
        if (Patientconditions.datesAreNotEmpty(from, to)) {
          result = await this.patientRepo.numberofwomenwith4visitswithdate(
            from,
            to
          );
        } else {
          result = await this.patientRepo.numberofwomenwith4visits();
        }
      }
      if (state == "all" && lga == "" && healthfacility == "") {
        //general
        logger.warn("general");
        if (Patientconditions.datesAreNotEmpty(from, to)) {
          result = await this.patientRepo.numberofwomenwith4visitswithdate(
            from,
            to
          );
        } else {
          result = await this.patientRepo.numberofwomenwith4visits();
        }
      }
      if (
        state !== "all" &&
        state !== "" &&
        (lga == "all" || lga == "") &&
        healthfacility == ""
      ) {
        //state
        logger.warn("state");
        if (Patientconditions.datesAreNotEmpty(from, to)) {
          result =
            await this.patientRepo.numberofwomenwith4visitsforstatewithdate(
              state,
              from,
              to
            );
        } else {
          result = await this.patientRepo.numberofwomenwith4visitsforstate(
            state
          );
        }
      }
      if (
        state !== "" &&
        lga !== "" &&
        (healthfacility == "all" || healthfacility == "")
      ) {
        //lga
        logger.warn("lga");
        if (Patientconditions.datesAreNotEmpty(from, to)) {
          result =
            await this.patientRepo.numberofwomenwith4visitsforlgawithdate(
              state,
              lga,
              from,
              to
            );
        } else {
          result = await this.patientRepo.numberofwomenwith4visitsforlga(
            state,
            lga
          );
        }
      }
      if (state !== "" && lga !== "" && healthfacility !== "") {
        //healthfacility
        logger.warn("healthfacility");
        if (Patientconditions.datesAreNotEmpty(from, to)) {
          result =
            await this.patientRepo.numberofwomenwith4visitsforhealthfacilitywithdate(
              state,
              healthfacility,
              from,
              to
            );
        } else {
          result =
            await this.patientRepo.numberofwomenwith4visitsforhealthfacility(
              state,
              healthfacility
            );
        }
      }
      return result;
    } catch (error: any) {
      throw new Error(error);
    }
  }
}
