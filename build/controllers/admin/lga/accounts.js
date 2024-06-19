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
exports.getLgaUserAccounts = exports.getLgaAccounts = exports.createLgaUserAccount = exports.createLgaAccount = void 0;
//@ts-nocheck
const db_1 = __importDefault(require("../../../config/db"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const createLgaAccount = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { lga, boardname, state, lgaID, officeaddress, phone, email } = req.body;
    const values = [
        lga.trim(),
        boardname.trim(),
        state.trim(),
        lgaID.trim(),
        officeaddress.trim(),
        phone.trim(),
        email.trim(),
    ];
    const connection = yield db_1.default.getConnection();
    const checkIfLgaAccountExists = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const q = `SELECT * FROM lgaccount WHERE lga = ?`;
        try {
            let checked;
            const result = yield connection.execute(q, [lga]);
            if (result[0].length) {
                checked = true;
            }
            else {
                checked = false;
            }
            return checked;
        }
        catch (error) {
            connection.release();
            throw new Error(error);
        }
        finally {
            if (connection) {
                connection.release();
            }
        }
    });
    try {
        const q = `INSERT INTO lgaccount (lga, boardname,state, lgaID, officeaddress, phone, email)
      VALUES (?, ?, ?, ?, ?, ?,?)`;
        const accountExists = yield checkIfLgaAccountExists();
        if (accountExists) {
            res.status(409).json("LGA already exists");
        }
        else {
            const result = yield connection.execute(q, values);
            res
                .status(201)
                .json({ statusCode: "201", message: "successful", result: result[0] });
        }
    }
    catch (err) {
        res.status(500).json({
            statusCode: "500",
            message: "can't create state account",
            error: err,
        });
    }
    finally {
        if (connection) {
            connection.release();
        }
    }
});
exports.createLgaAccount = createLgaAccount;
const createLgaUserAccount = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { lga, state, staffname, staffid, gender, cadre, phone, email, userid, password, accountType, } = req.body;
    const salt = bcryptjs_1.default.genSaltSync(10);
    const hashedpassword = bcryptjs_1.default.hashSync(password, salt);
    const values = [
        lga.trim(),
        state.trim(),
        staffname.trim(),
        staffid.trim(),
        gender.trim(),
        cadre.trim(),
        phone.trim(),
        email.trim(),
        userid.trim(),
        hashedpassword.trim(),
        null,
    ];
    const connection = yield db_1.default.getConnection();
    const checkIfStateUserAccountExists = () => __awaiter(void 0, void 0, void 0, function* () {
        const q = `SELECT * FROM lgadmin WHERE userid = ? AND password = ?`;
        try {
            let checked;
            const result = yield connection.execute(q, [userid, hashedpassword]);
            if (result[0].length) {
                checked = true;
            }
            else {
                checked = false;
            }
            return checked;
        }
        catch (error) {
            throw new Error(error);
        }
        finally {
            if (connection) {
                connection.release();
            }
        }
    });
    try {
        const q = `INSERT INTO lgadmin (lga, state, staffname, staffid, gender, cadre, phone, email,userid ,password,accountType)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?,?,?)`;
        const accountExists = yield checkIfStateUserAccountExists();
        if (accountExists) {
            res.status(409).json("LGA account already exists");
        }
        else {
            const result = yield connection.execute(q, values);
            res
                .status(201)
                .json({ statusCode: "201", message: "successful", result: result[0] });
        }
    }
    catch (err) {
        res.status(500).json({
            statusCode: "500",
            message: "can't create state account",
            error: err,
        });
    }
    finally {
        if (connection) {
            connection.release();
        }
    }
});
exports.createLgaUserAccount = createLgaUserAccount;
const getLgaAccounts = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield db_1.default.getConnection();
    try {
        const q = `SELECT * FROM lgaccount`;
        const result = yield connection.execute(q);
        res.status(200).json(result[0]);
    }
    catch (error) {
        res.status(500).json(error);
    }
    finally {
        if (connection) {
            connection.release();
        }
    }
});
exports.getLgaAccounts = getLgaAccounts;
const getLgaAccountsForState = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield db_1.default.getConnection();
    try {
        const q = `SELECT * FROM lgaccount WHERE state = ?`;
        const result = yield connection.execute(q);
        res.status(200).json(result[0]);
    }
    catch (error) {
        res.status(500).json(error);
    }
    finally {
        if (connection) {
            connection.release();
        }
    }
});
const getLgaUserAccounts = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield db_1.default.getConnection();
    const { state } = req.query;
    try {
        const q = `SELECT * FROM lgadmin WHERE state = ?`;
        const result = yield connection.execute(q, [state]);
        res.status(200).json(result[0]);
    }
    catch (error) {
        res.status(500).json(error);
    }
    finally {
        if (connection) {
            connection.release();
        }
    }
});
exports.getLgaUserAccounts = getLgaUserAccounts;
