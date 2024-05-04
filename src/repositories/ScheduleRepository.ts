import { PoolConnection } from "mysql2/promise";

export class ScheduleRepository {
  private connection: PoolConnection;

  constructor(connection: PoolConnection) {
    this.connection = connection;
  }
  async createSchedule() {
    try {
    } catch (err: any) {
      throw new Error(err);
    }
  }
}
