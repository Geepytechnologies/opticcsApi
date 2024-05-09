import { PoolConnection } from "mysql2/promise";
import db from "../config/db";
import {
  healthfacilityaccountDTO,
  healthfacilityuserDTO,
} from "../entities/healthfacility";
import logger from "../logger";
import BaseRepository from "./BaseRepository";
import { HealthfacilityQueries } from "../queries/admin/healthfacility";

export class HealthFacilityRepository {
  private connection: PoolConnection;

  constructor(connection: PoolConnection) {
    this.connection = connection;
  }
  async checkIfAccountExists(healthfacilityID: string) {
    const q = `SELECT * FROM healthfacilityaccount WHERE healthfacilityID =?`;
    try {
      let checked;
      const result = await this.connection.execute(q, [healthfacilityID]);
      if (Array.isArray(result[0])) {
        if (result[0].length) {
          checked = true;
        } else {
          checked = false;
        }
      }
      return checked;
    } catch (error: any) {
      logger.error(error);
      throw new Error(error);
    } finally {
      this.connection.release();
    }
  }
  async checkIfUserAccountExists(userID: string, hashedpassword: string) {
    const q = `SELECT * FROM healthfacilityadmin WHERE userid = ? AND password = ?`;
    try {
      let checked;
      const result = await this.connection.execute(q, [userID, hashedpassword]);
      if (Array.isArray(result[0])) {
        if (result[0].length) {
          checked = true;
        } else {
          checked = false;
        }
      }
      return checked;
    } catch (error: any) {
      throw new Error(error);
    } finally {
      if (this.connection) {
        this.connection.release();
      }
    }
  }
  async createHealthFacilityAccount(values: healthfacilityaccountDTO[]) {
    const q = `INSERT INTO healthfacilityaccount (ward, healthfacilityname, lga, state, healthfacilityID, officeaddress, phone, email)
    VALUES (?, ?, ?, ?, ?, ?,?,?)`;
    try {
      const result = await this.connection.execute(q, values);

      return result;
    } catch (error: any) {
      logger.error(error);
      throw new Error(error);
    } finally {
      if (this.connection) {
        this.connection.release();
      }
    }
  }
  async createHealthFacilityUserAccount(values: healthfacilityuserDTO[]) {
    const q = `INSERT INTO healthfacilityadmin (ward, staffname,staffid, gender,lga, state, cadre, phone, email,userid ,password,healthfacility)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?,?,?,?)`;
    try {
      const result = await this.connection.execute(q, values);

      return result;
    } catch (error: any) {
      logger.error(error);
      throw new Error(error);
    } finally {
      if (this.connection) {
        this.connection.release();
      }
    }
  }
  async getHealthFacilityUserAccountUsingStateAndLga(
    state: string,
    lga: string
  ) {
    const q = `SELECT * FROM healthfacilityaccount WHERE state = ? AND lga = ?`;

    try {
      const result = await this.connection.execute(q, [state, lga]);

      return result;
    } catch (error: any) {
      logger.error(error);
      throw new Error(error);
    } finally {
      if (this.connection) {
        this.connection.release();
      }
    }
  }
  async getHealthFacilityAccounts() {
    const q = `SELECT * FROM healthfacilityaccount`;

    try {
      const result = await this.connection.execute(q);

      return result;
    } catch (error: any) {
      logger.error(error);
      throw new Error(error);
    } finally {
      if (this.connection) {
        this.connection.release();
      }
    }
  }
  async getAllHealthfacilityNational(pageSize: number, offset: number) {
    try {
      const q = HealthfacilityQueries.getAllHealthfacilityNational(
        pageSize,
        offset
      );
      const [result] = await this.connection.execute(q);
      return result;
    } catch (err: any) {
      console.log(err);
      throw new Error(err);
    }
  }
  async getAllHealthfacilityNationalCount() {
    try {
      const q = HealthfacilityQueries.getAllHealthfacilityNationalCount();
      const [result] = await this.connection.execute(q);
      return result;
    } catch (err: any) {
      console.log(err);
      throw new Error(err);
    }
  }
  async getAllHealthfacilityNationalwithdate(
    pageSize: number,
    offset: number,
    from: string,
    to: string
  ) {
    try {
      const q = HealthfacilityQueries.getAllHealthfacilityNationalwithdate(
        pageSize,
        offset
      );
      const [result] = await this.connection.execute(q, [from, to]);
      return result;
    } catch (err: any) {
      throw new Error(err);
    }
  }
  async getAllHealthfacilityNationalwithdateCount(from: string, to: string) {
    try {
      const q =
        HealthfacilityQueries.getAllHealthfacilityNationalwithdateCount();
      const [result] = await this.connection.execute(q, [from, to]);
      return result;
    } catch (err: any) {
      throw new Error(err);
    }
  }
  async getAllHealthfacilityState(
    pageSize: number,
    offset: number,
    state: string
  ) {
    try {
      const q = HealthfacilityQueries.getAllHealthfacilityState(
        pageSize,
        offset
      );
      const [result] = await this.connection.execute(q, [state]);
      return result;
    } catch (err: any) {
      throw new Error(err);
    }
  }
  async getAllHealthfacilityStateCount(state: string) {
    try {
      const q = HealthfacilityQueries.getAllHealthfacilityStateCount();
      const [result] = await this.connection.execute(q, [state]);
      return result;
    } catch (err: any) {
      throw new Error(err);
    }
  }
  async getAllHealthfacilityStatewithdate(
    pageSize: number,
    offset: number,
    state: string,
    from: string,
    to: string
  ) {
    try {
      const q = HealthfacilityQueries.getAllHealthfacilityStatewithdate(
        pageSize,
        offset
      );
      const [result] = await this.connection.execute(q, [state, from, to]);
      return result;
    } catch (err: any) {
      throw new Error(err);
    }
  }
  async getAllHealthfacilityStatewithdateCount(
    state: string,
    from: string,
    to: string
  ) {
    try {
      const q = HealthfacilityQueries.getAllHealthfacilityStatewithdateCount();
      const [result] = await this.connection.execute(q, [state, from, to]);
      return result;
    } catch (err: any) {
      throw new Error(err);
    }
  }
  async getAllHealthfacilityLga(
    pageSize: number,
    offset: number,
    state: string,
    lga: string
  ) {
    try {
      const q = HealthfacilityQueries.getAllHealthfacilityLga(pageSize, offset);
      const [result] = await this.connection.execute(q, [state, lga]);
      return result;
    } catch (err: any) {
      throw new Error(err);
    }
  }
  async getAllHealthfacilityLgaCount(state: string, lga: string) {
    try {
      const q = HealthfacilityQueries.getAllHealthfacilityLgaCount();
      const [result] = await this.connection.execute(q, [state, lga]);
      return result;
    } catch (err: any) {
      throw new Error(err);
    }
  }
  async getAllHealthfacilityLgawithdate(
    pageSize: number,
    offset: number,
    state: string,
    lga: string,
    from: string,
    to: string
  ) {
    try {
      const q = HealthfacilityQueries.getAllHealthfacilityLgawithdate(
        pageSize,
        offset
      );
      const [result] = await this.connection.execute(q, [state, lga, from, to]);
      return result;
    } catch (err: any) {
      throw new Error(err);
    }
  }
  async getAllHealthfacilityLgawithdateCount(
    state: string,
    lga: string,
    from: string,
    to: string
  ) {
    try {
      const q = HealthfacilityQueries.getAllHealthfacilityLgawithdateCount();
      const [result] = await this.connection.execute(q, [state, lga, from, to]);
      return result;
    } catch (err: any) {
      throw new Error(err);
    }
  }

