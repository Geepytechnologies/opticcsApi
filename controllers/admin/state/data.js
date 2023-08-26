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

const graviditygreaterthan8 = async (state) => {
  const connection = await db.getConnection();
  try {
    const q = `SELECT *
    FROM personalinformation
    WHERE CAST(gravidity AS SIGNED) > 8 OR CAST(gravidity AS SIGNED) = 8 AND state = ?`;
    const result = await connection.execute(q, [state]);
    return result[0].length;
  } catch (error) {
    console.log(error);
  } finally {
    if (connection) {
      connection.release();
    }
  }
};
const graviditylessthan8 = async (state) => {
  const connection = await db.getConnection();
  try {
    const q = `SELECT *
    FROM personalinformation
    WHERE CAST(gravidity AS SIGNED) < 8 AND state = ?`;
    const result = await connection.execute(q, [state]);
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
        state,lga,healthFacility
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
const getedd2 = async (state) => {
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
      state, lga, healthFacility
    FROM personalinformation WHERE state = ?
  ) AS subquery ON quarters.quarter = subquery.quarter
  GROUP BY quarters.quarter
  ORDER BY MIN(subquery.edd);
  
    
  `;
    const result = await connection.execute(q, [state]);
    return result[0];
  } catch (error) {
  } finally {
    if (connection) {
      connection.release();
    }
  }
};
const getparity = async (state) => {
  const connection = await db.getConnection();
  try {
    const q1 = `SELECT *
      FROM personalinformation
      WHERE CAST(parity AS SIGNED) <= 24 AND state = ?;
  `;
    const q2 = `SELECT *
      FROM personalinformation
      WHERE CAST(parity AS SIGNED) > 24 AND state = ?;
  `;
    const less = await connection.execute(q1, [state]);
    const greater = await connection.execute(q2, [state]);
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

const getbabysmovement = async (state) => {
  const connection = await db.getConnection();
  try {
    const q1 = `SELECT *
      FROM personalinformation
      WHERE doyoufeelthebabysmovement = ? AND state = ?;
  `;
    const q2 = `SELECT *
      FROM personalinformation
      WHERE doyoufeelthebabysmovement = ? AND state = ?;
  `;
    const q3 = `SELECT *
      FROM personalinformation
      WHERE doyoufeelthebabysmovement = ? ANd state = ?;
  `;
    const q4 = `SELECT *
      FROM personalinformation
      WHERE doyoufeelthebabysmovement = ? AND state = ?;
  `;
    const yes = await connection.execute(q1, ["yes", state]);
    const no = await connection.execute(q2, ["no", state]);
    const dontknow = await connection.execute(q3, ["i don't know", state]);
    const notapplicable = await connection.execute(q4, [
      "not applicable",
      state,
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
const getfirstbabymovement = async (state) => {
  const connection = await db.getConnection();
  try {
    const q1 = `SELECT *
      FROM personalinformation
      WHERE doyouknowdateoffirtbabymovement = ? AND state = ?;
  `;
    const q2 = `SELECT *
      FROM personalinformation
      WHERE doyoufeelthebabysmovement = ? AND state = ?;
  `;
    const q3 = `SELECT *
      FROM personalinformation
      WHERE doyoufeelthebabysmovement = ? AND state = ?;
  `;
    const q4 = `SELECT *
      FROM personalinformation
      WHERE doyoufeelthebabysmovement = ? AND state = ?;
  `;
    const yes = await connection.execute(q1, ["yes", state]);
    const no = await connection.execute(q2, ["no", state]);
    const dontknow = await connection.execute(q3, ["i don't know", state]);
    const notapplicable = await connection.execute(q4, [
      "not applicable",
      state,
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

const getconvulsions = async (state) => {
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
    AND pi.state = ?`;

    const result = await connection.execute(q, ["yes", state]);
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
    AND pi.state = ?`;
    const result2 = await connection.execute(q2, ["no", state]);
    return { yes: result[0].length, no: result2[0].length };
  } catch (error) {
    console.log(error);
  } finally {
    if (connection) {
      connection.release();
    }
  }
};
const getsurgery = async (state) => {
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
    AND pi.state = ?`;
    const result = await connection.execute(q, ["yes", state]);
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
    AND pi.state = ?`;
    const result2 = await connection.execute(q2, ["yes", state]);
    return { yes: result[0].length, no: result2[0].length };
  } catch (error) {
    console.log(error);
  } finally {
    if (connection) {
      connection.release();
    }
  }
};
const gettearsthroughsphincter = async (state) => {
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
    AND pi.state = ?`;
    const result = await connection.execute(q, ["yes", state]);
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
    AND pi.state = ?`;
    const result2 = await connection.execute(q2, ["no", state]);
    return { yes: result[0].length, no: result2[0].length };
  } catch (error) {
  } finally {
    if (connection) {
      connection.release();
    }
  }
};
const getpostpartiumhaemorrghage = async (state) => {
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
    AND pi.state = ?`;
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
    AND pi.state = ?`;
    const result = await connection.execute(q, ["yes", state]);
    const result2 = await connection.execute(q2, ["no", state]);
    return { yes: result[0].length, no: result2[0].length };
  } catch (error) {
  } finally {
    if (connection) {
      connection.release();
    }
  }
};
const getstillbirths = async (state) => {
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
    AND pi.state = ?`;
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
    AND pi.state = ?`;
    const result = await connection.execute(q, ["yes", state]);
    const result2 = await connection.execute(q2, ["no", state]);
    return { yes: result[0].length, no: result2[0].length };
  } catch (error) {
  } finally {
    if (connection) {
      connection.release();
    }
  }
};
const getprematuredeliveries = async (state) => {
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
    AND pi.state = ?`;
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
    AND pi.state = ?`;
    const result = await connection.execute(q, ["yes", state]);
    const result2 = await connection.execute(q2, ["no", state]);
    return { yes: result[0].length, no: result2[0].length };
  } catch (error) {
  } finally {
    if (connection) {
      connection.release();
    }
  }
};
const getlowbirthbabies = async (state) => {
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
    AND pi.state = ?`;
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
    AND pi.state = ?`;
    const result = await connection.execute(q, ["yes", state]);
    const result2 = await connection.execute(q2, ["no", state]);
    return { yes: result[0].length, no: result2[0].length };
  } catch (error) {
  } finally {
    if (connection) {
      connection.release();
    }
  }
};
const getbabieswhodied = async (state) => {
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
    AND pi.state = ?`;
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
    AND pi.state = ?`;
    const result = await connection.execute(q, ["yes", state]);
    const result2 = await connection.execute(q2, ["no", state]);
    return { yes: result[0].length, no: result2[0].length };
  } catch (error) {
  } finally {
    if (connection) {
      connection.release();
    }
  }
};
const getmiscarriages = async (state) => {
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
    AND pi.state = ?`;
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
    AND pi.state = ?`;
    const result = await connection.execute(q, ["yes", state]);
    const result2 = await connection.execute(q2, ["no", state]);
    return { yes: result[0].length, no: result2[0].length };
  } catch (error) {
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

//dailyhabits and lifestyle
const getSmokers = async (state) => {
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
    AND pi.state = ?`;
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
    AND pi.state = ?`;
    const result = await connection.execute(q, ["yes", state]);
    const result2 = await connection.execute(q2, ["no", state]);
    return { yes: result[0].length, no: result2[0].length };
  } catch (error) {
    console.log(error);
  } finally {
    if (connection) {
      connection.release();
    }
  }
};
const getAlcohol = async (state) => {
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
    AND pi.state = ?`;
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
    AND pi.state = ?`;
    const result = await connection.execute(q, ["yes", state]);
    const result2 = await connection.execute(q2, ["no", state]);
    return { yes: result[0].length, no: result2[0].length };
  } catch (error) {
  } finally {
    if (connection) {
      connection.release();
    }
  }
};
const getThreatened = async (state) => {
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
    AND pi.state = ?`;
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
    AND pi.state = ?`;
    const result = await connection.execute(q, ["yes", state]);
    const result2 = await connection.execute(q2, ["no", state]);
    return { yes: result[0].length, no: result2[0].length };
  } catch (error) {
  } finally {
    if (connection) {
      connection.release();
    }
  }
};
const whodoyoulivewith = async (state) => {
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
    AND pi.state = ?`;
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
    AND pi.state = ?`;
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
    AND pi.state = ?`;
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
    AND pi.state = ?`;
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
    AND pi.state = ? AND specifywhodoyoulivewith <> '';`;
    const result = await connection.execute(q, ["Partner", state]);
    const result2 = await connection.execute(q2, ["Relative", state]);
    const result3 = await connection.execute(q3, ["Alone", state]);
    const result4 = await connection.execute(q4, ["Friend", state]);
    const result5 = await connection.execute(q5, [state]);
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
const getcough = async (state) => {
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
    AND pi.state = ?`;
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
    AND pi.state = ?`;

    const result = await connection.execute(q, ["Yes", state]);
    const result2 = await connection.execute(q2, ["No", state]);
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
const getpalpitations = async (state) => {
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
    AND pi.state = ?`;
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
    AND pi.state = ?`;

    const result = await connection.execute(q, ["Yes", state]);
    const result2 = await connection.execute(q2, ["No", state]);
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
const getdifficultybreathing = async (state) => {
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
    AND pi.state = ?`;
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
    AND pi.state = ?`;

    const result = await connection.execute(q, ["Yes", state]);
    const result2 = await connection.execute(q2, ["No", state]);
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
const getswellingoffeet = async (state) => {
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
    AND pi.state = ?`;
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
    AND pi.state = ?`;

    const result = await connection.execute(q, ["Yes", state]);
    const result2 = await connection.execute(q2, ["No", state]);
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
const getchestpain = async (state) => {
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
    AND pi.state = ?`;
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
    AND pi.state = ?`;

    const result = await connection.execute(q, ["Yes", state]);
    const result2 = await connection.execute(q2, ["No", state]);
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
const getepigastricpain = async (state) => {
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
    AND pi.state = ?`;
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
    AND pi.state = ?`;

    const result = await connection.execute(q, ["Yes", state]);
    const result2 = await connection.execute(q2, ["No", state]);
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
const getseveretiredness = async (state) => {
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
    AND pi.state = ?`;
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
    AND pi.state = ?`;

    const result = await connection.execute(q, ["Yes", state]);
    const result2 = await connection.execute(q2, ["No", state]);
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
const getsevereabdominalpain = async (state) => {
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
    AND pi.state = ?`;
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
    AND pi.state = ?`;

    const result = await connection.execute(q, ["Yes", state]);
    const result2 = await connection.execute(q2, ["No", state]);
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
const getpersistentvomiting = async (state) => {
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
    AND pi.state = ?`;
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
    AND pi.state = ?`;

    const result = await connection.execute(q, ["Yes", state]);
    const result2 = await connection.execute(q2, ["No", state]);
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
const getseverediarrhoea = async (state) => {
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
    AND pi.state = ?`;
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
    AND pi.state = ?`;

    const result = await connection.execute(q, ["Yes", state]);
    const result2 = await connection.execute(q2, ["No", state]);
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
const getdizziness = async (state) => {
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
      AND pi.state = ?
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
      AND pi.state = ?
    `;

    const result = await connection.execute(q, ["Yes", state]);
    const result2 = await connection.execute(q2, ["No", state]);
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
const getpainwithurination = async (state) => {
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
    AND pi.state = ?`;
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
    AND pi.state = ?`;

    const result = await connection.execute(q, ["Yes", state]);
    const result2 = await connection.execute(q2, ["No", state]);
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
const getsevereflankpain = async (state) => {
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
    AND pi.state = ?`;
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
    AND pi.state = ?`;

    const result = await connection.execute(q, ["Yes", state]);
    const result2 = await connection.execute(q2, ["No", state]);
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
const getbloodinurine = async (state) => {
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
    AND pi.state = ?`;
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
    AND pi.state = ?`;

    const result = await connection.execute(q, ["Yes", state]);
    const result2 = await connection.execute(q2, ["No", state]);
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
const getvaginaldischarge = async (state) => {
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
    AND pi.state = ?`;
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
    AND pi.state = ?`;

    const result = await connection.execute(q, ["Yes", state]);
    const result2 = await connection.execute(q2, ["No", state]);
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
const getdeeppelvicpain = async (state) => {
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
    AND pi.state = ?`;
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
    AND pi.state = ?`;

    const result = await connection.execute(q, ["Yes", state]);
    const result2 = await connection.execute(q2, ["No", state]);
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
const getsyphilis = async (state) => {
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
    AND pi.state = ?`;
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
    AND pi.state = ?`;

    const result = await connection.execute(q, ["Yes", state]);
    const result2 = await connection.execute(q2, ["No", state]);
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
const getpersistentdrycough = async (state) => {
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
    AND pi.state = ?`;
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
    AND pi.state = ?`;

    const result = await connection.execute(q, ["Yes", state]);
    const result2 = await connection.execute(q2, ["No", state]);
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
const getprogressiveweightloss = async (state) => {
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
    AND pi.state = ?`;
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
    AND pi.state = ?`;

    const result = await connection.execute(q, ["Yes", state]);
    const result2 = await connection.execute(q2, ["No", state]);
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
const getnightsweats = async (state) => {
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
    AND pi.state = ?`;
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
    AND pi.state = ?`;

    const result = await connection.execute(q, ["Yes", state]);
    const result2 = await connection.execute(q2, ["No", state]);
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
const getdiagnosedwithtuberculosis = async (state) => {
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
    AND pi.state = ?`;
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
    AND pi.state = ?`;

    const result = await connection.execute(q, ["Yes", state]);
    const result2 = await connection.execute(q2, ["No", state]);
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
const gettreatedTBpreviously = async (state) => {
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
    AND pi.state = ?`;
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
    AND pi.state = ?`;

    const result = await connection.execute(q, ["Yes", state]);
    const result2 = await connection.execute(q2, ["No", state]);
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
const getheartdisease = async (state) => {
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
    AND pi.state = ?`;
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
    AND pi.state = ?`;

    const result = await connection.execute(q, ["Yes", state]);
    const result2 = await connection.execute(q2, ["No", state]);
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
const getanaemia = async (state) => {
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
    AND pi.state = ?`;
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
    AND pi.state = ?`;

    const result = await connection.execute(q, ["Yes", state]);
    const result2 = await connection.execute(q2, ["No", state]);
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
const getkidneydisease = async (state) => {
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
    AND pi.state = ?`;
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
    AND pi.state = ?`;

    const result = await connection.execute(q, ["Yes", state]);
    const result2 = await connection.execute(q2, ["No", state]);
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
const getsicklecell = async (state) => {
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
    AND pi.state = ?`;
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
    AND pi.state = ?`;

    const result = await connection.execute(q, ["Yes", state]);
    const result2 = await connection.execute(q2, ["No", state]);
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
const getdiabetes = async (state) => {
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
    AND pi.state = ?`;
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
    AND pi.state = ?`;

    const result = await connection.execute(q, ["Yes", state]);
    const result2 = await connection.execute(q2, ["No", state]);
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
const getgoitre = async (state) => {
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
    AND pi.state = ?`;
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
    AND pi.state = ?`;

    const result = await connection.execute(q, ["Yes", state]);
    const result2 = await connection.execute(q2, ["No", state]);
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
const gethivaids = async (state) => {
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
    AND pi.state = ?`;
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
    AND pi.state = ?`;

    const result = await connection.execute(q, ["Yes", state]);
    const result2 = await connection.execute(q2, ["No", state]);
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
const getotherseriouschronicillnesses = async (state) => {
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
    AND pi.state = ?`;
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
    AND pi.state = ?`;

    const result = await connection.execute(q, ["Yes", state]);
    const result2 = await connection.execute(q2, ["No", state]);
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
const gethadsurgery = async (state) => {
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
    AND pi.state = ?`;
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
    AND pi.state = ?`;

    const result = await connection.execute(q, ["Yes", state]);
    const result2 = await connection.execute(q2, ["No", state]);
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
const getherbalremedies = async (state) => {
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
    AND pi.state = ?`;
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
    AND pi.state = ?`;

    const result = await connection.execute(q, ["Yes", state]);
    const result2 = await connection.execute(q2, ["No", state]);
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
const getotcdrugs = async (state) => {
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
    AND pi.state = ?`;
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
    AND pi.state = ?`;

    const result = await connection.execute(q, ["Yes", state]);
    const result2 = await connection.execute(q2, ["No", state]);
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
const getvitamins = async (state) => {
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
    AND pi.state = ?`;
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
    AND pi.state = ?`;

    const result = await connection.execute(q, ["Yes", state]);
    const result2 = await connection.execute(q2, ["No", state]);
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
const getdietarysupplements = async (state) => {
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
    AND pi.state = ?`;
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
    AND pi.state = ?`;

    const result = await connection.execute(q, ["Yes", state]);
    const result2 = await connection.execute(q2, ["No", state]);
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
const gettetanus = async (state) => {
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
    AND pi.state = ?`;
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
    AND pi.state = ?`;

    const result = await connection.execute(q, ["Yes", state]);
    const result2 = await connection.execute(q2, ["No", state]);
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

const stategeneraldata = async (req, res) => {
  const { state } = req.query;
  try {
    //personalinformation
    const edd = await getedd2(state);
    const firstbabymovement = await getfirstbabymovement(state);
    const parity = await getparity(state);
    const babysmovement = await getbabysmovement(state);
    const graviditygreaterthan8result = await graviditygreaterthan8(state);
    const graviditylessthan8result = await graviditylessthan8(state);
    //obstetric
    const convulsionsduringpregnancy = await getconvulsions(state);
    const caesarean = await getsurgery(state);
    const tearsthroughsphincter = await gettearsthroughsphincter(state);
    const postpartiumhaemorrghage = await getpostpartiumhaemorrghage(state);
    const stillbirths = await getstillbirths(state);
    const prematuredeliveries = await getprematuredeliveries(state);
    const lowbirthbabies = await getlowbirthbabies(state);
    const babieswhodied = await getbabieswhodied(state);
    const miscarriages = await getmiscarriages(state);
    //dailyhabitsandlifestyle
    const doyousmoke = await getSmokers(state);
    const alcohol = await getAlcohol(state);
    const threatened = await getThreatened(state);
    const livewith = await whodoyoulivewith(state);
    //medicalhistory
    const cough = await getcough(state);
    const palpitations = await getpalpitations(state);
    const difficultybreathing = await getdifficultybreathing(state);
    const swellingfeet = await getswellingoffeet(state);
    const chestpain = await getchestpain(state);
    const epigastricpain = await getepigastricpain(state);
    const severetiredness = await getseveretiredness(state);
    const severeabdominalpain = await getsevereabdominalpain(state);
    const persistentvomiting = await getpersistentvomiting(state);
    const severediarrhoea = await getseverediarrhoea(state);
    const dizziness = await getdizziness(state);

    //urinary
    const painwithurination = await getpainwithurination(state);
    const severeflankpain = await getsevereflankpain(state);
    const bloodinurine = await getbloodinurine(state);
    //gynaecological
    const vaginaldischarge = await getvaginaldischarge(state);
    const deeppelvicpain = await getdeeppelvicpain(state);
    const syphilis = await getsyphilis(state);
    const persistentdrycough = await getpersistentdrycough(state);
    const progressiveweightloss = await getprogressiveweightloss(state);
    const nightsweats = await getnightsweats(state);
    const diagnosedwithtuberculosis = await getdiagnosedwithtuberculosis(state);
    const treatedTBpreviously = await gettreatedTBpreviously(state);
    //pastmedicalhistory
    const heartdisease = await getheartdisease(state);
    const anaemia = await getanaemia(state);
    const kidneydisease = await getkidneydisease(state);
    const sicklecell = await getsicklecell(state);
    const diabetes = await getdiabetes(state);
    const goitre = await getgoitre(state);
    const hivaids = await gethivaids(state);
    const otherseriouschronicillnesses = await getotherseriouschronicillnesses(
      state
    );
    const hadsurgery = await gethadsurgery(state);
    //drughistory
    const herbalremedies = await getherbalremedies(state);
    const otcdrugs = await getotcdrugs(state);
    const vitamins = await getvitamins(state);
    const dietarysupplements = await getdietarysupplements(state);
    const tetanus = await gettetanus(state);

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

const statereturnvisitdata = async (req, res) => {
  const { state } = req.query;

  const getfeverreturn = async (state) => {
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
        rv.fever = ? AND pi.state = ?
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
        rv.fever = ? AND pi.state = ?
      `;

      const result = await connection.execute(q, ["Yes", state]);
      const result2 = await connection.execute(q2, ["No", state]);
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
  const getheadachereturn = async (state) => {
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
        rv.headache = ? AND pi.state = ?
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
        rv.headache = ? AND pi.state = ?
      `;

      const result = await connection.execute(q, ["Yes", state]);
      const result2 = await connection.execute(q2, ["No", state]);
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
  const getcoughreturn = async (state) => {
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
        rv.cough = ? AND pi.state = ?
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
        rv.cough = ? AND pi.state = ?
      `;

      const result = await connection.execute(q, ["Yes", state]);
      const result2 = await connection.execute(q2, ["No", state]);
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
  const getpalpitationsreturn = async (state) => {
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
        rv.palpitation = ? AND pi.state = ?
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
        rv.palpitation = ? AND pi.state = ?
      `;

      const result = await connection.execute(q, ["Yes", state]);
      const result2 = await connection.execute(q2, ["No", state]);
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
  const getseveretirednessreturn = async (state) => {
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
        rv.severetirednesss = ? AND pi.state = ?
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
        rv.severetirednesss = ? AND pi.state = ?
      `;

      const result = await connection.execute(q, ["Yes", state]);
      const result2 = await connection.execute(q2, ["No", state]);
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
  const getdifficultylyingflatreturn = async (state) => {
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
        rv.difficultylyingflat = ? AND pi.state = ?
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
        rv.difficultylyingflat = ? AND pi.state = ?
      `;

      const result = await connection.execute(q, ["Yes", state]);
      const result2 = await connection.execute(q2, ["No", state]);
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
  const getdizzinessreturn = async (state) => {
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
        rv.dizziness = ? AND pi.state = ?
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
        rv.dizziness = ? AND pi.state = ?
      `;

      const result = await connection.execute(q, ["Yes", state]);
      const result2 = await connection.execute(q2, ["No", state]);
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
  const getconvulsionsreturn = async (state) => {
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
        rv.convulsions = ? AND pi.state = ?
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
        rv.convulsions = ? AND pi.state = ?
      `;

      const result = await connection.execute(q, ["Yes", state]);
      const result2 = await connection.execute(q2, ["No", state]);
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
  const getabdominalpainreturn = async (state) => {
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
        rv.severeabdominalpain = ? AND pi.state = ?
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
        rv.severeabdominalpain = ? AND pi.state = ?
      `;

      const result = await connection.execute(q, ["Yes", state]);
      const result2 = await connection.execute(q2, ["No", state]);
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
  const getpainwithurinationreturn = async (state) => {
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
        rv.urinarypain = ? AND pi.state = ?
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
        rv.urinarypain = ? AND pi.state = ?
      `;

      const result = await connection.execute(q, ["Yes", state]);
      const result2 = await connection.execute(q2, ["No", state]);
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
  const getbloodinurinereturn = async (state) => {
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
        rv.bloodinurine = ? AND pi.state = ?
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
        rv.bloodinurine = ? AND pi.state = ?
      `;

      const result = await connection.execute(q, ["Yes", state]);
      const result2 = await connection.execute(q2, ["No", state]);
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
  const getvaginaldischargereturn = async (state) => {
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
        rv.vaginaldischarge = ? AND pi.state = ?
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
        rv.vaginaldischarge = ? AND pi.state = ?
      `;

      const result = await connection.execute(q, ["Yes", state]);
      const result2 = await connection.execute(q2, ["No", state]);
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
  const getdeeppelvicpainreturn = async (state) => {
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
        rv.painduringsex = ? AND pi.state = ?
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
        rv.painduringsex = ? AND pi.state = ?
      `;

      const result = await connection.execute(q, ["Yes", state]);
      const result2 = await connection.execute(q2, ["No", state]);
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
  const getsyphilisreturn = async (state) => {
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
        rv.syphillis = ? AND pi.state = ?
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
        rv.syphillis = ? AND pi.state = ?
      `;

      const result = await connection.execute(q, ["Yes", state]);
      const result2 = await connection.execute(q2, ["No", state]);
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
    const fever = await getfeverreturn(state);
    const headache = await getheadachereturn(state);
    const cough = await getcoughreturn(state);
    const palpitations = await getpalpitationsreturn(state);
    const severetiredness = await getseveretirednessreturn(state);
    const difficultylyingflat = await getdifficultylyingflatreturn(state);
    const dizziness = await getdizzinessreturn(state);
    const convulsionsduringpregnancy = await getconvulsionsreturn(state);
    const abdominalpain = await getabdominalpainreturn(state);
    const painwithurination = await getpainwithurinationreturn(state);
    const bloodinurine = await getbloodinurinereturn(state);
    const vaginaldischarge = await getvaginaldischargereturn(state);
    const deeppelvicpain = await getdeeppelvicpainreturn(state);
    const syphilis = await getsyphilisreturn(state);

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

const statescheduledata = async (req, res) => {
  const { state } = req.query;
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
      pi.state = ?`;
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
      sc.missed = ? AND pi.state = ?`;
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
      sc.completed = ? AND pi.state = ?`;
    const [number] = await connection.execute(q, [state]);
    const [missed] = await connection.execute(q2, [1, state]);
    const [completed] = await connection.execute(q3, [1, state]);

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
  stategeneraldata,
  numberofwomenwith4visits,
  statereturnvisitdata,
  statescheduledata,
};
