import db from "../config/db";
import {
  healthfacilityaccountDTO,
  healthfacilityuserDTO,
} from "../entities/healthfacility";
import logger from "../logger";

export class HealthFacilityRepository {
  static async checkIfAccountExists(healthfacilityID: string) {
    const connection = await db.getConnection();

    const q = `SELECT * FROM healthfacilityaccount WHERE healthfacilityID =?`;
    try {
      let checked;
      const result = await connection.execute(q, [healthfacilityID]);
      if (Array.isArray(result[0])) {
        if (result[0].length) {
          checked = true;
        } else {
          checked = false;
        }
      }
      return checked;
    } catch (error: any) {
      connection.release();
      logger.error(error);
      throw new Error(error);
    } finally {
      if (connection) {
        connection.release();
      }
    }
  }
  static async checkIfUserAccountExists(
    userID: string,
    hashedpassword: string
  ) {
    const connection = await db.getConnection();

    const q = `SELECT * FROM healthfacilityadmin WHERE userid = ? AND password = ?`;
    try {
      let checked;
      const result = await connection.execute(q, [userID, hashedpassword]);
      if (Array.isArray(result[0])) {
        if (result[0].length) {
          checked = true;
        } else {
          checked = false;
        }
      }
      return checked;
    } catch (error: any) {
      connection.release();
      throw new Error(error);
    } finally {
      if (connection) {
        connection.release();
      }
    }
  }
  static async createHealthFacilityAccount(values: healthfacilityaccountDTO[]) {
    const connection = await db.getConnection();

    const q = `INSERT INTO healthfacilityaccount (ward, healthfacilityname, lga, state, healthfacilityID, officeaddress, phone, email)
    VALUES (?, ?, ?, ?, ?, ?,?,?)`;
    try {
      const result = await connection.execute(q, values);

      return result;
    } catch (error: any) {
      connection.release();
      logger.error(error);
      throw new Error(error);
    } finally {
      if (connection) {
        connection.release();
      }
    }
  }
  static async createHealthFacilityUserAccount(
    values: healthfacilityuserDTO[]
  ) {
    const connection = await db.getConnection();

    const q = `INSERT INTO healthfacilityadmin (ward, staffname,staffid, gender,lga, state, cadre, phone, email,userid ,password,healthfacilityid)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?,?,?,?)`;
    try {
      const result = await connection.execute(q, values);

      return result;
    } catch (error: any) {
      connection.release();
      logger.error(error);
      throw new Error(error);
    } finally {
      if (connection) {
        connection.release();
      }
    }
  }
  static async getHealthFacilityUserAccountUsingStateAndLga(
    state: string,
    lga: string
  ) {
    const connection = await db.getConnection();

    const q = `SELECT * FROM healthfacilityaccount WHERE state = ? AND lga = ?`;

    try {
      const result = await connection.execute(q, [state, lga]);

      return result;
    } catch (error: any) {
      connection.release();
      logger.error(error);
      throw new Error(error);
    } finally {
      if (connection) {
        connection.release();
      }
    }
  }
}
