"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUsers = void 0;
//@ts-nocheck
const db_1 = __importDefault(require("../../config/db"));
const getAllUsers = (req, res, next) => {
    try {
        const q = `SELECT * FROM healthadmin`;
        db_1.default.query(q, (err, result) => {
            if (err)
                return res.json(err);
            return res.json(result);
        });
    }
    catch (err) {
        next(err);
    }
};
exports.getAllUsers = getAllUsers;
