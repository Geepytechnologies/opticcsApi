import { HealthFacilityRepository } from "../repositories/HealthFacilityRepository";
import { Global } from "../utils/global";

export class HealthfacilityService {
  private hfRepository: HealthFacilityRepository;

  constructor(HfRepository: HealthFacilityRepository) {
    this.hfRepository = HfRepository;
  }
  async generateUniqueCredentials(callback: {
    (err: any, data: any): void;
    (
      arg0: unknown,
      arg1: { username: string; password: string } | undefined
    ): void;
  }) {
    const username = Global.generateRandomString(8);
    const password = Global.generateRandomString(12);

    try {
      // Check if the generated username already exists in the database
      const [results] =
        await this.hfRepository.getHealthfacilityUserAccountByUserID(username);

      if (Array.isArray(results)) {
        if (results.length > 0) {
          this.generateUniqueCredentials(callback);
        } else {
          callback(null, { username, password });
        }
      }
    } catch (err) {
      callback(err, null);
    }
  }
}
