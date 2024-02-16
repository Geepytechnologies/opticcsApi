"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = require("winston");
const path_1 = __importDefault(require("path"));
const { combine, timestamp, printf } = winston_1.format;
const myFormat = printf(({ level, message, timestamp }) => {
    if (typeof message === "object") {
        message = JSON.stringify(message, null, 3);
    }
    return `${timestamp} [${level}] ${message}`;
});
const logsFolder = "opticcslogs";
const productionLogger = () => {
    return (0, winston_1.createLogger)({
        level: "debug",
        format: combine(timestamp({ format: "HH:mm:ss" }), myFormat),
        transports: [
            new winston_1.transports.Console(),
            new winston_1.transports.File({
                filename: path_1.default.join(logsFolder, "error.log"),
                level: "error",
            }),
            new winston_1.transports.File({ filename: path_1.default.join(logsFolder, "combined.log") }),
        ],
    });
};
exports.default = productionLogger;
