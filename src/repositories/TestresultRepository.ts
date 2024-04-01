import { PoolConnection } from "mysql2/promise";
import { TestResultQueries } from "../queries/user/testResults";
import { TestresultDTO } from "../entities/patient";

export class TestresultRepository {
  private connection: PoolConnection;

  constructor(connection: PoolConnection) {
    this.connection = connection;
  }
  async createTest(data: TestresultDTO) {
    try {
      const q = TestResultQueries.createTest();
      const values = [
        data.healthpersonnel_id,
        data.requestedtest_id,
        data.hb,
        data.wcc,
        data.rcc,
        data.pcv,
        data.mcv,
        data.platelet,
        data.glucose,
        data.hiv,
        data.hepatitis,
        data.patient_id,
        data.rdt,
        data.bodytemp,
        data.heartrate,
        data.respiratoryrate,
        data.bodypressure,
        data.malariarapid,
        data.leukocytes,
        data.nitrites,
        data.urobilinogen,
        data.protein,
        data.pH,
        data.blood,
        data.specificgravity,
        data.ketones,
        data.bilirubin,
        data.glucoseUrinary,
        data.neutrophils,
        data.lymphocytes,
        data.monocytes,
        data.eosinophils,
        data.basophils,
        data.Haematocrit,
        data.mch,
        data.reticulocytecount,
        data.hbsag,
        data.hcv,
      ];
      const [result]: any = await this.connection.execute(q, values);
      return result;
    } catch (err: any) {
      throw new Error(err);
    }
  }
  async getTestById(id: string) {
    const q = TestResultQueries.getATestById();
    try {
      const [result] = await this.connection.execute(q, [id]);
      return result;
    } catch (err: any) {
      throw new Error(err);
    }
  }
}
