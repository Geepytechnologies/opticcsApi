//@ts-nocheck

import bcrypt from "bcryptjs";
import { createError } from "../../middlewares/error.js";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import {
  getExistingEmailQuery,
  getExistingUserQuery,
  getExistingPhoneQuery,
  createUserQuery,
  updateUserRefresh,
  getRefreshToken,
} from "../../queries/user/user";
import { startSession } from "../session/index";
import logger from "../../logger/index";
import { Request, Response } from "express";
import db from "../../config/db";

const sendOtp = async (req: Request, res: Response) => {
  const { name, mobile_number } = req.body;
  const url = `https://api.ng.termii.com/api/sms/otp/send`;

  const data = {
    api_key: process.env.TERMIIKEY,
    message_type: "ALPHANUMERIC",
    to: `${mobile_number}`,
    from: "N-Alert",
    channel: "dnd",
    pin_attempts: 10,
    pin_time_to_live: 5,
    pin_length: 6,
    pin_placeholder: "<>",
    message_text: `Hi ${name}, Your Opticcs authentication pin is <>. If you did not initiate this request, Please Ignore. Do not share this code with anyone.`,
    pin_type: "NUMERIC",
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const body = await response.json();
    if (!response.ok) {
      return res.status(response.status).json({
        error: "An error occurred while sending OTP.",
      });
    }

    res.status(response.status).json({
      statusCode: response.status.toString(),
      result: body,
    });
  } catch (error) {
    logger.error("Error:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};

const voiceOtp = async (req: Request, res: Response) => {
  const { mobile_number } = req.body;
  const url = `https://api.ng.termii.com/api/sms/otp/send/voice`;

  const data = {
    api_key: process.env.TERMIIKEY,
    phone_number: `${mobile_number}`,
    pin_attempts: 10,
    pin_time_to_live: 5,
    pin_length: 6,
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const body = await response.json();
    if (!response.ok) {
      return res.status(response.status).json({
        error: "An error occurred while sending OTP.",
      });
    }

    res.status(response.status).json({
      statusCode: response.status.toString(),
      result: body,
    });
  } catch (error) {
    logger.error("Error:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};

const confirmOtp = async (req: Request, res: Response) => {
  const { otp, pinId } = req.body;
  var data = {
    api_key: process.env.TERMIIKEY,
    pin_id: pinId,
    pin: otp,
  };
  const url = `https://api.ng.termii.com/api/sms/otp/verify`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();

    res.status(response.status).json({
      statusCode: response.status.toString(),
      result: result,
    });
  } catch (error) {
    logger.error(error);
    res.status(500).json({
      statusCode: "500",
      error: "Error confirming OTP.",
    });
  }
};

const sendPasswordresetOtp = async (req: Request, res: Response) => {
  const { mobile_number } = req.body;
  const url = `https://api.ng.termii.com/api/sms/otp/send`;

  const checkuserExists = async () => {
    const connection = await db.getConnection();
    try {
      const q = `
        SELECT * FROM healthpersonnel
        WHERE phone = ?
      `;
      const userresult = await connection.execute(q, [mobile_number]);
      const user = userresult[0];
      if (!user.length) return { statusCode: "404", message: "User not found" };
      if (user.length) return { statusCode: "200", message: "User exists" };
    } catch (error) {
      throw new Error(error);
    } finally {
      if (connection) {
        connection.release();
      }
    }
  };

  const userExists = await checkuserExists();

  if (userExists.statusCode === "200") {
    const data = {
      api_key: process.env.TERMIIKEY,
      message_type: "ALPHANUMERIC",
      to: `${mobile_number}`,
      from: "N-Alert",
      channel: "dnd",
      pin_attempts: 10,
      pin_time_to_live: 5,
      pin_length: 6,
      pin_placeholder: "<>",
      message_text: `Your Opticcs Password reset code is <>. If you did not initiate this request, Please Ignore. Do not share this code with anyone.`,
      pin_type: "NUMERIC",
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": ["application/json", "application/json"],
        },
        body: JSON.stringify(data),
      });

      const body = await response.json();
      if (!response.ok) {
        return res.status(response.status).json({
          error: "An error occurred while sending OTP.",
        });
      }

      res.status(response.status).json({
        statusCode: response.status.toString(),
        result: body,
      });
    } catch (error) {
      res.status(500).json({ error: "An error occurred while sending OTP." });
    }
  } else {
    res.status(+userExists.statusCode).json(userExists);
  }
};

const confirmpasswordresetOtp = async (req, res) => {
  const { otp, pinId } = req.body;
  var data = {
    api_key: process.env.TERMIIKEY,
    pin_id: pinId,
    pin: otp,
  };
  const url = `https://api.ng.termii.com/api/sms/otp/verify`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": ["application/json", "application/json"],
      },
      body: JSON.stringify(data),
    });
    const body = await response.json();

    res.status(response.status).json({
      statusCode: response.status.toString(),
      result: body,
    });
  } catch (error) {
    res.status(500).json({
      statusCode: "500",
      error: "Error confirming OTP.",
    });
  }
};

