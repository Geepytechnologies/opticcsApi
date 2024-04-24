import logger from "../logger";
import { IndicatorRepository } from "../repositories/IndicatorRepository";
import { Patientconditions } from "../utils/patients";

export class IndicatorService {
  private indicatorRepository: IndicatorRepository;

  constructor(IndicatorRepo: IndicatorRepository) {
    this.indicatorRepository = IndicatorRepo;
  }
  async intermediateResult1(
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
          result = await this.indicatorRepository.IntermediateResult1Awithdate(
            from,
            to
          );
        } else {
          result = await this.indicatorRepository.IntermediateResult1A();
        }
      }
      if (state == "all" && lga == "" && healthfacility == "") {
        //general
        logger.warn("general");
        if (Patientconditions.datesAreNotEmpty(from, to)) {
          result = await this.indicatorRepository.IntermediateResult1Awithdate(
            from,
            to
          );
        } else {
          result = await this.indicatorRepository.IntermediateResult1A();
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
            await this.indicatorRepository.StateIntermediateResult1Awithdate(
              state,
              from,
              to
            );
        } else {
          result = await this.indicatorRepository.StateIntermediateResult1A(
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
            await this.indicatorRepository.LgaIntermediateResult1Awithdate(
              state,
              lga,
              from,
              to
            );
        } else {
          result = await this.indicatorRepository.LgaIntermediateResult1A(
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
            await this.indicatorRepository.HealthfacilityIntermediateResult1Awithdate(
              state,
              healthfacility,
              from,
              to
            );
        } else {
          result =
            await this.indicatorRepository.HealthfacilityIntermediateResult1A(
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
  async intermediateResult1B() {
    try {
      const result = "";
      return result;
    } catch (error: any) {
      throw new Error(error);
    }
  }
  // 1C Proportion of pregnant women at ANC 1st visit less than 20 weeks
  async intermediateResult1C() {
    try {
      const result = await this.indicatorRepository.IntermediateResult1C();
      console.log(result);
      return result;
    } catch (error: any) {
      throw new Error(error);
    }
  }
  async intermediateResult2() {
    try {
      const result = "";
      return result;
    } catch (error: any) {
      throw new Error(error);
    }
  }
  async intermediateResult3() {
    try {
      const result = "";
      return result;
    } catch (error: any) {
      throw new Error(error);
    }
  }
  async activity1() {
    try {
      const result = "";
      return result;
    } catch (error: any) {
      throw new Error(error);
    }
  }
  async activity2() {
    try {
      const result = "";
      return result;
    } catch (error: any) {
      throw new Error(error);
    }
  }
}
