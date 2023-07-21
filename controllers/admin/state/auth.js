const db = require("../../../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const signin = async (req, res, next) => {
  const connection = await db.getConnection();
  const { userid } = req.body;

  const existinguserid = async () => {
    const q = `SELECT * FROM stateAdmin WHERE userid = ?`;
    const result = await connection.execute(q, [userid]);
    return result[0];
  };
  const createRefresh = async (refreshToken) => {
    const q = `UPDATE stateAdmin
        SET refreshToken = ?
        WHERE userid = ?`;
    const result = await connection.execute(q, [refreshToken, userid]);
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
    const refreshToken = jwt.sign({ id: user.id }, process.env.REFRESH_SECRET, {
      expiresIn: "30m",
    });

    //save refresh token to the user model
    const updatedUser = await createRefresh(refreshToken);

    // Creates Secure Cookie with refresh token
    res.cookie("statetoken", refreshToken, {
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
  const existingRefresh = async (refreshToken) => {
    const q = `SELECT * FROM stateAdmin WHERE refreshToken = ?`;
    const result = await connection.execute(q, [refreshToken]);
    return result[0];
  };
  const cookies = req.cookies;
  if (!cookies?.statetoken) return res.sendStatus(401);
  const refreshToken = cookies.statetoken;

  try {
    const foundUser = await existingRefresh(refreshToken);
    if (!foundUser) {
      return res.status(403).json("User not Found");
    }
    // evaluate jwt
    jwt.verify(refreshToken, process.env.REFRESH_SECRET, (err, user) => {
      if (err || foundUser?.id !== user.id) return res.sendStatus(403);
      const accessToken = jwt.sign({ id: user.id }, process.env.ACCESS_SECRET, {
        expiresIn: "60s",
      });
      const { password, ...others } = foundUser;
      connection.release();
      res.json({ accessToken, others: others[0] });
    });
  } catch (err) {
    connection.release();
    res.status(500).json({ message: "error refreshing token", error: err });
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
    if (!cookies?.token)
      return res
        .status(204)
        .json({ statusCode: 204, message: "token not found" }); //No content
    const refreshToken = cookies.token;

    // Is refreshToken in db?
    const existingRefresh = async (refreshToken) => {
      const q = `SELECT * FROM stateAdmin WHERE refreshToken = ?`;
      const result = await connection.execute(q, [refreshToken]);
      return result[0];
    };
    const foundUser = await existingRefresh(refreshToken);
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
    const updateUserRefresh = async (refreshToken) => {
      const q = `UPDATE stateAdmin SET refreshToken = ? WHERE refreshToken = ?`;
      const result = await connection.execute(q, [
        foundUser.refreshtoken,
        refreshToken,
      ]);
      return result[0];
    };
    const updatedUser = await updateUserRefresh(refreshToken);

    res.clearCookie("token", {
      httpOnly: true,
      sameSite: "None",
      secure: true,
    });
    res.status(204).json({ statusCode: "204", message: "cookie cleared" });

    connection.release();
  } catch (error) {
    res.status(500);
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

module.exports = { signin, signout, handleRefreshToken };
