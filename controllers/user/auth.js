const bcrypt = require("bcryptjs");
const { createError } = require("../../middlewares/error.js");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const db = require("../../config/db.js");
const {
  getExistingEmailQuery,
  getExistingUserQuery,
  getExistingPhoneQuery,
  createUserQuery,
  updateUserRefresh,
  getRefreshToken,
} = require("../../queries/user/user.js");
const sdk = require("api")("@sendchamp/v1.0#1bxhir2hkyyg62rn");
const request = require("request");

const sendOtp = async (req, res) => {
  const options = {
    method: "POST",
    url: "https://api.sendchamp.com/api/v1/verification/create",
    headers: {
      Accept: "application/json,text/plain,*/*",
      "Content-Type": "application/json",
      Authorization:
        "Bearer sendchamp_live_$2a$10$8i7elhCUcmIi2b921WjFkedBImY5YDWsZU86MNRw..wz1e11pcZDq",
    },
    body: JSON.stringify({
      channel: "sms",
      sender: "SAlert",
      token_type: "numeric",
      token_length: 4,
      expiration_time: 5,
      customer_mobile_number: req.body.mobile_number,
      meta_data: { description: "demo" },
      in_app_token: false,
    }),
  };

  request(options, (error, response, body) => {
    if (error) {
      console.error(error);
      return res
        .status(500)
        .json({ error: "An error occurred while sending OTP." });
    }
    const mydata = JSON.parse(body);
    res.json({ result: mydata });
  });
};
const confirmOtp = async (req, res) => {
  const options = {
    method: "POST",
    url: "https://api.sendchamp.com/api/v1/verification/confirm",
    headers: {
      Accept: "application/json,text/plain,*/*",
      "Content-Type": "application/json",
      Authorization:
        "Bearer sendchamp_live_$2a$10$8i7elhCUcmIi2b921WjFkedBImY5YDWsZU86MNRw..wz1e11pcZDq",
    },
    body: JSON.stringify({
      verification_reference: req.body.verification_reference,
      verification_code: req.body.verification_code,
      channel: "sms",
      token_type: "numeric",
      token_length: 4,
      expiration_time: 5,
      meta_data: { description: "demo" },
      in_app_token: false,
    }),
  };

  request(options, (error, response, body) => {
    if (error) {
      console.error(error);
      return res.status(500).json({
        statusCode: "500",
        error: "An error occurred while sending OTP.",
      });
    }
    const mydata = JSON.parse(body);
    res.json({ result: mydata });
  });
};

