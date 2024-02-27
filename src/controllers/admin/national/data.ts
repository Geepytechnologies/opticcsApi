//@ts-nocheck
import db from "../../../config/db";
import logger from "../../../logger";

const numberofwomenwith4visits = async (req, res) => {
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

const graviditygreaterthan8 = async (connection) => {
  try {
    const q = `SELECT *
    FROM personalinformation
    WHERE CAST(gravidity AS SIGNED) > 8 OR CAST(gravidity AS SIGNED) = 8`;
    const result = await connection.execute(q);
    return result[0].length;
  } catch (error) {
    console.log(error);
  }
};
const graviditylessthan8 = async (connection) => {
  try {
    const q = `SELECT *
    FROM personalinformation
    WHERE CAST(gravidity AS SIGNED) < 8`;
    const result = await connection.execute(q);
    return result[0].length;
  } catch (error) {
    console.log(error);
  }
};
const getedd = async (req, res) => {
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
const getedd2 = async (connection) => {
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
const getparity = async (connection) => {
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

const getbabysmovement = async (connection) => {
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
const getfirstbabymovement = async (connection) => {
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
const getconvulsions = async (connection) => {
  try {
    const q = `SELECT * FROM obstetrichistory WHERE convulsionsduringpregnancy = ?`;
    const result = await connection.execute(q, ["yes"]);
    const q2 = `SELECT * FROM obstetrichistory WHERE convulsionsduringpregnancy = ?`;
    const result2 = await connection.execute(q2, ["yes"]);
    return { yes: result[0].length, no: result2[0].length };
  } catch (error) {}
};
const getsurgery = async (connection) => {
  try {
    const q = `SELECT * FROM obstetrichistory WHERE caesarean  = ?`;
    const result = await connection.execute(q, ["yes"]);
    const q2 = `SELECT * FROM obstetrichistory WHERE caesarean  = ?`;
    const result2 = await connection.execute(q2, ["yes"]);
    return { yes: result[0].length, no: result2[0].length };
  } catch (error) {}
};
const gettearsthroughsphincter = async (connection) => {
  try {
    const q = `SELECT * FROM obstetrichistory WHERE tearsthroughsphincter = ?`;
    const result = await connection.execute(q, ["yes"]);
    const q2 = `SELECT * FROM obstetrichistory WHERE tearsthroughsphincter = ?`;
    const result2 = await connection.execute(q2, ["no"]);
    return { yes: result[0].length, no: result2[0].length };
  } catch (error) {}
};
const getpostpartiumhaemorrghage = async (connection) => {
  try {
    const q = `SELECT * FROM obstetrichistory WHERE postpartiumhaemorrghage   = ?`;
    const q2 = `SELECT * FROM obstetrichistory WHERE postpartiumhaemorrghage   = ?`;
    const result = await connection.execute(q, ["yes"]);
    const result2 = await connection.execute(q2, ["no"]);
    return { yes: result[0].length, no: result2[0].length };
  } catch (error) {}
};
const getstillbirths = async (connection) => {
  try {
    const q = `SELECT * FROM obstetrichistory WHERE stillbirths   = ?`;
    const q2 = `SELECT * FROM obstetrichistory WHERE stillbirths   = ?`;
    const result = await connection.execute(q, ["yes"]);
    const result2 = await connection.execute(q2, ["no"]);
    return { yes: result[0].length, no: result2[0].length };
  } catch (error) {}
};
const getprematuredeliveries = async (connection) => {
  try {
    const q = `SELECT * FROM obstetrichistory WHERE prematuredeliveries   = ?`;
    const q2 = `SELECT * FROM obstetrichistory WHERE prematuredeliveries   = ?`;
    const result = await connection.execute(q, ["yes"]);
    const result2 = await connection.execute(q2, ["no"]);
    return { yes: result[0].length, no: result2[0].length };
  } catch (error) {}
};
const getlowbirthbabies = async (connection) => {
  try {
    const q = `SELECT * FROM obstetrichistory WHERE lowbirthbabies   = ?`;
    const q2 = `SELECT * FROM obstetrichistory WHERE lowbirthbabies   = ?`;
    const result = await connection.execute(q, ["yes"]);
    const result2 = await connection.execute(q2, ["no"]);
    return { yes: result[0].length, no: result2[0].length };
  } catch (error) {}
};
const getbabieswhodied = async (connection) => {
  try {
    const q = `SELECT * FROM obstetrichistory WHERE babieswhodied = ?`;
    const q2 = `SELECT * FROM obstetrichistory WHERE babieswhodied = ?`;
    const result = await connection.execute(q, ["yes"]);
    const result2 = await connection.execute(q2, ["no"]);
    return { yes: result[0].length, no: result2[0].length };
  } catch (error) {}
};
const getmiscarriages = async (connection) => {
  try {
    const q = `SELECT * FROM obstetrichistory WHERE miscarriages   = ?`;
    const q2 = `SELECT * FROM obstetrichistory WHERE miscarriages   = ?`;
    const result = await connection.execute(q, ["yes"]);
    const result2 = await connection.execute(q2, ["no"]);
    return { yes: result[0].length, no: result2[0].length };
  } catch (error) {}
};
const getbreastfedbefore = async (connection) => {
  try {
    const q = `SELECT * FROM familyhistory WHERE haveyoubreastfedbefore   = ?`;
    const q2 = `SELECT * FROM familyhistory WHERE haveyoubreastfedbefore   = ?`;
    const result = await connection.execute(q, ["Yes"]);
    const result2 = await connection.execute(q2, ["No"]);
    return { yes: result[0].length, no: result2[0].length };
  } catch (error) {}
};
const getbreastfeedingduration = async (connection) => {
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
const getbreastfeedingproblems = async (connection) => {
  try {
    const q = `SELECT * FROM familyhistory WHERE breastfeedingproblems   = ?`;
    const q2 = `SELECT * FROM familyhistory WHERE breastfeedingproblems   = ?`;
    const result = await connection.execute(q, ["Yes"]);
    const result2 = await connection.execute(q2, ["No"]);
    return { yes: result[0].length, no: result2[0].length };
  } catch (error) {}
};

//dailyhabits and lifestyle
const getSmokers = async (connection) => {
  try {
    const q = `SELECT * FROM dailyhabitsandlifestyle WHERE doyousmoke   = ?`;
    const q2 = `SELECT * FROM dailyhabitsandlifestyle WHERE doyousmoke   = ?`;
    const result = await connection.execute(q, ["yes"]);
    const result2 = await connection.execute(q2, ["no"]);
    return { yes: result[0].length, no: result2[0].length };
  } catch (error) {}
};
const getAlcohol = async (connection) => {
  try {
    const q = `SELECT * FROM dailyhabitsandlifestyle WHERE doyoudrinkalcohol   = ?`;
    const q2 = `SELECT * FROM dailyhabitsandlifestyle WHERE doyoudrinkalcohol   = ?`;
    const result = await connection.execute(q, ["yes"]);
    const result2 = await connection.execute(q2, ["no"]);
    return { yes: result[0].length, no: result2[0].length };
  } catch (error) {}
};
const getThreatened = async (connection) => {
  try {
    const q = `SELECT * FROM dailyhabitsandlifestyle WHERE threatenedyourlife   = ?`;
    const q2 = `SELECT * FROM dailyhabitsandlifestyle WHERE threatenedyourlife   = ?`;
    const result = await connection.execute(q, ["yes"]);
    const result2 = await connection.execute(q2, ["no"]);
    return { yes: result[0].length, no: result2[0].length };
  } catch (error) {}
};
const whodoyoulivewith = async (connection) => {
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
const getcough = async (connection) => {
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

const getpalpitations = async (connection) => {
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
const getdifficultybreathing = async (connection) => {
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
const getswellingoffeet = async (connection) => {
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
const getchestpain = async (connection) => {
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
const getepigastricpain = async (connection) => {
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
const getseveretiredness = async (connection) => {
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
const getsevereabdominalpain = async (connection) => {
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
const getpersistentvomiting = async (connection) => {
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
const getseverediarrhoea = async (connection) => {
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
const getdizziness = async (connection) => {
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
const getpainwithurination = async (connection) => {
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
const getsevereflankpain = async (connection) => {
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
const getbloodinurine = async (connection) => {
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
const getvaginaldischarge = async (connection) => {
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
const getdeeppelvicpain = async (connection) => {
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
const getsyphilis = async (connection) => {
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
const getpersistentdrycough = async (connection) => {
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
const getprogressiveweightloss = async (connection) => {
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
const getnightsweats = async (connection) => {
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
const getdiagnosedwithtuberculosis = async (connection) => {
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
const gettreatedTBpreviously = async (connection) => {
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
const getheartdisease = async (connection) => {
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
const getanaemia = async (connection) => {
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
const getkidneydisease = async (connection) => {
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
const getsicklecell = async (connection) => {
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
const getdiabetes = async (connection) => {
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
const getgoitre = async (connection) => {
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
const gethivaids = async (connection) => {
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
const getotherseriouschronicillnesses = async (connection) => {
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
const gethadsurgery = async (connection) => {
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
const getherbalremedies = async (connection) => {
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
const getotcdrugs = async (connection) => {
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
const getvitamins = async (connection) => {
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
const getdietarysupplements = async (connection) => {
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
const gettetanus = async (connection) => {
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

const nationalgeneraldata = async (req, res) => {
  const date = req.query.date || null;
  const connection = await db.getConnection();

  try {
    //personalinformation
    const edd = await getedd2(connection);
    const firstbabymovement = await getfirstbabymovement(connection);
    const parity = await getparity(connection);
    const babysmovement = await getbabysmovement(connection);
    const graviditygreaterthan8result = await graviditygreaterthan8(connection);
    const graviditylessthan8result = await graviditylessthan8(connection);
    //obstetric
    const convulsionsduringpregnancy = await getconvulsions(connection);
    const caesarean = await getsurgery(connection);
    const tearsthroughsphincter = await gettearsthroughsphincter(connection);
    const postpartiumhaemorrghage = await getpostpartiumhaemorrghage(
      connection
    );
    const stillbirths = await getstillbirths(connection);
    const prematuredeliveries = await getprematuredeliveries(connection);
    const lowbirthbabies = await getlowbirthbabies(connection);
    const babieswhodied = await getbabieswhodied(connection);
    const miscarriages = await getmiscarriages(connection);
    const breastfedbefore = await getbreastfedbefore(connection);
    const breastfeedingduration = await getbreastfeedingduration(connection);
    const breastfeedingproblems = await getbreastfeedingproblems(connection);
    //dailyhabitsandlifestyle
    const doyousmoke = await getSmokers(connection);
    const alcohol = await getAlcohol(connection);
    const threatened = await getThreatened(connection);
    const livewith = await whodoyoulivewith(connection);
    //medicalhistory
    const cough = await getcough(connection);
    const palpitations = await getpalpitations(connection);
    const difficultybreathing = await getdifficultybreathing(connection);
    const swellingfeet = await getswellingoffeet(connection);
    const chestpain = await getchestpain(connection);
    const epigastricpain = await getepigastricpain(connection);
    const severetiredness = await getseveretiredness(connection);
    const severeabdominalpain = await getsevereabdominalpain(connection);
    const persistentvomiting = await getpersistentvomiting(connection);
    const severediarrhoea = await getseverediarrhoea(connection);
    const dizziness = await getdizziness(connection);
    //urinary
    const painwithurination = await getpainwithurination(connection);
    const severeflankpain = await getsevereflankpain(connection);
    const bloodinurine = await getbloodinurine(connection);
    //gynaecological
    const vaginaldischarge = await getvaginaldischarge(connection);
    const deeppelvicpain = await getdeeppelvicpain(connection);
    const syphilis = await getsyphilis(connection);
    const persistentdrycough = await getpersistentdrycough(connection);
    const progressiveweightloss = await getprogressiveweightloss(connection);
    const nightsweats = await getnightsweats(connection);
    const diagnosedwithtuberculosis = await getdiagnosedwithtuberculosis(
      connection
    );
    const treatedTBpreviously = await gettreatedTBpreviously(connection);
    //pastmedicalhistory
    const heartdisease = await getheartdisease(connection);
    const anaemia = await getanaemia(connection);
    const kidneydisease = await getkidneydisease(connection);
    const sicklecell = await getsicklecell(connection);
    const diabetes = await getdiabetes(connection);
    const goitre = await getgoitre(connection);
    const hivaids = await gethivaids(connection);
    const otherseriouschronicillnesses = await getotherseriouschronicillnesses(
      connection
    );
    const hadsurgery = await gethadsurgery(connection);
    //drughistory
    const herbalremedies = await getherbalremedies(connection);
    const otcdrugs = await getotcdrugs(connection);
    const vitamins = await getvitamins(connection);
    const dietarysupplements = await getdietarysupplements(connection);
    const tetanus = await gettetanus(connection);
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
const nationalreturnvisitdata = async (req, res) => {
  const getfeverreturn = async () => {
    const connection = await db.getConnection();
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
        rv.fever = ?
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
        rv.fever = ?
      `;

      const result = await connection.execute(q, ["Yes"]);
      const result2 = await connection.execute(q2, ["No"]);
      return {
        yes: result[0].length,
        no: result2[0].length,
      };
    } catch (error) {
    } finally {
      if (connection) {
        connection.release();
      }
    }
  };
  const getheadachereturn = async () => {
    const connection = await db.getConnection();
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
        rv.headache = ?
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
        rv.headache = ?
      `;

      const result = await connection.execute(q, ["Yes"]);
      const result2 = await connection.execute(q2, ["No"]);
      return {
        yes: result[0].length,
        no: result2[0].length,
      };
    } catch (error) {
    } finally {
      if (connection) {
        connection.release();
      }
    }
  };
  const getcoughreturn = async () => {
    const connection = await db.getConnection();
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
        rv.cough = ?
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
        rv.cough = ?
      `;

      const result = await connection.execute(q, ["Yes"]);
      const result2 = await connection.execute(q2, ["No"]);
      return {
        yes: result[0].length,
        no: result2[0].length,
      };
    } catch (error) {
    } finally {
      if (connection) {
        connection.release();
      }
    }
  };
  const getpalpitationsreturn = async () => {
    const connection = await db.getConnection();
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
        rv.palpitation = ?
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
        rv.palpitation = ?
      `;

      const result = await connection.execute(q, ["Yes"]);
      const result2 = await connection.execute(q2, ["No"]);
      return {
        yes: result[0].length,
        no: result2[0].length,
      };
    } catch (error) {
    } finally {
      if (connection) {
        connection.release();
      }
    }
  };
  const getseveretirednessreturn = async () => {
    const connection = await db.getConnection();
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
        rv.severetirednesss = ?
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
        rv.severetirednesss = ?
      `;

      const result = await connection.execute(q, ["Yes"]);
      const result2 = await connection.execute(q2, ["No"]);
      return {
        yes: result[0].length,
        no: result2[0].length,
      };
    } catch (error) {
    } finally {
      if (connection) {
        connection.release();
      }
    }
  };
  const getdifficultylyingflatreturn = async () => {
    const connection = await db.getConnection();
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
        rv.difficultylyingflat = ?
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
        rv.difficultylyingflat = ?
      `;

      const result = await connection.execute(q, ["Yes"]);
      const result2 = await connection.execute(q2, ["No"]);
      return {
        yes: result[0].length,
        no: result2[0].length,
      };
    } catch (error) {
    } finally {
      if (connection) {
        connection.release();
      }
    }
  };
  const getdizzinessreturn = async () => {
    const connection = await db.getConnection();
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
        rv.dizziness = ?
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
        rv.dizziness = ?
      `;

      const result = await connection.execute(q, ["Yes"]);
      const result2 = await connection.execute(q2, ["No"]);
      return {
        yes: result[0].length,
        no: result2[0].length,
      };
    } catch (error) {
    } finally {
      if (connection) {
        connection.release();
      }
    }
  };
  const getconvulsionsreturn = async () => {
    const connection = await db.getConnection();
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
        rv.convulsions = ?
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
        rv.convulsions = ?
      `;

      const result = await connection.execute(q, ["Yes"]);
      const result2 = await connection.execute(q2, ["No"]);
      return {
        yes: result[0].length,
        no: result2[0].length,
      };
    } catch (error) {
    } finally {
      if (connection) {
        connection.release();
      }
    }
  };
  const getabdominalpainreturn = async () => {
    const connection = await db.getConnection();
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
        rv.severeabdominalpain = ?
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
        rv.severeabdominalpain = ?
      `;

      const result = await connection.execute(q, ["Yes"]);
      const result2 = await connection.execute(q2, ["No"]);
      return {
        yes: result[0].length,
        no: result2[0].length,
      };
    } catch (error) {
    } finally {
      if (connection) {
        connection.release();
      }
    }
  };
  const getpainwithurinationreturn = async () => {
    const connection = await db.getConnection();
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
        rv.urinarypain = ?
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
        rv.urinarypain = ?
      `;

      const result = await connection.execute(q, ["Yes"]);
      const result2 = await connection.execute(q2, ["No"]);
      return {
        yes: result[0].length,
        no: result2[0].length,
      };
    } catch (error) {
    } finally {
      if (connection) {
        connection.release();
      }
    }
  };
  const getbloodinurinereturn = async () => {
    const connection = await db.getConnection();
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
        rv.bloodinurine = ?
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
        rv.bloodinurine = ?
      `;

      const result = await connection.execute(q, ["Yes"]);
      const result2 = await connection.execute(q2, ["No"]);
      return {
        yes: result[0].length,
        no: result2[0].length,
      };
    } catch (error) {
    } finally {
      if (connection) {
        connection.release();
      }
    }
  };
  const getvaginaldischargereturn = async () => {
    const connection = await db.getConnection();
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
        rv.vaginaldischarge = ?
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
        rv.vaginaldischarge = ?
      `;

      const result = await connection.execute(q, ["Yes"]);
      const result2 = await connection.execute(q2, ["No"]);
      return {
        yes: result[0].length,
        no: result2[0].length,
      };
    } catch (error) {
    } finally {
      if (connection) {
        connection.release();
      }
    }
  };
  const getdeeppelvicpainreturn = async () => {
    const connection = await db.getConnection();
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
        rv.painduringsex = ?
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
        rv.painduringsex = ?
      `;

      const result = await connection.execute(q, ["Yes"]);
      const result2 = await connection.execute(q2, ["No"]);
      return {
        yes: result[0].length,
        no: result2[0].length,
      };
    } catch (error) {
    } finally {
      if (connection) {
        connection.release();
      }
    }
  };
  const getsyphilisreturn = async () => {
    const connection = await db.getConnection();
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
        rv.syphillis = ?
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
        rv.syphillis = ?
      `;

      const result = await connection.execute(q, ["Yes"]);
      const result2 = await connection.execute(q2, ["No"]);
      return {
        yes: result[0].length,
        no: result2[0].length,
      };
    } catch (error) {
    } finally {
      if (connection) {
        connection.release();
      }
    }
  };
  try {
    const fever = await getfeverreturn();
    const headache = await getheadachereturn();
    const cough = await getcoughreturn();
    const palpitations = await getpalpitationsreturn();
    const severetiredness = await getseveretirednessreturn();
    const difficultylyingflat = await getdifficultylyingflatreturn();
    const dizziness = await getdizzinessreturn();
    const convulsionsduringpregnancy = await getconvulsionsreturn();
    const abdominalpain = await getabdominalpainreturn();
    const painwithurination = await getpainwithurinationreturn();
    const bloodinurine = await getbloodinurinereturn();
    const vaginaldischarge = await getvaginaldischargereturn();
    const deeppelvicpain = await getdeeppelvicpainreturn();
    const syphilis = await getsyphilisreturn();

    res.status(200).json({
      fever,
      headache,
      cough,
      palpitations,
      severetiredness,
      difficultylyingflat,
      dizziness,
      convulsionsduringpregnancy,
      abdominalpain,
      painwithurination,
      bloodinurine,
      vaginaldischarge,
      deeppelvicpain,
      syphilis,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  } finally {
  }
};

const getvisitdates = async (req, res) => {
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
    connection.release();
    res.status(500).json(error);
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

const nationalscheduledata = async (req, res) => {
  const connection = await db.getConnection();
  try {
    const q = `SELECT * FROM schedule;`;
    const q2 = `SELECT * FROM schedule WHERE missed = ?;`;
    const q3 = `SELECT * FROM schedule WHERE completed = ?;`;
    const q4 = `SELECT * FROM schedule WHERE upcoming = ?;`;
    const q5 = `SELECT * FROM schedule WHERE flagged = ?;`;
    const [number] = await connection.execute(q);
    const [missed] = await connection.execute(q2, [1]);
    const [completed] = await connection.execute(q3, [1]);
    const [upcoming] = await connection.execute(q4, [1]);
    const [flagged] = await connection.execute(q5, [1]);

    res.status(200).json({
      number: number.length,
      missed: missed.length,
      completed: completed.length,
      upcoming: upcoming.length,
      flagged: flagged.length,
    });
  } catch (error) {
    connection.release();
    res.status(500).json(error);
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

//testresult
const nationaltestdata = async (req, res) => {
  const gethiv = async () => {
    const connection = await db.getConnection();
    try {
      const q = `SELECT * FROM testresult WHERE hiv = ?
      `;
      const q2 = `SELECT * FROM testresult WHERE hiv = ?
      `;

      const result = await connection.execute(q, ["+ve"]);
      const result2 = await connection.execute(q2, ["-ve"]);
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

      const result = await connection.execute(q, ["+ve"]);
      const result2 = await connection.execute(q2, ["-ve"]);
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

//return visit

export {
  nationalgeneraldata,
  nationalreturnvisitdata,
  numberofwomenwith4visits,
  getvisitdates,
  nationalscheduledata,
  nationaltestdata,
};
