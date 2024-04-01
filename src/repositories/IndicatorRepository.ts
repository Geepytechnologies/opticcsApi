import { PoolConnection } from "mysql2/promise";
import { IndicatorQuery } from "../queries/admin/indicator";

// NB: Visit Indicator.txt for definition descriptions

export class IndicatorRepository {
  private connection: PoolConnection;

  constructor(connection: PoolConnection) {
    this.connection = connection;
  }
  // IntermediateResut1
  async IntermediateResult1A() {
    const q = IndicatorQuery.IntermediateResult1A();
    try {
      const [result]: any = await this.connection.execute(q);
      return result;
    } catch (err: any) {
      throw new Error(err);
    }
  }
}
