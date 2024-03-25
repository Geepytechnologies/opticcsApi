import { PoolConnection } from "mysql2/promise";
import db from "../../../config/db";
import logger from "../../../logger";
import { NationalRepository } from "../../../repositories/NationalRepository";
import { NationalService } from "../../../services/national.service";
import { Request, Response } from "express";

class NationalDataController {
  nationalreturnvisitdata = async (req: Request, res: Response) => {
    const connection = await db.getConnection();
    const nationalRepo = new NationalRepository(connection);
    const nationalservice = new NationalService(nationalRepo);
    const anc: any = req.query.anc;
    try {
      const result = await nationalservice.nationalreturnvisitdata(anc);
      console.log(result);
      res.status(200).json(result);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    } finally {
      if (connection) {
        connection.release();
      }
    }
  };
  numberofwomenwith4visits = async (req: Request, res: Response) => {
    const connection = await db.getConnection();
    try {
      const q = `SELECT COUNT(*) AS patient_count
        FROM patients p
        LEFT JOIN (
            SELECT patient_id, COUNT(*) AS first_visit_count
            FROM firstvisit
            GROUP BY patient_id
        ) fv ON p.id = fv.patient_id
        LEFT JOIN (
            SELECT patient_id, COUNT(*) AS return_visit_count
            FROM returnvisit
            GROUP BY patient_id
        ) ev ON p.id = ev.patient_id
        WHERE (COALESCE(fv.first_visit_count, 0) + COALESCE(ev.return_visit_count, 0)) > 4;    
        `;
      const result = await connection.execute(q);
      res.status(200).json(result[0]);
    } catch (error) {
      res.status(500).json(error);
    } finally {
      if (connection) {
        connection.release();
      }
    }
  };

  graviditygreaterthan8 = async (connection: PoolConnection) => {
    try {
      const q = `SELECT *
      FROM personalinformation
      WHERE CAST(gravidity AS SIGNED) > 8 OR CAST(gravidity AS SIGNED) = 8`;
      const result: any = await connection.execute(q);
      return result[0].length;
    } catch (error) {
      console.log(error);
    }
  };
  graviditylessthan8 = async (connection: PoolConnection) => {
    try {
      const q = `SELECT *
      FROM personalinformation
      WHERE CAST(gravidity AS SIGNED) < 8`;
      const result: any = await connection.execute(q);
      return result[0].length;
    } catch (error) {
      console.log(error);
    }
  };
  getedd = async (req: Request, res: Response) => {
    const connection = await db.getConnection();
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
          ,lga,healthFacility
        FROM personalinformation
      ) AS subquery
      GROUP BY quarter
      ORDER BY MIN(edd);  
      
