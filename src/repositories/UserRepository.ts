import { PoolConnection } from "mysql2/promise";
import { getAUserByPhone } from "../queries/user/user";

export class UserRepository {
  private connection: PoolConnection;

  constructor(connection: PoolConnection) {
    this.connection = connection;
  }
  async getUserByPhone(phone: string) {
    const q = getAUserByPhone();
    try {
      const [result] = await this.connection.execute(q, [phone]);
      return result;
    } catch (err: any) {
      throw new Error(err);
    }
  }
}
