import { PoolConnection } from "mysql2/promise";
import { DeliveryreportQueries } from "../queries/user/deliveryReport";
import { deliveryReportDTO } from "../entities/patient";

export class DeliveryreportRepository {
  private connection: PoolConnection;

  constructor(connection: PoolConnection) {
    this.connection = connection;
  }
  async createdeliveryreport(data: deliveryReportDTO) {
    const q = DeliveryreportQueries.createdeliveryreport();
    const values = [
      data.healthpersonnel_id,
      data.firstname,
      data.lastname,
      data.deliverydata,
      data.numberofchildren,
      data.deliverydate,
      data.deliverytime,
      data.deliverAtHealthFacility,
      data.givenPostPartum,
      data.attendAncVisit,
    ];
    try {
      const [result]: any = await this.connection.execute(q, values);
      return result;
    } catch (err: any) {
      throw new Error(err);
    }
  }
  async getADeliveryReportById(id: string) {
    const q = DeliveryreportQueries.getADeliveryreportById();
    try {
      const [result]: any = await this.connection.execute(q, [id]);
      return result;
    } catch (err: any) {
      throw new Error(err);
    }
  }
  async getAllDeliveryreports() {
    const q = DeliveryreportQueries.getAllDeliveryreports();
    try {
      const [result]: any = await this.connection.execute(q);
      return result;
    } catch (err: any) {
      throw new Error(err);
    }
  }
  async getAllDeliveryreportsByAWorker(id: string) {
    const q = DeliveryreportQueries.getAllDeliveryreportsByAWorker();
    try {
      const [result]: any = await this.connection.execute(q, [id]);
      return result;
    } catch (err: any) {
      throw new Error(err);
    }
  }
  async getAPatientsDeliveryreport(id: string) {
    const q = DeliveryreportQueries.getAPatientsDeliveryreport();
    try {
      const [result]: any = await this.connection.execute(q, [id]);
      return result;
    } catch (err: any) {
      throw new Error(err);
    }
  }
}
