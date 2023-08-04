const db = require("../../../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const signin = async (req, res, next) => {
  const connection = await db.getConnection();
  const { userid } = req.body;

  const existinguserid = async () => {
    const q = `SELECT * FROM nationaladmin WHERE userid = ?`;
    const result = await connection.execute(q, [userid]);
    return result[0];
  };
  const createRefresh = async (refreshToken) => {
    const q = `UPDATE nationaladmin
        SET refreshtoken = ?
        WHERE userid = ?`;
    const result = await connection.execute(q, [refreshToken, userid]);
    return result[0];
  };

  try {
    const user = await existinguserid();
    console.log({ userfromsignin: user[0].id });
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
    console.log({ userid: user.id });
    const refreshToken = jwt.sign({ id: user.id }, process.env.REFRESH_SECRET, {
      expiresIn: "30m",
    });
    console.log({ adminrefresh: refreshToken });

    //save refresh token to the user model
    await createRefresh(refreshToken);
    const newuser = await existinguserid();

    // Creates Secure Cookie with refresh token
    res.cookie("nationaltoken", refreshToken, {
      // httpOnly: false,
      // secure: true,
      // sameSite: "None",
      maxAge: 10 * 24 * 60 * 60 * 1000,
    });

    const { password, ...others } = newuser;

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
    const q = `SELECT * FROM nationaladmin WHERE refreshToken = ?`;
    const result = await connection.execute(q, [refreshToken]);
    return result[0];
  };
  const cookies = req.cookies;
  if (!cookies?.nationaltoken) return res.sendStatus(401);
  const refreshToken = cookies.nationaltoken;
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

      res.json({ accessToken, others: others[0] });
      connection.release();
    });
  } catch (err) {
    res.status(500).json({ message: "error refreshing token", error: err });
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

const signout = async (req, res, next) => {
  console.log(req.user);
  const connection = await db.getConnection();

  // On client, also delete the accessToken
  try {
    const cookies = req.cookies;
    if (!cookies?.nationaltoken) return res.sendStatus(204); //No content
    const refreshtoken = cookies.nationaltoken;

    // Is refreshToken in db?
    const existingrefreshQuery = ` SELECT * FROM nationaladmin WHERE refreshtoken = ?`;
    const foundUserResult = await connection.execute(existingrefreshQuery, [
      refreshtoken,
    ]);
    const foundUser = foundUserResult[0];
    if (!foundUser) {
      res.clearCookie("nationaltoken", {
        // httpOnly: true,
        // sameSite: "None",
        // secure: true,
      });
      return res.sendStatus(204);
    }

    // Delete refreshToken in db
    foundUser.refreshtoken = "";

    const updateRefreshQuery = `UPDATE nationaladmin
     SET refreshtoken = ? WHERE id = ?`;

    const updatedUserResult = await connection.execute(updateRefreshQuery, [
      foundUser.refreshtoken,
      req.user.id,
    ]);
    const updatedUser = updatedUserResult[0];
    console.log({ updatedUser: updatedUser });

    res.clearCookie("nationaltoken", {
      // httpOnly: true,
      // sameSite: "None",
      // secure: true,
    });
    res.sendStatus(204);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ statusCode: "500", message: "Error signing out", err: error });
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

module.exports = { signin, signout, handleRefreshToken };
