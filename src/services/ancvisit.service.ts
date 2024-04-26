import { ancvisitDTO } from "../entities/patient";
import { AncvisitRepository } from "../repositories/AncvisitRepository";

export class AncvisitService {
  private ancvisitRepo: AncvisitRepository;

  constructor(ancvisitRepository: AncvisitRepository) {
    this.ancvisitRepo = ancvisitRepository;
  }
  async createancvisit(data: ancvisitDTO) {
    try {
      const result = await this.ancvisitRepo.createancvisit(data);

      return result;
    } catch (error: any) {
      throw new Error(error);
    }
  }
  async updateancvisit(data: ancvisitDTO) {
    try {
      const result = await this.ancvisitRepo.updateancvisit(data);

      return result;
    } catch (error: any) {
      throw new Error(error);
    }
  }
}
