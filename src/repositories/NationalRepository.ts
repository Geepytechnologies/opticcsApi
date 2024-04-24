import { PoolConnection } from "mysql2/promise";
import logger from "../logger";

export class NationalRepository {
  private connection: PoolConnection;

  constructor(connection: PoolConnection) {
    this.connection = connection;
  }

  async getNationalAdminByUserID(userID: string) {
    const q = `SELECT * FROM nationaladmin WHERE userid = ?`;
    try {
      const result: any = await this.connection.execute(q, [userID]);
      return result;
    } catch (error: any) {
      logger.error(error);
    } finally {
      if (this.connection) {
        this.connection.release();
      }
    }
  }
  async createRefresh(refreshToken: string, userID: string) {
    const q = `UPDATE nationaladmin SET refreshtoken = ? WHERE userid = ?`;
    try {
      console.log("im using %d for refresh", this.connection.threadId);

      await this.connection.execute(q, [refreshToken, userID]);
    } catch (error: any) {
      logger.error(error);
    } finally {
      console.log("i released %d in refresh", this.connection.threadId);

      if (this.connection) {
        this.connection.release();
      }
    }
  }

  getfeverreturn = async (anc: number) => {
    const query = anc || 2;
    try {
      const q = `SELECT
      pi.*,
      p.*
      FROM
      returnvisit rv
      JOIN
          patients p ON rv.patient_id = p.id
      JOIN
          personalinformation pi ON p.personalinformation_id = pi.id
      WHERE
        rv.fever = ? AND rv.anc = ?
      `;
      const q2 = `SELECT
      pi.*,
      p.*
      FROM
      returnvisit rv
      JOIN
          patients p ON rv.patient_id = p.id
      JOIN
          personalinformation pi ON p.personalinformation_id = pi.id
      WHERE
        rv.fever = ? AND rv.anc = ?
      `;

      const result: any = await this.connection.execute(q, ["Yes", query]);
      const result2: any = await this.connection.execute(q2, ["No", query]);
      return {
        yes: result[0].length,
        no: result2[0].length,
      };
    } catch (error: any) {
      throw new Error(error);
    }
  };
  getheadachereturn = async (anc: number) => {
    const query = anc || 2;
    try {
      const q = `SELECT
      pi.*,
      p.*
      FROM
      returnvisit rv
      JOIN
          patients p ON rv.patient_id = p.id
      JOIN
          personalinformation pi ON p.personalinformation_id = pi.id
      WHERE
        rv.headache = ? AND rv.anc = ?
      `;
      const q2 = `SELECT
      pi.*,
      p.*
      FROM
      returnvisit rv
      JOIN
          patients p ON rv.patient_id = p.id
      JOIN
          personalinformation pi ON p.personalinformation_id = pi.id
      WHERE
        rv.headache = ? AND rv.anc = ?
      `;

      const result: any = await this.connection.execute(q, ["Yes", query]);
      const result2: any = await this.connection.execute(q2, ["No", query]);
      return {
        yes: result[0].length,
        no: result2[0].length,
      };
    } catch (error: any) {
      throw new Error(error);
    }
  };
  getcoughreturn = async (anc: number) => {
    const query = anc || 2;
    try {
      const q = `SELECT
      pi.*,
      p.*
      FROM
      returnvisit rv
      JOIN
          patients p ON rv.patient_id = p.id
      JOIN
          personalinformation pi ON p.personalinformation_id = pi.id
      WHERE
        rv.cough = ? AND rv.anc = ?
      `;
      const q2 = `SELECT
      pi.*,
      p.*
      FROM
      returnvisit rv
      JOIN
          patients p ON rv.patient_id = p.id
      JOIN
          personalinformation pi ON p.personalinformation_id = pi.id
      WHERE
        rv.cough = ? AND rv.anc = ?
      `;

      const result: any = await this.connection.execute(q, ["Yes", query]);
      const result2: any = await this.connection.execute(q2, ["No", query]);
      return {
        yes: result[0].length,
        no: result2[0].length,
      };
    } catch (error: any) {
      throw new Error(error);
    }
  };
  getpalpitationsreturn = async (anc: number) => {
    const query = anc || 2;
    try {
      const q = `SELECT
      pi.*,
      p.*
      FROM
      returnvisit rv
      JOIN
          patients p ON rv.patient_id = p.id
      JOIN
          personalinformation pi ON p.personalinformation_id = pi.id
      WHERE
        rv.palpitation = ? AND rv.anc = ?
      `;
      const q2 = `SELECT
      pi.*,
      p.*
      FROM
      returnvisit rv
      JOIN
          patients p ON rv.patient_id = p.id
      JOIN
          personalinformation pi ON p.personalinformation_id = pi.id
      WHERE
        rv.palpitation = ? AND rv.anc = ?
      `;

      const result: any = await this.connection.execute(q, ["Yes", query]);
      const result2: any = await this.connection.execute(q2, ["No", query]);
      return {
        yes: result[0].length,
        no: result2[0].length,
      };
    } catch (error: any) {
      throw new Error(error);
    }
  };
  getseveretirednessreturn = async (anc: number) => {
    const query = anc || 2;
    try {
      const q = `SELECT
      pi.*,
      p.*
      FROM
      returnvisit rv
      JOIN
          patients p ON rv.patient_id = p.id
      JOIN
          personalinformation pi ON p.personalinformation_id = pi.id
      WHERE
        rv.severetirednesss = ? AND rv.anc = ?
      `;
      const q2 = `SELECT
      pi.*,
      p.*
      FROM
      returnvisit rv
      JOIN
          patients p ON rv.patient_id = p.id
      JOIN
          personalinformation pi ON p.personalinformation_id = pi.id
      WHERE
        rv.severetirednesss = ? AND rv.anc = ?
      `;

      const result: any = await this.connection.execute(q, ["Yes", query]);
      const result2: any = await this.connection.execute(q2, ["No", query]);
      return {
        yes: result[0].length,
        no: result2[0].length,
      };
    } catch (error: any) {
      throw new Error(error);
    }
  };
  getdifficultylyingflatreturn = async (anc: number) => {
    const query = anc || 2;
    try {
      const q = `SELECT
      pi.*,
      p.*
      FROM
      returnvisit rv
      JOIN
          patients p ON rv.patient_id = p.id
      JOIN
          personalinformation pi ON p.personalinformation_id = pi.id
      WHERE
        rv.difficultylyingflat = ? AND rv.anc = ?
      `;
      const q2 = `SELECT
      pi.*,
      p.*
      FROM
      returnvisit rv
      JOIN
          patients p ON rv.patient_id = p.id
      JOIN
          personalinformation pi ON p.personalinformation_id = pi.id
      WHERE
        rv.difficultylyingflat = ? AND rv.anc = ?
      `;

      const result: any = await this.connection.execute(q, ["Yes", query]);
      const result2: any = await this.connection.execute(q2, ["No", query]);
      return {
        yes: result[0].length,
        no: result2[0].length,
      };
    } catch (error: any) {
      throw new Error(error);
    }
  };
  getdizzinessreturn = async (anc: number) => {
    const query = anc || 2;
    try {
      const q = `SELECT
      pi.*,
      p.*
      FROM
      returnvisit rv
      JOIN
          patients p ON rv.patient_id = p.id
      JOIN
          personalinformation pi ON p.personalinformation_id = pi.id
      WHERE
        rv.dizziness = ? AND rv.anc = ?
      `;
      const q2 = `SELECT
      pi.*,
      p.*
      FROM
      returnvisit rv
      JOIN
          patients p ON rv.patient_id = p.id
      JOIN
          personalinformation pi ON p.personalinformation_id = pi.id
      WHERE
        rv.dizziness = ? AND rv.anc = ?
      `;

      const result: any = await this.connection.execute(q, ["Yes", query]);
      const result2: any = await this.connection.execute(q2, ["No", query]);
      return {
        yes: result[0].length,
        no: result2[0].length,
      };
    } catch (error: any) {
      throw new Error(error);
    }
  };
  getconvulsionsreturn = async (anc: number) => {
    const query = anc || 2;
    try {
      const q = `SELECT
      pi.*,
      p.*
      FROM
      returnvisit rv
      JOIN
          patients p ON rv.patient_id = p.id
      JOIN
          personalinformation pi ON p.personalinformation_id = pi.id
      WHERE
        rv.convulsions = ? AND rv.anc = ?
      `;
      const q2 = `SELECT
      pi.*,
      p.*
      FROM
      returnvisit rv
      JOIN
          patients p ON rv.patient_id = p.id
      JOIN
          personalinformation pi ON p.personalinformation_id = pi.id
      WHERE
        rv.convulsions = ? AND rv.anc = ?
      `;

      const result: any = await this.connection.execute(q, ["Yes", query]);
      const result2: any = await this.connection.execute(q2, ["No", query]);
      return {
        yes: result[0].length,
        no: result2[0].length,
      };
    } catch (error: any) {
      throw new Error(error);
    }
  };
  getabdominalpainreturn = async (anc: number) => {
    const query = anc || 2;
    try {
      const q = `SELECT
      pi.*,
      p.*
      FROM
      returnvisit rv
      JOIN
          patients p ON rv.patient_id = p.id
      JOIN
          personalinformation pi ON p.personalinformation_id = pi.id
      WHERE
        rv.severeabdominalpain = ? AND rv.anc = ?
      `;
      const q2 = `SELECT
      pi.*,
      p.*
      FROM
      returnvisit rv
      JOIN
          patients p ON rv.patient_id = p.id
      JOIN
          personalinformation pi ON p.personalinformation_id = pi.id
      WHERE
        rv.severeabdominalpain = ? AND rv.anc = ?
      `;

      const result: any = await this.connection.execute(q, ["Yes", query]);
      const result2: any = await this.connection.execute(q2, ["No", query]);
      return {
        yes: result[0].length,
        no: result2[0].length,
      };
    } catch (error: any) {
      throw new Error(error);
    }
  };
  getpainwithurinationreturn = async (anc: number) => {
    const query = anc || 2;
    try {
      const q = `SELECT
      pi.*,
      p.*
      FROM
      returnvisit rv
      JOIN
          patients p ON rv.patient_id = p.id
      JOIN
          personalinformation pi ON p.personalinformation_id = pi.id
      WHERE
        rv.urinarypain = ? AND rv.anc = ?
      `;
      const q2 = `SELECT
      pi.*,
      p.*
      FROM
      returnvisit rv
      JOIN
          patients p ON rv.patient_id = p.id
      JOIN
          personalinformation pi ON p.personalinformation_id = pi.id
      WHERE
        rv.urinarypain = ? AND rv.anc = ?
      `;

      const result: any = await this.connection.execute(q, ["Yes", query]);
      const result2: any = await this.connection.execute(q2, ["No", query]);
      return {
        yes: result[0].length,
        no: result2[0].length,
      };
    } catch (error: any) {
      throw new Error(error);
    }
  };
  async getbloodinurinereturn(anc: number) {
    const query = anc || 2;
    try {
      const q = `SELECT
      pi.*,
      p.*
      FROM
      returnvisit rv
      JOIN
          patients p ON rv.patient_id = p.id
      JOIN
          personalinformation pi ON p.personalinformation_id = pi.id
      WHERE
        rv.bloodinurine = ? AND rv.anc = ?
      `;
      const q2 = `SELECT
      pi.*,
      p.*
      FROM
      returnvisit rv
      JOIN
          patients p ON rv.patient_id = p.id
      JOIN
          personalinformation pi ON p.personalinformation_id = pi.id
      WHERE
        rv.bloodinurine = ? AND rv.anc = ?
      `;

      const result: any = await this.connection.execute(q, ["Yes", query]);
      const result2: any = await this.connection.execute(q2, ["No", query]);
      return {
        yes: result[0].length,
        no: result2[0].length,
      };
    } catch (error: any) {
      throw new Error(error);
    }
  }
  async getvaginaldischargereturn(anc: number) {
    const query = anc || 2;
    try {
      const q = `SELECT
      pi.*,
      p.*
      FROM
      returnvisit rv
      JOIN
          patients p ON rv.patient_id = p.id
      JOIN
          personalinformation pi ON p.personalinformation_id = pi.id
      WHERE
        rv.vaginaldischarge = ? AND rv.anc = ?
      `;
      const q2 = `SELECT
      pi.*,
      p.*
      FROM
      returnvisit rv
      JOIN
          patients p ON rv.patient_id = p.id
      JOIN
          personalinformation pi ON p.personalinformation_id = pi.id
      WHERE
        rv.vaginaldischarge = ? AND rv.anc = ?
      `;

      const result: any = await this.connection.execute(q, ["Yes", query]);
      const result2: any = await this.connection.execute(q2, ["No", query]);
      return {
        yes: result[0].length,
        no: result2[0].length,
      };
    } catch (error: any) {
      throw new Error(error);
    }
  }
  async getdeeppelvicpainreturn(anc: number) {
    const query = anc || 2;

    try {
      const q = `SELECT
      pi.*,
      p.*
      FROM
      returnvisit rv
      JOIN
          patients p ON rv.patient_id = p.id
      JOIN
          personalinformation pi ON p.personalinformation_id = pi.id
      WHERE
        rv.painduringsex = ? AND rv.anc = ?
      `;
      const q2 = `SELECT
      pi.*,
      p.*
      FROM
      returnvisit rv
      JOIN
          patients p ON rv.patient_id = p.id
      JOIN
          personalinformation pi ON p.personalinformation_id = pi.id
      WHERE
        rv.painduringsex = ? AND rv.anc = ?
      `;

      const result: any = await this.connection.execute(q, ["Yes", query]);
      const result2: any = await this.connection.execute(q2, ["No", query]);
      return {
        yes: result[0].length,
        no: result2[0].length,
      };
    } catch (error: any) {
      throw new Error(error);
    }
  }
  async getsyphilisreturn(anc: number) {
    const query = anc || 2;
    try {
      const q = `SELECT
      pi.*,
      p.*
      FROM
      returnvisit rv
      JOIN
          patients p ON rv.patient_id = p.id
      JOIN
          personalinformation pi ON p.personalinformation_id = pi.id
      WHERE
        rv.syphillis = ? AND rv.anc = ?
      `;
      const q2 = `SELECT
      pi.*,
      p.*
      FROM
      returnvisit rv
      JOIN
          patients p ON rv.patient_id = p.id
      JOIN
          personalinformation pi ON p.personalinformation_id = pi.id
      WHERE
        rv.syphillis = ? AND rv.anc = ?
      `;

      const result: any = await this.connection.execute(q, ["Yes", query]);
      const result2: any = await this.connection.execute(q2, ["No", query]);
      return {
        yes: result[0].length,
        no: result2[0].length,
      };
    } catch (error: any) {
      throw new Error(error);
    }
  }
  graviditygreaterthan8 = async () => {
    try {
      const q = `SELECT *
      FROM personalinformation
      WHERE CAST(gravidity AS SIGNED) > 8 OR CAST(gravidity AS SIGNED) = 8`;
      const result: any = await this.connection.execute(q);
      return result[0].length;
    } catch (error) {
      console.log(error);
    }
  };
  graviditylessthan8 = async () => {
    try {
      const q = `SELECT *
      FROM personalinformation
      WHERE CAST(gravidity AS SIGNED) < 8`;
      const result: any = await this.connection.execute(q);
      return result[0].length;
    } catch (error) {
      console.log(error);
    }
  };
  // getedd = async (req: Request, res: Response) => {
  //   try {
  //     const q = `SELECT
  //       quarter,
  //       COUNT(*) AS number
  //     FROM (
  //       SELECT
  //         edd,
  //         CASE
  //           WHEN MONTH(edd) BETWEEN 1 AND 3 THEN 'Q1'
  //           WHEN MONTH(edd) BETWEEN 4 AND 6 THEN 'Q2'
  //           WHEN MONTH(edd) BETWEEN 7 AND 9 THEN 'Q3'
  //           WHEN MONTH(edd) BETWEEN 10 AND 12 THEN 'Q4'
  //         END AS quarter,
  //         ,lga,healthFacility
  //       FROM personalinformation
  //     ) AS subquery
  //     GROUP BY quarter
  //     ORDER BY MIN(edd);

