import db from "../../../config/db";
import bcrypt from "bcryptjs";
import logger from "../../../logger";
import { NextFunction, Request, Response } from "express";
import { HealthFacilityRepository } from "../../../repositories/HealthFacilityRepository";
import { healthfacilityvalidation } from "../../../validations/healthfacility";
import { HealthPersonnelRepository } from "../../../repositories/HealthPersonnelRepository";
import BaseRepository from "../../../repositories/BaseRepository";

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
  console.log(values);

  // const { error } = healthfacilityvalidation.createAccount(req.body);
  // console.log(error);
  // if (error) {
  //   return res.status(400).json({
  //     statusCode: "400",
  //     message: error.details[0].message.toUpperCase(),
  //     result: null,
  //   });
  // }
  try {
    const connection = await BaseRepository.getConnection();
    const hfRepository = new HealthFacilityRepository(connection);

    const accountExists = await hfRepository.checkIfAccountExists(
      healthfacilityID
    );
    if (accountExists) {
      res.status(409).json("healthfacility with ID already exists");
    } else {
      const result = await hfRepository.createHealthFacilityAccount(values);
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
  // const { error } = healthfacilityvalidation.createUserAccount(req.body);
  // if (error) {
  //   return res.status(400).json({
  //     statusCode: "400",
  //     message: error.details[0].message.toUpperCase(),
  //     result: null,
  //   });
  // }
  try {
    const connection = await BaseRepository.getConnection();
    const hfRepository = new HealthFacilityRepository(connection);

    const accountExists = await hfRepository.checkIfUserAccountExists(
      userid,
      hashedpassword
    );
    if (accountExists) {
      res.status(409).json("healthfacility user already exists");
    } else {
      const result = await hfRepository.createHealthFacilityUserAccount(values);
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
    const connection = await BaseRepository.getConnection();
    const hpRepository = new HealthPersonnelRepository(connection);

    const result = await hpRepository.updateHealthpersonnelverification(id);
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
    const connection = await BaseRepository.getConnection();
    const hfRepository = new HealthFacilityRepository(connection);

    const { state, lga } = req.query;
    const result =
      await hfRepository.getHealthFacilityUserAccountUsingStateAndLga(
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
  try {
    const connection = await BaseRepository.getConnection();
    const hfRepository = new HealthFacilityRepository(connection);

    const result = await hfRepository.getHealthFacilityAccounts();
    res.status(200).json(result[0]);
  } catch (error) {
    logger.error(error);
    res.status(500).json(error);
  }
};
const getHealthfacilityAccountsForLGA = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const lga = req.query.lga;
    const connection = await BaseRepository.getConnection();
    const hfRepository = new HealthFacilityRepository(connection);

    const result = await hfRepository.getHealthFacilityAccountsForLGA(lga);
    res.status(200).json(result[0]);
  } catch (error) {
    logger.error(error);
    res.status(500).json(error);
  }
};

const getHealthfacilityUserAccounts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const connection = await BaseRepository.getConnection();
    const hfRepository = new HealthFacilityRepository(connection);
    const result = await hfRepository.getHealthfacilityUserAccounts();
    res.status(200).json(result[0]);
  } catch (error) {
    res.status(500).json(error);
  }
};

export {
  createHealthfacilityAccount,
  createHealthfacilityUserAccount,
  verifyHealthWorker,
  getHealthfacilityAccounts,
  getHealthfacilityUserAccounts,
  getHealthfacilityAccountsFiltered,
  getHealthfacilityAccountsForLGA,
};
