import { PoolConnection } from "mysql2/promise";
import { UserQueries, getAUserByPhone } from "../queries/user/user";

export class UserRepository {
  private connection: PoolConnection;

  constructor(connection: PoolConnection) {
    this.connection = connection;
  }
  async getUserByPhone(phone: string) {
    const q = getAUserByPhone();
    try {
      const [result] = await this.connection.execute(q, [phone]);
      return result;
    } catch (err: any) {
      throw new Error(err);
    }
  }
  async getAllUsersNational(pageSize: number, offset: number) {
    try {
      const q = UserQueries.getAllUsersNational(pageSize, offset);
      const [result] = await this.connection.execute(q);
      return result;
    } catch (err: any) {
      console.log(err);
      throw new Error(err);
    }
  }
  async getAllUsersNationalCount() {
    try {
      const q = UserQueries.getAllUsersNationalCount();
      const [result] = await this.connection.execute(q);
      return result;
    } catch (err: any) {
      console.log(err);
      throw new Error(err);
    }
  }
  async getAllUsersNationalwithdate(
    pageSize: number,
    offset: number,
    from: string,
    to: string
  ) {
    try {
      const q = UserQueries.getAllUsersNationalwithdate(pageSize, offset);
      const [result] = await this.connection.execute(q, [from, to]);
      return result;
    } catch (err: any) {
      throw new Error(err);
    }
  }
  async getAllUsersNationalwithdateCount(from: string, to: string) {
    try {
      const q = UserQueries.getAllUsersNationalwithdateCount();
      const [result] = await this.connection.execute(q, [from, to]);
      return result;
    } catch (err: any) {
      throw new Error(err);
    }
  }
  async getAllUsersState(pageSize: number, offset: number, state: string) {
    try {
      const q = UserQueries.getAllUsersState(pageSize, offset);
      const [result] = await this.connection.execute(q, [state]);
      return result;
    } catch (err: any) {
      throw new Error(err);
    }
  }
  async getAllUsersStateCount(state: string) {
    try {
      const q = UserQueries.getAllUsersStateCount();
      const [result] = await this.connection.execute(q, [state]);
      return result;
    } catch (err: any) {
      throw new Error(err);
    }
  }
  async getAllUsersStatewithdate(
    pageSize: number,
    offset: number,
    state: string,
    from: string,
    to: string
  ) {
    try {
      const q = UserQueries.getAllUsersStatewithdate(pageSize, offset);
      const [result] = await this.connection.execute(q, [state, from, to]);
      return result;
    } catch (err: any) {
      throw new Error(err);
    }
  }
  async getAllUsersStatewithdateCount(state: string, from: string, to: string) {
    try {
      const q = UserQueries.getAllUsersStatewithdateCount();
      const [result] = await this.connection.execute(q, [state, from, to]);
      return result;
    } catch (err: any) {
      throw new Error(err);
    }
  }
  async getAllUsersLga(
    pageSize: number,
    offset: number,
    state: string,
    lga: string
  ) {
    try {
      const q = UserQueries.getAllUsersLga(pageSize, offset);
      const [result] = await this.connection.execute(q, [state, lga]);
      return result;
    } catch (err: any) {
      throw new Error(err);
    }
  }
  async getAllUsersLgaCount(state: string, lga: string) {
    try {
      const q = UserQueries.getAllUsersLgaCount();
      const [result] = await this.connection.execute(q, [state, lga]);
      return result;
    } catch (err: any) {
      throw new Error(err);
    }
  }
  async getAllUsersLgawithdate(
    pageSize: number,
    offset: number,
    state: string,
    lga: string,
    from: string,
    to: string
  ) {
    try {
      const q = UserQueries.getAllUsersLgawithdate(pageSize, offset);
      const [result] = await this.connection.execute(q, [state, lga, from, to]);
      return result;
    } catch (err: any) {
      throw new Error(err);
    }
  }
  async getAllUsersLgawithdateCount(
    state: string,
    lga: string,
    from: string,
    to: string
  ) {
    try {
      const q = UserQueries.getAllUsersLgawithdateCount();
      const [result] = await this.connection.execute(q, [state, lga, from, to]);
      return result;
    } catch (err: any) {
      throw new Error(err);
    }
  }
  async getAllUsersHealthfacility(
    pageSize: number,
    offset: number,
    state: string,
    healthfacility: string
  ) {
    try {
      const q = UserQueries.getAllUsersHealthfacility(pageSize, offset);
      const [result] = await this.connection.execute(q, [
        state,
        healthfacility,
      ]);
      return result;
    } catch (err: any) {
      throw new Error(err);
    }
  }
  async getAllUsersHealthfacilityCount(state: string, healthfacility: string) {
    try {
      const q = UserQueries.getAllUsersHealthfacilityCount();
      const [result] = await this.connection.execute(q, [
        state,
        healthfacility,
      ]);
      return result;
    } catch (err: any) {
      throw new Error(err);
    }
  }
  async getAllUsersHealthfacilitywithdate(
    pageSize: number,
    offset: number,
    state: string,
    healthfacility: string,
    from: string,
    to: string
  ) {
    try {
      const q = UserQueries.getAllUsersHealthfacilitywithdate(pageSize, offset);
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
  async getAllUsersHealthfacilitywithdateCount(
    state: string,
    healthfacility: string,
    from: string,
    to: string
  ) {
    try {
      const q = UserQueries.getAllUsersHealthfacilitywithdateCount();
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
  async deleteAUser(id: string) {
    try {
      const q = UserQueries.deleteAUser();
      const [result] = await this.connection.execute(q, [id]);
      return result;
    } catch (error: any) {
      throw new Error(error);
    }
  }
}
