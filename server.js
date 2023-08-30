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
const adminNationalDataRoute = require("./routes/admin/national/data");
const adminStateDataRoute = require("./routes/admin/state/data");
const adminLgaAccountsRoute = require("./routes/admin/lga/accounts");
const adminLgaDataRoute = require("./routes/admin/lga/data");
const adminHealthfacilityAccountsRoute = require("./routes/admin/healthfacility/accounts");
const adminHealthfacilityDataRoute = require("./routes/admin/healthfacility/data");
const userRoute = require("./routes/user/users");
const refreshTokenRoute = require("./routes/admin/refreshToken");
const { createUserQuery } = require("./queries/user/user");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const request = require("request");

app.post("/sendotp2", (req, res) => {
  const options = {
    method: "POST",
    url: "https://control.msg91.com/api/v5/otp?template_id=64d21743d6fc055e40287382&mobile=2348106974201&otp_length=6&otp_expiry=5",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      authkey: "394982AVwwiRgqf64d2116bP1",
    },
    body: { name: "Geepy" },
    json: true,
  };
  try {
    request(options, function (error, response, body) {
      if (error) throw new Error(error);

      console.log(body);
    });
    res.status(200).json("successful");
  } catch (error) {
    res.status(500).json(error);
  }
});

const corsOptions = {
  origin: process.env.ORIGIN,
  credentials: true, // enable cookies and other credentials
  exposedHeaders: ["Set-Cookie"],
};
// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   next();
// });
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", process.env.ORIGIN); // Replace with your Vercel app URL
  res.header("Access-Control-Allow-Credentials", true);
  next();
});
app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());
app.use("/api/admin/auth", adminAuthRoute);
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/patients", patientRoute);
app.use("/api/admin/state", adminStateAccountsRoute);
app.use("/api/admin/state/data", adminStateDataRoute);
app.use("/api/admin/national", adminNationalAccountsRoute);
app.use("/api/admin/national/data", adminNationalDataRoute);
app.use("/api/admin/lga", adminLgaAccountsRoute);
app.use("/api/admin/lga/data", adminLgaDataRoute);
app.use("/api/admin/healthfacility", adminHealthfacilityAccountsRoute);
app.use("/api/admin/healthfacility/data", adminHealthfacilityDataRoute);
app.use("/api/admin/users", adminUserRoute);
app.use("/api/refresh", refreshTokenRoute);

app.get("/", (req, res) => {
  const token = "geepy";
  res.cookie("nationaltoken", token, {
    httpOnly: false,
    secure: true,
    sameSite: "None",
    // domain: ".vercel.app",
    maxAge: 10 * 24 * 60 * 60 * 1000,
  });
  res.send("Home page");
});
app.get("/test", (req, res) => {
  const q = `SELECT * FROM healthpersonnel`;
  db.query(q, (err, result) => {
    if (err) return res.json(err);
    return res.json(result);
  });
});
app.get("/liveuser", async (req, res) => {
  try {
    const connection = await db.getConnection();
    const q = `SELECT * FROM obstetrichistory WHERE id = ?`;
    const result = await connection.execute(q, [1]);
    res.status(200).json(result[0]);
  } catch (error) {}
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log("Backend server is running");
});
