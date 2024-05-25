import { PoolConnection } from "mysql2/promise";
import { UserRepository } from "../repositories/UserRepository";
import logger from "../logger";
import { Patientconditions } from "../utils/patients";

export class UserService {
  private connection: PoolConnection;

  constructor(connection: PoolConnection) {
    this.connection = connection;
  }

  async getUserByPhone(phone: string) {
    const userRepo = new UserRepository(this.connection);
    try {
      const result = await userRepo.getUserByPhone(phone);

      return result;
    } catch (error: any) {
      throw new Error(error);
    }
  }
  async deleteAUser(id: string) {
    const userRepo = new UserRepository(this.connection);
    try {
      const result = await userRepo.deleteAUser(id);

      return result;
    } catch (error: any) {
      throw new Error(error);
    }
  }
  async getAllUsers(
    pageSize: number,
    offset: number,
    filter: string,

    state: string,
    lga: string,
    healthfacility: string,
    from: string,
    to: string
  ) {
    const userRepo = new UserRepository(this.connection);

    try {
      if (filter == "national") {
        //general
        logger.warn("national Users");
        if (Patientconditions.datesAreNotEmpty(from, to)) {
          const result = await userRepo.getAllUsersNationalwithdate(
            pageSize,
            offset,
            from,
            to
          );
          const [count]: any = await userRepo.getAllUsersNationalwithdateCount(
            from,
            to
          );
          const data = { result: result, count: count.total };
          return data;
        } else {
          const result = await userRepo.getAllUsersNational(pageSize, offset);
          const [count]: any = await userRepo.getAllUsersNationalCount();
          const data = { result: result, count: count.total };
          return data;
        }
      }

      if (filter == "state") {
        //state
        logger.warn("state Users");
        if (Patientconditions.datesAreNotEmpty(from, to)) {
          const result = await userRepo.getAllUsersStatewithdate(
            pageSize,
            offset,
            state,
            from,
            to
          );
          const [count]: any = await userRepo.getAllUsersStatewithdateCount(
            state,
            from,
            to
          );
          const data = { result: result, count: count.total };
          return data;
        } else {
          const result = await userRepo.getAllUsersState(
            pageSize,
            offset,
            state
          );
          const [count]: any = await userRepo.getAllUsersStateCount(state);
          const data = { result: result, count: count.total };
          return data;
        }
      }

      if (filter == "lga") {
        //lga
        logger.warn("lga Users");
        if (Patientconditions.datesAreNotEmpty(from, to)) {
          const result = await userRepo.getAllUsersLgawithdate(
            pageSize,
            offset,
            state,
            lga,
            from,
            to
          );
          const [count]: any = await userRepo.getAllUsersLgawithdateCount(
            state,
            lga,
            from,
            to
          );
          const data = { result: result, count: count.total };
          return data;
        } else {
          const result = await userRepo.getAllUsersLga(
            pageSize,
            offset,
            state,
            lga
          );
          const [count]: any = await userRepo.getAllUsersLgaCount(state, lga);
          const data = { result: result, count: count.total };
          return data;
        }
      }
      if (filter == "healthfacility") {
        //healthfacility
        logger.warn("healthfacility Users");
        if (Patientconditions.datesAreNotEmpty(from, to)) {
          const result = await userRepo.getAllUsersHealthfacilitywithdate(
            pageSize,
            offset,
            state,
            healthfacility,
            from,
            to
          );
          const [count]: any =
            await userRepo.getAllUsersHealthfacilitywithdateCount(
              state,
              healthfacility,
              from,
              to
            );
          const data = { result: result, count: count.total };
          return data;
        } else {
          const result = await userRepo.getAllUsersHealthfacility(
            pageSize,
            offset,
            state,
            healthfacility
          );
          const [count]: any = await userRepo.getAllUsersHealthfacilityCount(
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
