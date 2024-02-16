import db from "../config/db";
import logger from "../logger";

export class HealthPersonnelRepository {
  static async updateHealthpersonnelverification(id: string) {
    const connection = await db.getConnection();
    const q = `UPDATE healthpersonnel SET verified = 1 WHERE id = ?`;
    try {
      const result = await connection.execute(q, [id]);
      return result;
    } catch (error: any) {
      connection.release();
      logger.error(error);
      throw new Error(error);
    } finally {
      if (connection) {
        connection.release();
      }
    }
  }
}
