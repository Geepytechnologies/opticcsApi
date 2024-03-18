import { PoolConnection } from "mysql2/promise";
import { Patientqueries } from "../queries/user/patient";
import { firstvisitDTO } from "../entities/patient";

export class patientRepository {
  private connection: PoolConnection;

  constructor(connection: PoolConnection) {
    this.connection = connection;
  }
  async checkifpatientwithphonenumberexists(phone: string) {
    const q = Patientqueries.getPatientByPhone();
    try {
      const result = await this.connection.execute(q, [phone]);
      return result;
    } catch (err: any) {
      throw new Error(err);
    }
  }
  async createPersonalrecord(data: firstvisitDTO) {
    const q = Patientqueries.patientpersonalrecord();
    const values = [
      data.hospitalnumber,
      data.firstname,
      data.middlename,
      data.surname,
      data.phone,
      data.address,
      data.state,
      data.dateofbirth,
      data.lga,
      data.healthfacility,
      data.gravidity,
      data.parity,
      data.alive,
      data.lmpknown,
      data.lmp,
      data.edd,
      data.ega,
      data.laborstarted,
      data.firstbabymovement,
      data.doyoufeelthebabysmovement,
      data.doyouknowdateoffirstbabymovement,
    ];

    try {
      const result = await this.connection.execute(q, values);
      return result;
    } catch (err: any) {
      throw new Error(err);
    }
  }
}
