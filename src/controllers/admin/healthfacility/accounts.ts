import db from "../../../config/db";
import bcrypt from "bcryptjs";
import logger from "../../../logger";
import { NextFunction, Request, Response } from "express";
import { HealthFacilityRepository } from "../../../repositories/HealthFacilityRepository";
import { healthfacilityvalidation } from "../../../validations/healthfacility";
import { HealthPersonnelRepository } from "../../../repositories/HealthPersonnelRepository";

const createHealthfacilityAccount = async (
  req: Request,
  res: Response,
  next: any
) => {
  const {
    ward,
    state,
    lga,
    healthfacilityname,
    healthfacilityID,
    officeaddress,
    phone,
    email,
  } = req.body;
  const values = [
    ward,
    healthfacilityname,
    lga,
    state,
    healthfacilityID,
    officeaddress,
    phone,
    email,
  ];

  const { error } = healthfacilityvalidation.createAccount(req.body);
  if (error) {
    return res.status(400).json({
      statusCode: "400",
      message: error.details[0].message.toUpperCase(),
      result: null,
    });
  }
  try {
    const accountExists = await HealthFacilityRepository.checkIfAccountExists(
      healthfacilityID
    );
    if (accountExists) {
      res.status(409).json("healthfacility with ID already exists");
    } else {
      const result = await HealthFacilityRepository.createHealthFacilityAccount(
        values
      );
      res
        .status(201)
        .json({ statusCode: "201", message: "successful", result: result[0] });
    }
  } catch (err) {
    logger.error(err);
    res.status(500).json({
      statusCode: "500",
      message: "can't create healthfacility account",
      error: err,
    });
  }
};

const createHealthfacilityUserAccount = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {
    ward,
    staffname,
    staffid,
    gender,
    lga,
    state,
    cadre,
    phone,
    email,
    userid,
    password,
    healthfacilityid,
  } = req.body;
  const salt = bcrypt.genSaltSync(10);
  const hashedpassword = bcrypt.hashSync(password, salt);
  const values = [
    ward,
    staffname,
    staffid,
    gender,
    lga,
    state,
    cadre,
    phone,
    email,
    userid,
    hashedpassword,
    healthfacilityid,
  ];
  const { error } = healthfacilityvalidation.createUserAccount(req.body);
  if (error) {
    return res.status(400).json({
      statusCode: "400",
      message: error.details[0].message.toUpperCase(),
      result: null,
    });
  }
  try {
    const accountExists =
      await HealthFacilityRepository.checkIfUserAccountExists(
        userid,
        hashedpassword
      );
    if (accountExists) {
      res.status(409).json("healthfacility user already exists");
    } else {
      const result =
        await HealthFacilityRepository.createHealthFacilityUserAccount(values);
      res
        .status(201)
        .json({ statusCode: "201", message: "successful", result: result[0] });
    }
  } catch (err) {
    logger.error(err);
    res.status(500).json({
      statusCode: "500",
      message: "can't create healthfacility user account",
      error: err,
    });
  }
};

const verifyHealthWorker = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const result =
      await HealthPersonnelRepository.updateHealthpersonnelverification(id);
    res
      .status(201)
      .json({ statusCode: "201", message: "successful", result: result[0] });
  } catch (err) {
    res.status(500).json({
      statusCode: "500",
      message: "failure in verifying healthworker",
      error: err,
    });
  }
};

const getHealthfacilityAccountsFiltered = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = healthfacilityvalidation.gethealthfacilityaccountsfiltered(
    req.query
  );
  if (error) {
    return res.status(400).json({
      statusCode: "400",
      message: error.details[0].message.toUpperCase(),
      result: null,
    });
  }
  try {
    const { state, lga } = req.query;
    const result =
      await HealthFacilityRepository.getHealthFacilityUserAccountUsingStateAndLga(
        //@ts-ignore
        state,
        lga
      );
    res.status(200).json(result[0]);
  } catch (error) {
    logger.error(error);
    res.status(500).json(error);
  }
};

const getHealthfacilityAccounts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const connection = await db.getConnection();
  try {
    const q = `SELECT * FROM healthfacilityaccount`;
    const result = await connection.execute(q);
    res.status(200).json(result[0]);
    connection.release();
  } catch (error) {
    logger.error(error);
    connection.release();
    res.status(500).json(error);
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

const getHealthfacilityUserAccounts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const connection = await db.getConnection();
  try {
    const q = `SELECT * FROM healthfacilityadmin`;
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

export {
  createHealthfacilityAccount,
  createHealthfacilityUserAccount,
  verifyHealthWorker,
  getHealthfacilityAccounts,
  getHealthfacilityUserAccounts,
  getHealthfacilityAccountsFiltered,
};
