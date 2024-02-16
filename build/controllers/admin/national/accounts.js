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
exports.createNationalUserAccount = void 0;
//@ts-nocheck
const db_1 = __importDefault(require("../../../config/db"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const createNationalUserAccount = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { state, staffname, staffid, gender, cadre, phone, email, userid, password, accountType, } = req.body;
    const salt = bcryptjs_1.default.genSaltSync(10);
    const hashedpassword = bcryptjs_1.default.hashSync(password, salt);
    const values = [
        state,
        staffname,
        staffid,
        gender,
        cadre,
        phone,
        email,
        userid,
        hashedpassword,
        accountType,
    ];
    try {
        const connection = yield db_1.default.getConnection();
        const q = `INSERT INTO nationaladmin (state, staffname,staffid, gender, cadre, phone, email,userid ,password,accountType)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?,?)`;
        const result = yield connection.execute(q, values);
        connection.release();
        res
            .status(201)
            .json({ statusCode: "201", message: "successful", result: result[0] });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({
            statusCode: "500",
            message: "can't create national user account",
            error: err,
        });
    }
});
exports.createNationalUserAccount = createNationalUserAccount;
