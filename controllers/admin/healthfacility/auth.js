const db = require("../../../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

// Function to generate a random string of given length
const generateRandomString = (length) => {
  return crypto
    .randomBytes(Math.ceil(length / 2))
    .toString("hex")
    .slice(0, length);
};
// Function to generate a unique username and password
const generateUniqueCredentials = async (callback) => {
  const username = generateRandomString(8);
  const password = generateRandomString(12);
  const connection = await db.getConnection();

  try {
    // Check if the generated username already exists in the database
    const [results, fields] = await connection.execute(
      "SELECT * FROM healthfacilityadmin WHERE userid = ?",
      [username]
    );

    if (results.length > 0) {
      // If the username already exists, regenerate the credentials and call the callback recursively
      generateUniqueCredentials(callback);
    } else {
      // If the username is unique, call the callback with the generated credentials
      callback(null, { username, password });
    }
  } catch (err) {
    // If there's an error during the query, call the callback with the error
    callback(err);
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

const generatehealthfacilitydetails = async (req, res) => {
  try {
    const credentials = await new Promise((resolve, reject) => {
      generateUniqueCredentials((err, data) => {
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

const signin = async (req, res, next) => {
  const connection = await db.getConnection();
  const { userid } = req.body;

  const existinguserid = async () => {
    const q = `SELECT * FROM healthfacilityadmin WHERE userid = ?`;
    const result = await connection.execute(q, [userid]);
    return result[0];
  };
  const createRefresh = async (refreshtoken) => {
    const q = `UPDATE healthfacilityadmin
        SET refreshtoken = ?
        WHERE userid = ?`;
    const result = await connection.execute(q, [refreshtoken, userid]);
    return result[0];
  };

  try {
    const user = await existinguserid();
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
      expiresIn: "5m",
    });

    //refresh Token
    const refreshtoken = jwt.sign({ id: user.id }, process.env.REFRESH_SECRET, {
      expiresIn: "30m",
    });

    //save refresh token to the user model
    const updatedUser = await createRefresh(refreshtoken);

    // Creates Secure Cookie with refresh token
    res.cookie("healthtoken", refreshtoken, {
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
    connection.rollback();
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

const handleRefreshToken = async (req, res) => {
  const connection = await db.getConnection();
  const existingRefresh = async (refreshtoken) => {
    const q = `SELECT * FROM healthfacilityadmin WHERE refreshtoken = ?`;
    const result = await connection.execute(q, [refreshtoken]);
    console.log({ result: result[0] });
    return result[0];
  };
  const cookies = req.cookies;
  if (!cookies?.healthtoken) return res.sendStatus(401);
  const refreshtoken = cookies.healthtoken;

  try {
    const foundUser = await existingRefresh(refreshtoken);
    if (!foundUser) {
      return res.status(403).json("User not Found");
    }
    // evaluate jwt
    jwt.verify(refreshtoken, process.env.REFRESH_SECRET, (err, user) => {
      if (err || foundUser?.id !== user.id) return res.sendStatus(403);
      const accessToken = jwt.sign({ id: user.id }, process.env.ACCESS_SECRET, {
        expiresIn: "60s",
      });
      const { password, ...others } = foundUser;
      res.json({ accessToken, others: others[0] });
      connection.release();
    });
  } catch (err) {
    console.error(err);
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

module.exports = { signin, handleRefreshToken, generatehealthfacilitydetails };
