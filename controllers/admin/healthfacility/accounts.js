const db = require("../../../config/db");
const bcrypt = require("bcryptjs");

const createHealthfacilityAccount = async (req, res, next) => {
  const {
    ward,
    healthfacilityname,
    healthfacilityID,
    officeaddress,
    phone,
    email,
  } = req.body;
  const values = [
    ward,
    healthfacilityname,
    healthfacilityID,
    officeaddress,
    phone,
    email,
  ];
  try {
    const connection = await db.getConnection();
    const q = `INSERT INTO healthfacilityAccount (ward, healthfacilityname, healthfacilityID, officeaddress, phone, email)
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
const createHealthfacilityUserAccount = async (req, res, next) => {
  const {
    ward,
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
    ward,
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
    const q = `INSERT INTO healthfacilityAdmin (ward, staffname,staffid, gender, cadre, phone, email,userid ,password,accountType)
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

const verifyHealthWorker = async (req, res) => {
  const id = req.params.id;
  const connection = await db.getConnection();
  try {
    const q = `UPDATE healthpersonnel SET verified = 1 WHERE id = ?`;
    const result = await connection.execute(q, [id]);
    res
      .status(201)
      .json({ statusCode: "201", message: "successful", result: result[0] });
    connection.release();
  } catch (err) {
    res.status(500).json({
      statusCode: "500",
      message: "failure in verifying healthworker",
      error: err,
    });
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

const getHealthfacilityAccounts = async (req, res, next) => {
  const connection = await db.getConnection();
  try {
    const q = `SELECT * FROM healthfacilityAccount`;
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

const getHealthfacilityUserAccounts = async (req, res, next) => {
  const connection = await db.getConnection();
  try {
    const q = `SELECT * FROM healthfacilityAdmin`;
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
  createHealthfacilityAccount,
  createHealthfacilityUserAccount,
  verifyHealthWorker,
  getHealthfacilityAccounts,
  getHealthfacilityUserAccounts,
};