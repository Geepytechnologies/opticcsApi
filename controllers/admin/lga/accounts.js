const db = require("../../../config/db");
const bcrypt = require("bcryptjs");

const createLgaAccount = async (req, res, next) => {
  const { lga, boardname, state, lgaID, officeaddress, phone, email } =
    req.body;
  const values = [lga, boardname, state, lgaID, officeaddress, phone, email];
  const connection = await db.getConnection();
  try {
    const q = `INSERT INTO lgaccount (lga, boardname,state, lgaID, officeaddress, phone, email)
      VALUES (?, ?, ?, ?, ?, ?,?)`;
    const result = await connection.execute(q, values);
    res
      .status(201)
      .json({ statusCode: "201", message: "successful", result: result[0] });
    connection.release();
  } catch (err) {
    res.status(500).json({
      statusCode: "500",
      message: "can't create state account",
      error: err,
    });
  } finally {
    if (connection) {
      connection.release();
    }
  }
};
const createLgaUserAccount = async (req, res, next) => {
  const {
    lga,
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
    lga,
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
  const connection = await db.getConnection();
  try {
    const q = `INSERT INTO lgadmin (lga, state, staffname, staffid, gender, cadre, phone, email,userid ,password,accountType)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?,?,?)`;
    const result = await connection.execute(q, values);
    res
      .status(201)
      .json({ statusCode: "201", message: "successful", result: result[0] });
    connection.release();
  } catch (err) {
    res.status(500).json({
      statusCode: "500",
      message: "can't create state account",
      error: err,
    });
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

const getLgaAccounts = async (req, res, next) => {
  const connection = await db.getConnection();
  try {
    const q = `SELECT * FROM lgaccount`;
    const result = await connection.execute(q);
    res.status(200).json(result[0]);
    connection.release();
  } catch (error) {
    res.status(500).json(error);
  } finally {
    if (connection) {
      connection.release();
    }
  }
};
const getLgaUserAccounts = async (req, res, next) => {
  const connection = await db.getConnection();
  try {
    const q = `SELECT * FROM lgadmin`;
    const result = await connection.execute(q);
    res.status(200).json(result[0]);
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
  createLgaAccount,
  createLgaUserAccount,
  getLgaAccounts,
  getLgaUserAccounts,
};
