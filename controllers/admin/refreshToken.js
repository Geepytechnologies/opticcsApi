const jwt = require("jsonwebtoken");
const { getRefreshToken } = require("../../queries/admin/adminUser");
// const { getRefreshToken } = require("../queries/user");
const db = require("../../config/db");

const existingRefresh = (refreshToken) => {
  return new Promise((resolve, reject) => {
    db.query(getRefreshToken(), [refreshToken], (err, result) => {
      if (err) {
        reject(err);
      } else {
        const user = result[0];
        console.log({ fromrefresh: user });
        resolve(user);
      }
    });
  });
};

const handleRefreshToken = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.token) return res.sendStatus(401);
  const refreshToken = cookies.token;

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
      res.json({ accessToken, others: others });
    });
  } catch (err) {
    console.error(err);
  }
};

module.exports = { handleRefreshToken };
