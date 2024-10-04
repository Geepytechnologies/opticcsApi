import logger from "../logger";
import { HealthFacilityRepository } from "../repositories/HealthFacilityRepository";
import { Generators } from "../utils/generators";
import { Global } from "../utils/global";
import { Patientconditions } from "../utils/patients";

export class HealthfacilityService {
  private hfRepository: HealthFacilityRepository;

  constructor(HfRepository: HealthFacilityRepository) {
    this.hfRepository = HfRepository;
  }
  async generateUniqueCredentials(callback: {
    (err: any, data: any): void;
    (
      arg0: unknown,
      arg1: { username: string; password: string } | undefined
    ): void;
  }) {
    const username = "IANC" + Generators.generateRandomNumberString(8);
    const password = Generators.generateRandomString(10);

    try {
      // Check if the generated username already exists in the database
      const [results] =
        await this.hfRepository.getHealthfacilityUserAccountByUserID(username);

      if (Array.isArray(results)) {
        if (results.length > 0) {
          this.generateUniqueCredentials(callback);
        } else {
          callback(null, { username, password });
        }
      }
    } catch (err) {
      callback(err, null);
    }
  }

  async getAllHealthfacility(
    pageSize: number,
    offset: number,
    filter: string,

    state: string,
    lga: string,
    healthfacility: string,
    from: string,
    to: string
  ) {
    try {
      if (filter == "national") {
        //general
        logger.warn("national hf");
        if (Patientconditions.datesAreNotEmpty(from, to)) {
          const result =
            await this.hfRepository.getAllHealthfacilityNationalwithdate(
              pageSize,
              offset,
              from,
              to
            );
          const [count]: any =
            await this.hfRepository.getAllHealthfacilityNationalwithdateCount(
              from,
              to
            );
          const data = { result: result, count: count.total };
          return data;
        } else {
          const result = await this.hfRepository.getAllHealthfacilityNational(
            pageSize,
            offset
          );
          const [count]: any =
            await this.hfRepository.getAllHealthfacilityNationalCount();
          const data = { result: result, count: count.total };
          return data;
        }
      }

      if (filter == "state") {
        //state
        logger.warn("state hf");
        if (Patientconditions.datesAreNotEmpty(from, to)) {
          const result =
            await this.hfRepository.getAllHealthfacilityStatewithdate(
              pageSize,
              offset,
              state,
              from,
              to
            );
          const [count]: any =
            await this.hfRepository.getAllHealthfacilityStatewithdateCount(
              state,
              from,
              to
            );
          const data = { result: result, count: count.total };
          return data;
        } else {
          const result = await this.hfRepository.getAllHealthfacilityState(
            pageSize,
            offset,
            state
          );
          const [count]: any =
            await this.hfRepository.getAllHealthfacilityStateCount(state);
          const data = { result: result, count: count.total };
          return data;
        }
      }

      if (filter == "lga") {
        //lga
        logger.warn("lga hf");
        if (Patientconditions.datesAreNotEmpty(from, to)) {
          const result =
            await this.hfRepository.getAllHealthfacilityLgawithdate(
              pageSize,
              offset,
              state,
              lga,
              from,
              to
            );
          const [count]: any =
            await this.hfRepository.getAllHealthfacilityLgawithdateCount(
              state,
              lga,
              from,
              to
            );
          const data = { result: result, count: count.total };
          return data;
        } else {
          const result = await this.hfRepository.getAllHealthfacilityLga(
            pageSize,
            offset,
            state,
            lga
          );
          const [count]: any =
            await this.hfRepository.getAllHealthfacilityLgaCount(state, lga);
          const data = { result: result, count: count.total };
          return data;
        }
      }
    } catch (error: any) {
      throw new Error(error);
    }
  }
}
