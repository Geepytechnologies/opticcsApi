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

const graviditygreaterthan8 = async (req, res) => {
  const connection = await db.getConnection();
  try {
    const q = `SELECT *
    FROM personalinformation
    WHERE CAST(gravidity AS SIGNED) > 8 OR CAST(gravidity AS SIGNED) = 8`;
    const result = await connection.execute(q);
    res.status(200).json(result[0]);
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  } finally {
    if (connection) {
      connection.release();
    }
  }
};
const graviditylessthan8 = async (req, res) => {
  const connection = await db.getConnection();
  try {
    const q = `SELECT *
    FROM personalinformation
    WHERE CAST(gravidity AS SIGNED) < 8`;
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
const getparity = async (req, res) => {
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
    res.status(200).json({ less: less[0], greater: greater[0] });
  } catch (error) {
    connection.rollback();
    res.status(500).json(error);
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

const getbabysmovement = async (req, res) => {
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
    res.status(200).json({
      yes: yes[0],
      no: no[0],
      dontknow: dontknow[0],
      notapplicable: notapplicable[0],
    });
  } catch (error) {
    connection.rollback();
    res.status(500).json(error);
  } finally {
    if (connection) {
      connection.release();
    }
  }
};
const getfirstbabymovement = async (req, res) => {
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
    res.status(200).json({
      yes: yes[0],
      no: no[0],
      dontknow: dontknow[0],
      notapplicable: notapplicable[0],
    });
  } catch (error) {
    connection.rollback();
    res.status(500).json(error);
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

const getconvulsions = async (req, res) => {
  try {
    const q = `SELECT`;
  } catch (error) {
  } finally {
  }
};

module.exports = {
  graviditygreaterthan8,
  graviditylessthan8,
  getedd,
  getparity,
  getbabysmovement,
  numberofwomenwith4visits,
};
