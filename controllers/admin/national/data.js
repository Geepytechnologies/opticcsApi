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
      state, lga, healthFacility
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

const nationalgeneraldata = async (req, res) => {
  try {
    const edd = await getedd2();
    //obstetric
    const convulsionsduringpregnancy = await getconvulsions();
    const caesarean = await getsurgery();
    const tearsthroughsphincter = await gettearsthroughsphincter();
    const postpartiumhaemorrghage = await getpostpartiumhaemorrghage();
    const firstbabymovement = await getfirstbabymovement();
    const parity = await getparity();
    const babysmovement = await getbabysmovement();
    const graviditygreaterthan8result = await graviditygreaterthan8();
    const graviditylessthan8result = await graviditylessthan8();
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
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  } finally {
  }
};

module.exports = {
  nationalgeneraldata,
  numberofwomenwith4visits,
};
