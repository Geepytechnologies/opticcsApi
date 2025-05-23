"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Global = void 0;
const crypto_1 = __importDefault(require("crypto"));
class Global {
    static generateRandomString(length) {
        return crypto_1.default
            .randomBytes(Math.ceil(length / 2))
            .toString("hex")
            .slice(0, length);
    }
    static formatDate(date) {
        const originalDate = new Date(date);
        const year = originalDate.getFullYear();
        const month = String(originalDate.getMonth() + 1).padStart(2, "0");
        const day = String(originalDate.getDate()).padStart(2, "0");
        const formattedDate = `${year}-${month}-${day}`;
        return formattedDate;
    }
}
exports.Global = Global;
