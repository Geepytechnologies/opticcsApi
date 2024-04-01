import { TestresultDTO } from "../entities/patient";
import { TestresultRepository } from "../repositories/TestresultRepository";

export class TestresultService {
  private testresultRepo: TestresultRepository;

  constructor(testresultRepository: TestresultRepository) {
    this.testresultRepo = testresultRepository;
  }
  async createTest(data: TestresultDTO) {
    try {
      const result = await this.testresultRepo.createTest(data);
      const testresultid = result.insertId;
      const result2 = await this.testresultRepo.getTestById(testresultid);

      return result2;
    } catch (error: any) {
      throw new Error(error);
    }
  }
}
