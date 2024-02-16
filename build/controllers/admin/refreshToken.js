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
exports.handleRefreshToken = void 0;
//@ts-nocheck
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const adminUser_1 = require("../../queries/admin/adminUser");
// const { getRefreshToken } = require("../queries/user");
const db_1 = __importDefault(require("../../config/db"));
const existingRefresh = (refreshToken) => {
    return new Promise((resolve, reject) => {
        db_1.default.query((0, adminUser_1.getRefreshToken)(), [refreshToken], (err, result) => {
            if (err) {
                reject(err);
            }
            else {
                const user = result[0];
                console.log({ fromrefresh: user });
                resolve(user);
            }
        });
    });
};
const handleRefreshToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cookies = req.cookies;
    if (!(cookies === null || cookies === void 0 ? void 0 : cookies.token))
        return res.sendStatus(401);
    const refreshToken = cookies.token;
    try {
        const foundUser = yield existingRefresh(refreshToken);
        if (!foundUser) {
            return res.status(403).json("User not Found");
        }
        // evaluate jwt
        jsonwebtoken_1.default.verify(refreshToken, process.env.REFRESH_SECRET, (err, user) => {
            if (err || (foundUser === null || foundUser === void 0 ? void 0 : foundUser.id) !== user.id)
                return res.sendStatus(403);
            const accessToken = jsonwebtoken_1.default.sign({ id: user.id }, process.env.ACCESS_SECRET, {
                expiresIn: "60s",
            });
            const { password } = foundUser, others = __rest(foundUser, ["password"]);
            res.json({ accessToken, others: others });
        });
    }
    catch (err) {
        console.error(err);
    }
});
exports.handleRefreshToken = handleRefreshToken;
