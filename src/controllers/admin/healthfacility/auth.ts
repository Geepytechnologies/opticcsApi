import db from "../../../config/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextFunction, Response, Request } from "express";
import { HealthfacilityService } from "../../../services/healthfacility.service";
import { HealthFacilityRepository } from "../../../repositories/HealthFacilityRepository";
import BaseRepository from "../../../repositories/BaseRepository";
import logger from "../../../logger";

interface User {
  id: string;
  username: string;
  password: string;
  refreshtoken: string;
  others: any;
}

interface AuthenticatedRequest extends Request {
  user?: { id: string };
}

const generatehealthfacilitydetails = async (req: Request, res: Response) => {
  try {
    const connection = await BaseRepository.getConnection();
    const hfRepository = new HealthFacilityRepository(connection);
    const hfservice = new HealthfacilityService(hfRepository);

    const credentials = await new Promise((resolve, reject) => {
      hfservice.generateUniqueCredentials((err, data) => {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
    res.json(credentials);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to generate credentials.", message: err });
  }
};

const signin = async (req: Request, res: Response, next: NextFunction) => {
  const connection = await BaseRepository.getConnection();
  const hfRepository = new HealthFacilityRepository(connection);

  const { userid } = req.body;

  const existinguserid = async () => {
    try {
      const result = await hfRepository.getHealthfacilityUserAccountByUserID(
        userid
      );
      return result[0];
    } catch (error) {
      console.log("existinguserid in hfsignin" + " " + error);
    }
  };
  // logger.info(existinguserid);

  const createRefresh = async (refreshtoken: string) => {
    try {
      const result = await hfRepository.UpdateUserRefreshToken(
        refreshtoken,
        userid
      );
      return result[0];
    } catch (error) {
      console.log("createRefresh in hfsignin" + " " + error);
    }
  };

  try {
    const user = await existinguserid();
    if (Array.isArray(user)) {
      if (!user.length)
        return res
          .status(404)
          .json({ statusCode: "404", message: "User not found" });

      const userData = user[0] as User;

      const isMatched = bcrypt.compareSync(
        req.body.password,
        userData.password
      );
      if (!isMatched)
        return res
          .status(400)
          .json({ statusCode: "400", message: "wrong credentials" });
      const accesskey = process.env.ACCESS_SECRET || "";
      const refreshkey = process.env.REFRESH_SECRET || "";

      //access Token
      const accessToken = jwt.sign({ id: userData.id }, accesskey, {
        expiresIn: "5m",
      });

      //refresh Token
      const refreshToken = jwt.sign({ id: userData.id }, refreshkey, {
        expiresIn: "30m",
      });
      //save refresh token to the user model
      const updatedUser = await createRefresh(refreshToken);
      const newuser = await existinguserid();

      // Creates Secure Cookie with refresh token
      res.cookie("healthtoken", refreshToken, {
        httpOnly: false,
        secure: false,
        sameSite: "none",
        maxAge: 6 * 24 * 60 * 60 * 1000,
      });

      if (Array.isArray(newuser)) {
        const { password, refreshtoken, ...others } = newuser[0] as User;
        console.log("signinsuccessful:", others);
        res.status(200).json({
          statusCode: "200",
          message: "successful",
          result: { others: others, accessToken },
        });
      }
    }
  } catch (err) {
    console.log({ errorfromhfsignin: err });
    res
      .status(500)
      .json({ statusCode: "500", message: "Error signing in", error: err });
  }
};

const handleRefreshToken = async (req: Request, res: Response) => {
  const connection = await BaseRepository.getConnection();
  const hfRepository = new HealthFacilityRepository(connection);

  const existingRefresh = async (refreshToken: string) => {
    const result = await hfRepository.getUserWithRefreshToken(refreshToken);
    return result[0];
  };

  const cookies = req.cookies;
  if (!cookies?.healthtoken) return res.sendStatus(401);
  const refreshToken = cookies.healthtoken;

  try {
    const foundUser = await existingRefresh(refreshToken);
    if (Array.isArray(foundUser) && foundUser.length === 0) {
      return res.status(403).json("User not Found");
    }

    const refreshSecret = process.env.REFRESH_SECRET || "";
    const accessSecret = process.env.ACCESS_SECRET || "";
    // Verify JWT
    jwt.verify(refreshToken, refreshSecret, (err: any, user: any) => {
      if (
        err ||
        !Array.isArray(foundUser) ||
        foundUser.length === 0 ||
        !("id" in foundUser[0]) ||
        foundUser[0]?.id !== user.id
      ) {
        return res.sendStatus(403);
      } else {
        const accessToken = jwt.sign({ id: user.id }, accessSecret, {
          expiresIn: "30m",
        });
        const { password, refreshToken, ...others } = foundUser[0];
        return res.json({ accessToken, others });
      }
    });
  } catch (err) {
    res.status(500).json({ message: "error refreshing token", error: err });
  }
};

const signout = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  // On client, also delete the accessToken
  try {
    const connection = await BaseRepository.getConnection();
    const hfRepository = new HealthFacilityRepository(connection);

    const cookies = req.cookies;
    if (!cookies?.healthtoken) return res.sendStatus(204); //No content
    const refreshtoken = cookies.healthtoken;

    // Is refreshToken in db?
    const foundUserResult = await hfRepository.getUserWithRefreshToken(
      refreshtoken
    );
    const foundUser = foundUserResult[0];
    if (!foundUser) {
      res.clearCookie("healthtoken", {
        // httpOnly: true,
        // sameSite: "None",
        // secure: true,
      });
      return res.sendStatus(204);
    }

    const updateRefreshQuery = `UPDATE healthfacilityadmin
     SET refreshtoken = ? WHERE id = ?`;
    const userId = req.user && req.user.id;
    if (userId) {
      const updatedUserResult = await hfRepository.UpdateUserRefreshToken(
        null,
        userId
      );
      const updatedUser = updatedUserResult[0];
    }

    res.clearCookie("healthtoken", {
      // httpOnly: true,
      // sameSite: "None",
      // secure: true,
    });
    res.sendStatus(204);
  } catch (error) {
    res
      .status(500)
      .json({ statusCode: "500", message: "Error signing out", err: error });
  }
};

const resetpassword = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const connection = await BaseRepository.getConnection();
  const hfRepository = new HealthFacilityRepository(connection);

  const { oldpassword, newpassword } = req.body;
  const salt = bcrypt.genSaltSync(10);
  const hashedpassword = bcrypt.hashSync(newpassword, salt);
  const userId = req.user && req.user.id;

  const existinguserid = async () => {
    if (userId) {
      const result = await hfRepository.getHealthfacilityUserAccountByID(
        userId
      );
      return result[0];
    }
  };
  const createNewpassword = async () => {
    if (userId) {
      const result = await hfRepository.UpdateUserPassword(
        hashedpassword,
        userId
      );
      return result[0];
    }
  };

  try {
    const user = await existinguserid();
    if (Array.isArray(user)) {
      if (!user.length)
        return res
          .status(404)
          .json({ statusCode: "404", message: "User not found" });
      const userData = user[0] as User;
      const isMatched = bcrypt.compareSync(oldpassword, userData.password);
      if (!isMatched)
        return res
          .status(400)
          .json({ statusCode: "400", message: "Wrong password" });
    }

    //save new password to the user model
    const newuser = await createNewpassword();

    res.status(201).json({
      statusCode: "201",
      message: "password Changed",
    });
  } catch (err) {
    res.status(500).json({
      statusCode: "500",
      message: "Error Resetting password",
      error: err,
    });
  }
};

export {
  signin,
  signout,
  handleRefreshToken,
  generatehealthfacilitydetails,
  resetpassword,
};
