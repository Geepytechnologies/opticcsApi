import { deliveryReportDTO } from "../entities/patient";
import { DeliveryreportRepository } from "../repositories/DeliveryreportRepository";

export class DeliveryreportService {
  private deliveryReportRepo: DeliveryreportRepository;

  constructor(deliveryReportRepository: DeliveryreportRepository) {
    this.deliveryReportRepo = deliveryReportRepository;
  }
  async createdeliveryreport(data: deliveryReportDTO) {
    try {
      const result = await this.deliveryReportRepo.createdeliveryreport(data);
      const testresultid = result.insertId;
      const result2 = await this.deliveryReportRepo.getADeliveryReportById(
        testresultid
      );
      return result2;
    } catch (error: any) {
      throw new Error(error);
    }
  }
  async getAllDeliveryreports() {
    try {
      const result = await this.deliveryReportRepo.getAllDeliveryreports();

      return result;
    } catch (error: any) {
      throw new Error(error);
    }
  }
  async getAllDeliveryreportsByAWorker(id: string) {
    try {
      const result =
        await this.deliveryReportRepo.getAllDeliveryreportsByAWorker(id);

      return result;
    } catch (error: any) {
      throw new Error(error);
    }
  }
  async getAPatientsDeliveryreport(id: string) {
    try {
      const result = await this.deliveryReportRepo.getAPatientsDeliveryreport(
        id
      );

      return result;
    } catch (error: any) {
      throw new Error(error);
    }
  }
}
