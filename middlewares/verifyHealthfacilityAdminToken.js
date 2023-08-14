const jwt = require("jsonwebtoken");
const { createError } = require("./error.js");

const verifyHealthfacilityAdminToken = (req, res, next) => {
  const cookies = req.cookies.healthtoken;
  if (cookies) {
    jwt.verify(cookies, process.env.REFRESH_SECRET, (err, user) => {
      if (err) return next(createError(403, "Token is not valid!"));
      req.user = user;
      next();
    });
  } else {
    return next(createError(401, "You are not authenticated"));
  }
};

module.exports = {
  verifyHealthfacilityAdminToken,
};
