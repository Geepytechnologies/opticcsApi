import { PoolConnection } from "mysql2/promise";
import { ancvisitDTO } from "../entities/patient";
import { AncvisitQueries } from "../queries/user/ancvisit";

export class AncvisitRepository {
  private connection: PoolConnection;

  constructor(connection: PoolConnection) {
    this.connection = connection;
  }
  async getUserLastANC() {
    try {
    } catch (error: any) {
      throw new Error(error);
    }
  }
  async createancvisit(data: ancvisitDTO) {
    const q = AncvisitQueries.createancvisit();
    const values = [
      data.healthpersonnel_id,
      data.patient_id,
      data.anc_number,
      data.lastANC,
      data.attended,
      data.missed,
    ];
    try {
      const [result]: any = await this.connection.execute(q, values);
      return result;
    } catch (err: any) {
      throw new Error(err);
    }
  }
}
