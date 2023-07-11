require("dotenv").config();
const express = require("express");
const db = require("./config/db");
const app = express();
const authRoute = require("./routes/auth");
const adminAuthRoute = require("./routes/adminAuth");
const userRoute = require("./routes/users");
const refreshTokenRoute = require("./routes/refreshToken");
const { createUserQuery } = require("./queries/user");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const corsOptions = {
  origin: process.env.ORIGIN,
  credentials: true, // enable cookies and other credentials
};

app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());
// app.use("/api/auth", adminAuthRoute);
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
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
