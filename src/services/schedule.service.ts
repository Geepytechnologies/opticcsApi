import logger from "../logger";
import { ScheduleRepository } from "../repositories/ScheduleRepository";
import { Patientconditions } from "../utils/patients";

export class ScheduleService {
  private scheduleRepository: ScheduleRepository;

  constructor(ScheduleRepo: ScheduleRepository) {
    this.scheduleRepository = ScheduleRepo;
  }
  async getAllSchedule(
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
        logger.warn("national schedule");
        if (Patientconditions.datesAreNotEmpty(from, to)) {
          const result =
            await this.scheduleRepository.getAllScheduleNationalwithdate(
              pageSize,
              offset,
              from,
              to
            );
          const [count]: any =
            await this.scheduleRepository.getAllScheduleNationalwithdateCount(
              from,
              to
            );
          const data = { result: result, count: count.total };
          return data;
        } else {
          const result = await this.scheduleRepository.getAllScheduleNational(
            pageSize,
            offset
          );
          const [count]: any =
            await this.scheduleRepository.getAllScheduleNationalCount();
          const data = { result: result, count: count.total };
          return data;
        }
      }

      if (filter == "state") {
        //state
        logger.warn("state schedule");
        if (Patientconditions.datesAreNotEmpty(from, to)) {
          const result =
            await this.scheduleRepository.getAllScheduleStatewithdate(
              pageSize,
              offset,
              state,
              from,
              to
            );
          const [count]: any =
            await this.scheduleRepository.getAllScheduleStatewithdateCount(
              state,
              from,
              to
            );
          const data = { result: result, count: count.total };
          return data;
        } else {
          const result = await this.scheduleRepository.getAllScheduleState(
            pageSize,
            offset,
            state
          );
          const [count]: any =
            await this.scheduleRepository.getAllScheduleStateCount(state);
          const data = { result: result, count: count.total };
          return data;
        }
      }

      if (filter == "lga") {
        //lga
        logger.warn("lga schedule");
        if (Patientconditions.datesAreNotEmpty(from, to)) {
          const result =
            await this.scheduleRepository.getAllScheduleLgawithdate(
              pageSize,
              offset,
              state,
              lga,
              from,
              to
            );
          const [count]: any =
            await this.scheduleRepository.getAllScheduleLgawithdateCount(
              state,
              lga,
              from,
              to
            );
          const data = { result: result, count: count.total };
          return data;
        } else {
          const result = await this.scheduleRepository.getAllScheduleLga(
            pageSize,
            offset,
            state,
            lga
          );
          const [count]: any =
            await this.scheduleRepository.getAllScheduleLgaCount(state, lga);
          const data = { result: result, count: count.total };
          return data;
        }
      }
      if (filter == "healthfacility") {
        //healthfacility
        logger.warn("healthfacility schedule");
        if (Patientconditions.datesAreNotEmpty(from, to)) {
          const result =
            await this.scheduleRepository.getAllScheduleHealthfacilitywithdate(
              pageSize,
              offset,
              state,
              healthfacility,
              from,
              to
            );
          const [count]: any =
            await this.scheduleRepository.getAllScheduleHealthfacilitywithdateCount(
              state,
              healthfacility,
              from,
              to
            );
          const data = { result: result, count: count.total };
          return data;
        } else {
          const result =
            await this.scheduleRepository.getAllScheduleHealthfacility(
              pageSize,
              offset,
              state,
              healthfacility
            );
          const [count]: any =
            await this.scheduleRepository.getAllScheduleHealthfacilityCount(
              state,
              healthfacility
            );
          const data = { result: result, count: count.total };
          return data;
        }
      }
    } catch (error: any) {
      throw new Error(error);
    }
  }
}
