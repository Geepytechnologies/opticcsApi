import { PoolConnection } from "mysql2/promise";
import logger from "../logger";

export class NationalRepository {
  private connection: PoolConnection;

  constructor(connection: PoolConnection) {
    this.connection = connection;
  }

  async getNationalAdminByUserID(userID: string) {
    const q = `SELECT * FROM nationaladmin WHERE userid = ?`;
    try {
      const result = await this.connection.execute(q, [userID]);
      return result;
    } catch (error: any) {
      logger.error(error);
    } finally {
      if (this.connection) {
        this.connection.release();
      }
    }
  }
  async createRefresh(refreshToken: string, userID: string) {
    const q = `UPDATE nationaladmin SET refreshtoken = ? WHERE userid = ?`;
    try {
      console.log("im using %d for refresh", this.connection.threadId);

      await this.connection.execute(q, [refreshToken, userID]);
    } catch (error: any) {
      logger.error(error);
    } finally {
      console.log("i released %d in refresh", this.connection.threadId);

      if (this.connection) {
        this.connection.release();
      }
    }
  }
}
