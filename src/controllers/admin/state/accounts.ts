//@ts-nocheck
import db from "../../../config/db";
import bcrypt from "bcryptjs";
import logger from "../../../logger";
import { StateRepository } from "../../../repositories/StateRepository";
import { StateService } from "../../../services/state.service";

const createStateAccount = async (req, res, next) => {
  const { state, boardname, stateid, officeaddress, phone, email } = req.body;
  const values = [
    state.trim(),
    boardname.trim(),
    stateid.trim(),
    officeaddress.trim(),
    phone.trim(),
    email.trim(),
  ];
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
    const q = `SELECT * FROM stateadmin WHERE userid = ?`;
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
    const q = `INSERT INTO stateadmin (state, staffname, staffid, gender, cadre, phone, email, userid,password, accountType) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    const checkuser = await checkIfStateUserAccountExists();
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
    console.log(err);
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

const getAllStatesWithFilter = async (req, res) => {
  const page = req.query.page || 1;
  const pageSize = 20;
  const offset = (page - 1) * pageSize;
  const state = req.query.state || "";
  const lga = req.query.lga || "";
  const healthfacility = req.query.healthfacility || "";
  const from = req.query.from || "";
  const to = req.query.to || "";
  const filter = req.query.filter;
  console.log(filter + ": " + "filter");
  const connection = await db.getConnection();
  const stateRepo = new StateRepository(connection);
  const stateService = new StateService(stateRepo);
  try {
    const result: any = await stateService.getAllStates(
      pageSize,
      offset,
      filter,
      state,
      lga,
      healthfacility,
      from,
      to
    );
    res.status(200).json({ result: result.result, count: result.count });
  } catch (error) {
    console.log(error);
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
  getAllStatesWithFilter,
  getAllStateUsers,
  deleteState,
};
