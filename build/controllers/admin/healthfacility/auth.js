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
exports.resetpassword = exports.generatehealthfacilitydetails = exports.handleRefreshToken = exports.signout = exports.signin = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const healthfacility_service_1 = require("../../../services/healthfacility.service");
const HealthFacilityRepository_1 = require("../../../repositories/HealthFacilityRepository");
const BaseRepository_1 = __importDefault(require("../../../repositories/BaseRepository"));
const generatehealthfacilitydetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const connection = yield BaseRepository_1.default.getConnection();
        const hfRepository = new HealthFacilityRepository_1.HealthFacilityRepository(connection);
        const hfservice = new healthfacility_service_1.HealthfacilityService(hfRepository);
        const credentials = yield new Promise((resolve, reject) => {
            hfservice.generateUniqueCredentials((err, data) => {
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
exports.generatehealthfacilitydetails = generatehealthfacilitydetails;
const signin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield BaseRepository_1.default.getConnection();
    const hfRepository = new HealthFacilityRepository_1.HealthFacilityRepository(connection);
    const { userid } = req.body;
    const existinguserid = () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield hfRepository.getHealthfacilityUserAccountByUserID(userid);
        return result[0];
    });
    // logger.info(existinguserid);
    const createRefresh = (refreshtoken) => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield hfRepository.UpdateUserRefreshToken(refreshtoken, userid);
        return result[0];
    });
    try {
        const user = yield existinguserid();
        if (Array.isArray(user)) {
            if (!user.length)
                return res
                    .status(404)
                    .json({ statusCode: "404", message: "User not found" });
            const userData = user[0];
            const isMatched = bcryptjs_1.default.compareSync(req.body.password, userData.password);
            if (!isMatched)
                return res
                    .status(400)
                    .json({ statusCode: "400", message: "wrong credentials" });
            const accesskey = process.env.ACCESS_SECRET || "";
            const refreshkey = process.env.REFRESH_SECRET || "";
            //access Token
            const accessToken = jsonwebtoken_1.default.sign({ id: userData.id }, accesskey, {
                expiresIn: "5m",
            });
            //refresh Token
            const refreshToken = jsonwebtoken_1.default.sign({ id: userData.id }, refreshkey, {
                expiresIn: "30m",
            });
            //save refresh token to the user model
            const updatedUser = yield createRefresh(refreshToken);
            const newuser = yield existinguserid();
            // Creates Secure Cookie with refresh token
            res.cookie("healthtoken", refreshToken, {
                httpOnly: false,
                secure: false,
                sameSite: "none",
                maxAge: 6 * 24 * 60 * 60 * 1000,
            });
            if (Array.isArray(newuser)) {
                const _a = newuser[0], { password, refreshtoken } = _a, others = __rest(_a, ["password", "refreshtoken"]);
                console.log("signinsuccessful:", others);
                res.status(200).json({
                    statusCode: "200",
                    message: "successful",
                    result: { others: others, accessToken },
                });
            }
        }
    }
    catch (err) {
        console.log({ errorfromhfsignin: err });
        res
            .status(500)
            .json({ statusCode: "500", message: "Error signing in", error: err });
    }
});
exports.signin = signin;
const handleRefreshToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield BaseRepository_1.default.getConnection();
    const hfRepository = new HealthFacilityRepository_1.HealthFacilityRepository(connection);
    const existingRefresh = (refreshToken) => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield hfRepository.getUserWithRefreshToken(refreshToken);
        return result[0];
    });
    const cookies = req.cookies;
    if (!(cookies === null || cookies === void 0 ? void 0 : cookies.healthtoken))
        return res.sendStatus(401);
    const refreshToken = cookies.healthtoken;
    try {
        const foundUser = yield existingRefresh(refreshToken);
        if (Array.isArray(foundUser) && foundUser.length === 0) {
            return res.status(403).json("User not Found");
        }
        const refreshSecret = process.env.REFRESH_SECRET || "";
        const accessSecret = process.env.ACCESS_SECRET || "";
        // Verify JWT
        jsonwebtoken_1.default.verify(refreshToken, refreshSecret, (err, user) => {
            var _a;
            if (err ||
                !Array.isArray(foundUser) ||
                foundUser.length === 0 ||
                !("id" in foundUser[0]) ||
                ((_a = foundUser[0]) === null || _a === void 0 ? void 0 : _a.id) !== user.id) {
                return res.sendStatus(403);
            }
            else {
                const accessToken = jsonwebtoken_1.default.sign({ id: user.id }, accessSecret, {
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
});
exports.handleRefreshToken = handleRefreshToken;
const signout = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // On client, also delete the accessToken
    try {
        const connection = yield BaseRepository_1.default.getConnection();
        const hfRepository = new HealthFacilityRepository_1.HealthFacilityRepository(connection);
        const cookies = req.cookies;
        if (!(cookies === null || cookies === void 0 ? void 0 : cookies.healthtoken))
            return res.sendStatus(204); //No content
        const refreshtoken = cookies.healthtoken;
        // Is refreshToken in db?
        const foundUserResult = yield hfRepository.getUserWithRefreshToken(refreshtoken);
        const foundUser = foundUserResult[0];
        if (!foundUser) {
            res.clearCookie("healthtoken", {
            // httpOnly: true,
            // sameSite: "None",
            // secure: true,
            });
            return res.sendStatus(204);
        }
        const updateRefreshQuery = `UPDATE healthfacilityadmin
     SET refreshtoken = ? WHERE id = ?`;
        const userId = req.user && req.user.id;
        if (userId) {
            const updatedUserResult = yield hfRepository.UpdateUserRefreshToken(null, userId);
            const updatedUser = updatedUserResult[0];
        }
        res.clearCookie("healthtoken", {
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
});
exports.signout = signout;
const resetpassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield BaseRepository_1.default.getConnection();
    const hfRepository = new HealthFacilityRepository_1.HealthFacilityRepository(connection);
    const { oldpassword, newpassword } = req.body;
    const salt = bcryptjs_1.default.genSaltSync(10);
    const hashedpassword = bcryptjs_1.default.hashSync(newpassword, salt);
    const userId = req.user && req.user.id;
    const existinguserid = () => __awaiter(void 0, void 0, void 0, function* () {
        if (userId) {
            const result = yield hfRepository.getHealthfacilityUserAccountByID(userId);
            return result[0];
        }
    });
    const createNewpassword = () => __awaiter(void 0, void 0, void 0, function* () {
        if (userId) {
            const result = yield hfRepository.UpdateUserPassword(hashedpassword, userId);
            return result[0];
        }
    });
    try {
        const user = yield existinguserid();
        if (Array.isArray(user)) {
            if (!user.length)
                return res
                    .status(404)
                    .json({ statusCode: "404", message: "User not found" });
            const userData = user[0];
            const isMatched = bcryptjs_1.default.compareSync(oldpassword, userData.password);
            if (!isMatched)
                return res
                    .status(400)
                    .json({ statusCode: "400", message: "Wrong password" });
        }
        //save new password to the user model
        const newuser = yield createNewpassword();
        res.status(201).json({
            statusCode: "201",
            message: "password Changed",
        });
    }
    catch (err) {
        res.status(500).json({
            statusCode: "500",
            message: "Error Resetting password",
            error: err,
        });
    }
});
exports.resetpassword = resetpassword;
