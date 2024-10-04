"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Generators = void 0;
const crypto_1 = __importDefault(require("crypto"));
class Generators {
    static generateRandomNumberString(length) {
        return Array.from({ length }, () => Math.floor(Math.random() * 10)).join("");
    }
    static generateRandomString(length) {
        return crypto_1.default
            .randomBytes(Math.ceil(length / 2))
            .toString("hex")
            .slice(0, length);
    }
}
exports.Generators = Generators;
