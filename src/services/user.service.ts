import { PoolConnection } from "mysql2/promise";
import { UserRepository } from "../repositories/UserRepository";

export class UserService {
  private connection: PoolConnection;

  constructor(connection: PoolConnection) {
    this.connection = connection;
  }

  async getUserByPhone(phone: string) {
    const userRepo = new UserRepository(this.connection);
    try {
      const result = await userRepo.getUserByPhone(phone);

      return result;
    } catch (error: any) {
      throw new Error(error);
    }
  }
}
