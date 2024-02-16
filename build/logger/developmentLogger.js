"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = require("winston");
const { combine, timestamp, printf, colorize } = winston_1.format;
const myFormat = printf(({ level, message, timestamp }) => {
    if (typeof message === "object") {
        message = JSON.stringify(message, null, 3);
    }
    return `${timestamp} [${level}] ${message}`;
});
const customColors = {
    error: "red",
    warn: "yellow",
    info: "green",
    debug: "white",
};
const developmentLogger = () => {
    return (0, winston_1.createLogger)({
        level: "debug",
        format: combine(colorize({ colors: customColors }), timestamp({ format: "HH:mm:ss" }), myFormat),
        transports: [new winston_1.transports.Console()],
    });
};
exports.default = developmentLogger;
