import { PoolConnection } from "mysql2/promise";
import { StateQueries } from "../queries/admin/state";

export class StateRepository {
  private connection: PoolConnection;

  constructor(connection: PoolConnection) {
    this.connection = connection;
  }
  async getAllStatesNational(pageSize: number, offset: number) {
    try {
      const q = StateQueries.getAllStateNational(pageSize, offset);
      const [result] = await this.connection.execute(q);
      return result;
    } catch (err: any) {
      console.log(err);
      throw new Error(err);
    }
  }
  async getAllStatesNationalCount() {
    try {
      const q = StateQueries.getAllStateNationalCount();
      const [result] = await this.connection.execute(q);
      return result;
    } catch (err: any) {
      console.log(err);
      throw new Error(err);
    }
  }
  async getAllStatesNationalwithdate(
    pageSize: number,
    offset: number,
    from: string,
    to: string
  ) {
    try {
      const q = StateQueries.getAllStateNationalwithdate(pageSize, offset);
      const [result] = await this.connection.execute(q, [from, to]);
      return result;
    } catch (err: any) {
      console.log(err);
      throw new Error(err);
    }
  }
  async getAllStatesNationalwithdateCount(from: string, to: string) {
    try {
      const q = StateQueries.getAllstateNationalwithdateCount();
      const [result] = await this.connection.execute(q, [from, to]);
      return result;
    } catch (err: any) {
      console.log(err);
      throw new Error(err);
    }
  }
}
