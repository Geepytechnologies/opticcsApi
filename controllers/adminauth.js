const bcrypt = require("bcryptjs");
const { createError } = require("../middlewares/error.js");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const db = require("../config/db.js");
const {
  getExistingEmailQuery,
  getExistingUserQuery,
  getExistingPhoneQuery,
  createUserQuery,
  updateUserRefresh,
} = require("../queries/adminUser.js");

const signup = async (req, res, next) => {
  const {
    firstname,
    lastname,
    email,
    password,
    phone,
    staffid,
    accountType,
    otp,
  } = req.body;

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
  const existingphone = () => {
    return new Promise((resolve, reject) => {
      db.query(getExistingPhoneQuery(req.body.phone), (err, result) => {
        if (err) {
          reject(err);
        } else {
          const phone = result[0]?.phone;
          resolve(phone);
        }
      });
    });
  };
  const existinguser = () => {
    return new Promise((resolve, reject) => {
      db.query(
        getExistingUserQuery(req.body.email, req.body.phone),
        (err, result) => {
          if (err) {
            reject(err);
          } else {
            const user = result[0]?.email;
            resolve(user);
          }
        }
      );
    });
  };
  const newUser = () => {
    const salt = bcrypt.genSaltSync(10);
    const hashedpassword = bcrypt.hashSync(req.body.password, salt);
    return new Promise((resolve, reject) => {
      db.query(
        createUserQuery(
          firstname,
          lastname,
          email,
          password,
          phone,
          staffid,
          accountType,
          otp
        ),
        (err, result) => {
          if (err) {
            reject(err);
          } else {
            const user = result;
            resolve(user);
          }
        }
      );
    });
  };
  try {
    const user = await existinguser();
    const email = await existingEmail();
    const phone = await existingphone();
    if (user) {
      return next(createError(409, "User already exists"));
    }
    if (email) {
      return next(createError(409, "Email already exists"));
    }
    if (phone) {
      return next(createError(409, "Phone number already exists"));
    }
    // Create a new user
    const newuser = await newUser();

    return res.status(201).json(newuser);
  } catch (err) {
    next(err);
  }
};

const verifyEmail = async (req, res) => {
  const { token } = req.query;

  // Find the user with the matching verification token
  const user = await prisma.user.findMany({
    where: {
      verificationToken: token,
    },
  });
  if (!user.length) {
    return res.status(400).json({ error: "Invalid verification token" });
  }
  const currentDate = new Date();
  if (user && currentDate > user.expiresAt) {
    return res.status(400).json({ error: "Verification link has expired" });
  }

  // Update the user's verification status
  const userId = user[0].id;
  const updatedUser = await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      verified: true,
      verificationToken: null,
    },
  });

  res
    .status(200)
    .json({ message: "Email address verified", user: updatedUser });
};

const signin = async (req, res, next) => {
  const existingEmail = () => {
    return new Promise((resolve, reject) => {
      db.query(getExistingEmailQuery(req.body.email), (err, result) => {
        if (err) {
          reject(err);
        } else {
          const user = result[0];
          resolve(user);
        }
      });
    });
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
    const user = await existingEmail();
    console.log({ user: user });
    if (!user) return next(createError(404, "User not found"));
    const isMatched = bcrypt.compareSync(req.body.password, user.password);
    if (!isMatched) return next(createError(400, "wrong credentials"));

    //access Token
    const accessToken = jwt.sign({ id: user.id }, process.env.ACCESS_SECRET, {
      expiresIn: "60s",
    });

    //refresh Token
    const refreshToken = jwt.sign({ id: user.id }, process.env.REFRESH_SECRET, {
      expiresIn: "1d",
    });

    //save refresh token to the user model
    const updatedUser = await createRefresh(refreshToken);

    // Creates Secure Cookie with refresh token
    res.cookie("token", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 24 * 60 * 60 * 1000,
    });

    const { password, ...others } = user;

    res.status(200).json({ others, accessToken });
  } catch (err) {
    next(err);
  }
};

const changepassword = async (req, res, next) => {
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
  const updateUser = (password) => {
    const q = `
        UPDATE healthadmin
        SET password = '${password}'
        WHERE email = '${req.body.email}'
          `;
    return new Promise((resolve, reject) => {
      db.query(q, (err, result) => {
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
    const user = await existingEmail();
    if (!user) return next(createError(404, "User not found"));
    const isMatched = bcrypt.compareSync(req.body.oldpassword, user.password);
    if (!isMatched) return next(createError(400, "Old password is incorrect"));
    const salt = bcrypt.genSaltSync(10);
    const hashedpassword = bcrypt.hashSync(req.body.newpassword, salt);
    await updateUser(hashedpassword);
    res.status(201).json("successful");
  } catch (err) {
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
  // On client, also delete the accessToken

  const cookies = req.cookies;
  if (!cookies?.token) return res.sendStatus(204); //No content
  const refreshToken = cookies.token;

  // Is refreshToken in db?
  const foundUser = await prisma.user.findUnique({
    where: {
      refreshtoken: refreshToken,
    },
  });
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
  const updatedUser = await prisma.user.update({
    where: {
      refreshtoken: refreshToken,
    },
    data: {
      refreshtoken: foundUser.refreshtoken,
    },
  });
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
  verifyEmail,
  resetPassword,
};
