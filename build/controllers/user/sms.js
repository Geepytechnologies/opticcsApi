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
const sms_service_1 = require("../../services/sms.service");
const logger_1 = __importDefault(require("../../logger"));
const db_1 = __importDefault(require("../../config/db"));
const user_service_1 = require("../../services/user.service");
class SmScontroller {
    constructor() {
        this.scheduledvisitSMSforPatient = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const smsService = new sms_service_1.SmsService();
            try {
                const response = yield smsService.scheduledvisitSMSforPatient(req.body);
                const body = yield response.json();
                if (!response.ok) {
                    return res.status(response.status).json({
                        error: "An error occurred while sending OTP.",
                    });
                }
                res.status(response.status).json({
                    statusCode: response.status.toString(),
                    result: body,
                });
            }
            catch (error) {
                logger_1.default.error("Error:", error);
                res.status(500).json({ error: "Internal server error." });
            }
        });
        this.scheduledvisitmissedSMSforPatient = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const smsService = new sms_service_1.SmsService();
            try {
                const response = yield smsService.scheduledvisitmissedSMSforPatient(req.body);
                const body = yield response.json();
                if (!response.ok) {
                    return res.status(response.status).json({
                        error: "An error occurred while sending OTP.",
                    });
                }
                res.status(response.status).json({
                    statusCode: response.status.toString(),
                    result: body,
                });
            }
            catch (error) {
                logger_1.default.error("Error:", error);
                res.status(500).json({ error: "Internal server error." });
            }
        });
        this.scheduledvisitreminderSMSforPatient = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const smsService = new sms_service_1.SmsService();
            try {
                const response = yield smsService.scheduledvisitreminderSMSforPatient(req.body);
                const body = yield response.json();
                if (!response.ok) {
                    return res.status(response.status).json({
                        error: "An error occurred while sending OTP.",
                    });
                }
                res.status(response.status).json({
                    statusCode: response.status.toString(),
                    result: body,
                });
            }
            catch (error) {
                logger_1.default.error("Error:", error);
                res.status(500).json({ error: "Internal server error." });
            }
        });
        this.sendOtp = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const smsService = new sms_service_1.SmsService();
            try {
                const response = yield smsService.sendOtp(req.body);
                const body = yield response.json();
                if (!response.ok) {
                    return res.status(response.status).json({
                        error: "An error occurred while sending OTP.",
                    });
                }
                res.status(response.status).json({
                    statusCode: response.status.toString(),
                    result: body,
                });
            }
            catch (error) {
                logger_1.default.error("Error:", error);
                res.status(500).json({ error: "Internal server error." });
            }
        });
        this.voiceOtp = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const smsService = new sms_service_1.SmsService();
            try {
                const response = yield smsService.voiceOtp(req.body);
                const body = yield response.json();
                if (!response.ok) {
                    return res.status(response.status).json({
                        error: "An error occurred while sending OTP.",
                    });
                }
                res.status(response.status).json({
                    statusCode: response.status.toString(),
                    result: body,
                });
            }
            catch (error) {
                logger_1.default.error("Error:", error);
                res.status(500).json({ error: "Internal server error." });
            }
        });
        this.confirmOtp = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const smsService = new sms_service_1.SmsService();
            try {
                const response = yield smsService.confirmOtp(req.body);
                const result = yield response.json();
                res.status(response.status).json({
                    statusCode: response.status.toString(),
                    result: result,
                });
            }
            catch (error) {
                logger_1.default.error(error);
                res.status(500).json({
                    statusCode: "500",
                    error: "Error confirming OTP.",
                });
            }
        });
        this.sendPasswordresetOtp = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const smsService = new sms_service_1.SmsService();
            const connection = yield db_1.default.getConnection();
            const userService = new user_service_1.UserService(connection);
            const { mobile_number } = req.body;
            const checkuserExists = () => __awaiter(this, void 0, void 0, function* () {
                try {
                    const user = yield userService.getUserByPhone(mobile_number);
                    if (Array.isArray(user)) {
                        if (!user.length)
                            return { statusCode: "404", message: "User not found" };
                        if (user.length)
                            return { statusCode: "200", message: "User exists" };
                    }
                }
                catch (error) {
                    throw new Error(error);
                }
                finally {
                    if (connection) {
                        connection.release();
                    }
                }
            });
            const userExists = yield checkuserExists();
            if (userExists && userExists.statusCode === "200") {
                try {
                    const response = yield smsService.sendPasswordresetOtp(req.body);
                    const body = yield response.json();
                    if (!response.ok) {
                        return res.status(response.status).json({
                            error: "An error occurred while sending OTP.",
                        });
                    }
                    res.status(response.status).json({
                        statusCode: response.status.toString(),
                        result: body,
                    });
                }
                catch (error) {
                    res.status(500).json({ error: "An error occurred while sending OTP." });
                }
            }
            else {
                if (userExists) {
                    res.status(+userExists.statusCode).json(userExists);
                }
            }
        });
        this.confirmpasswordresetOtp = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const smsService = new sms_service_1.SmsService();
            try {
                const response = yield smsService.confirmpasswordresetOtp(req.body);
                const body = yield response.json();
                res.status(response.status).json({
                    statusCode: response.status.toString(),
                    result: body,
                });
            }
            catch (error) {
                res.status(500).json({
                    statusCode: "500",
                    error: "Error confirming OTP.",
                });
            }
        });
    }
}
exports.default = new SmScontroller();
