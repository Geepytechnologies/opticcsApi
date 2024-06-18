import { PoolConnection } from "mysql2/promise";
import { TestResultQueries } from "../queries/user/testResults";
import { TestresultDTO } from "../entities/patient";
import { WardDTO } from "../entities/ward";
import { wardQueries } from "../queries/ward";

export class WardRepository {
  private connection: PoolConnection;

  constructor(connection: PoolConnection) {
    this.connection = connection;
  }
  async create(data: WardDTO) {
    try {
      const q = wardQueries.create();
      const values = [data.state, data.lga, data.ward];
      const [result]: any = await this.connection.execute(q, values);
      return result;
    } catch (err: any) {
      throw new Error(err);
    }
  }
  async getAllWards() {
    const q = wardQueries.getAllWards();
    try {
      const [result] = await this.connection.execute(q);
      return result;
    } catch (err: any) {
      throw new Error(err);
    }
  }
  async getAllWardsForState(state: string) {
    const q = wardQueries.getAllWardsForState();
    try {
      const [result] = await this.connection.execute(q, [state]);
      return result;
    } catch (err: any) {
      throw new Error(err);
    }
  }
  async getAllWardsForLga(state: string, lga: string) {
    const q = wardQueries.getAllWardsForLga();
    try {
      const [result] = await this.connection.execute(q, [state, lga]);
      return result;
    } catch (err: any) {
      throw new Error(err);
    }
  }
}
