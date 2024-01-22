const db = require("../../config/db");
const logger = require("../../logger");

const startSession = async (user_id, start_time, start_date) => {
  const sessiondata = {
    firstvisit: [],
    returnvisit: [],
    schedule: [],
  };
  const q = `INSERT INTO sessions (user_id, start_time,start_date, session_status, session_data)
  VALUES (
      ?,
      ?,
      ?,
      'active',
      ?
  )`;
  const updateuserquery = `UPDATE healthpersonnel
  SET currentsession = ?
  WHERE id = ?
  `;
  let connection = await db.getConnection();
  try {
    const result = await connection.execute(q, [
      user_id,
      start_time,
      start_date,
      sessiondata,
    ]);
    const updateuser = await connection.execute(updateuserquery, [
      result[0].insertId,
      user_id,
    ]);
    return { statusCode: "200", message: "successful", result: result[0] };
  } catch (error) {
    connection.release();
    logger.error(error);
    return { statusCode: "500", message: "error", result: error };
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

const getCurrentusersession = async (user_id) => {
  const connection = await db.getConnection();
  const getuser = `
     SELECT * FROM healthpersonnel
    WHERE id = ?
   `;
  try {
    const getUsercall = await connection.execute(getuser, [user_id]);
    const result = getUsercall[0];
    const user = result[0];
    const session = user.currentsession;
    return { statusCode: "200", message: "successful", session: session };
  } catch (error) {
    connection.release();
    return { statusCode: "500", message: "error", result: error };
  } finally {
    if (connection) {
      connection.release();
    }
  }
};
const getCurrentusersessionrequest = async (req, res) => {
  const { id } = req.params;
  const connection = await db.getConnection();
  const getuser = `
     SELECT * FROM healthpersonnel
    WHERE id = ?
   `;
  try {
    const getUsercall = await connection.execute(getuser, [id]);
    const result = getUsercall[0];
    const user = result[0];
    const session = user.currentsession;
    res
      .status(200)
      .json({ statusCode: "200", message: "successful", session: session });
  } catch (error) {
    connection.release();
    res
      .status(500)
      .json({ statusCode: "500", message: "error", result: error });
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

const updateSessionFirstvisit = async (firstvisit_id, user_id) => {
  const q = `UPDATE sessions
SET session_data = JSON_ARRAY_APPEND(
    session_data,
    '$.firstvisit',
    ?
)
WHERE id = ?`;

  const q2 = `SELECT * FROM firstvisit where id = ?`;
  try {
    const connection = await db.getConnection();
    logger.info(firstvisit_id);
    const usersession = await getCurrentusersession(user_id);
    const firstvisitresult = await connection.execute(q2, [firstvisit_id]);
    console.log({ first: firstvisitresult });
    const time = firstvisitresult[0][0].createdat;
    logger.warn(time);
    const result = await connection.execute(q, [time, usersession.session]);
    logger.info(result[0]);
    return { status: "successful", message: result[0] };
  } catch (error) {
    connection.release();
    logger.error(error);
    return { status: "error", message: error };
  } finally {
    if (connection) {
      connection.release();
    }
  }
};
const updateSessionReturnvisit = async (returnvisit_id, user_id) => {
  const q = `UPDATE sessions
SET session_data = JSON_ARRAY_APPEND(
    session_data,
    '$.returnvisit',
    ?
)
WHERE id = ?`;
  const getreturnvisit = `SELECT * FROM returnvisit where id = ?`;

  const connection = await db.getConnection();
  try {
    const usersession = await getCurrentusersession(user_id);
    const returnvisit = await connection.execute(getreturnvisit, [
      returnvisit_id,
    ]);
    const time = returnvisit[0][0].createdat;
    const result = await connection.execute(q, [time, usersession.session]);
    return { status: "successful", message: result[0] };
  } catch (error) {
    connection.release();
    console.log(error);
    return { status: "error", message: error };
  } finally {
    if (connection) {
      connection.release();
    }
  }
};
const updateSessionSchedule = async (schedule_id, user_id) => {
  const q = `UPDATE sessions
SET session_data = JSON_ARRAY_APPEND(
    session_data,
    '$.schedule',
    ?
)
WHERE id = ?`;
  const getschedule = `SELECT * FROM schedule where id = ?`;

  const connection = await db.getConnection();
  try {
    const usersession = await getCurrentusersession(user_id);
    const schedule = await connection.execute(getschedule, [schedule_id]);
    const time = schedule[0][0].createdat;
    const result = await connection.execute(q, [time, usersession.session]);
    return { status: "successful", message: result[0] };
  } catch (error) {
    connection.release();
    console.log(error);
    return { status: "error", message: error };
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

const startSessionRequest = async (req, res) => {
  const sessiondata = {
    firstvisit: [],
    returnvisit: [],
    schedule: [],
  };
  const { user_id, start_time, start_date } = req.body;
  const q = `INSERT INTO sessions (user_id, start_time,start_date, session_status, session_data)
  VALUES (
      ?,
      ?,
      ?,
      'active',
      ?
  )`;
  const updateuserquery = `UPDATE healthpersonnel
  SET currentsession = ?
  WHERE id = ?`;
  let connection = await db.getConnection();
  try {
    const result = await connection.execute(q, [
      user_id,
      start_time,
      start_date,
      sessiondata,
    ]);
    const updateuser = await connection.execute(updateuserquery, [
      result[0].insertId,
      user_id,
    ]);

    res
      .status(200)
      .json({ statusCode: "200", message: "successful", result: result[0] });
  } catch (error) {
    connection.release();

    res.status(500).json(error);
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

const endSession = async (req, res) => {
  const { end_time, end_date, user_id } = req.body;
  const q = `UPDATE sessions
  SET
      session_status = 'completed',
      end_time = ?,
      end_date = ?
  WHERE id = ?`;
  const updateuserquery = `UPDATE healthpersonnel
  SET currentsession = ?
  WHERE id = ?`;
  const getuser = `
    SELECT * FROM healthpersonnel
    WHERE id = ?
  `;
  let connection = await db.getConnection();
  try {
    const getUsercall = await connection.execute(getuser, [user_id]);
    const result = getUsercall[0];
    const user = result[0];
    const updatesession = await connection.execute(q, [
      end_time,
      end_date,
      user.currentsession,
    ]);
    const updateuser = await connection.execute(updateuserquery, [
      null,
      user_id,
    ]);

    res
      .status(200)
      .json({ statusCode: "200", message: "successful", result: result[0] });
  } catch (error) {
    connection.release();

    res.status(500).json(error);
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

const getAllsessions = async (req, res) => {
  const connection = await db.getConnection();
  const { start_date } = req.query;
  const q = `SELECT sessions.*, healthpersonnel.healthworker, healthpersonnel.state, healthpersonnel.ward, healthpersonnel.cadre, healthpersonnel.id
  FROM sessions
  INNER JOIN healthpersonnel ON sessions.user_id = healthpersonnel.id
  WHERE start_date = ?;`;
  try {
    const result = await connection.execute(q, [start_date]);
    res
      .status(200)
      .json({ statusCode: "200", message: "successful", result: result[0] });
  } catch (error) {
    connection.release();

    res.status(500).json(error);
  } finally {
    if (connection) {
      connection.release();
    }
  }
};
const getAllsessionsState = async (req, res) => {
  const connection = await db.getConnection();
  const { start_date, state } = req.query;
  const q = `SELECT sessions.*, healthpersonnel.healthworker, healthpersonnel.state, healthpersonnel.ward, healthpersonnel.cadre, healthpersonnel.id
  FROM sessions
  INNER JOIN healthpersonnel ON sessions.user_id = healthpersonnel.id
  WHERE start_date = ? AND healthpersonnel.state = ? `;
  try {
    const result = await connection.execute(q, [start_date, state]);
    res
      .status(200)
      .json({ statusCode: "200", message: "successful", result: result[0] });
  } catch (error) {
    connection.release();

    res.status(500).json(error);
  } finally {
    if (connection) {
      connection.release();
    }
  }
};
const getAllsessionsLga = async (req, res) => {
  const connection = await db.getConnection();
  const { start_date, lga } = req.query;
  const q = `SELECT sessions.*, healthpersonnel.healthworker, healthpersonnel.state, healthpersonnel.ward, healthpersonnel.cadre, healthpersonnel.id
  FROM sessions
  INNER JOIN healthpersonnel ON sessions.user_id = healthpersonnel.id
  WHERE start_date = ? AND healthpersonnel.lga = ? `;
  try {
    const result = await connection.execute(q, [start_date, lga]);
    res
      .status(200)
      .json({ statusCode: "200", message: "successful", result: result[0] });
  } catch (error) {
    connection.release();

    res.status(500).json(error);
  } finally {
    if (connection) {
      connection.release();
    }
  }
};
const getAllsessionshf = async (req, res) => {
  const connection = await db.getConnection();
  const { start_date, healthfacility } = req.query;
  const q = `SELECT sessions.*, healthpersonnel.healthworker, healthpersonnel.state, healthpersonnel.ward, healthpersonnel.cadre, healthpersonnel.id
  FROM sessions
  INNER JOIN healthpersonnel ON sessions.user_id = healthpersonnel.id
  WHERE start_date = ? AND healthpersonnel.healthfacility = ? `;
  try {
    const result = await connection.execute(q, [start_date, healthfacility]);
    res
      .status(200)
      .json({ statusCode: "200", message: "successful", result: result[0] });
  } catch (error) {
    connection.release();

    res.status(500).json(error);
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

const getsessiongraph = async (req, res) => {
  const connection = await db.getConnection();
  const { year } = req.query;

  const q = `
SELECT
  JSON_OBJECT(
    'JANUARY', SUM(MONTH(start_date) = 1),
    'FEBRUARY', SUM(MONTH(start_date) = 2),
    'MARCH', SUM(MONTH(start_date) = 3),
    'APRIL', SUM(MONTH(start_date) = 4),
    'MAY', SUM(MONTH(start_date) = 5),
    'JUNE', SUM(MONTH(start_date) = 6),
    'JULY', SUM(MONTH(start_date) = 7),
    'AUGUST', SUM(MONTH(start_date) = 8),
    'SEPTEMBER', SUM(MONTH(start_date) = 9),
    'OCTOBER', SUM(MONTH(start_date) = 10),
    'NOVEMBER', SUM(MONTH(start_date) = 11),
    'DECEMBER', SUM(MONTH(start_date) = 12)
  ) AS count
FROM sessions
WHERE YEAR(start_date) = ?;
`;
  const values = [year];
  try {
    const [result] = await connection.execute(q, values);
    res
      .status(200)
      .json({ statusCode: "200", message: "successful", result: result[0] });
  } catch (error) {
    connection.release();

    res.status(500).json(error);
  } finally {
    if (connection) {
      connection.release();
    }
  }
};
const getsessiongraphstate = async (req, res) => {
  const connection = await db.getConnection();
  const { state, year } = req.query;

  const q = `SELECT
  JSON_OBJECT(
    'JANUARY', SUM(MONTH(start_date) = 1),
    'FEBRUARY', SUM(MONTH(start_date) = 2),
    'MARCH', SUM(MONTH(start_date) = 3),
    'APRIL', SUM(MONTH(start_date) = 4),
    'MAY', SUM(MONTH(start_date) = 5),
    'JUNE', SUM(MONTH(start_date) = 6),
    'JULY', SUM(MONTH(start_date) = 7),
    'AUGUST', SUM(MONTH(start_date) = 8),
    'SEPTEMBER', SUM(MONTH(start_date) = 9),
    'OCTOBER', SUM(MONTH(start_date) = 10),
    'NOVEMBER', SUM(MONTH(start_date) = 11),
    'DECEMBER', SUM(MONTH(start_date) = 12)
  ) AS count
FROM sessions
INNER JOIN healthpersonnel ON sessions.user_id = healthpersonnel.id
WHERE YEAR(start_date) = ? 
  AND healthpersonnel.state = ?;



`;
  const values = [year, state];
  try {
    const [result] = await connection.execute(q, values);
    res
      .status(200)
      .json({ statusCode: "200", message: "successful", result: result[0] });
  } catch (error) {
    connection.release();

    console.log(error);
    res.status(500).json(error);
  } finally {
    if (connection) {
      connection.release();
    }
  }
};
const getsessiongraphlga = async (req, res) => {
  const connection = await db.getConnection();
  const { lga, year } = req.query;

  const q = `SELECT
  JSON_OBJECT(
    'JANUARY', SUM(MONTH(start_date) = 1,
    'FEBRUARY', SUM(MONTH(start_date) = 2,
    'MARCH', SUM(MONTH(start_date) = 3,
    'APRIL', SUM(MONTH(start_date) = 4,
    'MAY', SUM(MONTH(start_date) = 5,
    'JUNE', SUM(MONTH(start_date) = 6,
    'JULY', SUM(MONTH(start_date) = 7,
    'AUGUST', SUM(MONTH(start_date) = 8,
    'SEPTEMBER', SUM(MONTH(start_date) = 9,
    'OCTOBER', SUM(MONTH(start_date) = 10,
    'NOVEMBER', SUM(MONTH(start_date) = 11,
    'DECEMBER', SUM(MONTH(start_date) = 12
  ) AS count
FROM sessions WHERE YEAR(start_date) = ? 
INNER JOIN healthpersonnel ON sessions.user_id = healthpersonnel.id
WHERE healthpersonnel.lga = ? 


`;
  const values = [year, lga];
  try {
    const [result] = await connection.execute(q, values);
    res
      .status(200)
      .json({ statusCode: "200", message: "successful", result: result[0] });
  } catch (error) {
    connection.release();

    console.log(error);
    res.status(500).json(error);
  } finally {
    if (connection) {
      connection.release();
    }
  }
};
const getsessiongraphhealthfacility = async (req, res) => {
  const connection = await db.getConnection();
  const { healthfacility, year } = req.query;

  const q = `SELECT
  JSON_OBJECT(
    'JANUARY', SUM(MONTH(start_date),
    'FEBRUARY', SUM(MONTH(start_date),
    'MARCH', SUM(MONTH(start_date),
    'APRIL', SUM(MONTH(start_date),
    'MAY', SUM(MONTH(start_date),
    'JUNE', SUM(MONTH(start_date),
    'JULY', SUM(MONTH(start_date),
    'AUGUST', SUM(MONTH(start_date),
    'SEPTEMBER', SUM(MONTH(start_date),
    'OCTOBER', SUM(MONTH(start_date) ,
    'NOVEMBER', SUM(MONTH(start_date) ,
    'DECEMBER', SUM(MONTH(start_date) 
  ) AS count
FROM sessions WHERE YEAR(start_date) = ?
INNER JOIN healthpersonnel ON sessions.user_id = healthpersonnel.id
WHERE healthpersonnel.healthfacility = ? 


`;
  const values = [year, healthfacility];
  try {
    const [result] = await connection.execute(q, values);
    res
      .status(200)
      .json({ statusCode: "200", message: "successful", result: result[0] });
  } catch (error) {
    connection.release();

    console.log(error);
    res.status(500).json(error);
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

module.exports = {
  startSessionRequest,
  endSession,
  updateSessionFirstvisit,
  updateSessionReturnvisit,
  startSession,
  getCurrentusersession,
  getCurrentusersessionrequest,
  getAllsessions,
  getAllsessionsState,
  getAllsessionsLga,
  getAllsessionshf,
  getsessiongraph,
  getsessiongraphstate,
  getsessiongraphlga,
  getsessiongraphhealthfacility,
  updateSessionSchedule,
};
