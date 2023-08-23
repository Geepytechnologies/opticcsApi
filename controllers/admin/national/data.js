const db = require("../../../config/db");

const numberofwomenwith4visits = async (req, res) => {
  const connection = await db.getConnection();
  try {
    const q = `SELECT p.id AS patient_id
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

const graviditygreaterthan8 = async () => {
  const connection = await db.getConnection();
  try {
    const q = `SELECT *
    FROM personalinformation
    WHERE CAST(gravidity AS SIGNED) > 8 OR CAST(gravidity AS SIGNED) = 8`;
    const result = await connection.execute(q);
    return result[0].length;
  } catch (error) {
    console.log(error);
  } finally {
    if (connection) {
      connection.release();
    }
  }
};
const graviditylessthan8 = async () => {
  const connection = await db.getConnection();
  try {
    const q = `SELECT *
    FROM personalinformation
    WHERE CAST(gravidity AS SIGNED) < 8`;
    const result = await connection.execute(q);
    return result[0].length;
  } catch (error) {
    console.log(error);
  } finally {
    if (connection) {
      connection.release();
    }
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
  } finally {
    if (connection) {
      connection.release();
    }
  }
};
const getedd2 = async () => {
  const connection = await db.getConnection();
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
      , lga, healthFacility
    FROM personalinformation
  ) AS subquery ON quarters.quarter = subquery.quarter
  GROUP BY quarters.quarter
  ORDER BY MIN(subquery.edd);
  
    
  `;
    const result = await connection.execute(q);
    return result[0];
  } catch (error) {
  } finally {
    if (connection) {
      connection.release();
    }
  }
};
const getparity = async () => {
  const connection = await db.getConnection();
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
    connection.rollback();
    res.status(500).json(error);
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

const getbabysmovement = async () => {
  const connection = await db.getConnection();
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
  } finally {
    if (connection) {
      connection.release();
    }
  }
};
const getfirstbabymovement = async () => {
  const connection = await db.getConnection();
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
  } finally {
    if (connection) {
      connection.release();
    }
  }
};
//obstetrichistory
const getconvulsions = async () => {
  const connection = await db.getConnection();
  try {
    const q = `SELECT * FROM obstetrichistory WHERE convulsionsduringpregnancy = ?`;
    const result = await connection.execute(q, ["yes"]);
    const q2 = `SELECT * FROM obstetrichistory WHERE convulsionsduringpregnancy = ?`;
    const result2 = await connection.execute(q2, ["yes"]);
    return { yes: result[0].length, no: result2[0].length };
  } catch (error) {
  } finally {
    if (connection) {
      connection.release();
    }
  }
};
const getsurgery = async () => {
  const connection = await db.getConnection();
  try {
    const q = `SELECT * FROM obstetrichistory WHERE caesarean  = ?`;
    const result = await connection.execute(q, ["yes"]);
    const q2 = `SELECT * FROM obstetrichistory WHERE caesarean  = ?`;
    const result2 = await connection.execute(q2, ["yes"]);
    return { yes: result[0].length, no: result2[0].length };
  } catch (error) {
  } finally {
    if (connection) {
      connection.release();
    }
  }
};
const gettearsthroughsphincter = async () => {
  const connection = await db.getConnection();
  try {
    const q = `SELECT * FROM obstetrichistory WHERE tearsthroughsphincter = ?`;
    const result = await connection.execute(q, ["yes"]);
    const q2 = `SELECT * FROM obstetrichistory WHERE tearsthroughsphincter = ?`;
    const result2 = await connection.execute(q2, ["no"]);
    return { yes: result[0].length, no: result2[0].length };
  } catch (error) {
  } finally {
    if (connection) {
      connection.release();
    }
  }
};
const getpostpartiumhaemorrghage = async () => {
  const connection = await db.getConnection();
  try {
    const q = `SELECT * FROM obstetrichistory WHERE postpartiumhaemorrghage   = ?`;
    const q2 = `SELECT * FROM obstetrichistory WHERE postpartiumhaemorrghage   = ?`;
    const result = await connection.execute(q, ["yes"]);
    const result2 = await connection.execute(q2, ["no"]);
    return { yes: result[0].length, no: result2[0].length };
  } catch (error) {
  } finally {
    if (connection) {
      connection.release();
    }
  }
};
const getstillbirths = async () => {
  const connection = await db.getConnection();
  try {
    const q = `SELECT * FROM obstetrichistory WHERE stillbirths   = ?`;
    const q2 = `SELECT * FROM obstetrichistory WHERE stillbirths   = ?`;
    const result = await connection.execute(q, ["yes"]);
    const result2 = await connection.execute(q2, ["no"]);
    return { yes: result[0].length, no: result2[0].length };
  } catch (error) {
  } finally {
    if (connection) {
      connection.release();
    }
  }
};
const getprematuredeliveries = async () => {
  const connection = await db.getConnection();
  try {
    const q = `SELECT * FROM obstetrichistory WHERE prematuredeliveries   = ?`;
    const q2 = `SELECT * FROM obstetrichistory WHERE prematuredeliveries   = ?`;
    const result = await connection.execute(q, ["yes"]);
    const result2 = await connection.execute(q2, ["no"]);
    return { yes: result[0].length, no: result2[0].length };
  } catch (error) {
  } finally {
    if (connection) {
      connection.release();
    }
  }
};
const getlowbirthbabies = async () => {
  const connection = await db.getConnection();
  try {
    const q = `SELECT * FROM obstetrichistory WHERE lowbirthbabies   = ?`;
    const q2 = `SELECT * FROM obstetrichistory WHERE lowbirthbabies   = ?`;
    const result = await connection.execute(q, ["yes"]);
    const result2 = await connection.execute(q2, ["no"]);
    return { yes: result[0].length, no: result2[0].length };
  } catch (error) {
  } finally {
    if (connection) {
      connection.release();
    }
  }
};
const getbabieswhodied = async () => {
  const connection = await db.getConnection();
  try {
    const q = `SELECT * FROM obstetrichistory WHERE babieswhodied   = ?`;
    const q2 = `SELECT * FROM obstetrichistory WHERE babieswhodied   = ?`;
    const result = await connection.execute(q, ["yes"]);
    const result2 = await connection.execute(q2, ["no"]);
    return { yes: result[0].length, no: result2[0].length };
  } catch (error) {
  } finally {
    if (connection) {
      connection.release();
    }
  }
};
const getmiscarriages = async () => {
  const connection = await db.getConnection();
  try {
    const q = `SELECT * FROM obstetrichistory WHERE miscarriages   = ?`;
    const q2 = `SELECT * FROM obstetrichistory WHERE miscarriages   = ?`;
    const result = await connection.execute(q, ["yes"]);
    const result2 = await connection.execute(q2, ["no"]);
    return { yes: result[0].length, no: result2[0].length };
  } catch (error) {
  } finally {
    if (connection) {
      connection.release();
    }
  }
};
const getbreastfedbefore = async () => {
  const connection = await db.getConnection();
  try {
    const q = `SELECT * FROM familyhistory WHERE haveyoubreastfedbefore   = ?`;
    const q2 = `SELECT * FROM familyhistory WHERE haveyoubreastfedbefore   = ?`;
    const result = await connection.execute(q, ["Yes"]);
    const result2 = await connection.execute(q2, ["No"]);
    return { yes: result[0].length, no: result2[0].length };
  } catch (error) {
  } finally {
    if (connection) {
      connection.release();
    }
  }
};
const getbreastfeedingduration = async () => {
  const connection = await db.getConnection();
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
  } catch (error) {
  } finally {
    if (connection) {
      connection.release();
    }
  }
};
const getbreastfeedingproblems = async () => {
  const connection = await db.getConnection();
  try {
    const q = `SELECT * FROM familyhistory WHERE breastfeedingproblems   = ?`;
    const q2 = `SELECT * FROM familyhistory WHERE breastfeedingproblems   = ?`;
    const result = await connection.execute(q, ["Yes"]);
    const result2 = await connection.execute(q2, ["No"]);
    return { yes: result[0].length, no: result2[0].length };
  } catch (error) {
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

//dailyhabits and lifestyle
const getSmokers = async () => {
  const connection = await db.getConnection();
  try {
    const q = `SELECT * FROM dailyhabitsandlifestyle WHERE doyousmoke   = ?`;
    const q2 = `SELECT * FROM dailyhabitsandlifestyle WHERE doyousmoke   = ?`;
    const result = await connection.execute(q, ["yes"]);
    const result2 = await connection.execute(q2, ["no"]);
    return { yes: result[0].length, no: result2[0].length };
  } catch (error) {
  } finally {
    if (connection) {
      connection.release();
    }
  }
};
const getAlcohol = async () => {
  const connection = await db.getConnection();
  try {
    const q = `SELECT * FROM dailyhabitsandlifestyle WHERE doyoudrinkalcohol   = ?`;
    const q2 = `SELECT * FROM dailyhabitsandlifestyle WHERE doyoudrinkalcohol   = ?`;
    const result = await connection.execute(q, ["yes"]);
    const result2 = await connection.execute(q2, ["no"]);
    return { yes: result[0].length, no: result2[0].length };
  } catch (error) {
  } finally {
    if (connection) {
      connection.release();
    }
  }
};
const getThreatened = async () => {
  const connection = await db.getConnection();
  try {
    const q = `SELECT * FROM dailyhabitsandlifestyle WHERE threatenedyourlife   = ?`;
    const q2 = `SELECT * FROM dailyhabitsandlifestyle WHERE threatenedyourlife   = ?`;
    const result = await connection.execute(q, ["yes"]);
    const result2 = await connection.execute(q2, ["no"]);
    return { yes: result[0].length, no: result2[0].length };
  } catch (error) {
  } finally {
    if (connection) {
      connection.release();
    }
  }
};
const whodoyoulivewith = async () => {
  const connection = await db.getConnection();
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
  } catch (error) {
  } finally {
    if (connection) {
      connection.release();
    }
  }
};
//medicalhistory
const getcough = async () => {
  const connection = await db.getConnection();
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
  } catch (error) {
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

const getpalpitations = async () => {
  const connection = await db.getConnection();
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
  } catch (error) {
  } finally {
    if (connection) {
      connection.release();
    }
  }
};
const getdifficultybreathing = async () => {
  const connection = await db.getConnection();
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
  } catch (error) {
  } finally {
    if (connection) {
      connection.release();
    }
  }
};
const getswellingoffeet = async () => {
  const connection = await db.getConnection();
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
  } catch (error) {
  } finally {
    if (connection) {
      connection.release();
    }
  }
};
const getchestpain = async () => {
  const connection = await db.getConnection();
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
  } catch (error) {
  } finally {
    if (connection) {
      connection.release();
    }
  }
};
const getepigastricpain = async () => {
  const connection = await db.getConnection();
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
  } catch (error) {
  } finally {
    if (connection) {
      connection.release();
    }
  }
};
const getseveretiredness = async () => {
  const connection = await db.getConnection();
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
  } catch (error) {
  } finally {
    if (connection) {
      connection.release();
    }
  }
};
const getsevereabdominalpain = async () => {
  const connection = await db.getConnection();
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
  } catch (error) {
  } finally {
    if (connection) {
      connection.release();
    }
  }
};
const getpersistentvomiting = async () => {
  const connection = await db.getConnection();
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
  } catch (error) {
  } finally {
    if (connection) {
      connection.release();
    }
  }
};
const getseverediarrhoea = async () => {
  const connection = await db.getConnection();
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
  } catch (error) {
  } finally {
    if (connection) {
      connection.release();
    }
  }
};
const getdizziness = async () => {
  const connection = await db.getConnection();
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
  } catch (error) {
  } finally {
    if (connection) {
      connection.release();
    }
  }
};
//urinary
const getpainwithurination = async () => {
  const connection = await db.getConnection();
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
  } catch (error) {
  } finally {
    if (connection) {
      connection.release();
    }
  }
};
const getsevereflankpain = async () => {
  const connection = await db.getConnection();
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
  } catch (error) {
  } finally {
    if (connection) {
      connection.release();
    }
  }
};
const getbloodinurine = async () => {
  const connection = await db.getConnection();
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
  } catch (error) {
  } finally {
    if (connection) {
      connection.release();
    }
  }
};
//gynaelogical
const getvaginaldischarge = async () => {
  const connection = await db.getConnection();
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
  } catch (error) {
  } finally {
    if (connection) {
      connection.release();
    }
  }
};
const getdeeppelvicpain = async () => {
  const connection = await db.getConnection();
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
  } catch (error) {
  } finally {
    if (connection) {
      connection.release();
    }
  }
};
const getsyphilis = async () => {
  const connection = await db.getConnection();
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
  } catch (error) {
  } finally {
    if (connection) {
      connection.release();
    }
  }
};
const getpersistentdrycough = async () => {
  const connection = await db.getConnection();
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
  } catch (error) {
  } finally {
    if (connection) {
      connection.release();
    }
  }
};
const getprogressiveweightloss = async () => {
  const connection = await db.getConnection();
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
  } catch (error) {
  } finally {
    if (connection) {
      connection.release();
    }
  }
};
const getnightsweats = async () => {
  const connection = await db.getConnection();
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
  } catch (error) {
  } finally {
    if (connection) {
      connection.release();
    }
  }
};
const getdiagnosedwithtuberculosis = async () => {
  const connection = await db.getConnection();
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
  } catch (error) {
  } finally {
    if (connection) {
      connection.release();
    }
  }
};
const gettreatedTBpreviously = async () => {
  const connection = await db.getConnection();
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
  } catch (error) {
  } finally {
    if (connection) {
      connection.release();
    }
  }
};
//pastmedicalhistory
const getheartdisease = async () => {
  const connection = await db.getConnection();
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
  } catch (error) {
  } finally {
    if (connection) {
      connection.release();
    }
  }
};
const getanaemia = async () => {
  const connection = await db.getConnection();
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
  } catch (error) {
  } finally {
    if (connection) {
      connection.release();
    }
  }
};
const getkidneydisease = async () => {
  const connection = await db.getConnection();
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
  } catch (error) {
  } finally {
    if (connection) {
      connection.release();
    }
  }
};
const getsicklecell = async () => {
  const connection = await db.getConnection();
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
  } catch (error) {
  } finally {
    if (connection) {
      connection.release();
    }
  }
};
const getdiabetes = async () => {
  const connection = await db.getConnection();
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
  } catch (error) {
  } finally {
    if (connection) {
      connection.release();
    }
  }
};
const getgoitre = async () => {
  const connection = await db.getConnection();
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
  } catch (error) {
  } finally {
    if (connection) {
      connection.release();
    }
  }
};
const gethivaids = async () => {
  const connection = await db.getConnection();
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
  } catch (error) {
  } finally {
    if (connection) {
      connection.release();
    }
  }
};
const getotherseriouschronicillnesses = async () => {
  const connection = await db.getConnection();
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
  } catch (error) {
  } finally {
    if (connection) {
      connection.release();
    }
  }
};
const gethadsurgery = async () => {
  const connection = await db.getConnection();
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
  } catch (error) {
  } finally {
    if (connection) {
      connection.release();
    }
  }
};
//drug history
const getherbalremedies = async () => {
  const connection = await db.getConnection();
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
  } catch (error) {
  } finally {
    if (connection) {
      connection.release();
    }
  }
};
const getotcdrugs = async () => {
  const connection = await db.getConnection();
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
  } catch (error) {
  } finally {
    if (connection) {
      connection.release();
    }
  }
};
const getvitamins = async () => {
  const connection = await db.getConnection();
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
  } catch (error) {
  } finally {
    if (connection) {
      connection.release();
    }
  }
};
const getdietarysupplements = async () => {
  const connection = await db.getConnection();
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
  } catch (error) {
  } finally {
    if (connection) {
      connection.release();
    }
  }
};
const gettetanus = async () => {
  const connection = await db.getConnection();
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
  } catch (error) {
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

const nationalgeneraldata = async (req, res) => {
  try {
    //personalinformation
    const edd = await getedd2();
    const firstbabymovement = await getfirstbabymovement();
    const parity = await getparity();
    const babysmovement = await getbabysmovement();
    const graviditygreaterthan8result = await graviditygreaterthan8();
    const graviditylessthan8result = await graviditylessthan8();
    //obstetric
    const convulsionsduringpregnancy = await getconvulsions();
    const caesarean = await getsurgery();
    const tearsthroughsphincter = await gettearsthroughsphincter();
    const postpartiumhaemorrghage = await getpostpartiumhaemorrghage();
    const stillbirths = await getstillbirths();
    const prematuredeliveries = await getprematuredeliveries();
    const lowbirthbabies = await getlowbirthbabies();
    const babieswhodied = await getbabieswhodied();
    const miscarriages = await getmiscarriages();
    const breastfedbefore = await getbreastfedbefore();
    const breastfeedingduration = await getbreastfeedingduration();
    const breastfeedingproblems = await getbreastfeedingproblems();
    //dailyhabitsandlifestyle
    const doyousmoke = await getSmokers();
    const alcohol = await getAlcohol();
    const threatened = await getThreatened();
    const livewith = await whodoyoulivewith();
    //medicalhistory
    const cough = await getcough();
    const palpitations = await getpalpitations();
    const difficultybreathing = await getdifficultybreathing();
    const swellingfeet = await getswellingoffeet();
    const chestpain = await getchestpain();
    const epigastricpain = await getepigastricpain();
    const severetiredness = await getseveretiredness();
    const severeabdominalpain = await getsevereabdominalpain();
    const persistentvomiting = await getpersistentvomiting();
    const severediarrhoea = await getseverediarrhoea();
    const dizziness = await getdizziness();
    //urinary
    const painwithurination = await getpainwithurination();
    const severeflankpain = await getsevereflankpain();
    const bloodinurine = await getbloodinurine();
    //gynaecological
    const vaginaldischarge = await getvaginaldischarge();
    const deeppelvicpain = await getdeeppelvicpain();
    const syphilis = await getsyphilis();
    const persistentdrycough = await getpersistentdrycough();
    const progressiveweightloss = await getprogressiveweightloss();
    const nightsweats = await getnightsweats();
    const diagnosedwithtuberculosis = await getdiagnosedwithtuberculosis();
    const treatedTBpreviously = await gettreatedTBpreviously();
    //pastmedicalhistory
    const heartdisease = await getheartdisease();
    const anaemia = await getanaemia();
    const kidneydisease = await getkidneydisease();
    const sicklecell = await getsicklecell();
    const diabetes = await getdiabetes();
    const goitre = await getgoitre();
    const hivaids = await gethivaids();
    const otherseriouschronicillnesses =
      await getotherseriouschronicillnesses();
    const hadsurgery = await gethadsurgery();
    //drughistory
    const herbalremedies = await getherbalremedies();
    const otcdrugs = await getotcdrugs();
    const vitamins = await getvitamins();
    const dietarysupplements = await getdietarysupplements();
    const tetanus = await gettetanus();
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
  }
};

const getvisitdates = async (req, res) => {
  let connection;
  const { id } = req.params;
  try {
    connection = await db.getConnection();
    const q = `SELECT firstvisit_date
    FROM firstvisit
    WHERE patient_id = ?`;
    const q2 = `SELECT returnvisit_date
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

//return visit

module.exports = {
  nationalgeneraldata,
  numberofwomenwith4visits,
  getvisitdates,
};
