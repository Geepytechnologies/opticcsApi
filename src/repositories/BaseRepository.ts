import { PoolConnection } from "mysql2/promise";
import db from "../config/db";
import logger from "../logger";

class BaseRepository {
  static async getConnection(): Promise<PoolConnection> {
    try {
      const connection = await db.getConnection();
      return connection;
    } catch (error) {
      logger.error("Error getting database connection:", error);
      throw new Error("Failed to get database connection");
    }
  }
  static async releaseConnection(connection: { release: () => void }) {
    if (connection) {
      connection.release();
    }
  }
}

export default BaseRepository;