    `;
      const result = await connection.execute(q);
      res.status(200).json(result[0]);
    } catch (error) {
      res.status(500).json(error);
    }
  };
  getedd2 = async (connection: any) => {
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
      const result = await connection.execute(q);
      return result[0];
    } catch (error) {
      console.log({ edd_error: error });
    }
  };
  getparity = async (connection: any) => {
    try {
      const q1 = `SELECT *
        FROM personalinformation
        WHERE CAST(parity AS SIGNED) <= 24;
    `;
      const q2 = `SELECT *
        FROM personalinformation
        WHERE CAST(parity AS SIGNED) > 24;
    `;
      const less = await connection.execute(q1);
      const greater = await connection.execute(q2);
      return { less: less[0].length, greater: greater[0].length };
    } catch (error) {
      throw error;
    }
  };

  getbabysmovement = async (connection: any) => {
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
      const yes = await connection.execute(q1, ["yes"]);
      const no = await connection.execute(q2, ["no"]);
      const dontknow = await connection.execute(q3, ["i don't know"]);
      const notapplicable = await connection.execute(q4, ["not applicable"]);
      return {
        yes: yes[0].length,
        no: no[0].length,
        dontknow: dontknow[0].length,
        notapplicable: notapplicable[0].length,
      };
    } catch (error) {
      connection.rollback();
    }
  };
  getfirstbabymovement = async (connection: any) => {
    try {
      const q1 = `SELECT *
        FROM personalinformation
        WHERE doyouknowdateoffirtbabymovement = ?;
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
      const yes = await connection.execute(q1, ["yes"]);
      const no = await connection.execute(q2, ["no"]);
      const dontknow = await connection.execute(q3, ["i don't know"]);
      const notapplicable = await connection.execute(q4, ["not applicable"]);
      return {
        yes: yes[0].length,
        no: no[0].length,
        dontknow: dontknow[0].length,
        notapplicable: notapplicable[0].length,
      };
    } catch (error) {
      connection.rollback();
    }
  };
  //obstetrichistory
  getconvulsions = async (connection: any) => {
    try {
      const q = `SELECT * FROM obstetrichistory WHERE convulsionsduringpregnancy = ?`;
      const result = await connection.execute(q, ["yes"]);
      const q2 = `SELECT * FROM obstetrichistory WHERE convulsionsduringpregnancy = ?`;
      const result2 = await connection.execute(q2, ["yes"]);
      return { yes: result[0].length, no: result2[0].length };
    } catch (error) {}
  };
  getsurgery = async (connection: any) => {
    try {
      const q = `SELECT * FROM obstetrichistory WHERE caesarean  = ?`;
      const result = await connection.execute(q, ["yes"]);
      const q2 = `SELECT * FROM obstetrichistory WHERE caesarean  = ?`;
      const result2 = await connection.execute(q2, ["yes"]);
      return { yes: result[0].length, no: result2[0].length };
    } catch (error) {}
  };
  gettearsthroughsphincter = async (connection: any) => {
    try {
      const q = `SELECT * FROM obstetrichistory WHERE tearsthroughsphincter = ?`;
      const result = await connection.execute(q, ["yes"]);
      const q2 = `SELECT * FROM obstetrichistory WHERE tearsthroughsphincter = ?`;
      const result2 = await connection.execute(q2, ["no"]);
      return { yes: result[0].length, no: result2[0].length };
    } catch (error) {}
  };
  getpostpartiumhaemorrghage = async (connection: any) => {
    try {
      const q = `SELECT * FROM obstetrichistory WHERE postpartiumhaemorrghage   = ?`;
      const q2 = `SELECT * FROM obstetrichistory WHERE postpartiumhaemorrghage   = ?`;
      const result = await connection.execute(q, ["yes"]);
      const result2 = await connection.execute(q2, ["no"]);
      return { yes: result[0].length, no: result2[0].length };
    } catch (error) {}
  };
  getstillbirths = async (connection: any) => {
    try {
      const q = `SELECT * FROM obstetrichistory WHERE stillbirths   = ?`;
      const q2 = `SELECT * FROM obstetrichistory WHERE stillbirths   = ?`;
      const result = await connection.execute(q, ["yes"]);
      const result2 = await connection.execute(q2, ["no"]);
      return { yes: result[0].length, no: result2[0].length };
    } catch (error) {}
  };
  getprematuredeliveries = async (connection: any) => {
    try {
      const q = `SELECT * FROM obstetrichistory WHERE prematuredeliveries   = ?`;
      const q2 = `SELECT * FROM obstetrichistory WHERE prematuredeliveries   = ?`;
      const result = await connection.execute(q, ["yes"]);
      const result2 = await connection.execute(q2, ["no"]);
      return { yes: result[0].length, no: result2[0].length };
    } catch (error) {}
  };
  getlowbirthbabies = async (connection: any) => {
    try {
      const q = `SELECT * FROM obstetrichistory WHERE lowbirthbabies   = ?`;
      const q2 = `SELECT * FROM obstetrichistory WHERE lowbirthbabies   = ?`;
      const result = await connection.execute(q, ["yes"]);
      const result2 = await connection.execute(q2, ["no"]);
      return { yes: result[0].length, no: result2[0].length };
    } catch (error) {}
  };
  getbabieswhodied = async (connection: any) => {
    try {
      const q = `SELECT * FROM obstetrichistory WHERE babieswhodied = ?`;
      const q2 = `SELECT * FROM obstetrichistory WHERE babieswhodied = ?`;
      const result = await connection.execute(q, ["yes"]);
      const result2 = await connection.execute(q2, ["no"]);
      return { yes: result[0].length, no: result2[0].length };
    } catch (error) {}
  };
  getmiscarriages = async (connection: any) => {
    try {
      const q = `SELECT * FROM obstetrichistory WHERE miscarriages   = ?`;
      const q2 = `SELECT * FROM obstetrichistory WHERE miscarriages   = ?`;
      const result = await connection.execute(q, ["yes"]);
      const result2 = await connection.execute(q2, ["no"]);
      return { yes: result[0].length, no: result2[0].length };
    } catch (error) {}
  };
  getbreastfedbefore = async (connection: any) => {
    try {
      const q = `SELECT * FROM familyhistory WHERE haveyoubreastfedbefore   = ?`;
      const q2 = `SELECT * FROM familyhistory WHERE haveyoubreastfedbefore   = ?`;
      const result = await connection.execute(q, ["Yes"]);
      const result2 = await connection.execute(q2, ["No"]);
      return { yes: result[0].length, no: result2[0].length };
    } catch (error) {}
  };
  getbreastfeedingduration = async (connection: any) => {
    try {
      const q = `SELECT * FROM familyhistory WHERE breastfeedingduration   = ?`;
      const q2 = `SELECT * FROM familyhistory WHERE breastfeedingduration   = ?`;
      const q3 = `SELECT * FROM familyhistory WHERE breastfeedingduration   = ?`;
      const result = await connection.execute(q, ["< 6 months"]);
      const result2 = await connection.execute(q2, ["6 months"]);
      const result3 = await connection.execute(q3, ["> 6 months"]);
      return {
        less: result[0].length,
        equal: result2[0].length,
        greater: result3[0].length,
      };
    } catch (error) {}
  };
  getbreastfeedingproblems = async (connection: any) => {
    try {
      const q = `SELECT * FROM familyhistory WHERE breastfeedingproblems   = ?`;
      const q2 = `SELECT * FROM familyhistory WHERE breastfeedingproblems   = ?`;
      const result = await connection.execute(q, ["Yes"]);
      const result2 = await connection.execute(q2, ["No"]);
      return { yes: result[0].length, no: result2[0].length };
    } catch (error) {}
  };

  //dailyhabits and lifestyle
  getSmokers = async (connection: any) => {
    try {
      const q = `SELECT * FROM dailyhabitsandlifestyle WHERE doyousmoke   = ?`;
      const q2 = `SELECT * FROM dailyhabitsandlifestyle WHERE doyousmoke   = ?`;
      const result = await connection.execute(q, ["yes"]);
      const result2 = await connection.execute(q2, ["no"]);
      return { yes: result[0].length, no: result2[0].length };
    } catch (error) {}
  };
  getAlcohol = async (connection: any) => {
    try {
      const q = `SELECT * FROM dailyhabitsandlifestyle WHERE doyoudrinkalcohol   = ?`;
      const q2 = `SELECT * FROM dailyhabitsandlifestyle WHERE doyoudrinkalcohol   = ?`;
      const result = await connection.execute(q, ["yes"]);
      const result2 = await connection.execute(q2, ["no"]);
      return { yes: result[0].length, no: result2[0].length };
    } catch (error) {}
  };
  getThreatened = async (connection: any) => {
    try {
      const q = `SELECT * FROM dailyhabitsandlifestyle WHERE threatenedyourlife   = ?`;
      const q2 = `SELECT * FROM dailyhabitsandlifestyle WHERE threatenedyourlife   = ?`;
      const result = await connection.execute(q, ["yes"]);
      const result2 = await connection.execute(q2, ["no"]);
      return { yes: result[0].length, no: result2[0].length };
    } catch (error) {}
  };
  whodoyoulivewith = async (connection: any) => {
    try {
      const q = `SELECT * FROM dailyhabitsandlifestyle WHERE whodoyoulivewith   = ?`;
      const q2 = `SELECT * FROM dailyhabitsandlifestyle WHERE whodoyoulivewith   = ?`;
      const q3 = `SELECT * FROM dailyhabitsandlifestyle WHERE whodoyoulivewith   = ?`;
      const q4 = `SELECT * FROM dailyhabitsandlifestyle WHERE whodoyoulivewith   = ?`;
      const q5 = `SELECT * FROM dailyhabitsandlifestyle WHERE specifywhodoyoulivewith IS NOT NULL AND specifywhodoyoulivewith <> '';`;
      const result = await connection.execute(q, ["Partner"]);
      const result2 = await connection.execute(q2, ["Relative"]);
      const result3 = await connection.execute(q3, ["Alone"]);
      const result4 = await connection.execute(q4, ["Friend"]);
      const result5 = await connection.execute(q5);
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
  getcough = async (connection: any) => {
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

      const result = await connection.execute(q, ["Yes"]);
      const result2 = await connection.execute(q2, ["No"]);
      return {
        yes: result[0].length,
        no: result2[0].length,
      };
    } catch (error) {}
  };

  getpalpitations = async (connection: any) => {
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

      const result = await connection.execute(q, ["Yes"]);
      const result2 = await connection.execute(q2, ["No"]);
      return {
        yes: result[0].length,
        no: result2[0].length,
      };
    } catch (error) {}
  };
  getdifficultybreathing = async (connection: any) => {
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

      const result = await connection.execute(q, ["Yes"]);
      const result2 = await connection.execute(q2, ["No"]);
      return {
        yes: result[0].length,
        no: result2[0].length,
      };
    } catch (error) {}
  };
  getswellingoffeet = async (connection: any) => {
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

      const result = await connection.execute(q, ["Yes"]);
      const result2 = await connection.execute(q2, ["No"]);
      return {
        yes: result[0].length,
        no: result2[0].length,
      };
    } catch (error) {}
  };
  getchestpain = async (connection: any) => {
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

      const result = await connection.execute(q, ["Yes"]);
      const result2 = await connection.execute(q2, ["No"]);
      return {
        yes: result[0].length,
        no: result2[0].length,
      };
    } catch (error) {}
  };
  getepigastricpain = async (connection: any) => {
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

      const result = await connection.execute(q, ["Yes"]);
      const result2 = await connection.execute(q2, ["No"]);
      return {
        yes: result[0].length,
        no: result2[0].length,
      };
    } catch (error) {}
  };
  getseveretiredness = async (connection: any) => {
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

      const result = await connection.execute(q, ["Yes"]);
      const result2 = await connection.execute(q2, ["No"]);
      return {
        yes: result[0].length,
        no: result2[0].length,
      };
    } catch (error) {}
  };
  getsevereabdominalpain = async (connection: any) => {
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

      const result = await connection.execute(q, ["Yes"]);
      const result2 = await connection.execute(q2, ["No"]);
      return {
        yes: result[0].length,
        no: result2[0].length,
      };
    } catch (error) {}
  };
  getpersistentvomiting = async (connection: any) => {
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

      const result = await connection.execute(q, ["Yes"]);
      const result2 = await connection.execute(q2, ["No"]);
      return {
        yes: result[0].length,
        no: result2[0].length,
      };
    } catch (error) {}
  };
  getseverediarrhoea = async (connection: any) => {
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

      const result = await connection.execute(q, ["Yes"]);
      const result2 = await connection.execute(q2, ["No"]);
      return {
        yes: result[0].length,
        no: result2[0].length,
      };
    } catch (error) {}
  };
  getdizziness = async (connection: any) => {
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

      const result = await connection.execute(q, ["Yes"]);
      const result2 = await connection.execute(q2, ["No"]);
      return {
        yes: result[0].length,
        no: result2[0].length,
      };
    } catch (error) {}
  };
  //urinary
  getpainwithurination = async (connection: any) => {
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

      const result = await connection.execute(q, ["Yes"]);
      const result2 = await connection.execute(q2, ["No"]);
      return {
        yes: result[0].length,
        no: result2[0].length,
      };
    } catch (error) {}
  };
  getsevereflankpain = async (connection: any) => {
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

      const result = await connection.execute(q, ["Yes"]);
      const result2 = await connection.execute(q2, ["No"]);
      return {
        yes: result[0].length,
        no: result2[0].length,
      };
    } catch (error) {}
  };
  getbloodinurine = async (connection: any) => {
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

      const result = await connection.execute(q, ["Yes"]);
      const result2 = await connection.execute(q2, ["No"]);
      return {
        yes: result[0].length,
        no: result2[0].length,
      };
    } catch (error) {}
  };
  //gynaelogical
  getvaginaldischarge = async (connection: any) => {
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

      const result = await connection.execute(q, ["Yes"]);
      const result2 = await connection.execute(q2, ["No"]);
      return {
        yes: result[0].length,
        no: result2[0].length,
      };
    } catch (error) {}
  };
  getdeeppelvicpain = async (connection: any) => {
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

      const result = await connection.execute(q, ["Yes"]);
      const result2 = await connection.execute(q2, ["No"]);
      return {
        yes: result[0].length,
        no: result2[0].length,
      };
    } catch (error) {}
  };
  getsyphilis = async (connection: any) => {
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

      const result = await connection.execute(q, ["Yes"]);
      const result2 = await connection.execute(q2, ["No"]);
      return {
        yes: result[0].length,
        no: result2[0].length,
      };
    } catch (error) {}
  };
  getpersistentdrycough = async (connection: any) => {
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

      const result = await connection.execute(q, ["Yes"]);
      const result2 = await connection.execute(q2, ["No"]);
      return {
        yes: result[0].length,
        no: result2[0].length,
      };
    } catch (error) {}
  };
  getprogressiveweightloss = async (connection: any) => {
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

      const result = await connection.execute(q, ["Yes"]);
      const result2 = await connection.execute(q2, ["No"]);
      return {
        yes: result[0].length,
        no: result2[0].length,
      };
    } catch (error) {}
  };
  getnightsweats = async (connection: any) => {
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

      const result = await connection.execute(q, ["Yes"]);
      const result2 = await connection.execute(q2, ["No"]);
      return {
        yes: result[0].length,
        no: result2[0].length,
      };
    } catch (error) {}
  };
  getdiagnosedwithtuberculosis = async (connection: any) => {
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

      const result = await connection.execute(q, ["Yes"]);
      const result2 = await connection.execute(q2, ["No"]);
      return {
        yes: result[0].length,
        no: result2[0].length,
      };
    } catch (error) {}
  };
  gettreatedTBpreviously = async (connection: any) => {
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

      const result = await connection.execute(q, ["Yes"]);
      const result2 = await connection.execute(q2, ["No"]);
      return {
        yes: result[0].length,
        no: result2[0].length,
      };
    } catch (error) {}
  };
  //pastmedicalhistory
  getheartdisease = async (connection: any) => {
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

      const result = await connection.execute(q, ["Yes"]);
      const result2 = await connection.execute(q2, ["No"]);
      return {
        yes: result[0].length,
        no: result2[0].length,
      };
    } catch (error) {}
  };
  getanaemia = async (connection: any) => {
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

      const result = await connection.execute(q, ["Yes"]);
      const result2 = await connection.execute(q2, ["No"]);
      return {
        yes: result[0].length,
        no: result2[0].length,
      };
    } catch (error) {}
  };
  getkidneydisease = async (connection: any) => {
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

      const result = await connection.execute(q, ["Yes"]);
      const result2 = await connection.execute(q2, ["No"]);
      return {
        yes: result[0].length,
        no: result2[0].length,
      };
    } catch (error) {}
  };
  getsicklecell = async (connection: any) => {
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

      const result = await connection.execute(q, ["Yes"]);
      const result2 = await connection.execute(q2, ["No"]);
      return {
        yes: result[0].length,
        no: result2[0].length,
      };
    } catch (error) {}
  };
  getdiabetes = async (connection: any) => {
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

      const result = await connection.execute(q, ["Yes"]);
      const result2 = await connection.execute(q2, ["No"]);
      return {
        yes: result[0].length,
        no: result2[0].length,
      };
    } catch (error) {}
  };
  getgoitre = async (connection: any) => {
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

      const result = await connection.execute(q, ["Yes"]);
      const result2 = await connection.execute(q2, ["No"]);
      return {
        yes: result[0].length,
        no: result2[0].length,
      };
    } catch (error) {}
  };
  gethivaids = async (connection: any) => {
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

      const result = await connection.execute(q, ["Yes"]);
      const result2 = await connection.execute(q2, ["No"]);
      return {
        yes: result[0].length,
        no: result2[0].length,
      };
    } catch (error) {}
  };
  getotherseriouschronicillnesses = async (connection: any) => {
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

      const result = await connection.execute(q, ["Yes"]);
      const result2 = await connection.execute(q2, ["No"]);
      return {
        yes: result[0].length,
        no: result2[0].length,
      };
    } catch (error) {}
  };
  gethadsurgery = async (connection: any) => {
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

      const result = await connection.execute(q, ["Yes"]);
      const result2 = await connection.execute(q2, ["No"]);
      return {
        yes: result[0].length,
        no: result2[0].length,
      };
    } catch (error) {}
  };
  //drug history
  getherbalremedies = async (connection: any) => {
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

      const result = await connection.execute(q, ["Yes"]);
      const result2 = await connection.execute(q2, ["No"]);
      return {
        yes: result[0].length,
        no: result2[0].length,
      };
    } catch (error) {}
  };
  getotcdrugs = async (connection: any) => {
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

      const result = await connection.execute(q, ["Yes"]);
      const result2 = await connection.execute(q2, ["No"]);
      return {
        yes: result[0].length,
        no: result2[0].length,
      };
    } catch (error) {}
  };
  getvitamins = async (connection: any) => {
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

      const result = await connection.execute(q, ["Yes"]);
      const result2 = await connection.execute(q2, ["No"]);
      return {
        yes: result[0].length,
        no: result2[0].length,
      };
    } catch (error) {}
  };
  getdietarysupplements = async (connection: any) => {
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

      const result = await connection.execute(q, ["Yes"]);
      const result2 = await connection.execute(q2, ["No"]);
      return {
        yes: result[0].length,
        no: result2[0].length,
      };
    } catch (error) {}
  };
  gettetanus = async (connection: any) => {
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

      const result = await connection.execute(q, ["Yes"]);
      const result2 = await connection.execute(q2, ["No"]);
      return {
        yes: result[0].length,
        no: result2[0].length,
      };
    } catch (error) {}
  };

  nationalgeneraldata = async (req: Request, res: Response) => {
    const date = req.query.date || null;
    const connection = await db.getConnection();

    try {
      //personalinformation
      const edd = await this.getedd2(connection);
      const firstbabymovement = await this.getfirstbabymovement(connection);
      const parity = await this.getparity(connection);
      const babysmovement = await this.getbabysmovement(connection);
      const graviditygreaterthan8result = await this.graviditygreaterthan8(
        connection
      );
      const graviditylessthan8result = await this.graviditylessthan8(
        connection
      );
      //obstetric
      const convulsionsduringpregnancy = await this.getconvulsions(connection);
      const caesarean = await this.getsurgery(connection);
      const tearsthroughsphincter = await this.gettearsthroughsphincter(
        connection
      );
      const postpartiumhaemorrghage = await this.getpostpartiumhaemorrghage(
        connection
      );
      const stillbirths = await this.getstillbirths(connection);
      const prematuredeliveries = await this.getprematuredeliveries(connection);
      const lowbirthbabies = await this.getlowbirthbabies(connection);
      const babieswhodied = await this.getbabieswhodied(connection);
      const miscarriages = await this.getmiscarriages(connection);
      const breastfedbefore = await this.getbreastfedbefore(connection);
      const breastfeedingduration = await this.getbreastfeedingduration(
        connection
      );
      const breastfeedingproblems = await this.getbreastfeedingproblems(
        connection
      );
      //dailyhabitsandlifestyle
      const doyousmoke = await this.getSmokers(connection);
      const alcohol = await this.getAlcohol(connection);
      const threatened = await this.getThreatened(connection);
      const livewith = await this.whodoyoulivewith(connection);
      //medicalhistory
      const cough = await this.getcough(connection);
      const palpitations = await this.getpalpitations(connection);
      const difficultybreathing = await this.getdifficultybreathing(connection);
      const swellingfeet = await this.getswellingoffeet(connection);
      const chestpain = await this.getchestpain(connection);
      const epigastricpain = await this.getepigastricpain(connection);
      const severetiredness = await this.getseveretiredness(connection);
      const severeabdominalpain = await this.getsevereabdominalpain(connection);
      const persistentvomiting = await this.getpersistentvomiting(connection);
      const severediarrhoea = await this.getseverediarrhoea(connection);
      const dizziness = await this.getdizziness(connection);
      //urinary
      const painwithurination = await this.getpainwithurination(connection);
      const severeflankpain = await this.getsevereflankpain(connection);
      const bloodinurine = await this.getbloodinurine(connection);
      //gynaecological
      const vaginaldischarge = await this.getvaginaldischarge(connection);
      const deeppelvicpain = await this.getdeeppelvicpain(connection);
      const syphilis = await this.getsyphilis(connection);
      const persistentdrycough = await this.getpersistentdrycough(connection);
      const progressiveweightloss = await this.getprogressiveweightloss(
        connection
      );
      const nightsweats = await this.getnightsweats(connection);
      const diagnosedwithtuberculosis = await this.getdiagnosedwithtuberculosis(
        connection
      );
      const treatedTBpreviously = await this.gettreatedTBpreviously(connection);
      //pastmedicalhistory
      const heartdisease = await this.getheartdisease(connection);
      const anaemia = await this.getanaemia(connection);
      const kidneydisease = await this.getkidneydisease(connection);
      const sicklecell = await this.getsicklecell(connection);
      const diabetes = await this.getdiabetes(connection);
      const goitre = await this.getgoitre(connection);
      const hivaids = await this.gethivaids(connection);
      const otherseriouschronicillnesses =
        await this.getotherseriouschronicillnesses(connection);
      const hadsurgery = await this.gethadsurgery(connection);
      //drughistory
      const herbalremedies = await this.getherbalremedies(connection);
      const otcdrugs = await this.getotcdrugs(connection);
      const vitamins = await this.getvitamins(connection);
      const dietarysupplements = await this.getdietarysupplements(connection);
      const tetanus = await this.gettetanus(connection);
      res.status(200).json({
        edd,
        convulsionsduringpregnancy,
        caesarean,
        tearsthroughsphincter,
        postpartiumhaemorrghage,
        firstbabymovement,
        parity,
        babysmovement,
        graviditygreaterthan8result,
        graviditylessthan8result,
        stillbirths,
        prematuredeliveries,
        lowbirthbabies,
        babieswhodied,
        miscarriages,
        breastfedbefore,
        breastfeedingduration,
        breastfeedingproblems,
        doyousmoke,
        alcohol,
        threatened,
        livewith,
        cough,
        palpitations,
        difficultybreathing,
        swellingfeet,
        chestpain,
        epigastricpain,
        severetiredness,
        severeabdominalpain,
        persistentvomiting,
        severediarrhoea,
        dizziness,
        painwithurination,
        severeflankpain,
        bloodinurine,
        vaginaldischarge,
        deeppelvicpain,
        syphilis,
        persistentdrycough,
        progressiveweightloss,
        nightsweats,
        diagnosedwithtuberculosis,
        treatedTBpreviously,
        heartdisease,
        anaemia,
        kidneydisease,
        sicklecell,
        diabetes,
        goitre,
        hivaids,
        otherseriouschronicillnesses,
        hadsurgery,
        herbalremedies,
        otcdrugs,
        vitamins,
        dietarysupplements,
        tetanus,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    } finally {
      if (connection) {
        connection.release();
      }
    }
  };

  getvisitdates = async (req: Request, res: Response) => {
    let connection;
    const { id } = req.params;
    try {
      connection = await db.getConnection();
      const q = `SELECT firstvisit_date,id
      FROM firstvisit
      WHERE patient_id = ?`;
      const q2 = `SELECT returnvisit_date,id
      FROM returnvisit
      WHERE patient_id = ?
      `;
      const [firstvisit] = await connection.execute(q, [id]);
      const [returnvisit] = await connection.execute(q2, [id]);
      res.status(200).json({ firstvisit, returnvisit });
    } catch (error) {
      res.status(500).json(error);
    } finally {
      if (connection) {
        connection.release();
      }
    }
  };

  nationalscheduledata = async (req: Request, res: Response) => {
    const connection = await db.getConnection();
    try {
      const q = `SELECT * FROM schedule;`;
      const q2 = `SELECT * FROM schedule WHERE missed = ?;`;
      const q3 = `SELECT * FROM schedule WHERE completed = ?;`;
      const q4 = `SELECT * FROM schedule WHERE upcoming = ?;`;
      const q5 = `SELECT * FROM schedule WHERE flagged = ?;`;
      const [number]: any = await connection.execute(q);
      const [missed]: any = await connection.execute(q2, [1]);
      const [completed]: any = await connection.execute(q3, [1]);
      const [upcoming]: any = await connection.execute(q4, [1]);
      const [flagged]: any = await connection.execute(q5, [1]);

      res.status(200).json({
        number: number.length,
        missed: missed.length,
        completed: completed.length,
        upcoming: upcoming.length,
        flagged: flagged.length,
      });
    } catch (error) {
      res.status(500).json(error);
    } finally {
      if (connection) {
        connection.release();
      }
    }
  };

  //testresult
  nationaltestdata = async (req: Request, res: Response) => {
    const gethiv = async () => {
      const connection = await db.getConnection();
      try {
        const q = `SELECT * FROM testresult WHERE hiv = ?
        `;
        const q2 = `SELECT * FROM testresult WHERE hiv = ?
        `;

        const result: any = await connection.execute(q, ["+ve"]);
        const result2: any = await connection.execute(q2, ["-ve"]);
        return {
          positive: result[0].length,
          negative: result2[0].length,
        };
      } catch (error) {
        connection.release();
        logger.error(error);
      } finally {
        if (connection) {
          connection.release();
        }
      }
    };
    const getmalariarapid = async () => {
      const connection = await db.getConnection();
      try {
        const q = `SELECT * FROM testresult WHERE malariarapid = ?
        `;
        const q2 = `SELECT * FROM testresult WHERE malariarapid = ?
        `;

        const result: any = await connection.execute(q, ["+ve"]);
        const result2: any = await connection.execute(q2, ["-ve"]);
        return {
          positive: result[0].length,
          negative: result2[0].length,
        };
      } catch (error) {
      } finally {
        if (connection) {
          connection.release();
        }
      }
    };
    try {
      const hiv = await gethiv();
      const malariarapid = await getmalariarapid();

      res.status(200).json({
        hiv: hiv,
        malariarapid: malariarapid,
      });
    } catch (error) {
      logger.error(error);
      res.status(500).json(error);
    }
  };
}

export default new NationalDataController();
