//@ts-nocheck
import db from "../../../config/db";
import bcrypt from "bcryptjs";

const createLgaAccount = async (req, res, next) => {
  const { lga, boardname, state, lgaID, officeaddress, phone, email } =
    req.body;
  const values = [
    lga.trim(),
    boardname.trim(),
    state.trim(),
    lgaID.trim(),
    officeaddress.trim(),
    phone.trim(),
    email.trim(),
  ];
  const connection = await db.getConnection();

  const checkIfLgaAccountExists = async (req, res) => {
    const q = `SELECT * FROM lgaccount WHERE lga = ?`;
    try {
      let checked;
      const result = await connection.execute(q, [lga]);
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
    const q = `INSERT INTO lgaccount (lga, boardname,state, lgaID, officeaddress, phone, email)
      VALUES (?, ?, ?, ?, ?, ?,?)`;
    const accountExists = await checkIfLgaAccountExists();
    if (accountExists) {
      res.status(409).json("LGA already exists");
    } else {
      const result = await connection.execute(q, values);
      res
        .status(201)
        .json({ statusCode: "201", message: "successful", result: result[0] });
    }
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
    lga.trim(),
    state.trim(),
    staffname.trim(),
    staffid.trim(),
    gender.trim(),
    cadre.trim(),
    phone.trim(),
    email.trim(),
    userid.trim(),
    hashedpassword.trim(),
    null,
  ];
  const connection = await db.getConnection();
  const checkIfStateUserAccountExists = async () => {
    const q = `SELECT * FROM lgadmin WHERE userid = ? AND password = ?`;
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
      throw new Error(error);
    } finally {
      if (connection) {
        connection.release();
      }
    }
  };
  try {
    const q = `INSERT INTO lgadmin (lga, state, staffname, staffid, gender, cadre, phone, email,userid ,password,accountType)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?,?,?)`;
    const accountExists = await checkIfStateUserAccountExists();
    if (accountExists) {
      res.status(409).json("LGA account already exists");
    } else {
      const result = await connection.execute(q, values);
      res
        .status(201)
        .json({ statusCode: "201", message: "successful", result: result[0] });
    }
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
  } catch (error) {
    res.status(500).json(error);
  } finally {
    if (connection) {
      connection.release();
    }
  }
};
const getLgaAccountsForState = async (req, res, next) => {
  const connection = await db.getConnection();
  try {
    const q = `SELECT * FROM lgaccount WHERE state = ?`;
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
const getLgaUserAccounts = async (req, res, next) => {
  const connection = await db.getConnection();
  const { state } = req.query;
  try {
    const q = `SELECT * FROM lgadmin WHERE state = ?`;
    const result = await connection.execute(q, [state]);
    res.status(200).json(result[0]);
  } catch (error) {
    res.status(500).json(error);
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

export {
  createLgaAccount,
  createLgaUserAccount,
  getLgaAccounts,
  getLgaUserAccounts,
};