const retrypasswordresetOtp = async (req, res) => {
  const { mobile_number, type } = req.body;

  const url = `https://control.msg91.com/api/v5/otp/retry?authkey=${process.env.MSGAUTHKEY}&retrytype=${type}&mobile=${mobile_number}`;

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      authkey: process.env.MSGAUTHKEY,
    },
  };

  try {
    const response = await fetch(url, options);
    const body = await response.json();

    res.status(response.status).json({
      statusCode: response.status.toString(),
      result: body,
    });
  } catch (error) {
    res.status(500).json({
      statusCode: "500",
      error: "Error retrying OTP.",
    });
  }
};

const signup = async (req, res, next) => {
  const connection = await db.getConnection();
  const {
    phone,
    state,
    lga,
    ward,
    healthfacility,
    healthworker,
    cadre,
    password,
  } = req.body;

  const newUser = async () => {
    const salt = bcrypt.genSaltSync(10);
    const hashedpassword = bcrypt.hashSync(password, salt);
    const result = await connection.execute(createUserQuery(), [
      hashedpassword,
      phone,
      state,
      lga,
      ward,
      healthfacility,
      healthworker,
      cadre,
    ]);
    return result[0];
  };
  try {
    const phonequery = `
    SELECT * FROM healthpersonnel
    WHERE phone = ?
  `;
    const phoneresult = await connection.execute(phonequery, [req.body.phone]);
    const phone = phoneresult[0];
    if (phone.length) {
      return res
        .status(409)
        .json({ statusCode: "409", message: "User already exists" });
    }
    // Create a new user
    const newuser = await newUser();

    return res
      .status(201)
      .json({ statusCode: "201", message: "successful", result: newuser });
  } catch (err) {
    connection.release();

    res
      .status(500)
      .json({ statusCode: "500", message: "Error signing up", error: err });
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

const signin = async (req, res, next) => {
  const { phone } = req.body;
  const connection = await db.getConnection();
  try {
    const q = `
    SELECT * FROM healthpersonnel
    WHERE phone = ?
  `;
    const userresult = await connection.execute(q, [phone]);
    const user = userresult[0];
    if (!user.length)
      return res
        .status(404)
        .json({ statusCode: "404", message: "User not found" });
    const isMatched = bcrypt.compareSync(req.body.password, user[0].password);
    if (!isMatched)
      return res
        .status(400)
        .json({ statusCode: "400", message: "wrong credentials" });

    //access Token
    const accessToken = jwt.sign(
      { id: user[0].id },
      process.env.ACCESS_SECRET,
      {
        expiresIn: "30d",
      }
    );

    const { password, ...others } = user;

    startSession(others[0].id);
    res.status(200).json({
      statusCode: "200",
      message: "successful",
      result: { others: others[0], accessToken },
    });
  } catch (err) {
    connection.release();

    logger.error(err);
    res
      .status(500)
      .json({ statusCode: "500", message: "Error signing in", error: err });
    next(err);
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

const changepassword = async (req, res, next) => {
  const connection = await db.getConnection();
  const updateUser = async (password) => {
    const q = `
        UPDATE healthpersonnel
        SET password = ?
        WHERE phone = ?
          `;
    const result = await connection.query(q, [password, req.body.phone]);
    return result[0];
  };
  try {
    const phonequery = `
    SELECT * FROM healthpersonnel
    WHERE phone = ?
  `;
    const userResult = await connection.execute(phonequery, [req.body.phone]);
    const user = userResult[0];
    if (!user.length)
      return res
        .status(404)
        .json({ statusCode: "404", message: "User not found" });
    const isMatched = bcrypt.compareSync(
      req.body.oldpassword,
      user[0].password
    );
    if (!isMatched)
      return res
        .status(400)
        .json({ statusCode: "404", message: "Old password is incorrect" });
    const salt = bcrypt.genSaltSync(10);
    const hashedpassword = bcrypt.hashSync(req.body.newpassword, salt);
    const newusercredentials = await updateUser(hashedpassword);

    res.status(201).json({
      statusCode: "201",
      message: "Changed password successfully",
      result: newusercredentials,
    });
  } catch (err) {
    connection.release();

    res.status(500).json({
      statusCode: "500",
      message: "Error changing password",
      error: err,
    });
  } finally {
    if (connection) {
      connection.release();
    }
  }
};
const resetpassword = async (req, res, next) => {
  const connection = await db.getConnection();
  const updateUser = async (password) => {
    const q = `
        UPDATE healthpersonnel
        SET password = ?
        WHERE phone = ?
          `;
    const result = await connection.query(q, [password, req.query.phone]);
    return result[0];
  };
  try {
    const phonequery = `
    SELECT * FROM healthpersonnel
    WHERE phone = ?
  `;
    const userResult = await connection.execute(phonequery, [req.query.phone]);
    const user = userResult[0];
    if (!user.length)
      return res
        .status(404)
        .json({ statusCode: "404", message: "User not found" });

    const salt = bcrypt.genSaltSync(10);
    const hashedpassword = bcrypt.hashSync(req.body.password, salt);
    const newusercredentials = await updateUser(hashedpassword);

    res.status(201).json({
      statusCode: "201",
      message: "Changed password successfully",
      result: newusercredentials,
    });
  } catch (err) {
    connection.release();

    res.status(500).json({
      statusCode: "500",
      message: "Error changing password",
      error: err,
    });
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

const signout = async (req, res, next) => {
  const connection = await db.getConnection();

  // On client, also delete the accessToken
  try {
    const cookies = req.cookies;
    if (!cookies?.token) return res.sendStatus(204); //No content
    const refreshToken = cookies.token;

    // Is refreshToken in db?
    const existingrefreshQuery = ` SELECT * FROM healthpersonnel WHERE refreshToken = ?`;
    const foundUserResult = await connection.execute(existingrefreshQuery, [
      refreshToken,
    ]);
    const foundUser = foundUserResult[0];
    if (!foundUser) {
      res.clearCookie("token", {
        httpOnly: true,
        sameSite: "None",
        secure: true,
      });
      return res.sendStatus(204);
    }

    // Delete refreshToken in db
    foundUser.refreshtoken = "";

    const updateRefreshQuery = `UPDATE healthpersonnel
  SET refreshToken = ?
  WHERE email = ?`;

    const updatedUserResult = await connection.execute(updateRefreshQuery, [
      foundUser.email,
      foundUser.refreshToken,
    ]);
    const updatedUser = updatedUserResult[0];

    res.clearCookie("token", {
      httpOnly: true,
      sameSite: "None",
      secure: true,
    });
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ statusCode: "500", message: "Error signing out" });
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

export {
  signup,
  signin,
  signout,
  changepassword,
  resetpassword,
  confirmOtp,
  sendOtp,
  voiceOtp,
  sendPasswordresetOtp,
  confirmpasswordresetOtp,
  retrypasswordresetOtp,
};
