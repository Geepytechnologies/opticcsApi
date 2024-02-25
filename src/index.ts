import express, { Request, Response } from "express";
import morgan from "morgan";

require("dotenv").config();
import db from "./config/db";
const app = express();
import authRoute from "./routes/user/auth";
import patientRoute from "./routes/user/patients";
import adminAuthRoute from "./routes/admin/adminAuth";
import adminUserRoute from "./routes/admin/users";
import adminStateAccountsRoute from "./routes/admin/state/accounts";
import adminNationalAccountsRoute from "./routes/admin/national/accounts";
import adminNationalDataRoute from "./routes/admin/national/data";
import adminStateDataRoute from "./routes/admin/state/data";
import adminLgaAccountsRoute from "./routes/admin/lga/accounts";
import adminLgaDataRoute from "./routes/admin/lga/data";
import adminHealthfacilityAccountsRoute from "./routes/admin/healthfacility/accounts";
import adminHealthfacilityDataRoute from "./routes/admin/healthfacility/data";
import userRoute from "./routes/user/users";
import refreshTokenRoute from "./routes/admin/refreshToken";
import sessionRoute from "./routes/session/index";
import { createUserQuery } from "./queries/user/user";
import cors from "cors";
import cookieParser from "cookie-parser";
import logger from "./logger";
// require("./services/missedschedule");
// require("./services/reminderschedule");

// app.post("/sendotp2", (req: Request, res: Response) => {
//   const options = {
//     method: "POST",
//     url: "https://control.msg91.com/api/v5/otp?template_id=64d21743d6fc055e40287382&mobile=2348106974201&otp_length=6&otp_expiry=5",
//     headers: {
//       accept: "application/json",
//       "content-type": "application/json",
//       authkey: "394982AVwwiRgqf64d2116bP1",
//     },
//     body: { name: "Geepy" },
//     json: true,
//   };
//   try {
//     request(options, function (error: string | undefined, response: any, body: any) {
//       if (error) throw new Error(error);

//       console.log(body);
//     });
//     res.status(200).json("successful");
//   } catch (error) {
//     res.status(500).json(error);
//   }
// });

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
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});
app.use(morgan("dev"));
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
app.use("/api/session", sessionRoute);

app.get("/", (req: Request, res: Response) => {
  const token = "geepy";
  res.cookie("nationaltoken", token, {
    httpOnly: false,
    secure: true,
    sameSite: "none",
    // domain: ".vercel.app",
    maxAge: 10 * 24 * 60 * 60 * 1000,
  });
  res.send("Home page");
});

app.get("/test", (req, res) => {
  const q = `SELECT * FROM healthpersonnel`;
  db.query(q, (err: any, result: any) => {
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
  logger.info("Backend server is running");
});
