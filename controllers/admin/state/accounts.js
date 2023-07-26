const db = require("../../../config/db");
const bcrypt = require("bcryptjs");

const createStateAccount = async (req, res, next) => {
  const { state, boardname, stateid, officeaddress, phone, email } = req.body;
  const values = [state, boardname, stateid, officeaddress, phone, email];
  try {
    const connection = await db.getConnection();
    const q = `INSERT INTO stateAccount (state, boardname, stateid, officeaddress, phone, email)
      VALUES (?, ?, ?, ?, ?, ?)`;
    const result = await connection.execute(q, values);
    connection.release();
    res
      .status(201)
      .json({ statusCode: "201", message: "successful", result: result[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      statusCode: "500",
      message: "can't create state account",
      error: err,
    });
  }
};
const createStateUserAccount = async (req, res, next) => {
  const {
    state,
    staffname,
    staffid,
    gender,
    cadre,
    phone,
    email,
    userid,
    password,
    accountType,
  } = req.body;
  const salt = bcrypt.genSaltSync(10);
  const hashedpassword = bcrypt.hashSync(password, salt);
  const values = [
    state,
    staffname,
    staffid,
    gender,
    cadre,
    phone,
    email,
    userid,
    hashedpassword,
    accountType,
  ];
  try {
    const connection = await db.getConnection();
    const q = `INSERT INTO stateAdmin (state, staffname,staffid, gender, cadre, phone, email,userid ,password,accountType)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?,?)`;
    const result = await connection.execute(q, values);
    connection.release();
    res
      .status(201)
      .json({ statusCode: "201", message: "successful", result: result[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      statusCode: "500",
      message: "can't create state account",
      error: err,
    });
  }
};

const getAllStates = async (req, res) => {
  const connection = await db.getConnection();
  try {
    const q = `SELECT * FROM stateAccount`;
    const result = await connection.execute(q);
    res
      .status(200)
      .json({ statusCode: "200", message: "successful", result: result[0] });
    connection.release();
  } catch (error) {
    res.status(500).json(error);
  } finally {
    if (connection) {
      connection.release();
    }
  }
};
const getAllStateUsers = async (req, res) => {
  const connection = await db.getConnection();
  try {
    const q = `SELECT * FROM stateAdmin`;
    const result = await connection.execute(q);
    res
      .status(200)
      .json({ statusCode: "200", message: "successful", result: result[0] });
    connection.release();
  } catch (error) {
    res.status(500).json(error);
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

module.exports = {
  createStateAccount,
  createStateUserAccount,
  getAllStates,
  getAllStateUsers,
};
