import { PoolConnection } from "mysql2/promise";
import logger from "../logger";

export class HealthPersonnelRepository {
  private connection: PoolConnection;

  constructor(connection: PoolConnection) {
    this.connection = connection;
  }
  async updateHealthpersonnelverification(id: string) {
    const q = `UPDATE healthpersonnel SET verified = 1 WHERE id = ?`;
    try {
      const result = await this.connection.execute(q, [id]);
      return result;
    } catch (error: any) {
      logger.error(error);
      throw new Error(error);
    } finally {
      if (this.connection) {
        this.connection.release();
      }
    }
  }
}
