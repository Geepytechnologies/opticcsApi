require("dotenv").config();
const express = require("express");
const db = require("./config/db");
const app = express();
const authRoute = require("./routes/user/auth");
const patientRoute = require("./routes/user/patients");
const adminAuthRoute = require("./routes/admin/adminAuth");
const adminUserRoute = require("./routes/admin/users");
const adminStateAccountsRoute = require("./routes/admin/state/accounts");
const adminNationalAccountsRoute = require("./routes/admin/national/accounts");
const adminLgaAccountsRoute = require("./routes/admin/lga/accounts");
const adminHealthfacilityAccountsRoute = require("./routes/admin/healthfacility/accounts");
const userRoute = require("./routes/user/users");
const refreshTokenRoute = require("./routes/admin/refreshToken");
const { createUserQuery } = require("./queries/user/user");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const corsOptions = {
  origin: process.env.ORIGIN,
  credentials: true, // enable cookies and other credentials
};
// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   next();
// });
app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());
app.use("/api/admin/auth", adminAuthRoute);
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/patients", patientRoute);
app.use("/api/admin/state", adminStateAccountsRoute);
app.use("/api/admin/national", adminNationalAccountsRoute);
app.use("/api/admin/lga", adminLgaAccountsRoute);
app.use("/api/admin/healthfacility", adminHealthfacilityAccountsRoute);
app.use("/api/admin/users", adminUserRoute);
app.use("/api/refresh", refreshTokenRoute);

app.get("/", (req, res) => {
  res.send("Home page");
});
app.get("/test", (req, res) => {
  const q = `SELECT * FROM healthpersonnel`;
  db.query(q, (err, result) => {
    if (err) return res.json(err);
    return res.json(result);
  });
});
app.post("/createuser", (req, res) => {
  const {
    name,
    email,
    password,
    phone,
    state,
    lga,
    ward,
    healthFacility,
    healthWorker,
    cadre,
    accountType,
  } = req.body;
  console.log(req.body);
  const q = `
    INSERT INTO healthpersonnel (name,
      email,
      password,
      phone,
      state,
      lga,
      ward,
      healthFacility,
      healthWorker,
      cadre,
      accountType) 
    VALUES ('${name}','${email}', '${password}', '${phone}', '${state}', '${lga}', '${ward}', '${healthFacility}','${healthWorker}','${cadre}','${accountType}')RETURNING *;`;
  db.query(q, (err, result) => {
    if (err) return res.json(err);
    return res.status(201).json("Record added successfully");
  });

  //   res.status(201).json(newUser);
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log("Backend server is running");
});
