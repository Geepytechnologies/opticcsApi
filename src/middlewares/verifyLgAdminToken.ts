//@ts-nocheck
import jwt from "jsonwebtoken";
import { createError } from "./error";

const verifyLgAdminToken = (req, res, next) => {
  const cookies = req.cookies.lgatoken;
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

export { verifyLgAdminToken };
