//@ts-nocheck
import db from "../../../config/db";
import bcrypt from "bcryptjs";
import logger from "../../../logger";

const createStateAccount = async (req, res, next) => {
  const { state, boardname, stateid, officeaddress, phone, email } = req.body;
  const values = [state, boardname, stateid, officeaddress, phone, email];
  const connection = await db.getConnection();

  const checkIfStateAccountExists = async () => {
    const q = `SELECT * FROM stateaccount WHERE state = ?`;
    try {
      let checked;
      const result = await connection.execute(q, [state]);
      if (result[0].length) {
        checked = true;
      } else {
        checked = false;
      }
      return checked;
    } catch (error) {
      connection.release();
      throw new Error(error);
    } finally {
      if (connection) {
        connection.release();
      }
    }
  };
  try {
    const q = `INSERT INTO stateaccount (state, boardname, stateid, officeaddress, phone, email)
      VALUES (?, ?, ?, ?, ?, ?)`;
    const stateExists = await checkIfStateAccountExists();
    if (stateExists) {
      res.status(409).json("state account already exists");
    } else {
      const result = await connection.execute(q, values);
      res
        .status(201)
        .json({ statusCode: "201", message: "successful", result: result[0] });
    }
    // connection.release();
  } catch (err) {
    connection.release();
    logger.error(err);
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
  const connection = await db.getConnection();

  const checkIfStateUserAccountExists = async () => {
    const q = `SELECT * FROM stateadmin WHERE userid = ? AND password = ?`;
    try {
      let checked;
      const result = await connection.execute(q, [userid, hashedpassword]);
      if (result[0].length) {
        checked = true;
      } else {
        checked = false;
      }
      return checked;
    } catch (error) {
      connection.release();
      throw new Error(error);
    } finally {
      if (connection) {
        connection.release();
      }
    }
  };
  try {
    const q = `INSERT INTO stateadmin (state, staffname,staffid, gender, cadre, phone, email,userid ,password,accountType)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?,?)`;
    const checkuser = checkIfStateUserAccountExists();
    if (checkuser) {
      res.status(409).json("User already exists");
    } else {
      const result = await connection.execute(q, values);
      connection.release();
      res
        .status(201)
        .json({ statusCode: "201", message: "successful", result: result[0] });
    }
  } catch (err) {
    logger.error(err);
    res.status(500).json({
      statusCode: "500",
      message: "can't create state user account",
      error: err,
    });
  }
};

const getAllStates = async (req, res) => {
  const connection = await db.getConnection();
  try {
    const q = `SELECT * FROM stateaccount`;
    const result = await connection.execute(q);
    res
      .status(200)
      .json({ statusCode: "200", message: "successful", result: result[0] });
    connection.release();
  } catch (error) {
    connection.release();
    res.status(500).json(error);
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

const deleteState = async (req, res) => {
  const connection = await db.getConnection();
  const { id } = req.params;
  try {
    const q = `delete FROM stateaccount WHERE id = ?`;
    const result = await connection.execute(q, [id]);
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

const getAllStateUsers = async (req, res) => {
  const connection = await db.getConnection();
  try {
    const q = `SELECT * FROM stateadmin`;
    const result = await connection.execute(q);
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

export {
  createStateAccount,
  createStateUserAccount,
  getAllStates,
  getAllStateUsers,
  deleteState,
};