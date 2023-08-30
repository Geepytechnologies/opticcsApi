const db = require("../../../config/db");

const numberofwomenwith4visits = async (req, res) => {
  const connection = await db.getConnection();
  const { lga } = req.query;
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
    AND hp.lga = ?
        
      `;
    const result = await connection.execute(q, [lga]);
    res.status(200).json(result[0]);
  } catch (error) {
    res.status(500).json(error);
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

const graviditygreaterthan8 = async (lga) => {
  const connection = await db.getConnection();
  try {
    const q = `SELECT *
    FROM personalinformation
    WHERE CAST(gravidity AS SIGNED) > 8 OR CAST(gravidity AS SIGNED) = 8 AND lga = ?`;
    const result = await connection.execute(q, [lga]);
    return result[0].length;
  } catch (error) {
    console.log(error);
  } finally {
    if (connection) {
      connection.release();
    }
  }
};
const graviditylessthan8 = async (lga) => {
  const connection = await db.getConnection();
  try {
    const q = `SELECT *
    FROM personalinformation
    WHERE CAST(gravidity AS SIGNED) < 8 AND lga = ?`;
    const result = await connection.execute(q, [lga]);
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
        lga,lga,healthFacility
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
const getedd2 = async (lga) => {
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
      lga, healthFacility
    FROM personalinformation WHERE lga = ?
  ) AS subquery ON quarters.quarter = subquery.quarter
  GROUP BY quarters.quarter
  ORDER BY MIN(subquery.edd);
  
    
  `;
    const result = await connection.execute(q, [lga]);
    return result[0];
  } catch (error) {
  } finally {
    if (connection) {
      connection.release();
    }
  }
};
const getparity = async (lga) => {
  const connection = await db.getConnection();
  try {
    const q1 = `SELECT *
      FROM personalinformation
      WHERE CAST(parity AS SIGNED) <= 24 AND lga = ?;
  `;
    const q2 = `SELECT *
      FROM personalinformation
      WHERE CAST(parity AS SIGNED) > 24 AND lga = ?;
  `;
    const less = await connection.execute(q1, [lga]);
    const greater = await connection.execute(q2, [lga]);
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

const getbabysmovement = async (lga) => {
  const connection = await db.getConnection();
  try {
    const q1 = `SELECT *
      FROM personalinformation
      WHERE doyoufeelthebabysmovement = ? AND lga = ?;
  `;
    const q2 = `SELECT *
      FROM personalinformation
      WHERE doyoufeelthebabysmovement = ? AND lga = ?;
  `;
    const q3 = `SELECT *
      FROM personalinformation
      WHERE doyoufeelthebabysmovement = ? ANd lga = ?;
  `;
    const q4 = `SELECT *
      FROM personalinformation
      WHERE doyoufeelthebabysmovement = ? AND lga = ?;
  `;
    const yes = await connection.execute(q1, ["yes", lga]);
    const no = await connection.execute(q2, ["no", lga]);
    const dontknow = await connection.execute(q3, ["i don't know", lga]);
    const notapplicable = await connection.execute(q4, ["not applicable", lga]);
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
const getfirstbabymovement = async (lga) => {
  const connection = await db.getConnection();
  try {
    const q1 = `SELECT *
      FROM personalinformation
      WHERE doyouknowdateoffirtbabymovement = ? AND lga = ?;
  `;
    const q2 = `SELECT *
      FROM personalinformation
      WHERE doyoufeelthebabysmovement = ? AND lga = ?;
  `;
    const q3 = `SELECT *
      FROM personalinformation
      WHERE doyoufeelthebabysmovement = ? AND lga = ?;
  `;
    const q4 = `SELECT *
      FROM personalinformation
      WHERE doyoufeelthebabysmovement = ? AND lga = ?;
  `;
    const yes = await connection.execute(q1, ["yes", lga]);
    const no = await connection.execute(q2, ["no", lga]);
    const dontknow = await connection.execute(q3, ["i don't know", lga]);
    const notapplicable = await connection.execute(q4, ["not applicable", lga]);
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

const getconvulsions = async (lga) => {
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
    AND pi.lga = ?`;

    const result = await connection.execute(q, ["yes", lga]);
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
    AND pi.lga = ?`;
    const result2 = await connection.execute(q2, ["no", lga]);
    return { yes: result[0].length, no: result2[0].length };
  } catch (error) {
    console.log(error);
  } finally {
    if (connection) {
      connection.release();
    }
  }
};
const getsurgery = async (lga) => {
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
    AND pi.lga = ?`;
    const result = await connection.execute(q, ["yes", lga]);
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
    AND pi.lga = ?`;
    const result2 = await connection.execute(q2, ["yes", lga]);
    return { yes: result[0].length, no: result2[0].length };
  } catch (error) {
    console.log(error);
  } finally {
    if (connection) {
      connection.release();
    }
  }
};
const gettearsthroughsphincter = async (lga) => {
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
    AND pi.lga = ?`;
    const result = await connection.execute(q, ["yes", lga]);
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
    AND pi.lga = ?`;
    const result2 = await connection.execute(q2, ["no", lga]);
    return { yes: result[0].length, no: result2[0].length };
  } catch (error) {
  } finally {
    if (connection) {
      connection.release();
    }
  }
};
const getpostpartiumhaemorrghage = async (lga) => {
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
    AND pi.lga = ?`;
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
    AND pi.lga = ?`;
    const result = await connection.execute(q, ["yes", lga]);
    const result2 = await connection.execute(q2, ["no", lga]);
    return { yes: result[0].length, no: result2[0].length };
  } catch (error) {
  } finally {
    if (connection) {
      connection.release();
    }
  }
};
const getstillbirths = async (lga) => {
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
    AND pi.lga = ?`;
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
    AND pi.lga = ?`;
    const result = await connection.execute(q, ["yes", lga]);
    const result2 = await connection.execute(q2, ["no", lga]);
    return { yes: result[0].length, no: result2[0].length };
  } catch (error) {
  } finally {
    if (connection) {
      connection.release();
    }
  }
};
const getprematuredeliveries = async (lga) => {
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
    AND pi.lga = ?`;
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
    AND pi.lga = ?`;
    const result = await connection.execute(q, ["yes", lga]);
    const result2 = await connection.execute(q2, ["no", lga]);
    return { yes: result[0].length, no: result2[0].length };
  } catch (error) {
  } finally {
    if (connection) {
      connection.release();
    }
  }
};
const getlowbirthbabies = async (lga) => {
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
    AND pi.lga = ?`;
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
    AND pi.lga = ?`;
    const result = await connection.execute(q, ["yes", lga]);
    const result2 = await connection.execute(q2, ["no", lga]);
    return { yes: result[0].length, no: result2[0].length };
  } catch (error) {
  } finally {
    if (connection) {
      connection.release();
    }
  }
};
const getbabieswhodied = async (lga) => {
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
    AND pi.lga = ?`;
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
    AND pi.lga = ?`;
    const result = await connection.execute(q, ["yes", lga]);
    const result2 = await connection.execute(q2, ["no", lga]);
    return { yes: result[0].length, no: result2[0].length };
  } catch (error) {
  } finally {
    if (connection) {
      connection.release();
    }
  }
};
const getmiscarriages = async (lga) => {
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
    AND pi.lga = ?`;
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
    AND pi.lga = ?`;
    const result = await connection.execute(q, ["yes", lga]);
    const result2 = await connection.execute(q2, ["no", lga]);
    return { yes: result[0].length, no: result2[0].length };
  } catch (error) {
  } finally {
    if (connection) {
      connection.release();
    }
  }
};
//dailyhabits and lifestyle
const getSmokers = async (lga) => {
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
    AND pi.lga = ?`;
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
    AND pi.lga = ?`;
    const result = await connection.execute(q, ["yes", lga]);
    const result2 = await connection.execute(q2, ["no", lga]);
    return { yes: result[0].length, no: result2[0].length };
  } catch (error) {
    console.log(error);
  } finally {
    if (connection) {
      connection.release();
    }
  }
};
const getAlcohol = async (lga) => {
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
    AND pi.lga = ?`;
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
    AND pi.lga = ?`;
    const result = await connection.execute(q, ["yes", lga]);
    const result2 = await connection.execute(q2, ["no", lga]);
    return { yes: result[0].length, no: result2[0].length };
  } catch (error) {
  } finally {
    if (connection) {
      connection.release();
    }
  }
};
const getThreatened = async (lga) => {
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
    AND pi.lga = ?`;
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
    AND pi.lga = ?`;
    const result = await connection.execute(q, ["yes", lga]);
    const result2 = await connection.execute(q2, ["no", lga]);
    return { yes: result[0].length, no: result2[0].length };
  } catch (error) {
  } finally {
    if (connection) {
      connection.release();
    }
  }
};
const whodoyoulivewith = async (lga) => {
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
    AND pi.lga = ?`;
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
    AND pi.lga = ?`;
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
    AND pi.lga = ?`;
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
    AND pi.lga = ?`;
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
    AND pi.lga = ? AND specifywhodoyoulivewith <> '';`;
    const result = await connection.execute(q, ["Partner", lga]);
    const result2 = await connection.execute(q2, ["Relative", lga]);
    const result3 = await connection.execute(q3, ["Alone", lga]);
    const result4 = await connection.execute(q4, ["Friend", lga]);
    const result5 = await connection.execute(q5, [lga]);
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
const getcough = async (lga) => {
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
    AND pi.lga = ?`;
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
    AND pi.lga = ?`;

    const result = await connection.execute(q, ["Yes", lga]);
    const result2 = await connection.execute(q2, ["No", lga]);
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
const getpalpitations = async (lga) => {
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
    AND pi.lga = ?`;
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
    AND pi.lga = ?`;

    const result = await connection.execute(q, ["Yes", lga]);
    const result2 = await connection.execute(q2, ["No", lga]);
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
const getdifficultybreathing = async (lga) => {
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
    AND pi.lga = ?`;
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
    AND pi.lga = ?`;

    const result = await connection.execute(q, ["Yes", lga]);
    const result2 = await connection.execute(q2, ["No", lga]);
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
const getswellingoffeet = async (lga) => {
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
    AND pi.lga = ?`;
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
    AND pi.lga = ?`;

    const result = await connection.execute(q, ["Yes", lga]);
    const result2 = await connection.execute(q2, ["No", lga]);
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
const getchestpain = async (lga) => {
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
    AND pi.lga = ?`;
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
    AND pi.lga = ?`;

    const result = await connection.execute(q, ["Yes", lga]);
    const result2 = await connection.execute(q2, ["No", lga]);
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
const getepigastricpain = async (lga) => {
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
    AND pi.lga = ?`;
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
    AND pi.lga = ?`;

    const result = await connection.execute(q, ["Yes", lga]);
    const result2 = await connection.execute(q2, ["No", lga]);
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
const getseveretiredness = async (lga) => {
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
    AND pi.lga = ?`;
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
    AND pi.lga = ?`;

    const result = await connection.execute(q, ["Yes", lga]);
    const result2 = await connection.execute(q2, ["No", lga]);
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
const getsevereabdominalpain = async (lga) => {
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
    AND pi.lga = ?`;
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
    AND pi.lga = ?`;

    const result = await connection.execute(q, ["Yes", lga]);
    const result2 = await connection.execute(q2, ["No", lga]);
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
const getpersistentvomiting = async (lga) => {
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
    AND pi.lga = ?`;
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
    AND pi.lga = ?`;

    const result = await connection.execute(q, ["Yes", lga]);
    const result2 = await connection.execute(q2, ["No", lga]);
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
const getseverediarrhoea = async (lga) => {
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
    AND pi.lga = ?`;
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
    AND pi.lga = ?`;

    const result = await connection.execute(q, ["Yes", lga]);
    const result2 = await connection.execute(q2, ["No", lga]);
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
const getdizziness = async (lga) => {
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
      AND pi.lga = ?
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
      AND pi.lga = ?
    `;

    const result = await connection.execute(q, ["Yes", lga]);
    const result2 = await connection.execute(q2, ["No", lga]);
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
const getpainwithurination = async (lga) => {
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
    AND pi.lga = ?`;
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
    AND pi.lga = ?`;

    const result = await connection.execute(q, ["Yes", lga]);
    const result2 = await connection.execute(q2, ["No", lga]);
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
const getsevereflankpain = async (lga) => {
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
    AND pi.lga = ?`;
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
    AND pi.lga = ?`;

    const result = await connection.execute(q, ["Yes", lga]);
    const result2 = await connection.execute(q2, ["No", lga]);
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
const getbloodinurine = async (lga) => {
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
    AND pi.lga = ?`;
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
    AND pi.lga = ?`;

    const result = await connection.execute(q, ["Yes", lga]);
    const result2 = await connection.execute(q2, ["No", lga]);
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
const getvaginaldischarge = async (lga) => {
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
    AND pi.lga = ?`;
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
    AND pi.lga = ?`;

    const result = await connection.execute(q, ["Yes", lga]);
    const result2 = await connection.execute(q2, ["No", lga]);
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
const getdeeppelvicpain = async (lga) => {
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
    AND pi.lga = ?`;
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
    AND pi.lga = ?`;

    const result = await connection.execute(q, ["Yes", lga]);
    const result2 = await connection.execute(q2, ["No", lga]);
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
const getsyphilis = async (lga) => {
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
    AND pi.lga = ?`;
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
    AND pi.lga = ?`;

    const result = await connection.execute(q, ["Yes", lga]);
    const result2 = await connection.execute(q2, ["No", lga]);
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
const getpersistentdrycough = async (lga) => {
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
    AND pi.lga = ?`;
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
    AND pi.lga = ?`;

    const result = await connection.execute(q, ["Yes", lga]);
    const result2 = await connection.execute(q2, ["No", lga]);
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
const getprogressiveweightloss = async (lga) => {
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
    AND pi.lga = ?`;
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
    AND pi.lga = ?`;

    const result = await connection.execute(q, ["Yes", lga]);
    const result2 = await connection.execute(q2, ["No", lga]);
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
const getnightsweats = async (lga) => {
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
    AND pi.lga = ?`;
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
    AND pi.lga = ?`;

    const result = await connection.execute(q, ["Yes", lga]);
    const result2 = await connection.execute(q2, ["No", lga]);
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
const getdiagnosedwithtuberculosis = async (lga) => {
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
    AND pi.lga = ?`;
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
    AND pi.lga = ?`;

    const result = await connection.execute(q, ["Yes", lga]);
    const result2 = await connection.execute(q2, ["No", lga]);
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
const gettreatedTBpreviously = async (lga) => {
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
    AND pi.lga = ?`;
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
    AND pi.lga = ?`;

    const result = await connection.execute(q, ["Yes", lga]);
    const result2 = await connection.execute(q2, ["No", lga]);
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
const getheartdisease = async (lga) => {
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
    AND pi.lga = ?`;
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
    AND pi.lga = ?`;

    const result = await connection.execute(q, ["Yes", lga]);
    const result2 = await connection.execute(q2, ["No", lga]);
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
const getanaemia = async (lga) => {
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
    AND pi.lga = ?`;
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
    AND pi.lga = ?`;

    const result = await connection.execute(q, ["Yes", lga]);
    const result2 = await connection.execute(q2, ["No", lga]);
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
const getkidneydisease = async (lga) => {
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
    AND pi.lga = ?`;
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
    AND pi.lga = ?`;

    const result = await connection.execute(q, ["Yes", lga]);
    const result2 = await connection.execute(q2, ["No", lga]);
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
const getsicklecell = async (lga) => {
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
    AND pi.lga = ?`;
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
    AND pi.lga = ?`;

    const result = await connection.execute(q, ["Yes", lga]);
    const result2 = await connection.execute(q2, ["No", lga]);
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
const getdiabetes = async (lga) => {
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
    AND pi.lga = ?`;
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
    AND pi.lga = ?`;

    const result = await connection.execute(q, ["Yes", lga]);
    const result2 = await connection.execute(q2, ["No", lga]);
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
const getgoitre = async (lga) => {
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
    AND pi.lga = ?`;
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
    AND pi.lga = ?`;

    const result = await connection.execute(q, ["Yes", lga]);
    const result2 = await connection.execute(q2, ["No", lga]);
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
const gethivaids = async (lga) => {
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
    AND pi.lga = ?`;
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
    AND pi.lga = ?`;

    const result = await connection.execute(q, ["Yes", lga]);
    const result2 = await connection.execute(q2, ["No", lga]);
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
const getotherseriouschronicillnesses = async (lga) => {
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
    AND pi.lga = ?`;
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
    AND pi.lga = ?`;

    const result = await connection.execute(q, ["Yes", lga]);
    const result2 = await connection.execute(q2, ["No", lga]);
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
const gethadsurgery = async (lga) => {
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
    AND pi.lga = ?`;
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
    AND pi.lga = ?`;

    const result = await connection.execute(q, ["Yes", lga]);
    const result2 = await connection.execute(q2, ["No", lga]);
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
const getherbalremedies = async (lga) => {
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
    AND pi.lga = ?`;
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
    AND pi.lga = ?`;

    const result = await connection.execute(q, ["Yes", lga]);
    const result2 = await connection.execute(q2, ["No", lga]);
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
const getotcdrugs = async (lga) => {
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
    AND pi.lga = ?`;
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
    AND pi.lga = ?`;

    const result = await connection.execute(q, ["Yes", lga]);
    const result2 = await connection.execute(q2, ["No", lga]);
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
const getvitamins = async (lga) => {
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
    AND pi.lga = ?`;
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
    AND pi.lga = ?`;

    const result = await connection.execute(q, ["Yes", lga]);
    const result2 = await connection.execute(q2, ["No", lga]);
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
const getdietarysupplements = async (lga) => {
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
    AND pi.lga = ?`;
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
    AND pi.lga = ?`;

    const result = await connection.execute(q, ["Yes", lga]);
    const result2 = await connection.execute(q2, ["No", lga]);
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
const gettetanus = async (lga) => {
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
    AND pi.lga = ?`;
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
    AND pi.lga = ?`;

    const result = await connection.execute(q, ["Yes", lga]);
    const result2 = await connection.execute(q2, ["No", lga]);
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

const lgageneraldata = async (req, res) => {
  const { lga } = req.query;
  try {
    //personalinformation
    const edd = await getedd2(lga);
    const firstbabymovement = await getfirstbabymovement(lga);
    const parity = await getparity(lga);
    const babysmovement = await getbabysmovement(lga);
    const graviditygreaterthan8result = await graviditygreaterthan8(lga);
    const graviditylessthan8result = await graviditylessthan8(lga);
    //obstetric
    const convulsionsduringpregnancy = await getconvulsions(lga);
    const caesarean = await getsurgery(lga);
    const tearsthroughsphincter = await gettearsthroughsphincter(lga);
    const postpartiumhaemorrghage = await getpostpartiumhaemorrghage(lga);
    const stillbirths = await getstillbirths(lga);
    const prematuredeliveries = await getprematuredeliveries(lga);
    const lowbirthbabies = await getlowbirthbabies(lga);
    const babieswhodied = await getbabieswhodied(lga);
    const miscarriages = await getmiscarriages(lga);
    //dailyhabitsandlifestyle
    const doyousmoke = await getSmokers(lga);
    const alcohol = await getAlcohol(lga);
    const threatened = await getThreatened(lga);
    const livewith = await whodoyoulivewith(lga);
    //medicalhistory
    const cough = await getcough(lga);
    const palpitations = await getpalpitations(lga);
    const difficultybreathing = await getdifficultybreathing(lga);
    const swellingfeet = await getswellingoffeet(lga);
    const chestpain = await getchestpain(lga);
    const epigastricpain = await getepigastricpain(lga);
    const severetiredness = await getseveretiredness(lga);
    const severeabdominalpain = await getsevereabdominalpain(lga);
    const persistentvomiting = await getpersistentvomiting(lga);
    const severediarrhoea = await getseverediarrhoea(lga);
    const dizziness = await getdizziness(lga);

    //urinary
    const painwithurination = await getpainwithurination(lga);
    const severeflankpain = await getsevereflankpain(lga);
    const bloodinurine = await getbloodinurine(lga);
    //gynaecological
    const vaginaldischarge = await getvaginaldischarge(lga);
    const deeppelvicpain = await getdeeppelvicpain(lga);
    const syphilis = await getsyphilis(lga);
    const persistentdrycough = await getpersistentdrycough(lga);
    const progressiveweightloss = await getprogressiveweightloss(lga);
    const nightsweats = await getnightsweats(lga);
    const diagnosedwithtuberculosis = await getdiagnosedwithtuberculosis(lga);
    const treatedTBpreviously = await gettreatedTBpreviously(lga);
    //pastmedicalhistory
    const heartdisease = await getheartdisease(lga);
    const anaemia = await getanaemia(lga);
    const kidneydisease = await getkidneydisease(lga);
    const sicklecell = await getsicklecell(lga);
    const diabetes = await getdiabetes(lga);
    const goitre = await getgoitre(lga);
    const hivaids = await gethivaids(lga);
    const otherseriouschronicillnesses = await getotherseriouschronicillnesses(
      lga
    );
    const hadsurgery = await gethadsurgery(lga);
    //drughistory
    const herbalremedies = await getherbalremedies(lga);
    const otcdrugs = await getotcdrugs(lga);
    const vitamins = await getvitamins(lga);
    const dietarysupplements = await getdietarysupplements(lga);
    const tetanus = await gettetanus(lga);

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
const lgareturnvisitdata = async (req, res) => {
  const { lga } = req.query;

  const getfeverreturn = async (lga) => {
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
        rv.fever = ? AND pi.lga = ?
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
        rv.fever = ? AND pi.lga = ?
      `;

      const result = await connection.execute(q, ["Yes", lga]);
      const result2 = await connection.execute(q2, ["No", lga]);
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
  const getheadachereturn = async (lga) => {
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
        rv.headache = ? AND pi.lga = ?
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
        rv.headache = ? AND pi.lga = ?
      `;

      const result = await connection.execute(q, ["Yes", lga]);
      const result2 = await connection.execute(q2, ["No", lga]);
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
  const getcoughreturn = async (lga) => {
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
        rv.cough = ? AND pi.lga = ?
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
        rv.cough = ? AND pi.lga = ?
      `;

      const result = await connection.execute(q, ["Yes", lga]);
      const result2 = await connection.execute(q2, ["No", lga]);
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
  const getpalpitationsreturn = async (lga) => {
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
        rv.palpitation = ? AND pi.lga = ?
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
        rv.palpitation = ? AND pi.lga = ?
      `;

      const result = await connection.execute(q, ["Yes", lga]);
      const result2 = await connection.execute(q2, ["No", lga]);
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
  const getseveretirednessreturn = async (lga) => {
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
        rv.severetirednesss = ? AND pi.lga = ?
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
        rv.severetirednesss = ? AND pi.lga = ?
      `;

      const result = await connection.execute(q, ["Yes", lga]);
      const result2 = await connection.execute(q2, ["No", lga]);
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
  const getdifficultylyingflatreturn = async (lga) => {
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
        rv.difficultylyingflat = ? AND pi.lga = ?
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
        rv.difficultylyingflat = ? AND pi.lga = ?
      `;

      const result = await connection.execute(q, ["Yes", lga]);
      const result2 = await connection.execute(q2, ["No", lga]);
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
  const getdizzinessreturn = async (lga) => {
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
        rv.dizziness = ? AND pi.lga = ?
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
        rv.dizziness = ? AND pi.lga = ?
      `;

      const result = await connection.execute(q, ["Yes", lga]);
      const result2 = await connection.execute(q2, ["No", lga]);
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
  const getconvulsionsreturn = async (lga) => {
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
        rv.convulsions = ? AND pi.lga = ?
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
        rv.convulsions = ? AND pi.lga = ?
      `;

      const result = await connection.execute(q, ["Yes", lga]);
      const result2 = await connection.execute(q2, ["No", lga]);
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
  const getabdominalpainreturn = async (lga) => {
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
        rv.severeabdominalpain = ? AND pi.lga = ?
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
        rv.severeabdominalpain = ? AND pi.lga = ?
      `;

      const result = await connection.execute(q, ["Yes", lga]);
      const result2 = await connection.execute(q2, ["No", lga]);
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
  const getpainwithurinationreturn = async (lga) => {
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
        rv.urinarypain = ? AND pi.lga = ?
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
        rv.urinarypain = ? AND pi.lga = ?
      `;

      const result = await connection.execute(q, ["Yes", lga]);
      const result2 = await connection.execute(q2, ["No", lga]);
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
  const getbloodinurinereturn = async (lga) => {
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
        rv.bloodinurine = ? AND pi.lga = ?
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
        rv.bloodinurine = ? AND pi.lga = ?
      `;

      const result = await connection.execute(q, ["Yes", lga]);
      const result2 = await connection.execute(q2, ["No", lga]);
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
  const getvaginaldischargereturn = async (lga) => {
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
        rv.vaginaldischarge = ? AND pi.lga = ?
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
        rv.vaginaldischarge = ? AND pi.lga = ?
      `;

      const result = await connection.execute(q, ["Yes", lga]);
      const result2 = await connection.execute(q2, ["No", lga]);
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
  const getdeeppelvicpainreturn = async (lga) => {
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
        rv.painduringsex = ? AND pi.lga = ?
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
        rv.painduringsex = ? AND pi.lga = ?
      `;

      const result = await connection.execute(q, ["Yes", lga]);
      const result2 = await connection.execute(q2, ["No", lga]);
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
  const getsyphilisreturn = async (lga) => {
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
        rv.syphillis = ? AND pi.lga = ?
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
        rv.syphillis = ? AND pi.lga = ?
      `;

      const result = await connection.execute(q, ["Yes", lga]);
      const result2 = await connection.execute(q2, ["No", lga]);
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
    const fever = await getfeverreturn(lga);
    const headache = await getheadachereturn(lga);
    const cough = await getcoughreturn(lga);
    const palpitations = await getpalpitationsreturn(lga);
    const severetiredness = await getseveretirednessreturn(lga);
    const difficultylyingflat = await getdifficultylyingflatreturn(lga);
    const dizziness = await getdizzinessreturn(lga);
    const convulsionsduringpregnancy = await getconvulsionsreturn(lga);
    const abdominalpain = await getabdominalpainreturn(lga);
    const painwithurination = await getpainwithurinationreturn(lga);
    const bloodinurine = await getbloodinurinereturn(lga);
    const vaginaldischarge = await getvaginaldischargereturn(lga);
    const deeppelvicpain = await getdeeppelvicpainreturn(lga);
    const syphilis = await getsyphilisreturn(lga);

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
const lgascheduledata = async (req, res) => {
  const { lga } = req.query;
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
      pi.lga = ?`;
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
      sc.missed = ? AND pi.lga = ?`;
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
      sc.completed = ? AND pi.lga = ?`;
    const [number] = await connection.execute(q, [lga]);
    const [missed] = await connection.execute(q2, [1, lga]);
    const [completed] = await connection.execute(q3, [1, lga]);

    res.status(200).json({
      number: number.length,
      missed: missed.length,
      completed: completed.length,
    });
  } catch (error) {
    res.status(500).json(error);
  } finally {
    if (connection) {
      connection.release();
    }
  }
};
module.exports = {
  lgageneraldata,
  numberofwomenwith4visits,
  lgareturnvisitdata,
  lgascheduledata,
};
