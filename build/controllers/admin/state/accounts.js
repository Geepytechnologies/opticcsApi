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
exports.deleteState = exports.getAllStateUsers = exports.getAllStates = exports.createStateUserAccount = exports.createStateAccount = void 0;
//@ts-nocheck
const db_1 = __importDefault(require("../../../config/db"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const logger_1 = __importDefault(require("../../../logger"));
const createStateAccount = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { state, boardname, stateid, officeaddress, phone, email } = req.body;
    const values = [state, boardname, stateid, officeaddress, phone, email];
    const connection = yield db_1.default.getConnection();
    const checkIfStateAccountExists = () => __awaiter(void 0, void 0, void 0, function* () {
        const q = `SELECT * FROM stateaccount WHERE state = ?`;
        try {
            let checked;
            const result = yield connection.execute(q, [state]);
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
        const q = `INSERT INTO stateaccount (state, boardname, stateid, officeaddress, phone, email)
      VALUES (?, ?, ?, ?, ?, ?)`;
        const stateExists = yield checkIfStateAccountExists();
        if (stateExists) {
            res.status(409).json("state account already exists");
        }
        else {
            const result = yield connection.execute(q, values);
            res
                .status(201)
                .json({ statusCode: "201", message: "successful", result: result[0] });
        }
        // connection.release();
    }
    catch (err) {
        connection.release();
        logger_1.default.error(err);
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
exports.createStateAccount = createStateAccount;
const createStateUserAccount = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
    const connection = yield db_1.default.getConnection();
    const checkIfStateUserAccountExists = () => __awaiter(void 0, void 0, void 0, function* () {
        const q = `SELECT * FROM stateadmin WHERE userid = ?`;
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
        const q = `INSERT INTO stateadmin (state, staffname,staffid, gender, cadre, phone, email,userid ,password,accountType)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?,?)`;
        const checkuser = checkIfStateUserAccountExists();
        if (checkuser) {
            res.status(409).json("User already exists");
        }
        else {
            const result = yield connection.execute(q, values);
            connection.release();
            res
                .status(201)
                .json({ statusCode: "201", message: "successful", result: result[0] });
        }
    }
    catch (err) {
        logger_1.default.error(err);
        res.status(500).json({
            statusCode: "500",
            message: "can't create state user account",
            error: err,
        });
    }
});
exports.createStateUserAccount = createStateUserAccount;
const getAllStates = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield db_1.default.getConnection();
    try {
        const q = `SELECT * FROM stateaccount`;
        const result = yield connection.execute(q);
        res
            .status(200)
            .json({ statusCode: "200", message: "successful", result: result[0] });
        connection.release();
    }
    catch (error) {
        connection.release();
        res.status(500).json(error);
    }
    finally {
        if (connection) {
            connection.release();
        }
    }
});
exports.getAllStates = getAllStates;
const deleteState = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield db_1.default.getConnection();
    const { id } = req.params;
    try {
        const q = `delete FROM stateaccount WHERE id = ?`;
        const result = yield connection.execute(q, [id]);
        res
            .status(200)
            .json({ statusCode: "200", message: "successful", result: result[0] });
    }
    catch (error) {
        connection.release();
        res.status(500).json(error);
    }
    finally {
        if (connection) {
            connection.release();
        }
    }
});
exports.deleteState = deleteState;
const getAllStateUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield db_1.default.getConnection();
    try {
        const q = `SELECT * FROM stateadmin`;
        const result = yield connection.execute(q);
        res
            .status(200)
            .json({ statusCode: "200", message: "successful", result: result[0] });
    }
    catch (error) {
        connection.release();
        res.status(500).json(error);
    }
    finally {
        if (connection) {
            connection.release();
        }
    }
});
exports.getAllStateUsers = getAllStateUsers;
