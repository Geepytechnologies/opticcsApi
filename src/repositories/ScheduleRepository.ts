import { PoolConnection } from "mysql2/promise";
import { ScheduleQueries } from "../queries/user/schedule";

export class ScheduleRepository {
  private connection: PoolConnection;

  constructor(connection: PoolConnection) {
    this.connection = connection;
  }
  async createSchedule() {
    try {
    } catch (err: any) {
      throw new Error(err);
    }
  }
  async getAllScheduleNational(pageSize: number, offset: number) {
    try {
      const q = ScheduleQueries.getAllScheduleNational(pageSize, offset);
      const [result] = await this.connection.execute(q);
      return result;
    } catch (err: any) {
      console.log(err);
      throw new Error(err);
    }
  }
  async getAllScheduleNationalCount() {
    try {
      const q = ScheduleQueries.getAllScheduleNationalCount();
      const [result] = await this.connection.execute(q);
      return result;
    } catch (err: any) {
      console.log(err);
      throw new Error(err);
    }
  }
  async getAllScheduleNationalwithdate(
    pageSize: number,
    offset: number,
    from: string,
    to: string
  ) {
    try {
      const q = ScheduleQueries.getAllScheduleNationalwithdate(
        pageSize,
        offset
      );
      const [result] = await this.connection.execute(q, [from, to]);
      return result;
    } catch (err: any) {
      throw new Error(err);
    }
  }
  async getAllScheduleNationalwithdateCount(from: string, to: string) {
    try {
      const q = ScheduleQueries.getAllScheduleNationalwithdateCount();
      const [result] = await this.connection.execute(q, [from, to]);
      return result;
    } catch (err: any) {
      throw new Error(err);
    }
  }
  async getAllScheduleState(pageSize: number, offset: number, state: string) {
    try {
      const q = ScheduleQueries.getAllScheduleState(pageSize, offset);
      const [result] = await this.connection.execute(q, [state]);
      return result;
    } catch (err: any) {
      throw new Error(err);
    }
  }
  async getAllScheduleStateCount(state: string) {
    try {
      const q = ScheduleQueries.getAllScheduleStateCount();
      const [result] = await this.connection.execute(q, [state]);
      return result;
    } catch (err: any) {
      throw new Error(err);
    }
  }
  async getAllScheduleStatewithdate(
    pageSize: number,
    offset: number,
    state: string,
    from: string,
    to: string
  ) {
    try {
      const q = ScheduleQueries.getAllScheduleStatewithdate(pageSize, offset);
      const [result] = await this.connection.execute(q, [state, from, to]);
      return result;
    } catch (err: any) {
      throw new Error(err);
    }
  }
  async getAllScheduleStatewithdateCount(
    state: string,
    from: string,
    to: string
  ) {
    try {
      const q = ScheduleQueries.getAllScheduleStatewithdateCount();
      const [result] = await this.connection.execute(q, [state, from, to]);
      return result;
    } catch (err: any) {
      throw new Error(err);
    }
  }
  async getAllScheduleLga(
    pageSize: number,
    offset: number,
    state: string,
    lga: string
  ) {
    try {
      const q = ScheduleQueries.getAllScheduleLga(pageSize, offset);
      const [result] = await this.connection.execute(q, [state, lga]);
      return result;
    } catch (err: any) {
      throw new Error(err);
    }
  }
  async getAllScheduleLgaCount(state: string, lga: string) {
    try {
      const q = ScheduleQueries.getAllScheduleLgaCount();
      const [result] = await this.connection.execute(q, [state, lga]);
      return result;
    } catch (err: any) {
      throw new Error(err);
    }
  }
  async getAllScheduleLgawithdate(
    pageSize: number,
    offset: number,
    state: string,
    lga: string,
    from: string,
    to: string
  ) {
    try {
      const q = ScheduleQueries.getAllScheduleLgawithdate(pageSize, offset);
      const [result] = await this.connection.execute(q, [state, lga, from, to]);
      return result;
    } catch (err: any) {
      throw new Error(err);
    }
  }
  async getAllScheduleLgawithdateCount(
    state: string,
    lga: string,
    from: string,
    to: string
  ) {
    try {
      const q = ScheduleQueries.getAllScheduleLgawithdateCount();
      const [result] = await this.connection.execute(q, [state, lga, from, to]);
      return result;
    } catch (err: any) {
      throw new Error(err);
    }
  }
  async getAllScheduleHealthfacility(
    pageSize: number,
    offset: number,
    state: string,
    healthfacility: string
  ) {
    try {
      const q = ScheduleQueries.getAllScheduleHealthfacility(pageSize, offset);
      const [result] = await this.connection.execute(q, [
        state,
        healthfacility,
      ]);
      return result;
    } catch (err: any) {
      throw new Error(err);
    }
  }
  async getAllScheduleHealthfacilityCount(
    state: string,
    healthfacility: string
  ) {
    try {
      const q = ScheduleQueries.getAllScheduleHealthfacilityCount();
      const [result] = await this.connection.execute(q, [
        state,
        healthfacility,
      ]);
      return result;
    } catch (err: any) {
      throw new Error(err);
    }
  }
  async getAllScheduleHealthfacilitywithdate(
    pageSize: number,
    offset: number,
    state: string,
    healthfacility: string,
    from: string,
    to: string
  ) {
    try {
      const q = ScheduleQueries.getAllScheduleHealthfacilitywithdate(
        pageSize,
        offset
      );
      const [result] = await this.connection.execute(q, [
        state,
        healthfacility,
        from,
        to,
      ]);
      return result;
    } catch (err: any) {
      throw new Error(err);
    }
  }
  async getAllScheduleHealthfacilitywithdateCount(
    state: string,
    healthfacility: string,
    from: string,
    to: string
  ) {
    try {
      const q = ScheduleQueries.getAllScheduleHealthfacilitywithdateCount();
      const [result] = await this.connection.execute(q, [
        state,
        healthfacility,
        from,
        to,
      ]);
      return result;
    } catch (err: any) {
      throw new Error(err);
    }
  }
}
