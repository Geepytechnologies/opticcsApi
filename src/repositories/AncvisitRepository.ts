import { PoolConnection } from "mysql2/promise";
import { ancvisitDTO } from "../entities/patient";
import { AncvisitQueries } from "../queries/user/ancvisit";

export class AncvisitRepository {
  private connection: PoolConnection;

  constructor(connection: PoolConnection) {
    this.connection = connection;
  }
  async getUserLastANC(patient_id: string) {
    try {
      const q = AncvisitQueries.getUserLastANC();
      const [result]: any = await this.connection.execute(q, [patient_id]);
      return result[0];
    } catch (error: any) {
      throw new Error(error);
    }
  }
  async createancvisit(data: ancvisitDTO) {
    const q = AncvisitQueries.createancvisit();
    const values = [
      data.patient_id,
      data.healthpersonnel_id,
      data.anc_number,
      data.lastANC,
      data.missed,
      data.attended,
    ];
    try {
      const [result]: any = await this.connection.execute(q, values);
      return result;
    } catch (err: any) {
      throw new Error(err + ": " + "createancvisit");
    }
  }

  async updateancvisit(data: ancvisitDTO) {
    const q = AncvisitQueries.updateancvisit();

    const values = [
      data.healthpersonnel_id,
      data.anc_number,
      data.lastANC,
      data.missed,
      data.attended,
      data.patient_id,
    ];
    try {
      const [result]: any = await this.connection.execute(q, values);
      return result;
    } catch (err: any) {
      throw new Error(err + ": " + "updateancvisit");
    }
  }
}
