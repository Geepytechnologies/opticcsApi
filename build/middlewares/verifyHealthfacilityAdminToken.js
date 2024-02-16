"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyHealthfacilityAdminToken = void 0;
//@ts-nocheck
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const error_1 = require("./error");
const verifyHealthfacilityAdminToken = (req, res, next) => {
    const cookies = req.cookies.healthtoken;
    if (cookies) {
        jsonwebtoken_1.default.verify(cookies, process.env.REFRESH_SECRET, (err, user) => {
            if (err)
                return next((0, error_1.createError)(403, "Token is not valid!"));
            req.user = user;
            next();
        });
    }
    else {
        return next((0, error_1.createError)(401, "You are not authenticated"));
    }
};
exports.verifyHealthfacilityAdminToken = verifyHealthfacilityAdminToken;