  async getHealthFacilityAccountsForLGA(lga: string) {
    const q = `SELECT * FROM healthfacilityaccount WHERE lga = ?`;

    try {
      const result = await this.connection.execute(q, [lga]);

      return result;
    } catch (error: any) {
      logger.error(error);
      throw new Error(error);
    } finally {
      if (this.connection) {
        this.connection.release();
      }
    }
  }
  async getHealthfacilityUserAccounts() {
    const q = `SELECT * FROM healthfacilityadmin ORDER BY createdat DESC`;

    try {
      const result = await this.connection.execute(q);

      return result;
    } catch (error: any) {
      logger.error(error);
      throw new Error(error);
    } finally {
      if (this.connection) {
        this.connection.release();
      }
    }
  }
  async getHealthfacilityUserAccountByUserID(username: string) {
    const q = `SELECT * FROM healthfacilityadmin WHERE userid = ?`;

    try {
      const result = await this.connection.execute(q, [username]);

      return result;
    } catch (error: any) {
      logger.error(error);
      throw new Error(error);
    } finally {
      if (this.connection) {
        this.connection.release();
      }
    }
  }
  async getHealthfacilityUserAccountByID(id: string) {
    const q = `SELECT * FROM healthfacilityadmin WHERE id = ?`;

    try {
      const result = await this.connection.execute(q, [id]);

      return result;
    } catch (error: any) {
      logger.error(error);
      throw new Error(error);
    } finally {
      if (this.connection) {
        this.connection.release();
      }
    }
  }
  async UpdateUserRefreshToken(refreshtoken: string | null, userid: string) {
    const q = `UPDATE healthfacilityadmin
    SET refreshtoken = ?
    WHERE userid = ?`;

    try {
      const result = await this.connection.execute(q, [refreshtoken, userid]);

      return result;
    } catch (error: any) {
      logger.error(error);
      throw new Error(error);
    } finally {
      if (this.connection) {
        this.connection.release();
      }
    }
  }
  async UpdateUserPassword(password: string, userid: string) {
    const q = `UPDATE healthfacilityadmin
    SET password = ?
    WHERE id = ?`;

    try {
      const result = await this.connection.execute(q, [password, userid]);

      return result;
    } catch (error: any) {
      logger.error(error);
      throw new Error(error);
    } finally {
      if (this.connection) {
        this.connection.release();
      }
    }
  }
  async getUserWithRefreshToken(refreshtoken: string) {
    const q = `SELECT * FROM healthfacilityadmin WHERE refreshToken = ?`;

    try {
      const result = await this.connection.execute(q, [refreshtoken]);

      return result;
    } catch (error: any) {
      logger.error(error);
      throw new Error(error);
    } finally {
      if (this.connection) {
        this.connection.release();
      }
    }
  }
  //data queries
  async graviditygreaterthan8(healthfacility: string) {
    try {
      const q = `SELECT *
      FROM personalinformation
      WHERE CAST(gravidity AS SIGNED) > 8 OR CAST(gravidity AS SIGNED) = 8 AND healthfacility = ?`;
      const result = await this.connection.execute(q, [healthfacility]);
      if (Array.isArray(result[0])) {
        return result[0].length;
      }
    } catch (error) {
      console.log(error);
    } finally {
      if (this.connection) {
        this.connection.release();
      }
    }
  }
  async graviditylessthan8(healthfacility: string) {
    try {
      const q = `SELECT *
      FROM personalinformation
      WHERE CAST(gravidity AS SIGNED) < 8 AND healthfacility = ?`;
      const result = await this.connection.execute(q, [healthfacility]);
      if (Array.isArray(result[0])) {
        return result[0].length;
      }
    } catch (error) {
      console.log(error);
    } finally {
      if (this.connection) {
        this.connection.release();
      }
    }
  }
  async getedd() {
    try {
      const q = `SELECT 
        quarter,
        COUNT(*) AS number
      FROM (
        SELECT 
          edd,
          CASE 
            WHEN MONTH(edd) BETWEEN 1 AND 3 THEN 'Q1'
            WHEN MONTH(edd) BETWEEN 4 AND 6 THEN 'Q2'
            WHEN MONTH(edd) BETWEEN 7 AND 9 THEN 'Q3'
            WHEN MONTH(edd) BETWEEN 10 AND 12 THEN 'Q4'
          END AS quarter,
          healthfacility,healthfacility,healthFacility
        FROM personalinformation
      ) AS subquery
      GROUP BY quarter
      ORDER BY MIN(edd);  
      
    `;
      const result = await this.connection.execute(q);
      // res.status(200).json(result[0]);
    } catch (error) {
      // res.status(500).json(error);
    } finally {
      if (this.connection) {
        this.connection.release();
      }
    }
  }
  async getedd2(healthfacility: string) {
    try {
      const q = `SELECT 
      quarters.quarter,
      COUNT(subquery.quarter) AS number
    FROM (
      SELECT 'Q1' AS quarter
      UNION ALL SELECT 'Q2'
      UNION ALL SELECT 'Q3'
      UNION ALL SELECT 'Q4'
    ) AS quarters
    LEFT JOIN (
      SELECT 
        edd,
        CASE 
          WHEN MONTH(edd) BETWEEN 1 AND 3 THEN 'Q1'
          WHEN MONTH(edd) BETWEEN 4 AND 6 THEN 'Q2'
          WHEN MONTH(edd) BETWEEN 7 AND 9 THEN 'Q3'
          WHEN MONTH(edd) BETWEEN 10 AND 12 THEN 'Q4'
        END AS quarter,
        healthfacility
      FROM personalinformation WHERE healthfacility = ?
    ) AS subquery ON quarters.quarter = subquery.quarter
    GROUP BY quarters.quarter
    ORDER BY MIN(subquery.edd);
    
      
    `;
      const result = await this.connection.execute(q, [healthfacility]);
      return result[0];
    } catch (error) {
    } finally {
      if (this.connection) {
        this.connection.release();
      }
    }
  }
  async getparity(healthfacility: string) {
    try {
      const q1 = `SELECT *
        FROM personalinformation
        WHERE CAST(parity AS SIGNED) <= 24 AND healthfacility = ?;
    `;
      const q2 = `SELECT *
        FROM personalinformation
        WHERE CAST(parity AS SIGNED) > 24 AND healthfacility = ?;
    `;
      const less = await this.connection.execute(q1, [healthfacility]);
      const greater = await this.connection.execute(q2, [healthfacility]);
      if (Array.isArray(greater[0]) && Array.isArray(less[0])) {
        return { less: less[0].length, greater: greater[0].length };
      }
    } catch (error) {
      this.connection.rollback();
    } finally {
      if (this.connection) {
        this.connection.release();
      }
    }
  }

  async getbabysmovement(healthfacility: string) {
    try {
      const q1 = `SELECT *
        FROM personalinformation
        WHERE doyoufeelthebabysmovement = ? AND healthfacility = ?;
    `;
      const q2 = `SELECT *
        FROM personalinformation
        WHERE doyoufeelthebabysmovement = ? AND healthfacility = ?;
    `;
      const q3 = `SELECT *
        FROM personalinformation
        WHERE doyoufeelthebabysmovement = ? ANd healthfacility = ?;
    `;
      const q4 = `SELECT *
        FROM personalinformation
        WHERE doyoufeelthebabysmovement = ? AND healthfacility = ?;
    `;
      const yes = await this.connection.execute(q1, ["yes", healthfacility]);
      const no = await this.connection.execute(q2, ["no", healthfacility]);
      const dontknow = await this.connection.execute(q3, [
        "i don't know",
        healthfacility,
      ]);
      const notapplicable = await this.connection.execute(q4, [
        "not applicable",
        healthfacility,
      ]);
      if (
        Array.isArray(yes[0]) &&
        Array.isArray(no[0]) &&
        Array.isArray(dontknow[0]) &&
        Array.isArray(notapplicable[0])
      ) {
        return {
          yes: yes[0].length,
          no: no[0].length,
          dontknow: dontknow[0].length,
          notapplicable: notapplicable[0].length,
        };
      }
    } catch (error) {
      this.connection.rollback();
    } finally {
      if (this.connection) {
        this.connection.release();
      }
    }
  }
  async getfirstbabymovement(healthfacility: string) {
    try {
      const q1 = `SELECT *
        FROM personalinformation
        WHERE doyouknowdateoffirtbabymovement = ? AND healthfacility = ?;
    `;
      const q2 = `SELECT *
        FROM personalinformation
        WHERE doyoufeelthebabysmovement = ? AND healthfacility = ?;
    `;
      const q3 = `SELECT *
        FROM personalinformation
        WHERE doyoufeelthebabysmovement = ? AND healthfacility = ?;
    `;
      const q4 = `SELECT *
        FROM personalinformation
        WHERE doyoufeelthebabysmovement = ? AND healthfacility = ?;
    `;
      const yes = await this.connection.execute(q1, ["yes", healthfacility]);
      const no = await this.connection.execute(q2, ["no", healthfacility]);
      const dontknow = await this.connection.execute(q3, [
        "i don't know",
        healthfacility,
      ]);
      const notapplicable = await this.connection.execute(q4, [
        "not applicable",
        healthfacility,
      ]);
      if (
        Array.isArray(yes[0]) &&
        Array.isArray(no[0]) &&
        Array.isArray(dontknow[0]) &&
        Array.isArray(notapplicable[0])
      ) {
        return {
          yes: yes[0].length,
          no: no[0].length,
          dontknow: dontknow[0].length,
          notapplicable: notapplicable[0].length,
        };
      }
    } catch (error) {
      this.connection.rollback();
    } finally {
      if (this.connection) {
        this.connection.release();
      }
    }
  }

