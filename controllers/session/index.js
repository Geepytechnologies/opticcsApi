const db = require("../../config/db");

const startSession = async (user_id) => {
  const sessiondata = {
    firstvisit: [],
    returnvisit: [],
  };
  const q = `INSERT INTO sessions (user_id, session_status, session_data)
  VALUES (
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
    const result = await connection.execute(q, [user_id, sessiondata]);
    const updateuser = await connection.execute(updateuserquery, [
      result[0].insertId,
      user_id,
    ]);
    return { statusCode: "200", message: "successful", result: result[0] };
  } catch (error) {
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

  const getfirstvisit = `SELECT * FROM firstvisit where id = ?`;
  const connection = await db.getConnection();
  try {
    const usersession = await getCurrentusersession(user_id);
    const firstvisit = await connection.execute(getfirstvisit, [firstvisit_id]);
    const time = firstvisit[0][0].createdat;
    const result = await connection.execute(q, [time, usersession.session]);
    return { status: "successful", message: result[0] };
  } catch (error) {
    console.log(error);
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
  };
  const { user_id } = req.body;
  const q = `INSERT INTO sessions (user_id, session_status, session_data)
  VALUES (
      ?,
      'active',
      ?
  )`;
  const updateuserquery = `UPDATE healthpersonnel
  SET currentsession = ?
  WHERE id = ?`;
  let connection = await db.getConnection();
  try {
    const result = await connection.execute(q, [user_id, sessiondata]);
    const updateuser = await connection.execute(updateuserquery, [
      result[0].insertId,
      user_id,
    ]);

    res
      .status(200)
      .json({ statusCode: "200", message: "successful", result: result[0] });
  } catch (error) {
    res.status(500).json(error);
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

// const endSession = async (req, res) => {
//   const { end_time, user_id } = req.body;
//   const q = `UPDATE sessions
//   SET
//       session_status = 'completed',
//       end_time = ?
//   WHERE id = ?`;
//   const updateuserquery = `UPDATE healthpersonnel
//   SET currentsession = ?
//   WHERE id = ?`;
//   const getuser = `
//     SELECT * FROM healthpersonnel
//     WHERE id = ?
//   `;
//   let connection = await db.getConnection();
//   try {
//     const getUsercall = await connection.execute(getuser, [user_id]);
//     const result = getUsercall[0];
//     const user = result[0];
//     const updatesession = await connection.execute(q, [
//       end_time,
//       user.currentsession,
//     ]);
//     const updateuser = await connection.execute(updateuserquery, [
//       null,
//       user_id,
//     ]);

//     res
//       .status(200)
//       .json({ statusCode: "200", message: "successful", result: result[0] });
//   } catch (error) {
//     res.status(500).json(error);
//   } finally {
//     if (connection) {
//       connection.release();
//     }
//   }
// };
const endSession = async (req, res) => {
  try {
    const response = updateSessionFirstvisit(13, 1);
    res
      .status(200)
      .json({ statusCode: "200", message: "successful", result: response });
  } catch (error) {
    res.status(500).json(error);
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
};
