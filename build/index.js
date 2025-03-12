"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//@ts-nocheck
require("module-alias/register");
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
require("dotenv").config();
const db_1 = __importDefault(require("./config/db"));
const app = (0, express_1.default)();
const auth_1 = __importDefault(require("./routes/user/auth"));
const ward_1 = __importDefault(require("./routes/ward"));
const patients_1 = __importDefault(require("./routes/user/patients"));
const adminAuth_1 = __importDefault(require("./routes/admin/adminAuth"));
const indicator_1 = __importDefault(require("./routes/admin/indicator"));
const schedule_1 = __importDefault(require("./routes/admin/schedule"));
const users_1 = __importDefault(require("./routes/admin/users"));
const accounts_1 = __importDefault(require("./routes/admin/state/accounts"));
const accounts_2 = __importDefault(require("./routes/admin/national/accounts"));
const data_1 = __importDefault(require("./routes/admin/national/data"));
const data_2 = __importDefault(require("./routes/admin/state/data"));
const accounts_3 = __importDefault(require("./routes/admin/lga/accounts"));
const data_3 = __importDefault(require("./routes/admin/lga/data"));
const accounts_4 = __importDefault(require("./routes/admin/healthfacility/accounts"));
const data_4 = __importDefault(require("./routes/admin/healthfacility/data"));
const users_2 = __importDefault(require("./routes/user/users"));
const refreshToken_1 = __importDefault(require("./routes/admin/refreshToken"));
const index_1 = __importDefault(require("./routes/session/index"));
const index_2 = __importDefault(require("./routes/enumeration/index"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const logger_1 = __importDefault(require("./logger"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const path = __importStar(require("path"));
const schedulereminder_service_1 = require("./services/schedulereminder.service");
const missedschedule_service_1 = require("./services/missedschedule.service");
const swagger_1 = __importDefault(require("./config/swagger"));
require("./utils/settlementSeeder");
//import "./utils/healthfacilitySeeder";
schedulereminder_service_1.reminderSMS.start();
missedschedule_service_1.missedscheduleSMS.start();
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
const swaggerSpecAdmin = (0, swagger_jsdoc_1.default)(adminOptions);
const swaggerSpecUser = (0, swagger_jsdoc_1.default)(userOptions);
const swaggerSpecEnumeration = (0, swagger_jsdoc_1.default)(EnumerationOptions);
app.use("/api-docs/admin", swagger_ui_express_1.default.serve, (req, res, next) => {
    if (req.baseUrl === "/api-docs/admin") {
        swagger_ui_express_1.default.setup(swaggerSpecAdmin)(req, res, next);
    }
    else {
        next();
    }
});
// Serve Swagger UI for user documentation
app.use("/api-docs", swagger_ui_express_1.default.serve, (req, res, next) => {
    if (req.baseUrl === "/api-docs/user") {
        swagger_ui_express_1.default.setup(swaggerSpecUser)(req, res, next);
    }
    else {
        next();
    }
});
app.use("/api/docs/enumeration", swagger_ui_express_1.default.serve, (req, res, next) => {
    if (req.baseUrl === "/api/docs/enumeration") {
        swagger_ui_express_1.default.setup(swaggerSpecEnumeration)(req, res, next);
    }
    else {
        next();
    }
});
app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_1.default));
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
app.use(express_1.default.static("public"));
app.use(express_1.default.static(path.join(__dirname, "/dist")));
app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.json());
app.use((0, cors_1.default)(corsOptions));
app.use((0, cookie_parser_1.default)());
app.use("/api/admin/auth", adminAuth_1.default);
app.use("/api/auth", auth_1.default);
app.use("/api/users", users_2.default);
app.use("/api/patients", patients_1.default);
app.use("/api/admin/indicators", indicator_1.default);
app.use("/api/admin/schedule", schedule_1.default);
app.use("/api/admin/wards", ward_1.default);
app.use("/api/admin/state", accounts_1.default);
app.use("/api/admin/state/data", data_2.default);
app.use("/api/admin/national", accounts_2.default);
app.use("/api/admin/national/data", data_1.default);
app.use("/api/admin/lga", accounts_3.default);
app.use("/api/admin/lga/data", data_3.default);
app.use("/api/admin/healthfacility", accounts_4.default);
app.use("/api/admin/healthfacility/data", data_4.default);
app.use("/api/admin/users", users_1.default);
app.use("/api/refresh", refreshToken_1.default);
app.use("/api/session", index_1.default);
app.use("/api/enumeration", index_2.default);
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
    db_1.default.query(q, (err, result) => {
        if (err)
            return res.json(err);
        return res.json(result);
    });
});
app.get("/updateanc", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield db_1.default.getConnection();
    try {
        const q = `SELECT patient_id, COUNT(*) as num_occurrences FROM returnvisit GROUP BY patient_id`;
        const result = yield connection.execute(q);
        if (Array.isArray(result[0])) {
            result[0].forEach((r) => {
                //@ts-ignore
                const { patient_id, num_occurrences, anc } = r;
                const getancs = () => __awaiter(void 0, void 0, void 0, function* () {
                    const q3 = `select anc, id from returnvisit where patient_id = ?`;
                    const ancs = yield connection.execute(q3, [patient_id]);
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
                });
                getancs();
            });
        }
        res.status(200).json(result[0]);
    }
    catch (error) {
        res.status(500).json(error);
        console.log(error);
    }
}));
app.get("/liveuser", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const connection = yield db_1.default.getConnection();
        const q = `SELECT * FROM obstetrichistory WHERE id = ?`;
        const result = yield connection.execute(q, [1]);
        res.status(200).json(result[0]);
    }
    catch (error) { }
}));
app.get("*", (req, res) => {
    res.sendFile(__dirname + "/dist/index.html");
});
const port = process.env.PORT || 3000;
app.listen(port, () => {
    logger_1.default.info(`Backend server is up and running on port ${port}`);
});
// require("./services/missedschedule.service");
