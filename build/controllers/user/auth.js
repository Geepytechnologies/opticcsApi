"use strict";
//@ts-nocheck
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
exports.retrypasswordresetOtp = exports.confirmpasswordresetOtp = exports.sendPasswordresetOtp = exports.voiceOtp = exports.sendOtp = exports.confirmOtp = exports.resetpassword = exports.changepassword = exports.signout = exports.signin = exports.signup = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = require("../../queries/user/user");
const index_1 = require("../session/index");
const index_2 = __importDefault(require("../../logger/index"));
const db_1 = __importDefault(require("../../config/db"));
const sendOtp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, mobile_number } = req.body;
    const url = `https://api.ng.termii.com/api/sms/otp/send`;
    const data = {
        api_key: process.env.TERMIIKEY,
        message_type: "ALPHANUMERIC",
        to: `${mobile_number}`,
        from: "N-Alert",
        channel: "dnd",
        pin_attempts: 10,
        pin_time_to_live: 5,
        pin_length: 6,
        pin_placeholder: "<>",
        message_text: `Hi ${name}, Your Opticcs authentication pin is <>. If you did not initiate this request, Please Ignore. Do not share this code with anyone.`,
        pin_type: "NUMERIC",
    };
    try {
        const response = yield fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        const body = yield response.json();
        if (!response.ok) {
            return res.status(response.status).json({
                error: "An error occurred while sending OTP.",
            });
        }
        res.status(response.status).json({
            statusCode: response.status.toString(),
            result: body,
        });
    }
    catch (error) {
        index_2.default.error("Error:", error);
        res.status(500).json({ error: "Internal server error." });
    }
});
exports.sendOtp = sendOtp;
const voiceOtp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { mobile_number } = req.body;
    const url = `https://api.ng.termii.com/api/sms/otp/send/voice`;
    const data = {
        api_key: process.env.TERMIIKEY,
        phone_number: `${mobile_number}`,
        pin_attempts: 10,
        pin_time_to_live: 5,
        pin_length: 6,
    };
    try {
        const response = yield fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        const body = yield response.json();
        if (!response.ok) {
            return res.status(response.status).json({
                error: "An error occurred while sending OTP.",
            });
        }
        res.status(response.status).json({
            statusCode: response.status.toString(),
            result: body,
        });
    }
    catch (error) {
        index_2.default.error("Error:", error);
        res.status(500).json({ error: "Internal server error." });
    }
});
exports.voiceOtp = voiceOtp;
const confirmOtp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { otp, pinId } = req.body;
    var data = {
        api_key: process.env.TERMIIKEY,
        pin_id: pinId,
        pin: otp,
    };
    const url = `https://api.ng.termii.com/api/sms/otp/verify`;
    try {
        const response = yield fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        const result = yield response.json();
        res.status(response.status).json({
            statusCode: response.status.toString(),
            result: result,
        });
    }
    catch (error) {
        index_2.default.error(error);
        res.status(500).json({
            statusCode: "500",
            error: "Error confirming OTP.",
        });
    }
});
exports.confirmOtp = confirmOtp;
const sendPasswordresetOtp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { mobile_number } = req.body;
    const url = `https://api.ng.termii.com/api/sms/otp/send`;
    const checkuserExists = () => __awaiter(void 0, void 0, void 0, function* () {
        const connection = yield db_1.default.getConnection();
        try {
            const q = `
        SELECT * FROM healthpersonnel
        WHERE phone = ?
      `;
            const userresult = yield connection.execute(q, [mobile_number]);
            const user = userresult[0];
            if (!user.length)
                return { statusCode: "404", message: "User not found" };
            if (user.length)
                return { statusCode: "200", message: "User exists" };
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
    const userExists = yield checkuserExists();
    if (userExists.statusCode === "200") {
        const data = {
            api_key: process.env.TERMIIKEY,
            message_type: "ALPHANUMERIC",
            to: `${mobile_number}`,
            from: "N-Alert",
            channel: "dnd",
            pin_attempts: 10,
            pin_time_to_live: 5,
            pin_length: 6,
            pin_placeholder: "<>",
            message_text: `Your Opticcs Password reset code is <>. If you did not initiate this request, Please Ignore. Do not share this code with anyone.`,
            pin_type: "NUMERIC",
        };
        try {
            const response = yield fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": ["application/json", "application/json"],
                },
                body: JSON.stringify(data),
            });
            const body = yield response.json();
            if (!response.ok) {
                return res.status(response.status).json({
                    error: "An error occurred while sending OTP.",
                });
            }
            res.status(response.status).json({
                statusCode: response.status.toString(),
                result: body,
            });
        }
        catch (error) {
            res.status(500).json({ error: "An error occurred while sending OTP." });
        }
    }
    else {
        res.status(+userExists.statusCode).json(userExists);
    }
});
exports.sendPasswordresetOtp = sendPasswordresetOtp;
const confirmpasswordresetOtp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { otp, pinId } = req.body;
    var data = {
        api_key: process.env.TERMIIKEY,
        pin_id: pinId,
        pin: otp,
    };
    const url = `https://api.ng.termii.com/api/sms/otp/verify`;
    try {
        const response = yield fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": ["application/json", "application/json"],
            },
            body: JSON.stringify(data),
        });
        const body = yield response.json();
        res.status(response.status).json({
            statusCode: response.status.toString(),
            result: body,
        });
    }
    catch (error) {
        res.status(500).json({
            statusCode: "500",
            error: "Error confirming OTP.",
        });
    }
});
exports.confirmpasswordresetOtp = confirmpasswordresetOtp;
const retrypasswordresetOtp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { mobile_number, type } = req.body;
    const url = `https://control.msg91.com/api/v5/otp/retry?authkey=${process.env.MSGAUTHKEY}&retrytype=${type}&mobile=${mobile_number}`;
    const options = {
        method: "GET",
        headers: {
            accept: "application/json",
            authkey: process.env.MSGAUTHKEY,
        },
    };
    try {
        const response = yield fetch(url, options);
        const body = yield response.json();
        res.status(response.status).json({
            statusCode: response.status.toString(),
            result: body,
        });
    }
    catch (error) {
        res.status(500).json({
            statusCode: "500",
            error: "Error retrying OTP.",
        });
    }
});
exports.retrypasswordresetOtp = retrypasswordresetOtp;
const signup = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield db_1.default.getConnection();
    const { phone, state, lga, ward, healthfacility, healthworker, cadre, password, } = req.body;
    const newUser = () => __awaiter(void 0, void 0, void 0, function* () {
        const salt = bcryptjs_1.default.genSaltSync(10);
        const hashedpassword = bcryptjs_1.default.hashSync(password, salt);
        const result = yield connection.execute((0, user_1.createUserQuery)(), [
            hashedpassword,
            phone.trim(),
            state.trim(),
            lga.trim(),
            ward.trim(),
            healthfacility.trim(),
            healthworker.trim(),
            cadre.trim(),
        ]);
        return result[0];
    });
    try {
        const phonequery = `
    SELECT * FROM healthpersonnel
    WHERE phone = ?;
  `;
        const phoneresult = yield connection.execute(phonequery, [req.body.phone]);
        const phone = phoneresult[0];
        if (phone.length) {
            return res
                .status(409)
                .json({ statusCode: "409", message: "User already exists" });
        }
        // Create a new user
        const newuser = yield newUser();
        return res
            .status(201)
            .json({ statusCode: "201", message: "successful", result: newuser });
    }
    catch (err) {
        connection.release();
        res
            .status(500)
            .json({ statusCode: "500", message: "Error signing up", error: err });
    }
    finally {
        if (connection) {
            connection.release();
        }
    }
});
exports.signup = signup;
const signin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { phone } = req.body;
    const connection = yield db_1.default.getConnection();
    try {
        const q = `
    SELECT * FROM healthpersonnel
    WHERE phone = ?
  `;
        const userresult = yield connection.execute(q, [phone]);
        const user = userresult[0];
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
            expiresIn: "30d",
        });
        const { password } = user, others = __rest(user, ["password"]);
        (0, index_1.startSession)(others[0].id);
        index_2.default.info(others[0].id + "->" + "new user login");
        res.status(200).json({
            statusCode: "200",
            message: "successful",
            result: { others: others[0], accessToken },
        });
    }
    catch (err) {
        connection.release();
        index_2.default.error(err);
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
const changepassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield db_1.default.getConnection();
    const updateUser = (password) => __awaiter(void 0, void 0, void 0, function* () {
        const q = `
        UPDATE healthpersonnel
        SET password = ?
        WHERE phone = ?
          `;
        const result = yield connection.query(q, [password, req.body.phone]);
        return result[0];
    });
    try {
        const phonequery = `
    SELECT * FROM healthpersonnel
    WHERE phone = ?
  `;
        const userResult = yield connection.execute(phonequery, [req.body.phone]);
        const user = userResult[0];
        if (!user.length)
            return res
                .status(404)
                .json({ statusCode: "404", message: "User not found" });
        const isMatched = bcryptjs_1.default.compareSync(req.body.oldpassword, user[0].password);
        if (!isMatched)
            return res
                .status(400)
                .json({ statusCode: "404", message: "Old password is incorrect" });
        const salt = bcryptjs_1.default.genSaltSync(10);
        const hashedpassword = bcryptjs_1.default.hashSync(req.body.newpassword, salt);
        const newusercredentials = yield updateUser(hashedpassword);
        res.status(201).json({
            statusCode: "201",
            message: "Changed password successfully",
            result: newusercredentials,
        });
    }
    catch (err) {
        connection.release();
        res.status(500).json({
            statusCode: "500",
            message: "Error changing password",
            error: err,
        });
    }
    finally {
        if (connection) {
            connection.release();
        }
    }
});
exports.changepassword = changepassword;
const resetpassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield db_1.default.getConnection();
    const updateUser = (password) => __awaiter(void 0, void 0, void 0, function* () {
        const q = `
        UPDATE healthpersonnel
        SET password = ?
        WHERE phone = ?
          `;
        const result = yield connection.query(q, [password, req.query.phone]);
        return result[0];
    });
    try {
        const phonequery = `
    SELECT * FROM healthpersonnel
    WHERE phone = ?
  `;
        const userResult = yield connection.execute(phonequery, [req.query.phone]);
        const user = userResult[0];
        if (!user.length)
            return res
                .status(404)
                .json({ statusCode: "404", message: "User not found" });
        const salt = bcryptjs_1.default.genSaltSync(10);
        const hashedpassword = bcryptjs_1.default.hashSync(req.body.password, salt);
        const newusercredentials = yield updateUser(hashedpassword);
        res.status(201).json({
            statusCode: "201",
            message: "Changed password successfully",
            result: newusercredentials,
        });
    }
    catch (err) {
        connection.release();
        res.status(500).json({
            statusCode: "500",
            message: "Error changing password",
            error: err,
        });
    }
    finally {
        if (connection) {
            connection.release();
        }
    }
});
exports.resetpassword = resetpassword;
const signout = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield db_1.default.getConnection();
    // On client, also delete the accessToken
    try {
        const cookies = req.cookies;
        if (!(cookies === null || cookies === void 0 ? void 0 : cookies.token))
            return res.sendStatus(204); //No content
        const refreshToken = cookies.token;
        // Is refreshToken in db?
        const existingrefreshQuery = ` SELECT * FROM healthpersonnel WHERE refreshToken = ?`;
        const foundUserResult = yield connection.execute(existingrefreshQuery, [
            refreshToken,
        ]);
        const foundUser = foundUserResult[0];
        if (!foundUser) {
            res.clearCookie("token", {
                httpOnly: true,
                sameSite: "None",
                secure: true,
            });
            return res.sendStatus(204);
        }
        // Delete refreshToken in db
        foundUser.refreshtoken = "";
        const updateRefreshQuery = `UPDATE healthpersonnel
  SET refreshToken = ?
  WHERE email = ?`;
        const updatedUserResult = yield connection.execute(updateRefreshQuery, [
            foundUser.email,
            foundUser.refreshToken,
        ]);
        const updatedUser = updatedUserResult[0];
        res.clearCookie("token", {
            httpOnly: true,
            sameSite: "None",
            secure: true,
        });
        res.sendStatus(204);
    }
    catch (error) {
        res.status(500).json({ statusCode: "500", message: "Error signing out" });
    }
    finally {
        if (connection) {
            connection.release();
        }
    }
});
exports.signout = signout;