  //   `;
  //     const result:any = await this.connection.execute(q);
  //     res.status(200).json(result[0]);
  //   } catch (error) {
  //     res.status(500).json(error);
  //   }
  // };
  getedd2 = async () => {
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
        lga, healthFacility
      FROM personalinformation
    ) AS subquery ON quarters.quarter = subquery.quarter
    GROUP BY quarters.quarter
    ORDER BY MIN(subquery.edd);
    
      
    `;
      const result: any = await this.connection.execute(q);
      return result[0];
    } catch (error) {
      console.log({ edd_error: error });
    }
  };
  getparity = async () => {
    try {
      const q1 = `SELECT *
        FROM personalinformation
        WHERE CAST(parity AS SIGNED) <= 24;
    `;
      const q2 = `SELECT *
        FROM personalinformation
        WHERE CAST(parity AS SIGNED) > 24;
    `;
      const less: any = await this.connection.execute(q1);
      const greater: any = await this.connection.execute(q2);
      return { less: less[0].length, greater: greater[0].length };
    } catch (error) {
      throw error;
    }
  };

  getbabysmovement = async () => {
    try {
      const q1 = `SELECT *
        FROM personalinformation
        WHERE doyoufeelthebabysmovement = ?;
    `;
      const q2 = `SELECT *
        FROM personalinformation
        WHERE doyoufeelthebabysmovement = ?;
    `;
      const q3 = `SELECT *
        FROM personalinformation
        WHERE doyoufeelthebabysmovement = ?;
    `;
      const q4 = `SELECT *
        FROM personalinformation
        WHERE doyoufeelthebabysmovement = ?;
    `;
      const yes: any = await this.connection.execute(q1, ["yes"]);
      const no: any = await this.connection.execute(q2, ["no"]);
      const dontknow: any = await this.connection.execute(q3, ["i don't know"]);
      const notapplicable: any = await this.connection.execute(q4, [
        "not applicable",
      ]);
      return {
        yes: yes[0].length,
        no: no[0].length,
        dontknow: dontknow[0].length,
        notapplicable: notapplicable[0].length,
      };
    } catch (error: any) {
      throw new Error(error);
    }
  };
  getfirstbabymovement = async () => {
    try {
      const q1 = `SELECT *
        FROM personalinformation
        WHERE doyouknowdateoffirstbabymovement = ?;
    `;
      const q2 = `SELECT *
        FROM personalinformation
        WHERE doyoufeelthebabysmovement = ?;
    `;
      const q3 = `SELECT *
        FROM personalinformation
        WHERE doyoufeelthebabysmovement = ?;
    `;
      const q4 = `SELECT *
        FROM personalinformation
        WHERE doyoufeelthebabysmovement = ?;
    `;
      const yes: any = await this.connection.execute(q1, ["yes"]);
      const no: any = await this.connection.execute(q2, ["no"]);
      const dontknow: any = await this.connection.execute(q3, ["i don't know"]);
      const notapplicable: any = await this.connection.execute(q4, [
        "not applicable",
      ]);
      return {
        yes: yes[0].length,
        no: no[0].length,
        dontknow: dontknow[0].length,
        notapplicable: notapplicable[0].length,
      };
    } catch (error: any) {
      throw new Error(error);
    }
  };
  //obstetrichistory
  getconvulsions = async () => {
    try {
      const q = `SELECT * FROM obstetrichistory WHERE convulsionsduringpregnancy = ?`;
      const result: any = await this.connection.execute(q, ["yes"]);
      const q2 = `SELECT * FROM obstetrichistory WHERE convulsionsduringpregnancy = ?`;
      const result2: any = await this.connection.execute(q2, ["yes"]);
      return { yes: result[0].length, no: result2[0].length };
    } catch (error) {}
  };
  getsurgery = async () => {
    try {
      const q = `SELECT * FROM obstetrichistory WHERE caesarean  = ?`;
      const result: any = await this.connection.execute(q, ["yes"]);
      const q2 = `SELECT * FROM obstetrichistory WHERE caesarean  = ?`;
      const result2: any = await this.connection.execute(q2, ["yes"]);
      return { yes: result[0].length, no: result2[0].length };
    } catch (error) {}
  };
  gettearsthroughsphincter = async () => {
    try {
      const q = `SELECT * FROM obstetrichistory WHERE tearsthroughsphincter = ?`;
      const result: any = await this.connection.execute(q, ["yes"]);
      const q2 = `SELECT * FROM obstetrichistory WHERE tearsthroughsphincter = ?`;
      const result2: any = await this.connection.execute(q2, ["no"]);
      return { yes: result[0].length, no: result2[0].length };
    } catch (error) {}
  };
  getpostpartiumhaemorrghage = async () => {
    try {
      const q = `SELECT * FROM obstetrichistory WHERE postpartiumhaemorrghage   = ?`;
      const q2 = `SELECT * FROM obstetrichistory WHERE postpartiumhaemorrghage   = ?`;
      const result: any = await this.connection.execute(q, ["yes"]);
      const result2: any = await this.connection.execute(q2, ["no"]);
      return { yes: result[0].length, no: result2[0].length };
    } catch (error) {}
  };
  getstillbirths = async () => {
    try {
      const q = `SELECT * FROM obstetrichistory WHERE stillbirths   = ?`;
      const q2 = `SELECT * FROM obstetrichistory WHERE stillbirths   = ?`;
      const result: any = await this.connection.execute(q, ["yes"]);
      const result2: any = await this.connection.execute(q2, ["no"]);
      return { yes: result[0].length, no: result2[0].length };
    } catch (error) {}
  };
  getprematuredeliveries = async () => {
    try {
      const q = `SELECT * FROM obstetrichistory WHERE prematuredeliveries   = ?`;
      const q2 = `SELECT * FROM obstetrichistory WHERE prematuredeliveries   = ?`;
      const result: any = await this.connection.execute(q, ["yes"]);
      const result2: any = await this.connection.execute(q2, ["no"]);
      return { yes: result[0].length, no: result2[0].length };
    } catch (error) {}
  };
  getlowbirthbabies = async () => {
    try {
      const q = `SELECT * FROM obstetrichistory WHERE lowbirthbabies   = ?`;
      const q2 = `SELECT * FROM obstetrichistory WHERE lowbirthbabies   = ?`;
      const result: any = await this.connection.execute(q, ["yes"]);
      const result2: any = await this.connection.execute(q2, ["no"]);
      return { yes: result[0].length, no: result2[0].length };
    } catch (error) {}
  };
  getbabieswhodied = async () => {
    try {
      const q = `SELECT * FROM obstetrichistory WHERE babieswhodied = ?`;
      const q2 = `SELECT * FROM obstetrichistory WHERE babieswhodied = ?`;
      const result: any = await this.connection.execute(q, ["yes"]);
      const result2: any = await this.connection.execute(q2, ["no"]);
      return { yes: result[0].length, no: result2[0].length };
    } catch (error) {}
  };
  getmiscarriages = async () => {
    try {
      const q = `SELECT * FROM obstetrichistory WHERE miscarriages   = ?`;
      const q2 = `SELECT * FROM obstetrichistory WHERE miscarriages   = ?`;
      const result: any = await this.connection.execute(q, ["yes"]);
      const result2: any = await this.connection.execute(q2, ["no"]);
      return { yes: result[0].length, no: result2[0].length };
    } catch (error) {}
  };
  getbreastfedbefore = async () => {
    try {
      const q = `SELECT * FROM familyhistory WHERE haveyoubreastfedbefore   = ?`;
      const q2 = `SELECT * FROM familyhistory WHERE haveyoubreastfedbefore   = ?`;
      const result: any = await this.connection.execute(q, ["Yes"]);
      const result2: any = await this.connection.execute(q2, ["No"]);
      return { yes: result[0].length, no: result2[0].length };
    } catch (error) {}
  };
  getbreastfeedingduration = async () => {
    try {
      const q = `SELECT * FROM familyhistory WHERE breastfeedingduration   = ?`;
      const q2 = `SELECT * FROM familyhistory WHERE breastfeedingduration   = ?`;
      const q3 = `SELECT * FROM familyhistory WHERE breastfeedingduration   = ?`;
      const result: any = await this.connection.execute(q, ["< 6 months"]);
      const result2: any = await this.connection.execute(q2, ["6 months"]);
      const result3: any = await this.connection.execute(q3, ["> 6 months"]);
      return {
        less: result[0].length,
        equal: result2[0].length,
        greater: result3[0].length,
      };
    } catch (error) {}
  };
  getbreastfeedingproblems = async () => {
    try {
      const q = `SELECT * FROM familyhistory WHERE breastfeedingproblems   = ?`;
      const q2 = `SELECT * FROM familyhistory WHERE breastfeedingproblems   = ?`;
      const result: any = await this.connection.execute(q, ["Yes"]);
      const result2: any = await this.connection.execute(q2, ["No"]);
      return { yes: result[0].length, no: result2[0].length };
    } catch (error) {}
  };

  //dailyhabits and lifestyle
  getSmokers = async () => {
    try {
      const q = `SELECT * FROM dailyhabitsandlifestyle WHERE doyousmoke   = ?`;
      const q2 = `SELECT * FROM dailyhabitsandlifestyle WHERE doyousmoke   = ?`;
      const result: any = await this.connection.execute(q, ["yes"]);
      const result2: any = await this.connection.execute(q2, ["no"]);
      return { yes: result[0].length, no: result2[0].length };
    } catch (error) {}
  };
  getAlcohol = async () => {
    try {
      const q = `SELECT * FROM dailyhabitsandlifestyle WHERE doyoudrinkalcohol   = ?`;
      const q2 = `SELECT * FROM dailyhabitsandlifestyle WHERE doyoudrinkalcohol   = ?`;
      const result: any = await this.connection.execute(q, ["yes"]);
      const result2: any = await this.connection.execute(q2, ["no"]);
      return { yes: result[0].length, no: result2[0].length };
    } catch (error) {}
  };
  getThreatened = async () => {
    try {
      const q = `SELECT * FROM dailyhabitsandlifestyle WHERE threatenedyourlife   = ?`;
      const q2 = `SELECT * FROM dailyhabitsandlifestyle WHERE threatenedyourlife   = ?`;
      const result: any = await this.connection.execute(q, ["yes"]);
      const result2: any = await this.connection.execute(q2, ["no"]);
      return { yes: result[0].length, no: result2[0].length };
    } catch (error) {}
  };
  whodoyoulivewith = async () => {
    try {
      const q = `SELECT * FROM dailyhabitsandlifestyle WHERE whodoyoulivewith   = ?`;
      const q2 = `SELECT * FROM dailyhabitsandlifestyle WHERE whodoyoulivewith   = ?`;
      const q3 = `SELECT * FROM dailyhabitsandlifestyle WHERE whodoyoulivewith   = ?`;
      const q4 = `SELECT * FROM dailyhabitsandlifestyle WHERE whodoyoulivewith   = ?`;
      const q5 = `SELECT * FROM dailyhabitsandlifestyle WHERE specifywhodoyoulivewith IS NOT NULL AND specifywhodoyoulivewith <> '';`;
      const result: any = await this.connection.execute(q, ["Partner"]);
      const result2: any = await this.connection.execute(q2, ["Relative"]);
      const result3: any = await this.connection.execute(q3, ["Alone"]);
      const result4: any = await this.connection.execute(q4, ["Friend"]);
      const result5: any = await this.connection.execute(q5);
      return {
        partner: result[0].length,
        relative: result2[0].length,
        alone: result3[0].length,
        friend: result4[0].length,
        others: result5[0].length,
      };
    } catch (error) {}
  };
  //medicalhistory
  getcough = async () => {
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
      `;
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
      `;

      const result: any = await this.connection.execute(q, ["Yes"]);
      const result2: any = await this.connection.execute(q2, ["No"]);
      return {
        yes: result[0].length,
        no: result2[0].length,
      };
    } catch (error) {}
  };

  getpalpitations = async () => {
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
      `;
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
      `;

      const result: any = await this.connection.execute(q, ["Yes"]);
      const result2: any = await this.connection.execute(q2, ["No"]);
      return {
        yes: result[0].length,
        no: result2[0].length,
      };
    } catch (error) {}
  };
  getdifficultybreathing = async () => {
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
      `;
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
      `;

      const result: any = await this.connection.execute(q, ["Yes"]);
      const result2: any = await this.connection.execute(q2, ["No"]);
      return {
        yes: result[0].length,
        no: result2[0].length,
      };
    } catch (error) {}
  };
  getswellingoffeet = async () => {
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
      `;
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
      `;

      const result: any = await this.connection.execute(q, ["Yes"]);
      const result2: any = await this.connection.execute(q2, ["No"]);
      return {
        yes: result[0].length,
        no: result2[0].length,
      };
    } catch (error) {}
  };
  getchestpain = async () => {
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
      `;
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
      `;

      const result: any = await this.connection.execute(q, ["Yes"]);
      const result2: any = await this.connection.execute(q2, ["No"]);
      return {
        yes: result[0].length,
        no: result2[0].length,
      };
    } catch (error) {}
  };
  getepigastricpain = async () => {
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
      `;
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
      `;

      const result: any = await this.connection.execute(q, ["Yes"]);
      const result2: any = await this.connection.execute(q2, ["No"]);
      return {
        yes: result[0].length,
        no: result2[0].length,
      };
    } catch (error) {}
  };
  getseveretiredness = async () => {
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
      `;
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
      `;

      const result: any = await this.connection.execute(q, ["Yes"]);
      const result2: any = await this.connection.execute(q2, ["No"]);
      return {
        yes: result[0].length,
        no: result2[0].length,
      };
    } catch (error) {}
  };
  getsevereabdominalpain = async () => {
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
      `;
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
      `;

      const result: any = await this.connection.execute(q, ["Yes"]);
      const result2: any = await this.connection.execute(q2, ["No"]);
      return {
        yes: result[0].length,
        no: result2[0].length,
      };
    } catch (error) {}
  };
  getpersistentvomiting = async () => {
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
      `;
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
      `;

      const result: any = await this.connection.execute(q, ["Yes"]);
      const result2: any = await this.connection.execute(q2, ["No"]);
      return {
        yes: result[0].length,
        no: result2[0].length,
      };
    } catch (error) {}
  };
  getseverediarrhoea = async () => {
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
      `;
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
      `;

      const result: any = await this.connection.execute(q, ["Yes"]);
      const result2: any = await this.connection.execute(q2, ["No"]);
      return {
        yes: result[0].length,
        no: result2[0].length,
      };
    } catch (error) {}
  };
  getdizziness = async () => {
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
        mh.dizziness = ?
      `;
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
        mh.dizziness = ?
      `;

      const result: any = await this.connection.execute(q, ["Yes"]);
      const result2: any = await this.connection.execute(q2, ["No"]);
      return {
        yes: result[0].length,
        no: result2[0].length,
      };
    } catch (error) {}
  };
  //urinary
  getpainwithurination = async () => {
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
      `;
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
      `;

      const result: any = await this.connection.execute(q, ["Yes"]);
      const result2: any = await this.connection.execute(q2, ["No"]);
      return {
        yes: result[0].length,
        no: result2[0].length,
      };
    } catch (error) {}
  };
  getsevereflankpain = async () => {
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
      `;
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
      `;

      const result: any = await this.connection.execute(q, ["Yes"]);
      const result2: any = await this.connection.execute(q2, ["No"]);
      return {
        yes: result[0].length,
        no: result2[0].length,
      };
    } catch (error) {}
  };
  getbloodinurine = async () => {
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
      `;
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
      `;

      const result: any = await this.connection.execute(q, ["Yes"]);
      const result2: any = await this.connection.execute(q2, ["No"]);
      return {
        yes: result[0].length,
        no: result2[0].length,
      };
    } catch (error) {}
  };
  //gynaelogical
  getvaginaldischarge = async () => {
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
      `;
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
      `;

      const result: any = await this.connection.execute(q, ["Yes"]);
      const result2: any = await this.connection.execute(q2, ["No"]);
      return {
        yes: result[0].length,
        no: result2[0].length,
      };
    } catch (error) {}
  };
  getdeeppelvicpain = async () => {
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
      `;
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
      `;

      const result: any = await this.connection.execute(q, ["Yes"]);
      const result2: any = await this.connection.execute(q2, ["No"]);
      return {
        yes: result[0].length,
        no: result2[0].length,
      };
    } catch (error) {}
  };
  getsyphilis = async () => {
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
      `;
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
      `;

      const result: any = await this.connection.execute(q, ["Yes"]);
      const result2: any = await this.connection.execute(q2, ["No"]);
      return {
        yes: result[0].length,
        no: result2[0].length,
      };
    } catch (error) {}
  };
  getpersistentdrycough = async () => {
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
      `;
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
      `;

      const result: any = await this.connection.execute(q, ["Yes"]);
      const result2: any = await this.connection.execute(q2, ["No"]);
      return {
        yes: result[0].length,
        no: result2[0].length,
      };
    } catch (error) {}
  };
  getprogressiveweightloss = async () => {
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
      `;
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
      `;

      const result: any = await this.connection.execute(q, ["Yes"]);
      const result2: any = await this.connection.execute(q2, ["No"]);
      return {
        yes: result[0].length,
        no: result2[0].length,
      };
    } catch (error) {}
  };
  getnightsweats = async () => {
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
      `;
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
      `;

      const result: any = await this.connection.execute(q, ["Yes"]);
      const result2: any = await this.connection.execute(q2, ["No"]);
      return {
        yes: result[0].length,
        no: result2[0].length,
      };
    } catch (error) {}
  };
  getdiagnosedwithtuberculosis = async () => {
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
      `;
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
      `;

      const result: any = await this.connection.execute(q, ["Yes"]);
      const result2: any = await this.connection.execute(q2, ["No"]);
      return {
        yes: result[0].length,
        no: result2[0].length,
      };
    } catch (error) {}
  };
  gettreatedTBpreviously = async () => {
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
      `;
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
      `;

      const result: any = await this.connection.execute(q, ["Yes"]);
      const result2: any = await this.connection.execute(q2, ["No"]);
      return {
        yes: result[0].length,
        no: result2[0].length,
      };
    } catch (error) {}
  };

  //pastmedicalhistory
  getheartdisease = async () => {
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
      `;
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
      `;

      const result: any = await this.connection.execute(q, ["Yes"]);
      const result2: any = await this.connection.execute(q2, ["No"]);
      return {
        yes: result[0].length,
        no: result2[0].length,
      };
    } catch (error) {}
  };
  getanaemia = async () => {
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
      `;
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
      `;

      const result: any = await this.connection.execute(q, ["Yes"]);
      const result2: any = await this.connection.execute(q2, ["No"]);
      return {
        yes: result[0].length,
        no: result2[0].length,
      };
    } catch (error) {}
  };
  getkidneydisease = async () => {
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
      `;
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
      `;

      const result: any = await this.connection.execute(q, ["Yes"]);
      const result2: any = await this.connection.execute(q2, ["No"]);
      return {
        yes: result[0].length,
        no: result2[0].length,
      };
    } catch (error) {}
  };
  getsicklecell = async () => {
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
      `;
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
      `;

      const result: any = await this.connection.execute(q, ["Yes"]);
      const result2: any = await this.connection.execute(q2, ["No"]);
      return {
        yes: result[0].length,
        no: result2[0].length,
      };
    } catch (error) {}
  };
  getdiabetes = async () => {
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
      `;
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
      `;

      const result: any = await this.connection.execute(q, ["Yes"]);
      const result2: any = await this.connection.execute(q2, ["No"]);
      return {
        yes: result[0].length,
        no: result2[0].length,
      };
    } catch (error) {}
  };
  getgoitre = async () => {
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
      `;
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
      `;

      const result: any = await this.connection.execute(q, ["Yes"]);
      const result2: any = await this.connection.execute(q2, ["No"]);
      return {
        yes: result[0].length,
        no: result2[0].length,
      };
    } catch (error) {}
  };
  gethivaids = async () => {
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
      `;
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
      `;

      const result: any = await this.connection.execute(q, ["Yes"]);
      const result2: any = await this.connection.execute(q2, ["No"]);
      return {
        yes: result[0].length,
        no: result2[0].length,
      };
    } catch (error) {}
  };
  getotherseriouschronicillnesses = async () => {
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
      `;
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
      `;

      const result: any = await this.connection.execute(q, ["Yes"]);
      const result2: any = await this.connection.execute(q2, ["No"]);
      return {
        yes: result[0].length,
        no: result2[0].length,
      };
    } catch (error) {}
  };
  gethadsurgery = async () => {
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
      `;
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
      `;

      const result: any = await this.connection.execute(q, ["Yes"]);
      const result2: any = await this.connection.execute(q2, ["No"]);
      return {
        yes: result[0].length,
        no: result2[0].length,
      };
    } catch (error) {}
  };

  //drug history
  getherbalremedies = async () => {
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
      `;
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
      `;

      const result: any = await this.connection.execute(q, ["Yes"]);
      const result2: any = await this.connection.execute(q2, ["No"]);
      return {
        yes: result[0].length,
        no: result2[0].length,
      };
    } catch (error) {}
  };
  getotcdrugs = async () => {
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
      `;
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
      `;

      const result: any = await this.connection.execute(q, ["Yes"]);
      const result2: any = await this.connection.execute(q2, ["No"]);
      return {
        yes: result[0].length,
        no: result2[0].length,
      };
    } catch (error) {}
  };
  getvitamins = async () => {
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
      `;
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
      `;

      const result: any = await this.connection.execute(q, ["Yes"]);
      const result2: any = await this.connection.execute(q2, ["No"]);
      return {
        yes: result[0].length,
        no: result2[0].length,
      };
    } catch (error) {}
  };
  getdietarysupplements = async () => {
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
      `;
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
      `;

      const result: any = await this.connection.execute(q, ["Yes"]);
      const result2: any = await this.connection.execute(q2, ["No"]);
      return {
        yes: result[0].length,
        no: result2[0].length,
      };
    } catch (error) {}
  };
  gettetanus = async () => {
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
      `;
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
      `;

      const result: any = await this.connection.execute(q, ["Yes"]);
      const result2: any = await this.connection.execute(q2, ["No"]);
      return {
        yes: result[0].length,
        no: result2[0].length,
      };
    } catch (error) {}
  };
}
