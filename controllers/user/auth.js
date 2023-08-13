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
  const { name, mobile_number } = req.body;
  const options = {
    method: "POST",
    url: `https://control.msg91.com/api/v5/otp?template_id=${process.env.MSGTEMPLATEID}&mobile=${mobile_number}&otp_length=6&otp_expiry=5`,
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      authkey: process.env.MSGAUTHKEY,
    },
    body: { name: name },
    json: true,
  };

  request(options, (error, response, body) => {
    if (error) {
      return res
        .status(response.statusCode)
        .json({ error: "An error occurred while sending OTP." });
    }
    res.status(response.statusCode).json({
      statusCode: response.statusCode,
      result: JSON.parse(body),
    });
  });
};
const confirmOtp = async (req, res) => {
  const { otp, mobile_number } = req.body;

  const options = {
    method: "GET",
    url: `https://control.msg91.com/api/v5/otp/verify?otp=${otp}&mobile=${mobile_number}`,
    headers: { accept: "application/json", authkey: process.env.MSGAUTHKEY },
  };

  request(options, (error, response, body) => {
    if (error) {
      return res.status(response.statusCode).json({
        statusCode: response.statusCode,
        error: "Error confirming OTP.",
      });
    }
    res.status(response.statusCode).json({
      statusCode: response.statusCode,
      result: JSON.parse(body),
    });
  });
};
const retryOtp = async (req, res) => {
  const { mobile_number, type } = req.body;

  const options = {
    method: "GET",
    url: `https://control.msg91.com/api/v5/otp/retry?authkey=${process.env.MSGAUTHKEY}&retrytype=${type}&mobile=${mobile_number}`,
    headers: { accept: "application/json", authkey: process.env.MSGAUTHKEY },
  };

  request(options, (error, response, body) => {
    if (error) {
      return res.status(response.statusCode).json({
        statusCode: response.statusCode,
        error: "error retrying OTP.",
      });
    }
    res
      .status(response.statusCode)
      .json({ statusCode: response.statusCode, result: JSON.parse(body) });
  });
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

    res.status(200).json({
      statusCode: "200",
      message: "successful",
      result: { others: others[0], accessToken },
    });
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

module.exports = {
  signup,
  signin,
  signout,
  changepassword,
  forgotpassword,
  resetPassword,
  confirmOtp,
  retryOtp,
  sendOtp,
};
