//@ts-nocheck
import db from "../../../config/db";
import bcrypt from "bcryptjs";

const createNationalUserAccount = async (req, res, next) => {
  const {
    state,
    staffname,
    staffid,
    gender,
    cadre,
    phone,
    email,
    userid,
    password,
    accountType,
  } = req.body;
  const salt = bcrypt.genSaltSync(10);
  const hashedpassword = bcrypt.hashSync(password, salt);
  const values = [
    state.trim(),
    staffname.trim(),
    staffid.trim(),
    gender.trim(),
    cadre.trim(),
    phone.trim(),
    email.trim(),
    userid.trim(),
    hashedpassword.trim(),
    accountType.trim(),
  ];
  try {
    const connection = await db.getConnection();
    const q = `INSERT INTO nationaladmin (state, staffname,staffid, gender, cadre, phone, email,userid ,password,accountType)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?,?)`;
    const result = await connection.execute(q, values);
    connection.release();
    res
      .status(201)
      .json({ statusCode: "201", message: "successful", result: result[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      statusCode: "500",
      message: "can't create national user account",
      error: err,
    });
  }
};

export { createNationalUserAccount };
