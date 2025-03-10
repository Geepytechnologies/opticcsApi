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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetpassword = exports.generatestatedetails = exports.handleRefreshToken = exports.signout = exports.signin = void 0;
//@ts-nocheck
const db_1 = __importDefault(require("../../../config/db"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const crypto_1 = __importDefault(require("crypto"));
const generators_1 = require("../../../utils/generators");
// Function to generate a random string of given length
const generateRandomString = (length) => {
    return crypto_1.default
        .randomBytes(Math.ceil(length / 2))
        .toString("hex")
        .slice(0, length);
};
// Function to generate a unique username and password
const generateUniqueCredentials = (callback) => __awaiter(void 0, void 0, void 0, function* () {
    const username = "IANC" + generators_1.Generators.generateRandomNumberString(8);
    const password = generateRandomString(10);
    const connection = yield db_1.default.getConnection();
    try {
        // Check if the generated username already exists in the database
        const [results, fields] = yield connection.execute("SELECT * FROM stateadmin WHERE userid = ?", [username]);
        if (results.length > 0) {
            // If the username already exists, regenerate the credentials and call the callback recursively
            generateUniqueCredentials(callback);
        }
        else {
            // If the username is unique, call the callback with the generated credentials
            callback(null, { username, password });
        }
    }
    catch (err) {
        // If there's an error during the query, call the callback with the error
        callback(err);
    }
    finally {
        if (connection) {
            connection.release();
        }
    }
});
const generatestatedetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const credentials = yield new Promise((resolve, reject) => {
            generateUniqueCredentials((err, data) => {
                if (err) {
                    console.log(err);
                    reject(err);
                }
                else {
                    resolve(data);
                }
            });
        });
        res.json(credentials);
    }
    catch (err) {
        res
            .status(500)
            .json({ error: "Failed to generate credentials.", message: err });
    }
});
exports.generatestatedetails = generatestatedetails;
const signin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield db_1.default.getConnection();
    const { userid } = req.body;
    const existinguserid = () => __awaiter(void 0, void 0, void 0, function* () {
        const q = `SELECT * FROM stateadmin WHERE userid = ?`;
        const result = yield connection.execute(q, [userid]);
        return result[0];
    });
    const createRefresh = (refreshToken) => __awaiter(void 0, void 0, void 0, function* () {
        const q = `UPDATE stateadmin
        SET refreshToken = ?
        WHERE userid = ?`;
        const result = yield connection.execute(q, [refreshToken, userid]);
        return result[0];
    });
    try {
        const user = yield existinguserid();
        if (!user.length)
            return res
                .status(404)
                .json({ statusCode: "404", message: "User not found" });
        const isMatched = bcryptjs_1.default.compareSync(req.body.password, user[0].password);
        if (!isMatched)
            return res
                .status(400)
                .json({ statusCode: "400", message: "wrong credentials" });
        //access Token
        const accessToken = jsonwebtoken_1.default.sign({ id: user[0].id }, process.env.ACCESS_SECRET, {
            expiresIn: "30m",
        });
        //refresh Token
        const refreshToken = jsonwebtoken_1.default.sign({ id: user[0].id }, process.env.REFRESH_SECRET, {
            expiresIn: "5d",
        });
        //save refresh token to the user model
        const updatedUser = yield createRefresh(refreshToken);
        // Creates Secure Cookie with refresh token
        res.cookie("statetoken", refreshToken, {
            httpOnly: false,
            secure: false,
            //sameSite: "none",
            maxAge: 6 * 24 * 60 * 60 * 1000,
        });
        const { password } = user, others = __rest(user, ["password"]);
        res.status(200).json({
            statusCode: "200",
            message: "successful",
            result: { others: others[0], accessToken },
        });
    }
    catch (err) {
        connection.rollback();
        res
            .status(500)
            .json({ statusCode: "500", message: "Error signing in", error: err });
        next(err);
    }
    finally {
        if (connection) {
            connection.release();
        }
    }
});
exports.signin = signin;
const handleRefreshToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield db_1.default.getConnection();
    const existingRefresh = (refreshToken) => __awaiter(void 0, void 0, void 0, function* () {
        const q = `SELECT * FROM stateadmin WHERE refreshToken = ?`;
        const result = yield connection.execute(q, [refreshToken]);
        return result[0];
    });
    const cookies = req.cookies;
    if (!(cookies === null || cookies === void 0 ? void 0 : cookies.statetoken))
        return res.sendStatus(401);
    const refreshToken = cookies.statetoken;
    try {
        const foundUser = yield existingRefresh(refreshToken);
        if (!foundUser.length) {
            return res.status(403).json("User not Found");
        }
        // Verify JWT
        jsonwebtoken_1.default.verify(refreshToken, process.env.REFRESH_SECRET, (err, user) => {
            var _a;
            if (err || ((_a = foundUser[0]) === null || _a === void 0 ? void 0 : _a.id) !== user.id) {
                return res.sendStatus(403);
            }
            else {
                const accessToken = jsonwebtoken_1.default.sign({ id: user.id }, process.env.ACCESS_SECRET, {
                    expiresIn: "30m",
                });
                const _b = foundUser[0], { password, refreshToken } = _b, others = __rest(_b, ["password", "refreshToken"]);
                return res.json({ accessToken, others });
            }
        });
    }
    catch (err) {
        res.status(500).json({ message: "error refreshing token", error: err });
    }
    finally {
        if (connection) {
            connection.release();
        }
    }
});
exports.handleRefreshToken = handleRefreshToken;
const signout = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield db_1.default.getConnection();
    // On client, also delete the accessToken
    try {
        const cookies = req.cookies;
        if (!(cookies === null || cookies === void 0 ? void 0 : cookies.statetoken))
            return res.sendStatus(204); //No content
        const refreshtoken = cookies.statetoken;
        // Is refreshToken in db?
        const existingrefreshQuery = ` SELECT * FROM stateadmin WHERE refreshtoken = ?`;
        const foundUserResult = yield connection.execute(existingrefreshQuery, [
            refreshtoken,
        ]);
        const foundUser = foundUserResult[0];
        if (!foundUser) {
            res.clearCookie("statetoken", {
                sameSite: "None",
                secure: true,
            });
            return res.sendStatus(204);
        }
        const updateRefreshQuery = `UPDATE stateadmin
     SET refreshtoken = ? WHERE id = ?`;
        const updatedUserResult = yield connection.execute(updateRefreshQuery, [
            null,
            req.user.id,
        ]);
        const updatedUser = updatedUserResult[0];
        res.clearCookie("statetoken", {
        // httpOnly: true,
        // sameSite: "None",
        // secure: true,
        });
        res.sendStatus(204);
    }
    catch (error) {
        res
            .status(500)
            .json({ statusCode: "500", message: "Error signing out", err: error });
    }
    finally {
        if (connection) {
            connection.release();
        }
    }
});
exports.signout = signout;
const resetpassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield db_1.default.getConnection();
    const { oldpassword, newpassword } = req.body;
    const salt = bcryptjs_1.default.genSaltSync(10);
    const hashedpassword = bcryptjs_1.default.hashSync(newpassword, salt);
    const existinguserid = () => __awaiter(void 0, void 0, void 0, function* () {
        const q = `SELECT * FROM stateadmin WHERE id = ?`;
        const result = yield connection.execute(q, [req.user.id]);
        return result[0];
    });
    const createNewpassword = () => __awaiter(void 0, void 0, void 0, function* () {
        const q = `UPDATE stateadmin
        SET password = ?
        WHERE id = ?`;
        const result = yield connection.execute(q, [hashedpassword, req.user.id]);
        return result[0];
    });
    try {
        const user = yield existinguserid();
        if (!user.length)
            return res
                .status(404)
                .json({ statusCode: "404", message: "User not found" });
        const isMatched = bcryptjs_1.default.compareSync(oldpassword, user[0].password);
        if (!isMatched)
            return res
                .status(400)
                .json({ statusCode: "400", message: "Wrong password" });
        //save new password to the user model
        const newuser = yield createNewpassword();
        res.status(201).json({
            statusCode: "201",
            message: "password Changed",
        });
    }
    catch (err) {
        connection.rollback();
        res.status(500).json({
            statusCode: "500",
            message: "Error Resetting password",
            error: err,
        });
        next(err);
    }
    finally {
        if (connection) {
            connection.release();
        }
    }
});
exports.resetpassword = resetpassword;
