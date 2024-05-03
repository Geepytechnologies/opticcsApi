//@ts-nocheck
import db from "../../../config/db";
import logger from "../../../logger";

const numberofwomenwith4visits = async (req, res) => {
  const connection = await db.getConnection();
  const { healthfacility } = req.query;
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
    LEFT JOIN healthpersonnel hp ON p.healthpersonnel_id = hp.id
    WHERE (COALESCE(fv.first_visit_count, 0) + COALESCE(ev.return_visit_count, 0)) > 4
    AND hp.healthfacility = ?
        
      `;
    const result = await connection.execute(q, [healthfacility]);
    res.status(200).json(result[0]);
  } catch (error) {
    res.status(500).json(error);
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

const graviditygreaterthan8 = async (healthfacility) => {
  const connection = await db.getConnection();
  try {
    const q = `SELECT *
    FROM personalinformation
    WHERE CAST(gravidity AS SIGNED) > 8 OR CAST(gravidity AS SIGNED) = 8 AND healthfacility = ?`;
    const result = await connection.execute(q, [healthfacility]);
    return result[0].length;
  } catch (error) {
    console.log(error);
  } finally {
    if (connection) {
      connection.release();
    }
  }
};
const graviditylessthan8 = async (healthfacility) => {
  const connection = await db.getConnection();
  try {
    const q = `SELECT *
    FROM personalinformation
    WHERE CAST(gravidity AS SIGNED) < 8 AND healthfacility = ?`;
    const result = await connection.execute(q, [healthfacility]);
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
        healthfacility,healthfacility,healthFacility
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
const getedd2 = async (healthfacility) => {
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
      healthfacility
    FROM personalinformation WHERE healthfacility = ?
  ) AS subquery ON quarters.quarter = subquery.quarter
  GROUP BY quarters.quarter
  ORDER BY MIN(subquery.edd);
  
    
  `;
    const result = await connection.execute(q, [healthfacility]);
    return result[0];
  } catch (error) {
  } finally {
    if (connection) {
      connection.release();
    }
  }
};
const getparity = async (healthfacility) => {
  const connection = await db.getConnection();
  try {
    const q1 = `SELECT *
      FROM personalinformation
      WHERE CAST(parity AS SIGNED) <= 24 AND healthfacility = ?;
  `;
    const q2 = `SELECT *
      FROM personalinformation
      WHERE CAST(parity AS SIGNED) > 24 AND healthfacility = ?;
  `;
    const less = await connection.execute(q1, [healthfacility]);
    const greater = await connection.execute(q2, [healthfacility]);
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

const getbabysmovement = async (healthfacility) => {
  const connection = await db.getConnection();
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
    const yes = await connection.execute(q1, ["yes", healthfacility]);
    const no = await connection.execute(q2, ["no", healthfacility]);
    const dontknow = await connection.execute(q3, [
      "i don't know",
      healthfacility,
    ]);
    const notapplicable = await connection.execute(q4, [
      "not applicable",
      healthfacility,
    ]);
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
const getfirstbabymovement = async (healthfacility) => {
  const connection = await db.getConnection();
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
    const yes = await connection.execute(q1, ["yes", healthfacility]);
    const no = await connection.execute(q2, ["no", healthfacility]);
    const dontknow = await connection.execute(q3, [
      "i don't know",
      healthfacility,
    ]);
    const notapplicable = await connection.execute(q4, [
      "not applicable",
      healthfacility,
    ]);
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

const getconvulsions = async (healthfacility) => {
  const connection = await db.getConnection();
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

    const result = await connection.execute(q, ["yes", healthfacility]);
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
    const result2 = await connection.execute(q2, ["no", healthfacility]);
    return { yes: result[0].length, no: result2[0].length };
  } catch (error) {
    console.log(error);
  } finally {
    if (connection) {
      connection.release();
    }
  }
};
const getsurgery = async (healthfacility) => {
  const connection = await db.getConnection();
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
    const result = await connection.execute(q, ["yes", healthfacility]);
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
    const result2 = await connection.execute(q2, ["yes", healthfacility]);
    return { yes: result[0].length, no: result2[0].length };
  } catch (error) {
    console.log(error);
  } finally {
    if (connection) {
      connection.release();
    }
  }
};
const gettearsthroughsphincter = async (healthfacility) => {
  const connection = await db.getConnection();
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
    const result = await connection.execute(q, ["yes", healthfacility]);
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
    const result2 = await connection.execute(q2, ["no", healthfacility]);
    return { yes: result[0].length, no: result2[0].length };
  } catch (error) {
  } finally {
    if (connection) {
      connection.release();
    }
  }
};
const getpostpartiumhaemorrghage = async (healthfacility) => {
  const connection = await db.getConnection();
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
    const result = await connection.execute(q, ["yes", healthfacility]);
    const result2 = await connection.execute(q2, ["no", healthfacility]);
    return { yes: result[0].length, no: result2[0].length };
  } catch (error) {
  } finally {
    if (connection) {
      connection.release();
    }
  }
};
const getstillbirths = async (healthfacility) => {
  const connection = await db.getConnection();
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
    const result = await connection.execute(q, ["yes", healthfacility]);
    const result2 = await connection.execute(q2, ["no", healthfacility]);
    return { yes: result[0].length, no: result2[0].length };
  } catch (error) {
  } finally {
    if (connection) {
      connection.release();
    }
  }
};
const getprematuredeliveries = async (healthfacility) => {
  const connection = await db.getConnection();
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
    const result = await connection.execute(q, ["yes", healthfacility]);
    const result2 = await connection.execute(q2, ["no", healthfacility]);
    return { yes: result[0].length, no: result2[0].length };
  } catch (error) {
  } finally {
    if (connection) {
      connection.release();
    }
  }
};
const getlowbirthbabies = async (healthfacility) => {
  const connection = await db.getConnection();
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
    const result = await connection.execute(q, ["yes", healthfacility]);
    const result2 = await connection.execute(q2, ["no", healthfacility]);
    return { yes: result[0].length, no: result2[0].length };
  } catch (error) {
  } finally {
    if (connection) {
      connection.release();
    }
  }
};
const getbabieswhodied = async (healthfacility) => {
  const connection = await db.getConnection();
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
    const result = await connection.execute(q, ["yes", healthfacility]);
    const result2 = await connection.execute(q2, ["no", healthfacility]);
    return { yes: result[0].length, no: result2[0].length };
  } catch (error) {
  } finally {
    if (connection) {
      connection.release();
    }
  }
};
const getmiscarriages = async (healthfacility) => {
  const connection = await db.getConnection();
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
    const result = await connection.execute(q, ["yes", healthfacility]);
    const result2 = await connection.execute(q2, ["no", healthfacility]);
    return { yes: result[0].length, no: result2[0].length };
  } catch (error) {
  } finally {
    if (connection) {
      connection.release();
    }
  }
};
//dailyhabits and lifestyle
const getSmokers = async (healthfacility) => {
  const connection = await db.getConnection();
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
    const result = await connection.execute(q, ["yes", healthfacility]);
    const result2 = await connection.execute(q2, ["no", healthfacility]);
    return { yes: result[0].length, no: result2[0].length };
  } catch (error) {
    console.log(error);
  } finally {
    if (connection) {
      connection.release();
    }
  }
};
const getAlcohol = async (healthfacility) => {
  const connection = await db.getConnection();
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
    const result = await connection.execute(q, ["yes", healthfacility]);
    const result2 = await connection.execute(q2, ["no", healthfacility]);
    return { yes: result[0].length, no: result2[0].length };
  } catch (error) {
  } finally {
    if (connection) {
      connection.release();
    }
  }
};
const getThreatened = async (healthfacility) => {
  const connection = await db.getConnection();
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
    const result = await connection.execute(q, ["yes", healthfacility]);
    const result2 = await connection.execute(q2, ["no", healthfacility]);
    return { yes: result[0].length, no: result2[0].length };
  } catch (error) {
  } finally {
    if (connection) {
      connection.release();
    }
  }
};
const whodoyoulivewith = async (healthfacility) => {
  const connection = await db.getConnection();
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
    const result = await connection.execute(q, ["Partner", healthfacility]);
    const result2 = await connection.execute(q2, ["Relative", healthfacility]);
    const result3 = await connection.execute(q3, ["Alone", healthfacility]);
    const result4 = await connection.execute(q4, ["Friend", healthfacility]);
    const result5 = await connection.execute(q5, [healthfacility]);
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
const getcough = async (healthfacility) => {
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

    const result = await connection.execute(q, ["Yes", healthfacility]);
    const result2 = await connection.execute(q2, ["No", healthfacility]);
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
const getpalpitations = async (healthfacility) => {
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

    const result = await connection.execute(q, ["Yes", healthfacility]);
    const result2 = await connection.execute(q2, ["No", healthfacility]);
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
const getdifficultybreathing = async (healthfacility) => {
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

    const result = await connection.execute(q, ["Yes", healthfacility]);
    const result2 = await connection.execute(q2, ["No", healthfacility]);
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
const getswellingoffeet = async (healthfacility) => {
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

    const result = await connection.execute(q, ["Yes", healthfacility]);
    const result2 = await connection.execute(q2, ["No", healthfacility]);
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
const getchestpain = async (healthfacility) => {
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

    const result = await connection.execute(q, ["Yes", healthfacility]);
    const result2 = await connection.execute(q2, ["No", healthfacility]);
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
const getepigastricpain = async (healthfacility) => {
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

    const result = await connection.execute(q, ["Yes", healthfacility]);
    const result2 = await connection.execute(q2, ["No", healthfacility]);
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
const getseveretiredness = async (healthfacility) => {
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

    const result = await connection.execute(q, ["Yes", healthfacility]);
    const result2 = await connection.execute(q2, ["No", healthfacility]);
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
const getsevereabdominalpain = async (healthfacility) => {
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

    const result = await connection.execute(q, ["Yes", healthfacility]);
    const result2 = await connection.execute(q2, ["No", healthfacility]);
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
const getpersistentvomiting = async (healthfacility) => {
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

    const result = await connection.execute(q, ["Yes", healthfacility]);
    const result2 = await connection.execute(q2, ["No", healthfacility]);
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
const getseverediarrhoea = async (healthfacility) => {
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

    const result = await connection.execute(q, ["Yes", healthfacility]);
    const result2 = await connection.execute(q2, ["No", healthfacility]);
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
const getpainwithurination = async (healthfacility) => {
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

    const result = await connection.execute(q, ["Yes", healthfacility]);
    const result2 = await connection.execute(q2, ["No", healthfacility]);
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
const getsevereflankpain = async (healthfacility) => {
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

    const result = await connection.execute(q, ["Yes", healthfacility]);
    const result2 = await connection.execute(q2, ["No", healthfacility]);
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
const getbloodinurine = async (healthfacility) => {
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

    const result = await connection.execute(q, ["Yes", healthfacility]);
    const result2 = await connection.execute(q2, ["No", healthfacility]);
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
const getvaginaldischarge = async (healthfacility) => {
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

    const result = await connection.execute(q, ["Yes", healthfacility]);
    const result2 = await connection.execute(q2, ["No", healthfacility]);
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
const getdeeppelvicpain = async (healthfacility) => {
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

    const result = await connection.execute(q, ["Yes", healthfacility]);
    const result2 = await connection.execute(q2, ["No", healthfacility]);
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
const getsyphilis = async (healthfacility) => {
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

    const result = await connection.execute(q, ["Yes", healthfacility]);
    const result2 = await connection.execute(q2, ["No", healthfacility]);
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
const getpersistentdrycough = async (healthfacility) => {
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

    const result = await connection.execute(q, ["Yes", healthfacility]);
    const result2 = await connection.execute(q2, ["No", healthfacility]);
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
const getprogressiveweightloss = async (healthfacility) => {
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

    const result = await connection.execute(q, ["Yes", healthfacility]);
    const result2 = await connection.execute(q2, ["No", healthfacility]);
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
const getnightsweats = async (healthfacility) => {
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

    const result = await connection.execute(q, ["Yes", healthfacility]);
    const result2 = await connection.execute(q2, ["No", healthfacility]);
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
const getdiagnosedwithtuberculosis = async (healthfacility) => {
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

    const result = await connection.execute(q, ["Yes", healthfacility]);
    const result2 = await connection.execute(q2, ["No", healthfacility]);
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
const gettreatedTBpreviously = async (healthfacility) => {
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

    const result = await connection.execute(q, ["Yes", healthfacility]);
    const result2 = await connection.execute(q2, ["No", healthfacility]);
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
const getheartdisease = async (healthfacility) => {
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

    const result = await connection.execute(q, ["Yes", healthfacility]);
    const result2 = await connection.execute(q2, ["No", healthfacility]);
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
const getanaemia = async (healthfacility) => {
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

    const result = await connection.execute(q, ["Yes", healthfacility]);
    const result2 = await connection.execute(q2, ["No", healthfacility]);
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
const getkidneydisease = async (healthfacility) => {
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

    const result = await connection.execute(q, ["Yes", healthfacility]);
    const result2 = await connection.execute(q2, ["No", healthfacility]);
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
const getsicklecell = async (healthfacility) => {
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

    const result = await connection.execute(q, ["Yes", healthfacility]);
    const result2 = await connection.execute(q2, ["No", healthfacility]);
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
const getdiabetes = async (healthfacility) => {
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

    const result = await connection.execute(q, ["Yes", healthfacility]);
    const result2 = await connection.execute(q2, ["No", healthfacility]);
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
const getgoitre = async (healthfacility) => {
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

    const result = await connection.execute(q, ["Yes", healthfacility]);
    const result2 = await connection.execute(q2, ["No", healthfacility]);
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
const gethivaids = async (healthfacility) => {
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

    const result = await connection.execute(q, ["Yes", healthfacility]);
    const result2 = await connection.execute(q2, ["No", healthfacility]);
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
const getotherseriouschronicillnesses = async (healthfacility) => {
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

    const result = await connection.execute(q, ["Yes", healthfacility]);
    const result2 = await connection.execute(q2, ["No", healthfacility]);
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
const gethadsurgery = async (healthfacility) => {
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

    const result = await connection.execute(q, ["Yes", healthfacility]);
    const result2 = await connection.execute(q2, ["No", healthfacility]);
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
const getherbalremedies = async (healthfacility) => {
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

    const result = await connection.execute(q, ["Yes", healthfacility]);
    const result2 = await connection.execute(q2, ["No", healthfacility]);
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
const getotcdrugs = async (healthfacility) => {
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

    const result = await connection.execute(q, ["Yes", healthfacility]);
    const result2 = await connection.execute(q2, ["No", healthfacility]);
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
const getvitamins = async (healthfacility) => {
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

    const result = await connection.execute(q, ["Yes", healthfacility]);
    const result2 = await connection.execute(q2, ["No", healthfacility]);
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
const getdietarysupplements = async (healthfacility) => {
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

    const result = await connection.execute(q, ["Yes", healthfacility]);
    const result2 = await connection.execute(q2, ["No", healthfacility]);
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
const gettetanus = async (healthfacility) => {
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

    const result = await connection.execute(q, ["Yes", healthfacility]);
    const result2 = await connection.execute(q2, ["No", healthfacility]);
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

const healthfacilitygeneraldata = async (req, res) => {
  const { healthfacility } = req.query;
  try {
    //personalinformation
    const edd = await getedd2(healthfacility);
    const firstbabymovement = await getfirstbabymovement(healthfacility);
    const parity = await getparity(healthfacility);
    const babysmovement = await getbabysmovement(healthfacility);
    const graviditygreaterthan8result = await graviditygreaterthan8(
      healthfacility
    );
    const graviditylessthan8result = await graviditylessthan8(healthfacility);
    //obstetric
    const convulsionsduringpregnancy = await getconvulsions(healthfacility);
    const caesarean = await getsurgery(healthfacility);
    const tearsthroughsphincter = await gettearsthroughsphincter(
      healthfacility
    );
    const postpartiumhaemorrghage = await getpostpartiumhaemorrghage(
      healthfacility
    );
    const stillbirths = await getstillbirths(healthfacility);
    const prematuredeliveries = await getprematuredeliveries(healthfacility);
    const lowbirthbabies = await getlowbirthbabies(healthfacility);
    const babieswhodied = await getbabieswhodied(healthfacility);
    const miscarriages = await getmiscarriages(healthfacility);
    //dailyhabitsandlifestyle
    const doyousmoke = await getSmokers(healthfacility);
    const alcohol = await getAlcohol(healthfacility);
    const threatened = await getThreatened(healthfacility);
    const livewith = await whodoyoulivewith(healthfacility);
    //medicalhistory
    const cough = await getcough(healthfacility);
    const palpitations = await getpalpitations(healthfacility);
    const difficultybreathing = await getdifficultybreathing(healthfacility);
    const swellingfeet = await getswellingoffeet(healthfacility);
    const chestpain = await getchestpain(healthfacility);
    const epigastricpain = await getepigastricpain(healthfacility);
    const severetiredness = await getseveretiredness(healthfacility);
    const severeabdominalpain = await getsevereabdominalpain(healthfacility);
    const persistentvomiting = await getpersistentvomiting(healthfacility);
    const severediarrhoea = await getseverediarrhoea(healthfacility);
    //urinary
    const painwithurination = await getpainwithurination(healthfacility);
    const severeflankpain = await getsevereflankpain(healthfacility);
    const bloodinurine = await getbloodinurine(healthfacility);
    //gynaecological
    const vaginaldischarge = await getvaginaldischarge(healthfacility);
    const deeppelvicpain = await getdeeppelvicpain(healthfacility);
    const syphilis = await getsyphilis(healthfacility);
    const persistentdrycough = await getpersistentdrycough(healthfacility);
    const progressiveweightloss = await getprogressiveweightloss(
      healthfacility
    );
    const nightsweats = await getnightsweats(healthfacility);
    const diagnosedwithtuberculosis = await getdiagnosedwithtuberculosis(
      healthfacility
    );
    const treatedTBpreviously = await gettreatedTBpreviously(healthfacility);
    //pastmedicalhistory
    const heartdisease = await getheartdisease(healthfacility);
    const anaemia = await getanaemia(healthfacility);
    const kidneydisease = await getkidneydisease(healthfacility);
    const sicklecell = await getsicklecell(healthfacility);
    const diabetes = await getdiabetes(healthfacility);
    const goitre = await getgoitre(healthfacility);
    const hivaids = await gethivaids(healthfacility);
    const otherseriouschronicillnesses = await getotherseriouschronicillnesses(
      healthfacility
    );
    const hadsurgery = await gethadsurgery(healthfacility);
    //drughistory
    const herbalremedies = await getherbalremedies(healthfacility);
    const otcdrugs = await getotcdrugs(healthfacility);
    const vitamins = await getvitamins(healthfacility);
    const dietarysupplements = await getdietarysupplements(healthfacility);
    const tetanus = await gettetanus(healthfacility);

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

const healthfacilityreturnvisitdata = async (req, res) => {
  const { healthfacility } = req.query;

  const getfeverreturn = async (healthfacility) => {
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
        rv.fever = ? AND pi.healthfacility = ?
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
        rv.fever = ? AND pi.healthfacility = ?
      `;

      const result = await connection.execute(q, ["Yes", healthfacility]);
      const result2 = await connection.execute(q2, ["No", healthfacility]);
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
  const getheadachereturn = async (healthfacility) => {
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
        rv.headache = ? AND pi.healthfacility = ?
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
        rv.headache = ? AND pi.healthfacility = ?
      `;

      const result = await connection.execute(q, ["Yes", healthfacility]);
      const result2 = await connection.execute(q2, ["No", healthfacility]);
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
  const getcoughreturn = async (healthfacility) => {
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
        rv.cough = ? AND pi.healthfacility = ?
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
        rv.cough = ? AND pi.healthfacility = ?
      `;

      const result = await connection.execute(q, ["Yes", healthfacility]);
      const result2 = await connection.execute(q2, ["No", healthfacility]);
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
  const getpalpitationsreturn = async (healthfacility) => {
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
        rv.palpitation = ? AND pi.healthfacility = ?
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
        rv.palpitation = ? AND pi.healthfacility = ?
      `;

      const result = await connection.execute(q, ["Yes", healthfacility]);
      const result2 = await connection.execute(q2, ["No", healthfacility]);
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
  const getseveretirednessreturn = async (healthfacility) => {
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
        rv.severetirednesss = ? AND pi.healthfacility = ?
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
        rv.severetirednesss = ? AND pi.healthfacility = ?
      `;

      const result = await connection.execute(q, ["Yes", healthfacility]);
      const result2 = await connection.execute(q2, ["No", healthfacility]);
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
  const getdifficultylyingflatreturn = async (healthfacility) => {
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
        rv.difficultylyingflat = ? AND pi.healthfacility = ?
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
        rv.difficultylyingflat = ? AND pi.healthfacility = ?
      `;

      const result = await connection.execute(q, ["Yes", healthfacility]);
      const result2 = await connection.execute(q2, ["No", healthfacility]);
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
  const getdizzinessreturn = async (healthfacility) => {
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
        rv.dizziness = ? AND pi.healthfacility = ?
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
        rv.dizziness = ? AND pi.healthfacility = ?
      `;

      const result = await connection.execute(q, ["Yes", healthfacility]);
      const result2 = await connection.execute(q2, ["No", healthfacility]);
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
  const getconvulsionsreturn = async (healthfacility) => {
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
        rv.convulsions = ? AND pi.healthfacility = ?
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
        rv.convulsions = ? AND pi.healthfacility = ?
      `;

      const result = await connection.execute(q, ["Yes", healthfacility]);
      const result2 = await connection.execute(q2, ["No", healthfacility]);
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
  const getabdominalpainreturn = async (healthfacility) => {
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
        rv.severeabdominalpain = ? AND pi.healthfacility = ?
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
        rv.severeabdominalpain = ? AND pi.healthfacility = ?
      `;

      const result = await connection.execute(q, ["Yes", healthfacility]);
      const result2 = await connection.execute(q2, ["No", healthfacility]);
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
  const getpainwithurinationreturn = async (healthfacility) => {
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
        rv.urinarypain = ? AND pi.healthfacility = ?
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
        rv.urinarypain = ? AND pi.healthfacility = ?
      `;

      const result = await connection.execute(q, ["Yes", healthfacility]);
      const result2 = await connection.execute(q2, ["No", healthfacility]);
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
  const getbloodinurinereturn = async (healthfacility) => {
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
        rv.bloodinurine = ? AND pi.healthfacility = ?
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
        rv.bloodinurine = ? AND pi.healthfacility = ?
      `;

      const result = await connection.execute(q, ["Yes", healthfacility]);
      const result2 = await connection.execute(q2, ["No", healthfacility]);
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
  const getvaginaldischargereturn = async (healthfacility) => {
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
        rv.vaginaldischarge = ? AND pi.healthfacility = ?
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
        rv.vaginaldischarge = ? AND pi.healthfacility = ?
      `;

      const result = await connection.execute(q, ["Yes", healthfacility]);
      const result2 = await connection.execute(q2, ["No", healthfacility]);
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
  const getdeeppelvicpainreturn = async (healthfacility) => {
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
        rv.painduringsex = ? AND pi.healthfacility = ?
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
        rv.painduringsex = ? AND pi.healthfacility = ?
      `;

      const result = await connection.execute(q, ["Yes", healthfacility]);
      const result2 = await connection.execute(q2, ["No", healthfacility]);
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
  const getsyphilisreturn = async (healthfacility) => {
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
        rv.syphillis = ? AND pi.healthfacility = ?
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
        rv.syphillis = ? AND pi.healthfacility = ?
      `;

      const result = await connection.execute(q, ["Yes", healthfacility]);
      const result2 = await connection.execute(q2, ["No", healthfacility]);
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
    const fever = await getfeverreturn(healthfacility);
    const headache = await getheadachereturn(healthfacility);
    const cough = await getcoughreturn(healthfacility);
    const palpitations = await getpalpitationsreturn(healthfacility);
    const severetiredness = await getseveretirednessreturn(healthfacility);
    const difficultylyingflat = await getdifficultylyingflatreturn(
      healthfacility
    );
    const dizziness = await getdizzinessreturn(healthfacility);
    const convulsionsduringpregnancy = await getconvulsionsreturn(
      healthfacility
    );
    const abdominalpain = await getabdominalpainreturn(healthfacility);
    const painwithurination = await getpainwithurinationreturn(healthfacility);
    const bloodinurine = await getbloodinurinereturn(healthfacility);
    const vaginaldischarge = await getvaginaldischargereturn(healthfacility);
    const deeppelvicpain = await getdeeppelvicpainreturn(healthfacility);
    const syphilis = await getsyphilisreturn(healthfacility);

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
const healthfacilityscheduledata = async (req, res) => {
  const { healthfacility } = req.query;
  const connection = await db.getConnection();
  try {
    const q = `SELECT
    pi.*,
    p.*
    FROM
    schedule sc
    JOIN
        patients p ON sc.patient_id = p.id
    JOIN
        personalinformation pi ON p.personalinformation_id = pi.id
    WHERE
      pi.healthfacility = ?`;
    const q2 = `SELECT
    pi.*,
    p.*
    FROM
    schedule sc
    JOIN
        patients p ON sc.patient_id = p.id
    JOIN
        personalinformation pi ON p.personalinformation_id = pi.id
    WHERE
      sc.missed = ? AND pi.healthfacility = ?`;
    const q3 = `SELECT
    pi.*,
    p.*
    FROM
    schedule sc
    JOIN
        patients p ON sc.patient_id = p.id
    JOIN
        personalinformation pi ON p.personalinformation_id = pi.id
    WHERE
      sc.completed = ? AND pi.healthfacility = ?`;
    const q4 = `SELECT
    pi.*,
    p.*
    FROM
    schedule sc
    JOIN
        patients p ON sc.patient_id = p.id
    JOIN
        personalinformation pi ON p.personalinformation_id = pi.id
    WHERE
      sc.upcoming = ? AND pi.healthfacility = ?`;
    const q5 = `SELECT
    pi.*,
    p.*
    FROM
    schedule sc
    JOIN
        patients p ON sc.patient_id = p.id
    JOIN
        personalinformation pi ON p.personalinformation_id = pi.id
    WHERE
      sc.flagged = ? AND pi.healthfacility = ?`;
    const [number] = await connection.execute(q, [healthfacility]);
    const [missed] = await connection.execute(q2, [1, healthfacility]);
    const [completed] = await connection.execute(q3, [1, healthfacility]);
    const [upcoming] = await connection.execute(q4, [1, healthfacility]);
    const [flagged] = await connection.execute(q5, [1, healthfacility]);

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
const healthfacilitytestdata = async (req, res) => {
  const { healthfacility } = req.query;

  const gethiv = async (healthfacility) => {
    const connection = await db.getConnection();
    try {
      const q = `SELECT
    pi.*,
    p.*
    FROM
    testresult sc
    JOIN
        patients p ON sc.patient_id = p.id
    JOIN
        personalinformation pi ON p.personalinformation_id = pi.id
    WHERE
      sc.hiv = ? AND pi.healthfacility = ?`;
      const q2 = `SELECT
    pi.*,
    p.*
    FROM
    testresult sc
    JOIN
        patients p ON sc.patient_id = p.id
    JOIN
        personalinformation pi ON p.personalinformation_id = pi.id
    WHERE
      sc.hiv = ? AND pi.healthfacility = ?`;

      const result = await connection.execute(q, ["+ve", healthfacility]);
      const result2 = await connection.execute(q2, ["-ve", healthfacility]);
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
  const getmalariarapid = async (healthfacility) => {
    const connection = await db.getConnection();
    try {
      const q = `SELECT
    pi.*,
    p.*
    FROM
    testresult sc
    JOIN
        patients p ON sc.patient_id = p.id
    JOIN
        personalinformation pi ON p.personalinformation_id = pi.id
    WHERE
      sc.malariarapid = ? AND pi.healthfacility = ?`;
      const q2 = `SELECT
    pi.*,
    p.*
    FROM
    testresult sc
    JOIN
        patients p ON sc.patient_id = p.id
    JOIN
        personalinformation pi ON p.personalinformation_id = pi.id
    WHERE
      sc.malariarapid = ? AND pi.healthfacility = ?`;

      const result = await connection.execute(q, ["+ve", healthfacility]);
      const result2 = await connection.execute(q2, ["-ve", healthfacility]);
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
    const hiv = await gethiv(healthfacility);
    const malariarapid = await getmalariarapid(healthfacility);

    res.status(200).json({
      hiv: hiv,
      malariarapid: malariarapid,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

//get all health facilities
const getAllHealthfacility = async (req, res) => {
  const { state } = req.query;
  const q1 = `SELECT * FROM healthfacilityaccount WHERE state = ?`;
  const q2 = `SELECT * FROM healthfacilityaccount`;

  const connection = await db.getConnection();
  try {
    if (state) {
      const [result] = await connection.execute(q1, [state]);
      res.status(200).json(result);
    } else {
      const [result] = await connection.execute(q2);
      res.status(200).json(result);
    }
  } catch (error) {
    connection.release();
    logger.error(error);
    res.status(500).json(error);
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

export {
  healthfacilitygeneraldata,
  numberofwomenwith4visits,
  healthfacilityscheduledata,
  healthfacilityreturnvisitdata,
  healthfacilitytestdata,
  getAllHealthfacility,
};
