import { WardDTO } from "../entities/ward";
import { WardRepository } from "../repositories/WardRepsitory";

export class WardService {
  private wardRepo: WardRepository;

  constructor(wardRepository: WardRepository) {
    this.wardRepo = wardRepository;
  }
  async create(data: WardDTO) {
    try {
      const result = await this.wardRepo.create(data);

      return result;
    } catch (error: any) {
      throw new Error(error);
    }
  }
  async getAllWards() {
    try {
      const result = await this.wardRepo.getAllWards();

      return result;
    } catch (error: any) {
      throw new Error(error);
    }
  }
  async getAllWardsForState(state: string) {
    try {
      const result = await this.wardRepo.getAllWardsForState(state);

      return result;
    } catch (error: any) {
      throw new Error(error);
    }
  }
  async getAllWardsForLga(state: string, lga: string) {
    try {
      const result = await this.wardRepo.getAllWardsForLga(state, lga);

      return result;
    } catch (error: any) {
      throw new Error(error);
    }
  }
}
