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
exports.retrypasswordresetOtp = exports.confirmpasswordresetOtp = exports.sendPasswordresetOtp = exports.changepassword = exports.resetpassword = exports.handleRefreshToken = exports.signout = exports.signin = void 0;
//@ts-nocheck
const db_1 = __importDefault(require("../../../config/db"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const request_1 = __importDefault(require("request"));
const NationalRepository_1 = require("../../../repositories/NationalRepository");
const BaseRepository_1 = __importDefault(require("../../../repositories/BaseRepository"));
// const sendPasswordresetOtp = async (req, res) => {
//   const { mobile_number } = req.body;
//   const checkuserExists = async () => {
//     const connection = await db.getConnection();
//     try {
//       const q = `
//       SELECT * FROM nationaladmin
//       WHERE phone = ?
//     `;
//       const userresult = await connection.execute(q, [mobile_number]);
//       const user = userresult[0];
//       if (!user.length) return { statusCode: 404, message: "User not found" };
//       if (user.length) return { statusCode: 200, message: "User exists" };
//     } catch (error) {
//       throw new Error(error);
//     } finally {
//       connection.release();
//     }
//   };
//   const options = {
//     method: "POST",
//     url: `https://control.msg91.com/api/v5/otp?template_id=${process.env.MSGPASSWORDTEMPLATEID}&mobile=${mobile_number}&otp_length=6&otp_expiry=5`,
//     headers: {
//       accept: "application/json",
//       "content-type": "application/json",
//       authkey: process.env.MSGAUTHKEY,
//     },
//     // body: { name: name },
//     json: true,
//   };
//   const userExists = await checkuserExists();
//   if (userExists.statusCode == 200) {
//     request(options, (error, response, body) => {
//       if (error) {
//         return res
//           .status(response.statusCode)
//           .json({ error: "An error occurred while sending OTP." });
//       }
//       res.status(response.statusCode).json({
//         statusCode: response.statusCode.toString(),
//         result: body,
//       });
//     });
//   } else {
//     res.status(userExists.statusCode).json(userExists);
//   }
// };
const sendPasswordresetOtp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { mobile_number } = req.body;
    const checkUserExists = () => __awaiter(void 0, void 0, void 0, function* () {
        const connection = yield db_1.default.getConnection();
        try {
            const q = `
        SELECT * FROM nationaladmin
        WHERE phone = ?
      `;
            const userResult = yield connection.execute(q, [mobile_number]);
            const user = userResult[0];
            if (!user.length)
                return { statusCode: 404, message: "User not found" };
            if (user.length)
                return { statusCode: 200, message: "User exists" };
        }
        catch (error) {
            throw new Error(error);
        }
        finally {
            connection.release();
        }
    });
    const userExists = yield checkUserExists();
    if (userExists.statusCode === 200) {
        try {
            const response = yield fetch(`https://control.msg91.com/api/v5/otp?template_id=${process.env.MSGPASSWORDTEMPLATEID}&mobile=${mobile_number}&otp_length=6&otp_expiry=5`, {
                method: "POST",
                headers: {
                    accept: "application/json",
                    "content-type": "application/json",
                    authkey: process.env.MSGAUTHKEY,
                },
            });
            if (!response.ok) {
                return res
                    .status(response.status)
                    .json({ error: "An error occurred while sending OTP." });
            }
            const body = yield response.json();
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
        res.status(userExists.statusCode).json(userExists);
    }
});
exports.sendPasswordresetOtp = sendPasswordresetOtp;
const confirmpasswordresetOtp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { otp, mobile_number } = req.body;
    const options = {
        method: "GET",
        url: `https://control.msg91.com/api/v5/otp/verify?otp=${otp}&mobile=${mobile_number}`,
        headers: { accept: "application/json", authkey: process.env.MSGAUTHKEY },
    };
    try {
        (0, request_1.default)(options, (error, response, body) => {
            if (error) {
                return res.status(response.statusCode).json({
                    statusCode: response.statusCode.toString(),
                    error: "Error confirming OTP.",
                });
            }
            res.status(response.statusCode).json({
                statusCode: response.statusCode.toString(),
                result: JSON.parse(body),
            });
        });
    }
    catch (err) {
        res.status(500).json(err);
    }
});
exports.confirmpasswordresetOtp = confirmpasswordresetOtp;
const retrypasswordresetOtp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { mobile_number, type } = req.body;
    const options = {
        method: "GET",
        url: `https://control.msg91.com/api/v5/otp/retry?authkey=${process.env.MSGAUTHKEY}&retrytype=${type}&mobile=${mobile_number}`,
        headers: { accept: "application/json", authkey: process.env.MSGAUTHKEY },
    };
    (0, request_1.default)(options, (error, response, body) => {
        if (error) {
            return res.status(response.statusCode).json({
                statusCode: response.statusCode.toString(),
                error: "error retrying OTP.",
            });
        }
        res.status(response.statusCode).json({
            statusCode: response.statusCode.toString(),
            result: JSON.parse(body),
        });
    });
});
exports.retrypasswordresetOtp = retrypasswordresetOtp;
// const signin = async (req, res, next) => {
//   const connection = await db.getConnection();
//   const { userid } = req.body;
//   const existinguserid = async () => {
//     const q = `SELECT * FROM nationaladmin WHERE userid = ?`;
//     const result = await connection.execute(q, [userid]);
//     return result[0];
//   };
//   const createRefresh = async (refreshToken) => {
//     const q = `UPDATE nationaladmin
//         SET refreshtoken = ?
//         WHERE userid = ?`;
//     const result = await connection.execute(q, [refreshToken, userid]);
//     return result[0];
//   };
//   try {
//     const user = await existinguserid();
//     if (!user.length)
//       return res
//         .status(404)
//         .json({ statusCode: "404", message: "User not found" });
//     const isMatched = bcrypt.compareSync(req.body.password, user[0].password);
//     if (!isMatched)
//       return res
//         .status(400)
//         .json({ statusCode: "400", message: "wrong credentials" });
//     //access Token
//     const accessToken = jwt.sign(
//       { id: user[0].id },
//       process.env.ACCESS_SECRET,
//       {
//         expiresIn: "5m",
//       }
//     );
//     //refresh Token
//     const refreshToken = jwt.sign(
//       { id: user[0].id },
//       process.env.REFRESH_SECRET,
//       {
//         expiresIn: "30m",
//       }
//     );
//     //save refresh token to the user model
//     await createRefresh(refreshToken);
//     const newuser = await existinguserid();
//     // Creates Secure Cookie with refresh token
//     res.cookie("nationaltoken", refreshToken, {
//       httpOnly: false,
//       secure: true,
//       sameSite: "None",
//       maxAge: 10 * 24 * 60 * 60 * 1000,
//     });
//     const { password, refreshtoken, ...others } = newuser[0];
//     res.status(200).json({
//       statusCode: "200",
//       message: "successful",
//       result: { others: others, accessToken },
//     });
//   } catch (err) {
//     connection.rollback();
//     res
//       .status(500)
//       .json({ statusCode: "500", message: "Error signing in", error: err });
//     next(err);
//   } finally {
//     if (connection) {
//       connection.release();
//     }
//   }
// };
const signin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield BaseRepository_1.default.getConnection();
    const nationalrepository = new NationalRepository_1.NationalRepository(connection);
    const { userid } = req.body;
    const existinguserid = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const result = yield nationalrepository.getNationalAdminByUserID(userid);
            return result[0];
        }
        catch (error) { }
    });
    const createRefresh = (refreshToken) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield nationalrepository.createRefresh(refreshToken, userid);
        }
        catch (err) {
            throw err;
        }
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
        // Access Token
        const accessToken = jsonwebtoken_1.default.sign({ id: user[0].id }, process.env.ACCESS_SECRET, {
            expiresIn: "30m",
        });
        // Refresh Token
        const refreshToken = jsonwebtoken_1.default.sign({ id: user[0].id }, process.env.REFRESH_SECRET, {
            expiresIn: "5d",
        });
        // Save refresh token to the user model
        yield createRefresh(refreshToken);
        // Creates Secure Cookie with refresh token
        res.cookie("nationaltoken", refreshToken, {
            httpOnly: false,
            secure: true,
            sameSite: "None",
            // domain: ".vercel.app",
            maxAge: 6 * 24 * 60 * 60 * 1000,
        });
        const _a = user[0], { password, refreshtoken } = _a, others = __rest(_a, ["password", "refreshtoken"]);
        res.status(200).json({
            statusCode: "200",
            message: "successful",
            result: { others: others, accessToken },
        });
    }
    catch (err) {
        res.status(500).json({
            statusCode: "500",
            message: "Error signing in",
            error: err.message || "Internal server error",
        });
        next(err);
    }
});
exports.signin = signin;
const resetpassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield db_1.default.getConnection();
    const updateUser = (password) => __awaiter(void 0, void 0, void 0, function* () {
        const q = `
        UPDATE nationaladmin
        SET password = ?
        WHERE phone = ?
          `;
        const result = yield connection.query(q, [password, req.body.phone]);
        return result[0];
    });
    try {
        const phonequery = `
    SELECT * FROM nationaladmin
    WHERE phone = ?
  `;
        const userResult = yield connection.execute(phonequery, [req.body.phone]);
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
const changepassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield db_1.default.getConnection();
    const { oldpassword, newpassword } = req.body;
    const salt = bcryptjs_1.default.genSaltSync(10);
    const hashedpassword = bcryptjs_1.default.hashSync(newpassword, salt);
    const existinguserid = () => __awaiter(void 0, void 0, void 0, function* () {
        const q = `SELECT * FROM nationaladmin WHERE id = ?`;
        const result = yield connection.execute(q, [req.user.id]);
        return result[0];
    });
    const createNewpassword = () => __awaiter(void 0, void 0, void 0, function* () {
        const q = `UPDATE nationaladmin
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
exports.changepassword = changepassword;
// const handleRefreshToken = async (req, res) => {
//   const connection = await db.getConnection();
//   const existingRefresh = async (refreshToken) => {
//     const q = `SELECT * FROM nationaladmin WHERE refreshToken = ?`;
//     const result = await connection.execute(q, [refreshToken]);
//     return result[0];
//   };
//   const cookies = req.cookies;
//   if (!cookies?.nationaltoken) return res.sendStatus(401);
//   const refreshToken = cookies.nationaltoken;
//   try {
//     const foundUser = await existingRefresh(refreshToken);
//     if (!foundUser.length) {
//       return res.status(403).json("User not Found");
//     }
//     // evaluate jwt
//     jwt.verify(refreshToken, process.env.REFRESH_SECRET, (err, user) => {
//       if (err || foundUser[0]?.id !== user.id) return res.sendStatus(403);
//       const accessToken = jwt.sign({ id: user.id }, process.env.ACCESS_SECRET, {
//         expiresIn: "5m",
//       });
//       const { password, refreshtoken, ...others } = foundUser[0];
//       res.json({ accessToken, others: others });
//       // connection.release();
//     });
//   } catch (err) {
//     res.status(500).json({ message: "error refreshing token", error: err });
//   } finally {
//     if (connection) {
//       connection.release();
//     }
//   }
// };
const handleRefreshToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield db_1.default.getConnection();
    const existingRefresh = (refreshToken) => __awaiter(void 0, void 0, void 0, function* () {
        const q = `SELECT * FROM nationaladmin WHERE refreshToken = ?`;
        const result = yield connection.execute(q, [refreshToken]);
        return result[0];
    });
    const cookies = req.cookies;
    if (!(cookies === null || cookies === void 0 ? void 0 : cookies.nationaltoken))
        return res.sendStatus(401);
    const refreshToken = cookies.nationaltoken;
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
        if (!(cookies === null || cookies === void 0 ? void 0 : cookies.nationaltoken))
            return res.sendStatus(204); //No content
        const refreshtoken = cookies.nationaltoken;
        // Is refreshToken in db?
        const existingrefreshQuery = ` SELECT * FROM nationaladmin WHERE refreshtoken = ?`;
        const foundUserResult = yield connection.execute(existingrefreshQuery, [
            refreshtoken,
        ]);
        const foundUser = foundUserResult[0];
        if (!foundUser) {
            res.clearCookie("nationaltoken", {
                httpOnly: true,
                sameSite: "None",
                secure: true,
            });
            return res.sendStatus(204);
        }
        const updateRefreshQuery = `UPDATE nationaladmin
     SET refreshtoken = ? WHERE id = ?`;
        const updatedUserResult = yield connection.execute(updateRefreshQuery, [
            null,
            req.user.id,
        ]);
        const updatedUser = updatedUserResult[0];
        res.clearCookie("nationaltoken", {
            sameSite: "None",
            secure: true,
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
