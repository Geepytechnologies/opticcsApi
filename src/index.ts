//@ts-nocheck
require("module-alias/register");

import express, { Request, Response } from "express";
import morgan from "morgan";

require("dotenv").config();
import db from "./config/db";
const app = express();
import authRoute from "./routes/user/auth";
import wardRoute from "./routes/ward";
import patientRoute from "./routes/user/patients";
import adminAuthRoute from "./routes/admin/adminAuth";
import indicatorRoute from "./routes/admin/indicator";
import scheduleRoute from "./routes/admin/schedule";
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
import EnumerationRoute from "./routes/enumeration/index";

import { createUserQuery } from "./queries/user/user";
import cors from "cors";
import cookieParser from "cookie-parser";
import logger from "./logger";
import { createClient } from "redis";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import * as path from "path";
import { reminderSMS } from "./services/schedulereminder.service";
import { missedscheduleSMS } from "./services/missedschedule.service";
import swaggerSpec from "./config/swagger";
//import "./utils/settlementSeeder";

reminderSMS.start();
missedscheduleSMS.start();

const adminOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Opticcs Admin",
      version: "1.0.0",
      description: "API documentation for the Opticcs Admin App",
    },
  },
  // Paths to files containing OpenAPI annotations
  apis: ["./src/routes/admin/**/*.ts", "./src/routes/admin/*.ts"],
};
const userOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Opticcs User",
      version: "1.0.0",
      description: "API documentation for the Opticcs User App",
    },
  },
  // Paths to files containing OpenAPI annotations
  apis: ["./src/routes/user/**/*.ts"],
};
const EnumerationOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Enumeration Module",
      version: "1.0.0",
      description: "API documentation for the iANC Enumeration Module",
    },
    tags: [
      {
        name: "Enumerator",
        description: "Operations related to enumerators",
      },
      {
        name: "Settlements",
        description: "Operations related to settlements",
      },
      {
        name: "Enumeration Data",
        description: "Operations related to enumeration data",
      },
      {
        name: "Enumeration Analytics",
        description: "Operations related to enumeration analytics",
      },
    ],
  },
  // Paths to files containing OpenAPI annotations
  apis: ["./src/routes/enumeration/**/*.ts"],
};

const swaggerSpecAdmin = swaggerJsdoc(adminOptions);
const swaggerSpecUser = swaggerJsdoc(userOptions);
const swaggerSpecEnumeration = swaggerJsdoc(EnumerationOptions);
app.use("/api-docs/admin", swaggerUi.serve, (req, res, next) => {
  if (req.baseUrl === "/api-docs/admin") {
    swaggerUi.setup(swaggerSpecAdmin)(req, res, next);
  } else {
    next();
  }
});

// Serve Swagger UI for user documentation
app.use("/api-docs", swaggerUi.serve, (req, res, next) => {
  if (req.baseUrl === "/api-docs/user") {
    swaggerUi.setup(swaggerSpecUser)(req, res, next);
  } else {
    next();
  }
});

app.use("/api/docs/enumeration", swaggerUi.serve, (req, res, next) => {
  if (req.baseUrl === "/api/docs/enumeration") {
    swaggerUi.setup(swaggerSpecEnumeration)(req, res, next);
  } else {
    next();
  }
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const corsOptions = {
  origin: [process.env.ORIGIN, "127.0.0.1:6379"],
  credentials: true,
  exposedHeaders: ["Set-Cookie"],
};
// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   next();
// });
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", [
    process.env.ORIGIN,
    "http://127.0.0.1:6379",
  ]);
  // Replace with your Vercel app URL
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});
app.use(express.static("public"));
app.use(express.static(path.join(__dirname, "/dist")));
app.use(morgan("dev"));
app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());
app.use("/api/admin/auth", adminAuthRoute);
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/patients", patientRoute);
app.use("/api/admin/indicators", indicatorRoute);
app.use("/api/admin/schedule", scheduleRoute);
app.use("/api/admin/wards", wardRoute);
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
app.use("/api/enumeration", EnumerationRoute);

// app.get("/", (req: Request, res: Response) => {
//   const token = "geepy";
//   res.cookie("nationaltoken", token, {
//     httpOnly: false,
//     secure: true,
//     sameSite: "none",
//     // domain: ".vercel.app",
//     maxAge: 10 * 24 * 60 * 60 * 1000,
//   });
//   res.send("Home page");
// });

app.get("/test", (req, res) => {
  const q = `SELECT * FROM healthpersonnel`;
  db.query(q, (err: any, result: any) => {
    if (err) return res.json(err);
    return res.json(result);
  });
});
app.get("/updateanc", async (req, res) => {
  const connection = await db.getConnection();
  try {
    const q = `SELECT patient_id, COUNT(*) as num_occurrences FROM returnvisit GROUP BY patient_id`;
    const result = await connection.execute(q);
    if (Array.isArray(result[0])) {
      result[0].forEach((r) => {
        //@ts-ignore

        const { patient_id, num_occurrences, anc } = r;
        const getancs = async () => {
          const q3 = `select anc, id from returnvisit where patient_id = ?`;
          const ancs = await connection.execute(q3, [patient_id]);
          ancs[0].forEach((a, index) => {
            if (index !== 0) {
              const q2 = `UPDATE returnvisit SET anc = ? WHERE patient_id = ? AND id = ?`;
              const updatedresult = connection.execute(q2, [
                index + 1,
                patient_id,
                a.id,
              ]);
            }
          });
        };
        getancs();
      });
    }
    res.status(200).json(result[0]);
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
});
app.get("/liveuser", async (req, res) => {
  try {
    const connection = await db.getConnection();
    const q = `SELECT * FROM obstetrichistory WHERE id = ?`;
    const result = await connection.execute(q, [1]);
    res.status(200).json(result[0]);
  } catch (error) {}
});

app.get("*", (req, res) => {
  res.sendFile(__dirname + "/dist/index.html");
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  logger.info(`Backend server is up and running on port ${port}`);
});

// require("./services/missedschedule.service");