  async getconvulsions(healthfacility: string) {
    try {
      const q = `SELECT
      pi.*,
      fv.*,
      p.*
  FROM
      obstetrichistory oh
  JOIN
      firstvisit fv ON oh.firstvisit_id = fv.id
  JOIN
      patients p ON fv.patient_id = p.id
  JOIN
      personalinformation pi ON p.personalinformation_id = pi.id
  WHERE
      oh.convulsionsduringpregnancy = ?
      AND pi.healthfacility = ?`;

      const result = await this.connection.execute(q, ["yes", healthfacility]);
      const q2 = `SELECT
      pi.*,
      fv.*,
      p.*
  FROM
      obstetrichistory oh
  JOIN
      firstvisit fv ON oh.firstvisit_id = fv.id
  JOIN
      patients p ON fv.patient_id = p.id
  JOIN
      personalinformation pi ON p.personalinformation_id = pi.id
  WHERE
      oh.convulsionsduringpregnancy = ?
      AND pi.healthfacility = ?`;
      const result2 = await this.connection.execute(q2, ["no", healthfacility]);
      if (Array.isArray(result2[0]) && Array.isArray(result[0])) {
        return { yes: result[0].length, no: result2[0].length };
      }
    } catch (error) {
      console.log(error);
    } finally {
      if (this.connection) {
        this.connection.release();
      }
    }
  }
  async getsurgery(healthfacility: string) {
    try {
      const q = `SELECT
      pi.*,
      fv.*,
      p.*
  FROM
      obstetrichistory oh
  JOIN
      firstvisit fv ON oh.firstvisit_id = fv.id
  JOIN
      patients p ON fv.patient_id = p.id
  JOIN
      personalinformation pi ON p.personalinformation_id = pi.id
  WHERE
      oh.caesarean = ?
      AND pi.healthfacility = ?`;
      const result = await this.connection.execute(q, ["yes", healthfacility]);
      const q2 = `SELECT
      pi.*,
      fv.*,
      p.*
  FROM
      obstetrichistory oh
  JOIN
      firstvisit fv ON oh.firstvisit_id = fv.id
  JOIN
      patients p ON fv.patient_id = p.id
  JOIN
      personalinformation pi ON p.personalinformation_id = pi.id
  WHERE
      oh.caesarean = ?
      AND pi.healthfacility = ?`;
      const result2 = await this.connection.execute(q2, [
        "yes",
        healthfacility,
      ]);
      if (Array.isArray(result2[0]) && Array.isArray(result[0])) {
        return { yes: result[0].length, no: result2[0].length };
      }
    } catch (error) {
      console.log(error);
    } finally {
      if (this.connection) {
        this.connection.release();
      }
    }
  }
  async gettearsthroughsphincter(healthfacility: string) {
    try {
      const q = `SELECT
      pi.*,
      fv.*,
      p.*
  FROM
      obstetrichistory oh
  JOIN
      firstvisit fv ON oh.firstvisit_id = fv.id
  JOIN
      patients p ON fv.patient_id = p.id
  JOIN
      personalinformation pi ON p.personalinformation_id = pi.id
  WHERE
      oh.tearsthroughsphincter = ?
      AND pi.healthfacility = ?`;
      const result = await this.connection.execute(q, ["yes", healthfacility]);
      const q2 = `SELECT
      pi.*,
      fv.*,
      p.*
  FROM
      obstetrichistory oh
  JOIN
      firstvisit fv ON oh.firstvisit_id = fv.id
  JOIN
      patients p ON fv.patient_id = p.id
  JOIN
      personalinformation pi ON p.personalinformation_id = pi.id
  WHERE
      oh.tearsthroughsphincter = ?
      AND pi.healthfacility = ?`;
      const result2 = await this.connection.execute(q2, ["no", healthfacility]);
      if (Array.isArray(result2[0]) && Array.isArray(result[0])) {
        return { yes: result[0].length, no: result2[0].length };
      }
    } catch (error) {
      logger.error(error);
    } finally {
      if (this.connection) {
        this.connection.release();
      }
    }
  }
  async getpostpartiumhaemorrghage(healthfacility: string) {
    try {
      const q = `SELECT
      pi.*,
      fv.*,
      p.*
  FROM
      obstetrichistory oh
  JOIN
      firstvisit fv ON oh.firstvisit_id = fv.id
  JOIN
      patients p ON fv.patient_id = p.id
  JOIN
      personalinformation pi ON p.personalinformation_id = pi.id
  WHERE
      oh.postpartiumhaemorrghage = ?
      AND pi.healthfacility = ?`;
      const q2 = `SELECT
      pi.*,
      fv.*,
      p.*
  FROM
      obstetrichistory oh
  JOIN
      firstvisit fv ON oh.firstvisit_id = fv.id
  JOIN
      patients p ON fv.patient_id = p.id
  JOIN
      personalinformation pi ON p.personalinformation_id = pi.id
  WHERE
      oh.postpartiumhaemorrghage = ?
      AND pi.healthfacility = ?`;
      const result = await this.connection.execute(q, ["yes", healthfacility]);
      const result2 = await this.connection.execute(q2, ["no", healthfacility]);
      if (Array.isArray(result2[0]) && Array.isArray(result[0])) {
        return { yes: result[0].length, no: result2[0].length };
      }
    } catch (error) {
    } finally {
      if (this.connection) {
        this.connection.release();
      }
    }
  }
  async getstillbirths(healthfacility: string) {
    try {
      const q = `SELECT
      pi.*,
      fv.*,
      p.*
  FROM
      obstetrichistory oh
  JOIN
      firstvisit fv ON oh.firstvisit_id = fv.id
  JOIN
      patients p ON fv.patient_id = p.id
  JOIN
      personalinformation pi ON p.personalinformation_id = pi.id
  WHERE
      oh.stillbirths = ?
      AND pi.healthfacility = ?`;
      const q2 = `SELECT
      pi.*,
      fv.*,
      p.*
  FROM
      obstetrichistory oh
  JOIN
      firstvisit fv ON oh.firstvisit_id = fv.id
  JOIN
      patients p ON fv.patient_id = p.id
  JOIN
      personalinformation pi ON p.personalinformation_id = pi.id
  WHERE
      oh.stillbirths = ?
      AND pi.healthfacility = ?`;
      const result = await this.connection.execute(q, ["yes", healthfacility]);
      const result2 = await this.connection.execute(q2, ["no", healthfacility]);
      if (Array.isArray(result2[0]) && Array.isArray(result[0])) {
        return { yes: result[0].length, no: result2[0].length };
      }
    } catch (error) {
    } finally {
      if (this.connection) {
        this.connection.release();
      }
    }
  }
  async getprematuredeliveries(healthfacility: string) {
    try {
      const q = `SELECT
      pi.*,
      fv.*,
      p.*
  FROM
      obstetrichistory oh
  JOIN
      firstvisit fv ON oh.firstvisit_id = fv.id
  JOIN
      patients p ON fv.patient_id = p.id
  JOIN
      personalinformation pi ON p.personalinformation_id = pi.id
  WHERE
      oh.prematuredeliveries = ?
      AND pi.healthfacility = ?`;
      const q2 = `SELECT
      pi.*,
      fv.*,
      p.*
  FROM
      obstetrichistory oh
  JOIN
      firstvisit fv ON oh.firstvisit_id = fv.id
  JOIN
      patients p ON fv.patient_id = p.id
  JOIN
      personalinformation pi ON p.personalinformation_id = pi.id
  WHERE
      oh.prematuredeliveries = ?
      AND pi.healthfacility = ?`;
      const result = await this.connection.execute(q, ["yes", healthfacility]);
      const result2 = await this.connection.execute(q2, ["no", healthfacility]);
      if (Array.isArray(result2[0]) && Array.isArray(result[0])) {
        return { yes: result[0].length, no: result2[0].length };
      }
    } catch (error) {
    } finally {
      if (this.connection) {
        this.connection.release();
      }
    }
  }
  async getlowbirthbabies(healthfacility: string) {
    try {
      const q = `SELECT
      pi.*,
      fv.*,
      p.*
  FROM
      obstetrichistory oh
  JOIN
      firstvisit fv ON oh.firstvisit_id = fv.id
  JOIN
      patients p ON fv.patient_id = p.id
  JOIN
      personalinformation pi ON p.personalinformation_id = pi.id
  WHERE
      oh.lowbirthbabies = ?
      AND pi.healthfacility = ?`;
      const q2 = `SELECT
      pi.*,
      fv.*,
      p.*
  FROM
      obstetrichistory oh
  JOIN
      firstvisit fv ON oh.firstvisit_id = fv.id
  JOIN
      patients p ON fv.patient_id = p.id
  JOIN
      personalinformation pi ON p.personalinformation_id = pi.id
  WHERE
      oh.lowbirthbabies = ?
      AND pi.healthfacility = ?`;
      const result = await this.connection.execute(q, ["yes", healthfacility]);
      const result2 = await this.connection.execute(q2, ["no", healthfacility]);
      if (Array.isArray(result[0]) && Array.isArray(result2[0])) {
        return { yes: result[0].length, no: result2[0].length };
      }
    } catch (error) {
    } finally {
      if (this.connection) {
        this.connection.release();
      }
    }
  }
  async getbabieswhodied(healthfacility: string) {
    try {
      const q = `SELECT
      pi.*,
      fv.*,
      p.*
  FROM
      obstetrichistory oh
  JOIN
      firstvisit fv ON oh.firstvisit_id = fv.id
  JOIN
      patients p ON fv.patient_id = p.id
  JOIN
      personalinformation pi ON p.personalinformation_id = pi.id
  WHERE
      oh.babieswhodied = ?
      AND pi.healthfacility = ?`;
      const q2 = `SELECT
      pi.*,
      fv.*,
      p.*
  FROM
      obstetrichistory oh
  JOIN
      firstvisit fv ON oh.firstvisit_id = fv.id
  JOIN
      patients p ON fv.patient_id = p.id
  JOIN
      personalinformation pi ON p.personalinformation_id = pi.id
  WHERE
      oh.babieswhodied = ?
      AND pi.healthfacility = ?`;
      const result = await this.connection.execute(q, ["yes", healthfacility]);
      const result2 = await this.connection.execute(q2, ["no", healthfacility]);
      if (Array.isArray(result2[0]) && Array.isArray(result[0])) {
        return { yes: result[0].length, no: result2[0].length };
      }
    } catch (error) {
    } finally {
      if (this.connection) {
        this.connection.release();
      }
    }
  }
  async getmiscarriages(healthfacility: string) {
    try {
      const q = `SELECT
      pi.*,
      fv.*,
      p.*
  FROM
      obstetrichistory oh
  JOIN
      firstvisit fv ON oh.firstvisit_id = fv.id
  JOIN
      patients p ON fv.patient_id = p.id
  JOIN
      personalinformation pi ON p.personalinformation_id = pi.id
  WHERE
      oh.miscarriages = ?
      AND pi.healthfacility = ?`;
      const q2 = `SELECT
      pi.*,
      fv.*,
      p.*
  FROM
      obstetrichistory oh
  JOIN
      firstvisit fv ON oh.firstvisit_id = fv.id
  JOIN
      patients p ON fv.patient_id = p.id
  JOIN
      personalinformation pi ON p.personalinformation_id = pi.id
  WHERE
      oh.miscarriages = ?
      AND pi.healthfacility = ?`;
      const result = await this.connection.execute(q, ["yes", healthfacility]);
      const result2 = await this.connection.execute(q2, ["no", healthfacility]);
      if (Array.isArray(result2[0]) && Array.isArray(result[0])) {
        return { yes: result[0].length, no: result2[0].length };
      }
    } catch (error) {
    } finally {
      if (this.connection) {
        this.connection.release();
      }
    }
  }
  //dailyhabits and lifestyle
  async getSmokers(healthfacility: string) {
    try {
      const q = `SELECT
      pi.*,
      fv.*,
      p.*
  FROM
  dailyhabitsandlifestyle dh
  JOIN
      firstvisit fv ON dh.firstvisit_id = fv.id
  JOIN
      patients p ON fv.patient_id = p.id
  JOIN
      personalinformation pi ON p.personalinformation_id = pi.id
  WHERE
      dh.doyousmoke = ?
      AND pi.healthfacility = ?`;
      const q2 = `SELECT
      pi.*,
      fv.*,
      p.*
  FROM
  dailyhabitsandlifestyle dh
  JOIN
      firstvisit fv ON dh.firstvisit_id = fv.id
  JOIN
      patients p ON fv.patient_id = p.id
  JOIN
      personalinformation pi ON p.personalinformation_id = pi.id
  WHERE
      dh.doyousmoke = ?
      AND pi.healthfacility = ?`;
      const result = await this.connection.execute(q, ["yes", healthfacility]);
      const result2 = await this.connection.execute(q2, ["no", healthfacility]);
      if (Array.isArray(result2[0]) && Array.isArray(result[0])) {
        return { yes: result[0].length, no: result2[0].length };
      }
    } catch (error) {
      console.log(error);
    } finally {
      if (this.connection) {
        this.connection.release();
      }
    }
  }
  async getAlcohol(healthfacility: string) {
    try {
      const q = `SELECT
      pi.*,
      fv.*,
      p.*
      FROM
      dailyhabitsandlifestyle dh
      JOIN
          firstvisit fv ON dh.firstvisit_id = fv.id
      JOIN
          patients p ON fv.patient_id = p.id
      JOIN
          personalinformation pi ON p.personalinformation_id = pi.id
      WHERE
        dh.doyoudrinkalcohol = ?
      AND pi.healthfacility = ?`;
      const q2 = `SELECT
      pi.*,
      fv.*,
      p.*
      FROM
      dailyhabitsandlifestyle dh
      JOIN
          firstvisit fv ON dh.firstvisit_id = fv.id
      JOIN
          patients p ON fv.patient_id = p.id
      JOIN
          personalinformation pi ON p.personalinformation_id = pi.id
      WHERE
        dh.doyoudrinkalcohol = ?
      AND pi.healthfacility = ?`;
      const result = await this.connection.execute(q, ["yes", healthfacility]);
      const result2 = await this.connection.execute(q2, ["no", healthfacility]);
      if (Array.isArray(result2[0]) && Array.isArray(result[0])) {
        return { yes: result[0].length, no: result2[0].length };
      }
    } catch (error) {
    } finally {
      if (this.connection) {
        this.connection.release();
      }
    }
  }
  async getThreatened(healthfacility: string) {
    try {
      const q = `SELECT
      pi.*,
      fv.*,
      p.*
      FROM
      dailyhabitsandlifestyle dh
      JOIN
          firstvisit fv ON dh.firstvisit_id = fv.id
      JOIN
          patients p ON fv.patient_id = p.id
      JOIN
          personalinformation pi ON p.personalinformation_id = pi.id
      WHERE
        dh.threatenedyourlife = ?
      AND pi.healthfacility = ?`;
      const q2 = `SELECT
      pi.*,
      fv.*,
      p.*
      FROM
      dailyhabitsandlifestyle dh
      JOIN
          firstvisit fv ON dh.firstvisit_id = fv.id
      JOIN
          patients p ON fv.patient_id = p.id
      JOIN
          personalinformation pi ON p.personalinformation_id = pi.id
      WHERE
        dh.threatenedyourlife = ?
      AND pi.healthfacility = ?`;
      const result = await this.connection.execute(q, ["yes", healthfacility]);
      const result2 = await this.connection.execute(q2, ["no", healthfacility]);
      if (Array.isArray(result[0]) && Array.isArray(result2[0])) {
        return { yes: result[0].length, no: result2[0].length };
      }
    } catch (error) {
    } finally {
      if (this.connection) {
        this.connection.release();
      }
    }
  }
  async whodoyoulivewith(healthfacility: string) {
    try {
      const q = `SELECT
      pi.*,
      fv.*,
      p.*
      FROM
      dailyhabitsandlifestyle dh
      JOIN
          firstvisit fv ON dh.firstvisit_id = fv.id
      JOIN
          patients p ON fv.patient_id = p.id
      JOIN
          personalinformation pi ON p.personalinformation_id = pi.id
      WHERE
        dh.whodoyoulivewith = ?
      AND pi.healthfacility = ?`;
      const q2 = `SELECT
      pi.*,
      fv.*,
      p.*
      FROM
      dailyhabitsandlifestyle dh
      JOIN
          firstvisit fv ON dh.firstvisit_id = fv.id
      JOIN
          patients p ON fv.patient_id = p.id
      JOIN
          personalinformation pi ON p.personalinformation_id = pi.id
      WHERE
        dh.whodoyoulivewith = ?
      AND pi.healthfacility = ?`;
      const q3 = `SELECT
      pi.*,
      fv.*,
      p.*
      FROM
      dailyhabitsandlifestyle dh
      JOIN
          firstvisit fv ON dh.firstvisit_id = fv.id
      JOIN
          patients p ON fv.patient_id = p.id
      JOIN
          personalinformation pi ON p.personalinformation_id = pi.id
      WHERE
        dh.whodoyoulivewith = ?
      AND pi.healthfacility = ?`;
      const q4 = `SELECT
      pi.*,
      fv.*,
      p.*
      FROM
      dailyhabitsandlifestyle dh
      JOIN
          firstvisit fv ON dh.firstvisit_id = fv.id
      JOIN
          patients p ON fv.patient_id = p.id
      JOIN
          personalinformation pi ON p.personalinformation_id = pi.id
      WHERE
        dh.whodoyoulivewith = ?
      AND pi.healthfacility = ?`;
      const q5 = `SELECT
      pi.*,
      fv.*,
      p.*
      FROM
      dailyhabitsandlifestyle dh
      JOIN
          firstvisit fv ON dh.firstvisit_id = fv.id
      JOIN
          patients p ON fv.patient_id = p.id
      JOIN
          personalinformation pi ON p.personalinformation_id = pi.id
      WHERE
        dh.specifywhodoyoulivewith IS NOT NULL
      AND pi.healthfacility = ? AND specifywhodoyoulivewith <> '';`;
      const result = await this.connection.execute(q, [
        "Partner",
        healthfacility,
      ]);
      const result2 = await this.connection.execute(q2, [
        "Relative",
        healthfacility,
      ]);
      const result3 = await this.connection.execute(q3, [
        "Alone",
        healthfacility,
      ]);
      const result4 = await this.connection.execute(q4, [
        "Friend",
        healthfacility,
      ]);
      const result5 = await this.connection.execute(q5, [healthfacility]);
      if (
        Array.isArray(result5[0]) &&
        Array.isArray(result[0]) &&
        Array.isArray(result2[0]) &&
        Array.isArray(result3[0]) &&
        Array.isArray(result4[0])
      ) {
        return {
          partner: result[0].length,
          relative: result2[0].length,
          alone: result3[0].length,
          friend: result4[0].length,
          others: result5[0].length,
        };
      }
    } catch (error) {
    } finally {
      if (this.connection) {
        this.connection.release();
      }
    }
  }
  //medicalhistory
  async getcough(healthfacility: string) {
    try {
      const q = `SELECT
      pi.*,
      fv.*,
      p.*
      FROM
      medicalhistory mh
      JOIN
          firstvisit fv ON mh.firstvisit_id = fv.id
      JOIN
          patients p ON fv.patient_id = p.id
      JOIN
          personalinformation pi ON p.personalinformation_id = pi.id
      WHERE
        mh.cough = ?
      AND pi.healthfacility = ?`;
      const q2 = `SELECT
      pi.*,
      fv.*,
      p.*
      FROM
      medicalhistory mh
      JOIN
          firstvisit fv ON mh.firstvisit_id = fv.id
      JOIN
          patients p ON fv.patient_id = p.id
      JOIN
          personalinformation pi ON p.personalinformation_id = pi.id
      WHERE
        mh.cough = ?
      AND pi.healthfacility = ?`;

      const result = await this.connection.execute(q, ["Yes", healthfacility]);
      const result2 = await this.connection.execute(q2, ["No", healthfacility]);
      if (Array.isArray(result2[0]) && Array.isArray(result[0])) {
        return { yes: result[0].length, no: result2[0].length };
      }
    } catch (error) {
    } finally {
      if (this.connection) {
        this.connection.release();
      }
    }
  }
  async getpalpitations(healthfacility: string) {
    try {
      const q = `SELECT
      pi.*,
      fv.*,
      p.*
      FROM
      medicalhistory mh
      JOIN
          firstvisit fv ON mh.firstvisit_id = fv.id
      JOIN
          patients p ON fv.patient_id = p.id
      JOIN
          personalinformation pi ON p.personalinformation_id = pi.id
      WHERE
        mh.palpitations = ?
      AND pi.healthfacility = ?`;
      const q2 = `SELECT
      pi.*,
      fv.*,
      p.*
      FROM
      medicalhistory mh
      JOIN
          firstvisit fv ON mh.firstvisit_id = fv.id
      JOIN
          patients p ON fv.patient_id = p.id
      JOIN
          personalinformation pi ON p.personalinformation_id = pi.id
      WHERE
        mh.palpitations = ?
      AND pi.healthfacility = ?`;

      const result = await this.connection.execute(q, ["Yes", healthfacility]);
      const result2 = await this.connection.execute(q2, ["No", healthfacility]);
      if (Array.isArray(result[0]) && Array.isArray(result2[0])) {
        return {
          yes: result[0].length,
          no: result2[0].length,
        };
      }
    } catch (error) {
    } finally {
      if (this.connection) {
        this.connection.release();
      }
    }
  }
  async getdifficultybreathing(healthfacility: string) {
    try {
      const q = `SELECT
      pi.*,
      fv.*,
      p.*
      FROM
      medicalhistory mh
      JOIN
          firstvisit fv ON mh.firstvisit_id = fv.id
      JOIN
          patients p ON fv.patient_id = p.id
      JOIN
          personalinformation pi ON p.personalinformation_id = pi.id
      WHERE
        mh.difficultybreathing = ?
      AND pi.healthfacility = ?`;
      const q2 = `SELECT
      pi.*,
      fv.*,
      p.*
      FROM
      medicalhistory mh
      JOIN
          firstvisit fv ON mh.firstvisit_id = fv.id
      JOIN
          patients p ON fv.patient_id = p.id
      JOIN
          personalinformation pi ON p.personalinformation_id = pi.id
      WHERE
        mh.difficultybreathing = ?
      AND pi.healthfacility = ?`;

      const result = await this.connection.execute(q, ["Yes", healthfacility]);
      const result2 = await this.connection.execute(q2, ["No", healthfacility]);
      if (Array.isArray(result[0]) && Array.isArray(result2[0])) {
        return {
          yes: result[0].length,
          no: result2[0].length,
        };
      }
    } catch (error) {
    } finally {
      if (this.connection) {
        this.connection.release();
      }
    }
  }
  async getswellingoffeet(healthfacility: string) {
    try {
      const q = `SELECT
      pi.*,
      fv.*,
      p.*
      FROM
      medicalhistory mh
      JOIN
          firstvisit fv ON mh.firstvisit_id = fv.id
      JOIN
          patients p ON fv.patient_id = p.id
      JOIN
          personalinformation pi ON p.personalinformation_id = pi.id
      WHERE
        mh.swellingfeet = ?
      AND pi.healthfacility = ?`;
      const q2 = `SELECT
      pi.*,
      fv.*,
      p.*
      FROM
      medicalhistory mh
      JOIN
          firstvisit fv ON mh.firstvisit_id = fv.id
      JOIN
          patients p ON fv.patient_id = p.id
      JOIN
          personalinformation pi ON p.personalinformation_id = pi.id
      WHERE
        mh.swellingfeet = ?
      AND pi.healthfacility = ?`;

      const result = await this.connection.execute(q, ["Yes", healthfacility]);
      const result2 = await this.connection.execute(q2, ["No", healthfacility]);
      if (Array.isArray(result[0]) && Array.isArray(result2[0])) {
        return {
          yes: result[0].length,
          no: result2[0].length,
        };
      }
    } catch (error) {
    } finally {
      if (this.connection) {
        this.connection.release();
      }
    }
  }
  async getchestpain(healthfacility: string) {
    try {
      const q = `SELECT
      pi.*,
      fv.*,
      p.*
      FROM
      medicalhistory mh
      JOIN
          firstvisit fv ON mh.firstvisit_id = fv.id
      JOIN
          patients p ON fv.patient_id = p.id
      JOIN
          personalinformation pi ON p.personalinformation_id = pi.id
      WHERE
        mh.severechestpain = ?
      AND pi.healthfacility = ?`;
      const q2 = `SELECT
      pi.*,
      fv.*,
      p.*
      FROM
      medicalhistory mh
      JOIN
          firstvisit fv ON mh.firstvisit_id = fv.id
      JOIN
          patients p ON fv.patient_id = p.id
      JOIN
          personalinformation pi ON p.personalinformation_id = pi.id
      WHERE
        mh.severechestpain = ?
      AND pi.healthfacility = ?`;

      const result = await this.connection.execute(q, ["Yes", healthfacility]);
      const result2 = await this.connection.execute(q2, ["No", healthfacility]);
      if (Array.isArray(result[0]) && Array.isArray(result2[0])) {
        return {
          yes: result[0].length,
          no: result2[0].length,
        };
      }
    } catch (error) {
    } finally {
      if (this.connection) {
        this.connection.release();
      }
    }
  }
  async getepigastricpain(healthfacility: string) {
    try {
      const q = `SELECT
      pi.*,
      fv.*,
      p.*
      FROM
      medicalhistory mh
      JOIN
          firstvisit fv ON mh.firstvisit_id = fv.id
      JOIN
          patients p ON fv.patient_id = p.id
      JOIN
          personalinformation pi ON p.personalinformation_id = pi.id
      WHERE
        mh.severeepigastricpain = ?
      AND pi.healthfacility = ?`;
      const q2 = `SELECT
      pi.*,
      fv.*,
      p.*
      FROM
      medicalhistory mh
      JOIN
          firstvisit fv ON mh.firstvisit_id = fv.id
      JOIN
          patients p ON fv.patient_id = p.id
      JOIN
          personalinformation pi ON p.personalinformation_id = pi.id
      WHERE
        mh.severeepigastricpain = ?
      AND pi.healthfacility = ?`;

      const result = await this.connection.execute(q, ["Yes", healthfacility]);
      const result2 = await this.connection.execute(q2, ["No", healthfacility]);
      if (Array.isArray(result[0]) && Array.isArray(result2[0])) {
        return {
          yes: result[0].length,
          no: result2[0].length,
        };
      }
    } catch (error) {
    } finally {
      if (this.connection) {
        this.connection.release();
      }
    }
  }
  async getseveretiredness(healthfacility: string) {
    try {
      const q = `SELECT
      pi.*,
      fv.*,
      p.*
      FROM
      medicalhistory mh
      JOIN
          firstvisit fv ON mh.firstvisit_id = fv.id
      JOIN
          patients p ON fv.patient_id = p.id
      JOIN
          personalinformation pi ON p.personalinformation_id = pi.id
      WHERE
        mh.severetiredness = ?
      AND pi.healthfacility = ?`;
      const q2 = `SELECT
      pi.*,
      fv.*,
      p.*
      FROM
      medicalhistory mh
      JOIN
          firstvisit fv ON mh.firstvisit_id = fv.id
      JOIN
          patients p ON fv.patient_id = p.id
      JOIN
          personalinformation pi ON p.personalinformation_id = pi.id
      WHERE
        mh.severetiredness = ?
      AND pi.healthfacility = ?`;

      const result = await this.connection.execute(q, ["Yes", healthfacility]);
      const result2 = await this.connection.execute(q2, ["No", healthfacility]);
      if (Array.isArray(result[0]) && Array.isArray(result2[0])) {
        return {
          yes: result[0].length,
          no: result2[0].length,
        };
      }
    } catch (error) {
    } finally {
      if (this.connection) {
        this.connection.release();
      }
    }
  }
  async getsevereabdominalpain(healthfacility: string) {
    try {
      const q = `SELECT
      pi.*,
      fv.*,
      p.*
      FROM
      medicalhistory mh
      JOIN
          firstvisit fv ON mh.firstvisit_id = fv.id
      JOIN
          patients p ON fv.patient_id = p.id
      JOIN
          personalinformation pi ON p.personalinformation_id = pi.id
      WHERE
        mh.severeabdominalpain = ?
      AND pi.healthfacility = ?`;
      const q2 = `SELECT
      pi.*,
      fv.*,
      p.*
      FROM
      medicalhistory mh
      JOIN
          firstvisit fv ON mh.firstvisit_id = fv.id
      JOIN
          patients p ON fv.patient_id = p.id
      JOIN
          personalinformation pi ON p.personalinformation_id = pi.id
      WHERE
        mh.severeabdominalpain = ?
      AND pi.healthfacility = ?`;

      const result = await this.connection.execute(q, ["Yes", healthfacility]);
      const result2 = await this.connection.execute(q2, ["No", healthfacility]);
      if (Array.isArray(result[0]) && Array.isArray(result2[0])) {
        return {
          yes: result[0].length,
          no: result2[0].length,
        };
      }
    } catch (error) {
    } finally {
      if (this.connection) {
        this.connection.release();
      }
    }
  }
  async getpersistentvomiting(healthfacility: string) {
    try {
      const q = `SELECT
      pi.*,
      fv.*,
      p.*
      FROM
      medicalhistory mh
      JOIN
          firstvisit fv ON mh.firstvisit_id = fv.id
      JOIN
          patients p ON fv.patient_id = p.id
      JOIN
          personalinformation pi ON p.personalinformation_id = pi.id
      WHERE
        mh.persistentvomiting = ?
      AND pi.healthfacility = ?`;
      const q2 = `SELECT
      pi.*,
      fv.*,
      p.*
      FROM
      medicalhistory mh
      JOIN
          firstvisit fv ON mh.firstvisit_id = fv.id
      JOIN
          patients p ON fv.patient_id = p.id
      JOIN
          personalinformation pi ON p.personalinformation_id = pi.id
      WHERE
        mh.persistentvomiting = ?
      AND pi.healthfacility = ?`;

      const result = await this.connection.execute(q, ["Yes", healthfacility]);
      const result2 = await this.connection.execute(q2, ["No", healthfacility]);
      if (Array.isArray(result[0]) && Array.isArray(result2[0])) {
        return {
          yes: result[0].length,
          no: result2[0].length,
        };
      }
    } catch (error) {
    } finally {
      if (this.connection) {
        this.connection.release();
      }
    }
  }
  async getseverediarrhoea(healthfacility: string) {
    try {
      const q = `SELECT
      pi.*,
      fv.*,
      p.*
      FROM
      medicalhistory mh
      JOIN
          firstvisit fv ON mh.firstvisit_id = fv.id
      JOIN
          patients p ON fv.patient_id = p.id
      JOIN
          personalinformation pi ON p.personalinformation_id = pi.id
      WHERE
        mh.severediarrhoea = ?
      AND pi.healthfacility = ?`;
      const q2 = `SELECT
      pi.*,
      fv.*,
      p.*
      FROM
      medicalhistory mh
      JOIN
          firstvisit fv ON mh.firstvisit_id = fv.id
      JOIN
          patients p ON fv.patient_id = p.id
      JOIN
          personalinformation pi ON p.personalinformation_id = pi.id
      WHERE
        mh.severediarrhoea = ?
      AND pi.healthfacility = ?`;

      const result = await this.connection.execute(q, ["Yes", healthfacility]);
      const result2 = await this.connection.execute(q2, ["No", healthfacility]);
      if (Array.isArray(result[0]) && Array.isArray(result2[0])) {
        return {
          yes: result[0].length,
          no: result2[0].length,
        };
      }
    } catch (error) {
    } finally {
      if (this.connection) {
        this.connection.release();
      }
    }
  }
  //urinary
  async getpainwithurination(healthfacility: string) {
    try {
      const q = `SELECT
      pi.*,
      fv.*,
      p.*
      FROM
      medicalhistory mh
      JOIN
          firstvisit fv ON mh.firstvisit_id = fv.id
      JOIN
          patients p ON fv.patient_id = p.id
      JOIN
          personalinformation pi ON p.personalinformation_id = pi.id
      WHERE
        mh.painwithurination = ?
      AND pi.healthfacility = ?`;
      const q2 = `SELECT
      pi.*,
      fv.*,
      p.*
      FROM
      medicalhistory mh
      JOIN
          firstvisit fv ON mh.firstvisit_id = fv.id
      JOIN
          patients p ON fv.patient_id = p.id
      JOIN
          personalinformation pi ON p.personalinformation_id = pi.id
      WHERE
        mh.painwithurination = ?
      AND pi.healthfacility = ?`;

      const result = await this.connection.execute(q, ["Yes", healthfacility]);
      const result2 = await this.connection.execute(q2, ["No", healthfacility]);
      if (Array.isArray(result[0]) && Array.isArray(result2[0])) {
        return {
          yes: result[0].length,
          no: result2[0].length,
        };
      }
    } catch (error) {
    } finally {
      if (this.connection) {
        this.connection.release();
      }
    }
  }
  async getsevereflankpain(healthfacility: string) {
    try {
      const q = `SELECT
      pi.*,
      fv.*,
      p.*
      FROM
      medicalhistory mh
      JOIN
          firstvisit fv ON mh.firstvisit_id = fv.id
      JOIN
          patients p ON fv.patient_id = p.id
      JOIN
          personalinformation pi ON p.personalinformation_id = pi.id
      WHERE
        mh.severeflankpain = ?
      AND pi.healthfacility = ?`;
      const q2 = `SELECT
      pi.*,
      fv.*,
      p.*
      FROM
      medicalhistory mh
      JOIN
          firstvisit fv ON mh.firstvisit_id = fv.id
      JOIN
          patients p ON fv.patient_id = p.id
      JOIN
          personalinformation pi ON p.personalinformation_id = pi.id
      WHERE
        mh.severeflankpain = ?
      AND pi.healthfacility = ?`;

      const result = await this.connection.execute(q, ["Yes", healthfacility]);
      const result2 = await this.connection.execute(q2, ["No", healthfacility]);
      if (Array.isArray(result[0]) && Array.isArray(result2[0])) {
        return {
          yes: result[0].length,
          no: result2[0].length,
        };
      }
    } catch (error) {
    } finally {
      if (this.connection) {
        this.connection.release();
      }
    }
  }
  async getbloodinurine(healthfacility: string) {
    try {
      const q = `SELECT
      pi.*,
      fv.*,
      p.*
      FROM
      medicalhistory mh
      JOIN
          firstvisit fv ON mh.firstvisit_id = fv.id
      JOIN
          patients p ON fv.patient_id = p.id
      JOIN
          personalinformation pi ON p.personalinformation_id = pi.id
      WHERE
        mh.bloodinurine = ?
      AND pi.healthfacility = ?`;
      const q2 = `SELECT
      pi.*,
      fv.*,
      p.*
      FROM
      medicalhistory mh
      JOIN
          firstvisit fv ON mh.firstvisit_id = fv.id
      JOIN
          patients p ON fv.patient_id = p.id
      JOIN
          personalinformation pi ON p.personalinformation_id = pi.id
      WHERE
        mh.bloodinurine = ?
      AND pi.healthfacility = ?`;

      const result = await this.connection.execute(q, ["Yes", healthfacility]);
      const result2 = await this.connection.execute(q2, ["No", healthfacility]);
      if (Array.isArray(result[0]) && Array.isArray(result2[0])) {
        return {
          yes: result[0].length,
          no: result2[0].length,
        };
      }
    } catch (error) {
    } finally {
      if (this.connection) {
        this.connection.release();
      }
    }
  }
  //gynaelogical
  async getvaginaldischarge(healthfacility: string) {
    try {
      const q = `SELECT
      pi.*,
      fv.*,
      p.*
      FROM
      medicalhistory mh
      JOIN
          firstvisit fv ON mh.firstvisit_id = fv.id
      JOIN
          patients p ON fv.patient_id = p.id
      JOIN
          personalinformation pi ON p.personalinformation_id = pi.id
      WHERE
        mh.vaginaldischarge = ?
      AND pi.healthfacility = ?`;
      const q2 = `SELECT
      pi.*,
      fv.*,
      p.*
      FROM
      medicalhistory mh
      JOIN
          firstvisit fv ON mh.firstvisit_id = fv.id
      JOIN
          patients p ON fv.patient_id = p.id
      JOIN
          personalinformation pi ON p.personalinformation_id = pi.id
      WHERE
        mh.vaginaldischarge = ?
      AND pi.healthfacility = ?`;

      const result = await this.connection.execute(q, ["Yes", healthfacility]);
      const result2 = await this.connection.execute(q2, ["No", healthfacility]);
      if (Array.isArray(result[0]) && Array.isArray(result2[0])) {
        return {
          yes: result[0].length,
          no: result2[0].length,
        };
      }
    } catch (error) {
    } finally {
      if (this.connection) {
        this.connection.release();
      }
    }
  }
  async getdeeppelvicpain(healthfacility: string) {
    try {
      const q = `SELECT
      pi.*,
      fv.*,
      p.*
      FROM
      medicalhistory mh
      JOIN
          firstvisit fv ON mh.firstvisit_id = fv.id
      JOIN
          patients p ON fv.patient_id = p.id
      JOIN
          personalinformation pi ON p.personalinformation_id = pi.id
      WHERE
        mh.deeppelvicpain = ?
      AND pi.healthfacility = ?`;
      const q2 = `SELECT
      pi.*,
      fv.*,
      p.*
      FROM
      medicalhistory mh
      JOIN
          firstvisit fv ON mh.firstvisit_id = fv.id
      JOIN
          patients p ON fv.patient_id = p.id
      JOIN
          personalinformation pi ON p.personalinformation_id = pi.id
      WHERE
        mh.deeppelvicpain = ?
      AND pi.healthfacility = ?`;

      const result = await this.connection.execute(q, ["Yes", healthfacility]);
      const result2 = await this.connection.execute(q2, ["No", healthfacility]);
      if (Array.isArray(result[0]) && Array.isArray(result2[0])) {
        return {
          yes: result[0].length,
          no: result2[0].length,
        };
      }
    } catch (error) {
    } finally {
      if (this.connection) {
        this.connection.release();
      }
    }
  }
  async getsyphilis(healthfacility: string) {
    try {
      const q = `SELECT
      pi.*,
      fv.*,
      p.*
      FROM
      medicalhistory mh
      JOIN
          firstvisit fv ON mh.firstvisit_id = fv.id
      JOIN
          patients p ON fv.patient_id = p.id
      JOIN
          personalinformation pi ON p.personalinformation_id = pi.id
      WHERE
        mh.syphilis = ?
      AND pi.healthfacility = ?`;
      const q2 = `SELECT
      pi.*,
      fv.*,
      p.*
      FROM
      medicalhistory mh
      JOIN
          firstvisit fv ON mh.firstvisit_id = fv.id
      JOIN
          patients p ON fv.patient_id = p.id
      JOIN
          personalinformation pi ON p.personalinformation_id = pi.id
      WHERE
        mh.syphilis = ?
      AND pi.healthfacility = ?`;

      const result = await this.connection.execute(q, ["Yes", healthfacility]);
      const result2 = await this.connection.execute(q2, ["No", healthfacility]);
      if (Array.isArray(result[0]) && Array.isArray(result2[0])) {
        return {
          yes: result[0].length,
          no: result2[0].length,
        };
      }
    } catch (error) {
    } finally {
      if (this.connection) {
        this.connection.release();
      }
    }
  }
  async getpersistentdrycough(healthfacility: string) {
    try {
      const q = `SELECT
      pi.*,
      fv.*,
      p.*
      FROM
      medicalhistory mh
      JOIN
          firstvisit fv ON mh.firstvisit_id = fv.id
      JOIN
          patients p ON fv.patient_id = p.id
      JOIN
          personalinformation pi ON p.personalinformation_id = pi.id
      WHERE
        mh.persistentdrycough = ?
      AND pi.healthfacility = ?`;
      const q2 = `SELECT
      pi.*,
      fv.*,
      p.*
      FROM
      medicalhistory mh
      JOIN
          firstvisit fv ON mh.firstvisit_id = fv.id
      JOIN
          patients p ON fv.patient_id = p.id
      JOIN
          personalinformation pi ON p.personalinformation_id = pi.id
      WHERE
        mh.persistentdrycough = ?
      AND pi.healthfacility = ?`;

      const result = await this.connection.execute(q, ["Yes", healthfacility]);
      const result2 = await this.connection.execute(q2, ["No", healthfacility]);
      if (Array.isArray(result[0]) && Array.isArray(result2[0])) {
        return {
          yes: result[0].length,
          no: result2[0].length,
        };
      }
    } catch (error) {
    } finally {
      if (this.connection) {
        this.connection.release();
      }
    }
  }
  async getprogressiveweightloss(healthfacility: string) {
    try {
      const q = `SELECT
      pi.*,
      fv.*,
      p.*
      FROM
      medicalhistory mh
      JOIN
          firstvisit fv ON mh.firstvisit_id = fv.id
      JOIN
          patients p ON fv.patient_id = p.id
      JOIN
          personalinformation pi ON p.personalinformation_id = pi.id
      WHERE
        mh.progressiveweightloss = ?
      AND pi.healthfacility = ?`;
      const q2 = `SELECT
      pi.*,
      fv.*,
      p.*
      FROM
      medicalhistory mh
      JOIN
          firstvisit fv ON mh.firstvisit_id = fv.id
      JOIN
          patients p ON fv.patient_id = p.id
      JOIN
          personalinformation pi ON p.personalinformation_id = pi.id
      WHERE
        mh.progressiveweightloss = ?
      AND pi.healthfacility = ?`;

      const result = await this.connection.execute(q, ["Yes", healthfacility]);
      const result2 = await this.connection.execute(q2, ["No", healthfacility]);
      if (Array.isArray(result[0]) && Array.isArray(result2[0])) {
        return {
          yes: result[0].length,
          no: result2[0].length,
        };
      }
    } catch (error) {
    } finally {
      if (this.connection) {
        this.connection.release();
      }
    }
  }
  async getnightsweats(healthfacility: string) {
    try {
      const q = `SELECT
      pi.*,
      fv.*,
      p.*
      FROM
      medicalhistory mh
      JOIN
          firstvisit fv ON mh.firstvisit_id = fv.id
      JOIN
          patients p ON fv.patient_id = p.id
      JOIN
          personalinformation pi ON p.personalinformation_id = pi.id
      WHERE
        mh.nightsweats = ?
      AND pi.healthfacility = ?`;
      const q2 = `SELECT
      pi.*,
      fv.*,
      p.*
      FROM
      medicalhistory mh
      JOIN
          firstvisit fv ON mh.firstvisit_id = fv.id
      JOIN
          patients p ON fv.patient_id = p.id
      JOIN
          personalinformation pi ON p.personalinformation_id = pi.id
      WHERE
        mh.nightsweats = ?
      AND pi.healthfacility = ?`;

      const result = await this.connection.execute(q, ["Yes", healthfacility]);
      const result2 = await this.connection.execute(q2, ["No", healthfacility]);
      if (Array.isArray(result[0]) && Array.isArray(result2[0])) {
        return {
          yes: result[0].length,
          no: result2[0].length,
        };
      }
    } catch (error) {
    } finally {
      if (this.connection) {
        this.connection.release();
      }
    }
  }
  async getdiagnosedwithtuberculosis(healthfacility: string) {
    try {
      const q = `SELECT
      pi.*,
      fv.*,
      p.*
      FROM
      medicalhistory mh
      JOIN
          firstvisit fv ON mh.firstvisit_id = fv.id
      JOIN
          patients p ON fv.patient_id = p.id
      JOIN
          personalinformation pi ON p.personalinformation_id = pi.id
      WHERE
        mh.diagnosedwithtuberculosis = ?
      AND pi.healthfacility = ?`;
      const q2 = `SELECT
      pi.*,
      fv.*,
      p.*
      FROM
      medicalhistory mh
      JOIN
          firstvisit fv ON mh.firstvisit_id = fv.id
      JOIN
          patients p ON fv.patient_id = p.id
      JOIN
          personalinformation pi ON p.personalinformation_id = pi.id
      WHERE
        mh.diagnosedwithtuberculosis = ?
      AND pi.healthfacility = ?`;

      const result = await this.connection.execute(q, ["Yes", healthfacility]);
      const result2 = await this.connection.execute(q2, ["No", healthfacility]);
      if (Array.isArray(result[0]) && Array.isArray(result2[0])) {
        return {
          yes: result[0].length,
          no: result2[0].length,
        };
      }
    } catch (error) {
    } finally {
      if (this.connection) {
        this.connection.release();
      }
    }
  }
  async gettreatedTBpreviously(healthfacility: string) {
    try {
      const q = `SELECT
      pi.*,
      fv.*,
      p.*
      FROM
      medicalhistory mh
      JOIN
          firstvisit fv ON mh.firstvisit_id = fv.id
      JOIN
          patients p ON fv.patient_id = p.id
      JOIN
          personalinformation pi ON p.personalinformation_id = pi.id
      WHERE
        mh.treatedTBpreviously = ?
      AND pi.healthfacility = ?`;
      const q2 = `SELECT
      pi.*,
      fv.*,
      p.*
      FROM
      medicalhistory mh
      JOIN
          firstvisit fv ON mh.firstvisit_id = fv.id
      JOIN
          patients p ON fv.patient_id = p.id
      JOIN
          personalinformation pi ON p.personalinformation_id = pi.id
      WHERE
        mh.treatedTBpreviously = ?
      AND pi.healthfacility = ?`;

      const result = await this.connection.execute(q, ["Yes", healthfacility]);
      const result2 = await this.connection.execute(q2, ["No", healthfacility]);
      if (Array.isArray(result[0]) && Array.isArray(result2[0])) {
        return {
          yes: result[0].length,
          no: result2[0].length,
        };
      }
    } catch (error) {
    } finally {
      if (this.connection) {
        this.connection.release();
      }
    }
  }
  //pastmedicalhistory
  async getheartdisease(healthfacility: string) {
    try {
      const q = `SELECT
      pi.*,
      fv.*,
      p.*
      FROM
      pastmedicalhistory pmh
      JOIN
          firstvisit fv ON pmh.firstvisit_id = fv.id
      JOIN
          patients p ON fv.patient_id = p.id
      JOIN
          personalinformation pi ON p.personalinformation_id = pi.id
      WHERE
        pmh.heartdisease = ?
      AND pi.healthfacility = ?`;
      const q2 = `SELECT
      pi.*,
      fv.*,
      p.*
      FROM
      pastmedicalhistory pmh
      JOIN
          firstvisit fv ON pmh.firstvisit_id = fv.id
      JOIN
          patients p ON fv.patient_id = p.id
      JOIN
          personalinformation pi ON p.personalinformation_id = pi.id
      WHERE
        pmh.heartdisease = ?
      AND pi.healthfacility = ?`;

      const result = await this.connection.execute(q, ["Yes", healthfacility]);
      const result2 = await this.connection.execute(q2, ["No", healthfacility]);
      if (Array.isArray(result[0]) && Array.isArray(result2[0])) {
        return {
          yes: result[0].length,
          no: result2[0].length,
        };
      }
    } catch (error) {
    } finally {
      if (this.connection) {
        this.connection.release();
      }
    }
  }
  async getanaemia(healthfacility: string) {
    try {
      const q = `SELECT
      pi.*,
      fv.*,
      p.*
      FROM
      pastmedicalhistory pmh
      JOIN
          firstvisit fv ON pmh.firstvisit_id = fv.id
      JOIN
          patients p ON fv.patient_id = p.id
      JOIN
          personalinformation pi ON p.personalinformation_id = pi.id
      WHERE
        pmh.anaemia = ?
      AND pi.healthfacility = ?`;
      const q2 = `SELECT
      pi.*,
      fv.*,
      p.*
      FROM
      pastmedicalhistory pmh
      JOIN
          firstvisit fv ON pmh.firstvisit_id = fv.id
      JOIN
          patients p ON fv.patient_id = p.id
      JOIN
          personalinformation pi ON p.personalinformation_id = pi.id
      WHERE
        pmh.anaemia = ?
      AND pi.healthfacility = ?`;

      const result = await this.connection.execute(q, ["Yes", healthfacility]);
      const result2 = await this.connection.execute(q2, ["No", healthfacility]);
      if (Array.isArray(result[0]) && Array.isArray(result2[0])) {
        return {
          yes: result[0].length,
          no: result2[0].length,
        };
      }
    } catch (error) {
    } finally {
      if (this.connection) {
        this.connection.release();
      }
    }
  }
  async getkidneydisease(healthfacility: string) {
    try {
      const q = `SELECT
      pi.*,
      fv.*,
      p.*
      FROM
      pastmedicalhistory pmh
      JOIN
          firstvisit fv ON pmh.firstvisit_id = fv.id
      JOIN
          patients p ON fv.patient_id = p.id
      JOIN
          personalinformation pi ON p.personalinformation_id = pi.id
      WHERE
        pmh.kidneydisease = ?
      AND pi.healthfacility = ?`;
      const q2 = `SELECT
      pi.*,
      fv.*,
      p.*
      FROM
      pastmedicalhistory pmh
      JOIN
          firstvisit fv ON pmh.firstvisit_id = fv.id
      JOIN
          patients p ON fv.patient_id = p.id
      JOIN
          personalinformation pi ON p.personalinformation_id = pi.id
      WHERE
        pmh.kidneydisease = ?
      AND pi.healthfacility = ?`;

      const result = await this.connection.execute(q, ["Yes", healthfacility]);
      const result2 = await this.connection.execute(q2, ["No", healthfacility]);
      if (Array.isArray(result[0]) && Array.isArray(result2[0])) {
        return {
          yes: result[0].length,
          no: result2[0].length,
        };
      }
    } catch (error) {
    } finally {
      if (this.connection) {
        this.connection.release();
      }
    }
  }
  async getsicklecell(healthfacility: string) {
    try {
      const q = `SELECT
      pi.*,
      fv.*,
      p.*
      FROM
      pastmedicalhistory pmh
      JOIN
          firstvisit fv ON pmh.firstvisit_id = fv.id
      JOIN
          patients p ON fv.patient_id = p.id
      JOIN
          personalinformation pi ON p.personalinformation_id = pi.id
      WHERE
        pmh.sicklecell = ?
      AND pi.healthfacility = ?`;
      const q2 = `SELECT
      pi.*,
      fv.*,
      p.*
      FROM
      pastmedicalhistory pmh
      JOIN
          firstvisit fv ON pmh.firstvisit_id = fv.id
      JOIN
          patients p ON fv.patient_id = p.id
      JOIN
          personalinformation pi ON p.personalinformation_id = pi.id
      WHERE
        pmh.sicklecell = ?
      AND pi.healthfacility = ?`;

      const result = await this.connection.execute(q, ["Yes", healthfacility]);
      const result2 = await this.connection.execute(q2, ["No", healthfacility]);
      if (Array.isArray(result[0]) && Array.isArray(result2[0])) {
        return {
          yes: result[0].length,
          no: result2[0].length,
        };
      }
    } catch (error) {
    } finally {
      if (this.connection) {
        this.connection.release();
      }
    }
  }
  async getdiabetes(healthfacility: string) {
    try {
      const q = `SELECT
      pi.*,
      fv.*,
      p.*
      FROM
      pastmedicalhistory pmh
      JOIN
          firstvisit fv ON pmh.firstvisit_id = fv.id
      JOIN
          patients p ON fv.patient_id = p.id
      JOIN
          personalinformation pi ON p.personalinformation_id = pi.id
      WHERE
        pmh.diabetes = ?
      AND pi.healthfacility = ?`;
      const q2 = `SELECT
      pi.*,
      fv.*,
      p.*
      FROM
      pastmedicalhistory pmh
      JOIN
          firstvisit fv ON pmh.firstvisit_id = fv.id
      JOIN
          patients p ON fv.patient_id = p.id
      JOIN
          personalinformation pi ON p.personalinformation_id = pi.id
      WHERE
        pmh.diabetes = ?
      AND pi.healthfacility = ?`;

      const result = await this.connection.execute(q, ["Yes", healthfacility]);
      const result2 = await this.connection.execute(q2, ["No", healthfacility]);
      if (Array.isArray(result[0]) && Array.isArray(result2[0])) {
        return {
          yes: result[0].length,
          no: result2[0].length,
        };
      }
    } catch (error) {
    } finally {
      if (this.connection) {
        this.connection.release();
      }
    }
  }
  async getgoitre(healthfacility: string) {
    try {
      const q = `SELECT
      pi.*,
      fv.*,
      p.*
      FROM
      pastmedicalhistory pmh
      JOIN
          firstvisit fv ON pmh.firstvisit_id = fv.id
      JOIN
          patients p ON fv.patient_id = p.id
      JOIN
          personalinformation pi ON p.personalinformation_id = pi.id
      WHERE
        pmh.goitre = ?
      AND pi.healthfacility = ?`;
      const q2 = `SELECT
      pi.*,
      fv.*,
      p.*
      FROM
      pastmedicalhistory pmh
      JOIN
          firstvisit fv ON pmh.firstvisit_id = fv.id
      JOIN
          patients p ON fv.patient_id = p.id
      JOIN
          personalinformation pi ON p.personalinformation_id = pi.id
      WHERE
        pmh.goitre = ?
      AND pi.healthfacility = ?`;

      const result = await this.connection.execute(q, ["Yes", healthfacility]);
      const result2 = await this.connection.execute(q2, ["No", healthfacility]);
      if (Array.isArray(result[0]) && Array.isArray(result2[0])) {
        return {
          yes: result[0].length,
          no: result2[0].length,
        };
      }
    } catch (error) {
    } finally {
      if (this.connection) {
        this.connection.release();
      }
    }
  }
  async gethivaids(healthfacility: string) {
    try {
      const q = `SELECT
      pi.*,
      fv.*,
      p.*
      FROM
      pastmedicalhistory pmh
      JOIN
          firstvisit fv ON pmh.firstvisit_id = fv.id
      JOIN
          patients p ON fv.patient_id = p.id
      JOIN
          personalinformation pi ON p.personalinformation_id = pi.id
      WHERE
        pmh.hivaids = ?
      AND pi.healthfacility = ?`;
      const q2 = `SELECT
      pi.*,
      fv.*,
      p.*
      FROM
      pastmedicalhistory pmh
      JOIN
          firstvisit fv ON pmh.firstvisit_id = fv.id
      JOIN
          patients p ON fv.patient_id = p.id
      JOIN
          personalinformation pi ON p.personalinformation_id = pi.id
      WHERE
        pmh.hivaids = ?
      AND pi.healthfacility = ?`;

      const result = await this.connection.execute(q, ["Yes", healthfacility]);
      const result2 = await this.connection.execute(q2, ["No", healthfacility]);
      if (Array.isArray(result[0]) && Array.isArray(result2[0])) {
        return {
          yes: result[0].length,
          no: result2[0].length,
        };
      }
    } catch (error) {
    } finally {
      if (this.connection) {
        this.connection.release();
      }
    }
  }
  async getotherseriouschronicillnesses(healthfacility: string) {
    try {
      const q = `SELECT
      pi.*,
      fv.*,
      p.*
      FROM
      pastmedicalhistory pmh
      JOIN
          firstvisit fv ON pmh.firstvisit_id = fv.id
      JOIN
          patients p ON fv.patient_id = p.id
      JOIN
          personalinformation pi ON p.personalinformation_id = pi.id
      WHERE
        pmh.otherseriouschronicillnesses = ?
      AND pi.healthfacility = ?`;
      const q2 = `SELECT
      pi.*,
      fv.*,
      p.*
      FROM
      pastmedicalhistory pmh
      JOIN
          firstvisit fv ON pmh.firstvisit_id = fv.id
      JOIN
          patients p ON fv.patient_id = p.id
      JOIN
          personalinformation pi ON p.personalinformation_id = pi.id
      WHERE
        pmh.otherseriouschronicillnesses = ?
      AND pi.healthfacility = ?`;

      const result = await this.connection.execute(q, ["Yes", healthfacility]);
      const result2 = await this.connection.execute(q2, ["No", healthfacility]);
      if (Array.isArray(result[0]) && Array.isArray(result2[0])) {
        return {
          yes: result[0].length,
          no: result2[0].length,
        };
      }
    } catch (error) {
    } finally {
      if (this.connection) {
        this.connection.release();
      }
    }
  }
  async gethadsurgery(healthfacility: string) {
    try {
      const q = `SELECT
      pi.*,
      fv.*,
      p.*
      FROM
      pastmedicalhistory pmh
      JOIN
          firstvisit fv ON pmh.firstvisit_id = fv.id
      JOIN
          patients p ON fv.patient_id = p.id
      JOIN
          personalinformation pi ON p.personalinformation_id = pi.id
      WHERE
        pmh.hadsurgery = ?
      AND pi.healthfacility = ?`;
      const q2 = `SELECT
      pi.*,
      fv.*,
      p.*
      FROM
      pastmedicalhistory pmh
      JOIN
          firstvisit fv ON pmh.firstvisit_id = fv.id
      JOIN
          patients p ON fv.patient_id = p.id
      JOIN
          personalinformation pi ON p.personalinformation_id = pi.id
      WHERE
        pmh.hadsurgery = ?
      AND pi.healthfacility = ?`;

      const result = await this.connection.execute(q, ["Yes", healthfacility]);
      const result2 = await this.connection.execute(q2, ["No", healthfacility]);
      if (Array.isArray(result[0]) && Array.isArray(result2[0])) {
        return {
          yes: result[0].length,
          no: result2[0].length,
        };
      }
    } catch (error) {
    } finally {
      if (this.connection) {
        this.connection.release();
      }
    }
  }
  //drug history
  async getherbalremedies(healthfacility: string) {
    try {
      const q = `SELECT
      pi.*,
      fv.*,
      p.*
      FROM
      drughistory dh
      JOIN
          firstvisit fv ON dh.firstvisit_id = fv.id
      JOIN
          patients p ON fv.patient_id = p.id
      JOIN
          personalinformation pi ON p.personalinformation_id = pi.id
      WHERE
        dh.herbalremedies = ?
      AND pi.healthfacility = ?`;
      const q2 = `SELECT
      pi.*,
      fv.*,
      p.*
      FROM
      drughistory dh
      JOIN
          firstvisit fv ON dh.firstvisit_id = fv.id
      JOIN
          patients p ON fv.patient_id = p.id
      JOIN
          personalinformation pi ON p.personalinformation_id = pi.id
      WHERE
        dh.herbalremedies = ?
      AND pi.healthfacility = ?`;

      const result = await this.connection.execute(q, ["Yes", healthfacility]);
      const result2 = await this.connection.execute(q2, ["No", healthfacility]);
      if (Array.isArray(result[0]) && Array.isArray(result2[0])) {
        return {
          yes: result[0].length,
          no: result2[0].length,
        };
      }
    } catch (error) {
    } finally {
      if (this.connection) {
        this.connection.release();
      }
    }
  }
  async getotcdrugs(healthfacility: string) {
    try {
      const q = `SELECT
      pi.*,
      fv.*,
      p.*
      FROM
      drughistory dh
      JOIN
          firstvisit fv ON dh.firstvisit_id = fv.id
      JOIN
          patients p ON fv.patient_id = p.id
      JOIN
          personalinformation pi ON p.personalinformation_id = pi.id
      WHERE
        dh.otcdrugs = ?
      AND pi.healthfacility = ?`;
      const q2 = `SELECT
      pi.*,
      fv.*,
      p.*
      FROM
      drughistory dh
      JOIN
          firstvisit fv ON dh.firstvisit_id = fv.id
      JOIN
          patients p ON fv.patient_id = p.id
      JOIN
          personalinformation pi ON p.personalinformation_id = pi.id
      WHERE
        dh.otcdrugs = ?
      AND pi.healthfacility = ?`;

      const result = await this.connection.execute(q, ["Yes", healthfacility]);
      const result2 = await this.connection.execute(q2, ["No", healthfacility]);
      if (Array.isArray(result[0]) && Array.isArray(result2[0])) {
        return {
          yes: result[0].length,
          no: result2[0].length,
        };
      }
    } catch (error) {
    } finally {
      if (this.connection) {
        this.connection.release();
      }
    }
  }
  async getvitamins(healthfacility: string) {
    try {
      const q = `SELECT
      pi.*,
      fv.*,
      p.*
      FROM
      drughistory dh
      JOIN
          firstvisit fv ON dh.firstvisit_id = fv.id
      JOIN
          patients p ON fv.patient_id = p.id
      JOIN
          personalinformation pi ON p.personalinformation_id = pi.id
      WHERE
        dh.vitamins = ?
      AND pi.healthfacility = ?`;
      const q2 = `SELECd
      pi.*,
      fv.*,
      p.*
      FROM
      drughistory dh
      JOIN
          firstvisit fv ON dh.firstvisit_id = fv.id
      JOIN
          patients p ON fv.patient_id = p.id
      JOIN
          personalinformation pi ON p.personalinformation_id = pi.id
      WHERE
        dh.vitamins = ?
      AND pi.healthfacility = ?`;

      const result = await this.connection.execute(q, ["Yes", healthfacility]);
      const result2 = await this.connection.execute(q2, ["No", healthfacility]);
      if (Array.isArray(result[0]) && Array.isArray(result2[0])) {
        return {
          yes: result[0].length,
          no: result2[0].length,
        };
      }
    } catch (error) {
    } finally {
      if (this.connection) {
        this.connection.release();
      }
    }
  }
  async getdietarysupplements(healthfacility: string) {
    try {
      const q = `SELECT
      pi.*,
      fv.*,
      p.*
      FROM
      drughistory dh
      JOIN
          firstvisit fv ON dh.firstvisit_id = fv.id
      JOIN
          patients p ON fv.patient_id = p.id
      JOIN
          personalinformation pi ON p.personalinformation_id = pi.id
      WHERE
        dh.dietarysupplements = ?
      AND pi.healthfacility = ?`;
      const q2 = `SELECT
      pi.*,
      fv.*,
      p.*
      FROM
      drughistory dh
      JOIN
          firstvisit fv ON dh.firstvisit_id = fv.id
      JOIN
          patients p ON fv.patient_id = p.id
      JOIN
          personalinformation pi ON p.personalinformation_id = pi.id
      WHERE
        dh.dietarysupplements = ?
      AND pi.healthfacility = ?`;

      const result = await this.connection.execute(q, ["Yes", healthfacility]);
      const result2 = await this.connection.execute(q2, ["No", healthfacility]);
      if (Array.isArray(result[0]) && Array.isArray(result2[0])) {
        return {
          yes: result[0].length,
          no: result2[0].length,
        };
      }
    } catch (error) {
    } finally {
      if (this.connection) {
        this.connection.release();
      }
    }
  }
  async gettetanus(healthfacility: string) {
    try {
      const q = `SELECT
      pi.*,
      fv.*,
      p.*
      FROM
      drughistory dh
      JOIN
          firstvisit fv ON dh.firstvisit_id = fv.id
      JOIN
          patients p ON fv.patient_id = p.id
      JOIN
          personalinformation pi ON p.personalinformation_id = pi.id
      WHERE
        dh.tetanus = ?
      AND pi.healthfacility = ?`;
      const q2 = `SELECT
      pi.*,
      fv.*,
      p.*
      FROM
      drughistory dh
      JOIN
          firstvisit fv ON dh.firstvisit_id = fv.id
      JOIN
          patients p ON fv.patient_id = p.id
      JOIN
          personalinformation pi ON p.personalinformation_id = pi.id
      WHERE
        dh.tetanus = ?
      AND pi.healthfacility = ?`;

      const result = await this.connection.execute(q, ["Yes", healthfacility]);
      const result2 = await this.connection.execute(q2, ["No", healthfacility]);
      if (Array.isArray(result[0]) && Array.isArray(result2[0])) {
        return {
          yes: result[0].length,
          no: result2[0].length,
        };
      }
    } catch (error) {
    } finally {
      if (this.connection) {
        this.connection.release();
      }
    }
  }
}