const signup = async (req, res, next) => {
  const connection = await db.getConnection();
  const {
    phone,
    state,
    lga,
    ward,
    healthFacility,
    healthWorker,
    cadre_id,
    password,
  } = req.body;

  const existingphone = async () => {
    const result = await connection.execute(
      getExistingPhoneQuery(req.body.phone)
    );
    return result[0];
  };

  const newUser = async () => {
    const salt = bcrypt.genSaltSync(10);
    const hashedpassword = bcrypt.hashSync(password, salt);
    try {
      const result = await connection.execute(
        createUserQuery(
          hashedpassword,
          phone,
          state,
          lga,
          ward,
          healthFacility,
          healthWorker,
          cadre_id
        )
      );
      return result[0];
    } catch (error) {
      connection.release();
      res
        .status(500)
        .json({
          statusCode: "500",
          message: "Error executing query",
          error: err,
        });
    } finally {
      if (connection) {
        connection.release();
      }
    }
  };
  try {
    const connection = await db.getConnection();
    const phone = await existingphone();
    if (phone.length) {
      return res
        .status(409)
        .json({ statusCode: "409", message: "User already exists" });
    }
    // Create a new user
    const newuser = await newUser();

    return res
      .status(201)
      .json({ statusCode: "200", message: "successful", result: newuser });
  } catch (err) {
    res
      .status(500)
      .json({ statusCode: "500", message: "Error signing up", error: err });

    next(err);
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

const signin = async (req, res, next) => {
  const connection = await db.getConnection();

  const existingphone = async () => {
    const result = await connection.execute(
      getExistingPhoneQuery(req.body.phone)
    );
    return result[0];
  };
  const createRefresh = (access) => {
    return new Promise((resolve, reject) => {
      db.query(updateUserRefresh(req.body.email, access), (err, result) => {
        if (err) {
          reject(err);
        } else {
          const user = result;
          resolve(user);
        }
      });
    });
  };
  try {
    const user = await existingphone();
    console.log({ user: user });
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
    const accessToken = jwt.sign({ id: user.id }, process.env.ACCESS_SECRET, {
      expiresIn: "10d",
    });

    //refresh Token
    // const refreshToken = jwt.sign({ id: user.id }, process.env.REFRESH_SECRET, {
    //   expiresIn: "1d",
    // });

    //save refresh token to the user model
    // const updatedUser = await createRefresh(refreshToken);
    // console.log(updatedUser);

    // Creates Secure Cookie with refresh token
    res.cookie("token", accessToken, {
      // httpOnly: false,
      // secure: true,
      // sameSite: "None",
      maxAge: 10 * 24 * 60 * 60 * 1000,
    });

    const { password, ...others } = user;

    res.status(200).json({
      statusCode: "200",
      message: "successful",
      result: { others: others[0], accessToken },
    });
    connection.release();
  } catch (err) {
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

  const existingphone = async () => {
    const result = await connection.execute(
      getExistingPhoneQuery(req.body.phone)
    );
    return result[0];
  };
  const updateUser = async (password) => {
    const q = `
        UPDATE healthpersonnel
        SET password = '${password}'
        WHERE phone = '${req.body.phone}'
          `;
    const result = await connection.query(q);
    return result[0];
  };
  try {
    const user = await existingphone();
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

    connection.release();
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
    next(err);
  }
};

const forgotpassword = async (req, res, next) => {
  const { email, redirecturl } = req.body;
  const existingEmail = () => {
    return new Promise((resolve, reject) => {
      db.query(getExistingEmailQuery(req.body.email), (err, result) => {
        if (err) {
          reject(err);
        } else {
          const email = result[0]?.email;
          resolve(email);
        }
      });
    });
  };
  try {
    // Find the user with the matching email address
    const user = await existingEmail();

    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    // Generate a unique token
    const token = crypto.randomBytes(20).toString("hex");
    const hashedToken = crypto
      .createHash("sha256")
      .update(token + email)
      .digest("hex");

    // Set the expiration time for the token (1 hour from now)
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 1);

    // Store the token in the database
    await prisma.passwordResetToken.create({
      data: {
        token: hashedToken,
        expiresAt: expiresAt,
        user: {
          connect: {
            id: user.id,
          },
        },
      },
    });

    // Send an email to the user with a link containing the token
    const mailOptions = {
      from: "example@gmail.com",
      to: user.email,
      subject: "Reset your password",
      text: `Click the following link to reset your password: http://localhost:5000/reset-password?token=${hashedToken}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

    res.status(200).json({ message: "Password reset email sent" });
  } catch (err) {
    next(err);
  }
};

const resetPassword = async (req, res, next) => {
  app.post("/reset-password", async (req, res) => {
    const { token, password } = req.body;

    // Find the token with the matching value
    const resetToken = await prisma.passwordResetToken.findUnique({
      where: {
        token: token,
      },
      include: {
        user: true,
      },
    });

    if (!resetToken) {
      return res.status(400).json({ error: "Invalid or expired token" });
    }

    // Check if the token has expired
    const currentDate = new Date();
    if (currentDate > resetToken.expiresAt) {
      return res.status(400).json({ error: "Token has expired" });
    }

    // Update the user's password
    const user = resetToken.user;
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        password: hashedPassword,
      },
    });
    // Delete the password reset token
    await prisma.passwordResetToken.delete({
      where: {
        id: resetToken.id,
      },
    });
  });
};

const signout = async (req, res, next) => {
  const existingRefresh = (refreshToken) => {
    return new Promise((resolve, reject) => {
      db.query(getRefreshToken(refreshToken), (err, result) => {
        if (err) {
          reject(err);
        } else {
          const user = result[0];
          resolve(user);
        }
      });
    });
  };
  const updateRefresh = (email, refreshToken) => {
    return new Promise((resolve, reject) => {
      db.query(updateUserRefresh(email, refreshToken), (err, result) => {
        if (err) {
          reject(err);
        } else {
          const user = result[0];
          resolve(user);
        }
      });
    });
  };
  // On client, also delete the accessToken

  const cookies = req.cookies;
  if (!cookies?.token) return res.sendStatus(204); //No content
  const refreshToken = cookies.token;

  // Is refreshToken in db?
  const foundUser = await existingRefresh();
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

  const updatedUser = await updateRefresh(
    foundUser.email,
    foundUser.refreshToken
  );
  console.log(updatedUser);

  res.clearCookie("token", { httpOnly: true, sameSite: "None", secure: true });
  res.sendStatus(204);
};

module.exports = {
  signup,
  signin,
  signout,
  changepassword,
  forgotpassword,
  resetPassword,
  confirmOtp,
  sendOtp,
};
