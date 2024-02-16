"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const developmentLogger_1 = __importDefault(require("./developmentLogger"));
const productionLogger_1 = __importDefault(require("./productionLogger"));
let logger = null; // Adjust the type based on your logger implementation
const environment = process.env.NODE_ENV || "development";
if (environment === "production") {
    logger = (0, productionLogger_1.default)();
}
if (environment === "development") {
    logger = (0, developmentLogger_1.default)();
}
exports.default = logger;
