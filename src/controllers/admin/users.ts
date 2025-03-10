//@ts-nocheck
import db from "../../config/db";

const getAllUsers = (req, res, next) => {
  try {
    const q = `SELECT * FROM healthadmin`;
    db.query(q, (err, result) => {
      if (err) return res.json(err);
      return res.json(result);
    });
  } catch (err) {
    next(err);
  }
};

export { getAllUsers };
