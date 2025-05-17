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
exports.expressAuthentication = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const expressAuthentication = (request, securityName, scopes) => __awaiter(void 0, void 0, void 0, function* () {
    if (securityName === "jwt") {
        const authHeader = request.header("Authorization");
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            throw new Error("Authorization denied");
        }
        const token = authHeader.split(" ")[1];
        return new Promise((resolve, reject) => {
            jsonwebtoken_1.default.verify(token, process.env.ACCESS_SECRET, (err, decoded) => {
                if (err) {
                    return reject(new Error("Invalid token"));
                }
                const user = decoded;
                // Role-based access control with scopes
                if ((scopes === null || scopes === void 0 ? void 0 : scopes.includes("admin")) && !user.isAdmin) {
                    return reject(new Error("Admin access required"));
                }
                resolve(user);
            });
        });
    }
    throw new Error("Unsupported security name");
});
exports.expressAuthentication = expressAuthentication;
