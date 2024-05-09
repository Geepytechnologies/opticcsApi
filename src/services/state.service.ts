import logger from "../logger";
import { StateRepository } from "../repositories/StateRepository";
import { Patientconditions } from "../utils/patients";

export class StateService {
  private stateRepository: StateRepository;

  constructor(StateRepository: StateRepository) {
    this.stateRepository = StateRepository;
  }
  async getAllStates(
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
        logger.warn("national states");
        if (Patientconditions.datesAreNotEmpty(from, to)) {
          const result =
            await this.stateRepository.getAllStatesNationalwithdate(
              pageSize,
              offset,
              from,
              to
            );
          const [count]: any =
            await this.stateRepository.getAllStatesNationalwithdateCount(
              from,
              to
            );
          const data = { result: result, count: count.total };
          return data;
        } else {
          const result = await this.stateRepository.getAllStatesNational(
            pageSize,
            offset
          );
          const [count]: any =
            await this.stateRepository.getAllStatesNationalCount();
          const data = { result: result, count: count.total };
          return data;
        }
      }
    } catch (error: any) {
      throw new Error(error);
    }
  }
}
