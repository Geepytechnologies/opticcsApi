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
const promise_1 = __importDefault(require("mysql2/promise"));
const logger_1 = __importDefault(require("../logger"));
const db = promise_1.default.createPool({
    host: process.env.MYSQLHOST || "localhost",
    port: Number(process.env.MYSQLPORT) || 3306,
    user: process.env.MYSQLUSER || "root",
    password: process.env.MYSQLPASSWORD || "",
    database: process.env.MYSQLDATABASE || "your_database_name",
    waitForConnections: true,
    connectionLimit: 30,
    maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
    idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0,
});
// Event listener for when a connection is acquired
db.on("acquire", function (connection) {
    console.log("Connection %d acquired", connection.threadId);
});
// Event listener for when a connection is released
db.on("release", function (connection) {
    console.log("Connection %d released", connection.threadId);
});
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield db.query("SELECT 1");
        logger_1.default.info("Connected to MySQL pool!");
    }
    catch (error) {
        logger_1.default.error("Failed to connect to MySQL:", error.message);
    }
}))();
exports.default = db;