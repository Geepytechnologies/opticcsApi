"use strict";
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
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
require("dotenv").config();
const db_1 = __importDefault(require("./config/db"));
const app = (0, express_1.default)();
const auth_1 = __importDefault(require("./routes/user/auth"));
const patients_1 = __importDefault(require("./routes/user/patients"));
const adminAuth_1 = __importDefault(require("./routes/admin/adminAuth"));
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
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const logger_1 = __importDefault(require("./logger"));
require("./services/missedschedule");
require("./services/reminderschedule");
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
app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.json());
app.use((0, cors_1.default)(corsOptions));
app.use((0, cookie_parser_1.default)());
app.use("/api/admin/auth", adminAuth_1.default);
app.use("/api/auth", auth_1.default);
app.use("/api/users", users_2.default);
app.use("/api/patients", patients_1.default);
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
app.get("/", (req, res) => {
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
    db_1.default.query(q, (err, result) => {
        if (err)
            return res.json(err);
        return res.json(result);
    });
});
app.get("/liveuser", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const connection = yield db_1.default.getConnection();
        const q = `SELECT * FROM obstetrichistory WHERE id = ?`;
        const result = yield connection.execute(q, [1]);
        res.status(200).json(result[0]);
    }
    catch (error) { }
}));
const port = process.env.PORT || 3000;
app.listen(port, () => {
    logger_1.default.info("Backend server is up and running");
});
