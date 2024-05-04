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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SmsService = void 0;
class SmsService {
    constructor() {
        this.sendOtp = (smsdata) => __awaiter(this, void 0, void 0, function* () {
            const { name, mobile_number } = smsdata;
            const url = `https://api.ng.termii.com/api/sms/otp/send`;
            const data = {
                api_key: process.env.TERMIIKEY,
                message_type: "ALPHANUMERIC",
                to: `${mobile_number}`,
                from: "N-Alert",
                channel: "dnd",
                pin_attempts: 10,
                pin_time_to_live: 5,
                pin_length: 6,
                pin_placeholder: "<>",
                message_text: `Hi ${name}, Your Opticcs authentication pin is <>. If you did not initiate this request, Please Ignore. Do not share this code with anyone.`,
                pin_type: "NUMERIC",
            };
            try {
                const response = yield fetch(url, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                });
                return response;
            }
            catch (error) {
                throw new Error(error);
            }
        });
        this.voiceOtp = (smsdata) => __awaiter(this, void 0, void 0, function* () {
            const { mobile_number } = smsdata;
            const url = `https://api.ng.termii.com/api/sms/otp/send/voice`;
            const data = {
                api_key: process.env.TERMIIKEY,
                phone_number: `${mobile_number}`,
                pin_attempts: 10,
                pin_time_to_live: 5,
                pin_length: 6,
            };
            try {
                const response = yield fetch(url, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                });
                return response;
            }
            catch (error) {
                throw new Error(error);
            }
        });
        this.confirmOtp = (smsdata) => __awaiter(this, void 0, void 0, function* () {
            const { otp, pinId } = smsdata;
            var data = {
                api_key: process.env.TERMIIKEY,
                pin_id: pinId,
                pin: otp,
            };
            const url = `https://api.ng.termii.com/api/sms/otp/verify`;
            try {
                const response = yield fetch(url, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                });
                return response;
            }
            catch (error) {
                throw new Error(error);
            }
        });
        this.sendPasswordresetOtp = (smsdata) => __awaiter(this, void 0, void 0, function* () {
            const { mobile_number } = smsdata;
            const url = `https://api.ng.termii.com/api/sms/otp/send`;
            const data = {
                api_key: process.env.TERMIIKEY,
                message_type: "ALPHANUMERIC",
                to: `${mobile_number}`,
                from: "N-Alert",
                channel: "dnd",
                pin_attempts: 10,
                pin_time_to_live: 5,
                pin_length: 6,
                pin_placeholder: "<>",
                message_text: `Your Opticcs Password reset code is <>. If you did not initiate this request, Please Ignore. Do not share this code with anyone.`,
                pin_type: "NUMERIC",
            };
            try {
                const response = yield fetch(url, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                });
                return response;
            }
            catch (error) {
                throw new Error(error);
            }
        });
        this.confirmpasswordresetOtp = (smsdata) => __awaiter(this, void 0, void 0, function* () {
            const { otp, pinId } = smsdata;
            var data = {
                api_key: process.env.TERMIIKEY,
                pin_id: pinId,
                pin: otp,
            };
            const url = `https://api.ng.termii.com/api/sms/otp/verify`;
            try {
                const response = yield fetch(url, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                });
                return response;
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    scheduledvisitSMSforPatient(smsdata) {
        return __awaiter(this, void 0, void 0, function* () {
            const { mobile_number, firstname, lastname, day, date, healthfacilityname, } = smsdata;
            const url = `https://api.ng.termii.com/api/sms/send`;
            const data = {
                api_key: process.env.TERMIIKEY,
                type: "plain",
                to: `${mobile_number}`,
                from: "opticcs",
                channel: "generic",
                sms: `${firstname} ${lastname} you have been scheduled for antenatal visit on ${day} ${date} at ${healthfacilityname}`,
            };
            try {
                const response = yield fetch(url, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                });
                return response;
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    scheduledvisitmissedSMSforPatient(smsdata) {
        return __awaiter(this, void 0, void 0, function* () {
            const { mobile_number, firstname, lastname, day, date, healthfacilityname, } = smsdata;
            const url = `https://api.ng.termii.com/api/sms/send`;
            const data = {
                api_key: process.env.TERMIIKEY,
                type: "plain",
                to: `${mobile_number}`,
                from: "opticcs",
                channel: "generic",
                sms: `${firstname} ${lastname} You missed your scheduled antenatal visit on ${day}, ${date} at ${healthfacilityname}`,
            };
            try {
                const response = yield fetch(url, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                });
                return response;
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    scheduledvisitreminderSMSforPatient(smsdata) {
        return __awaiter(this, void 0, void 0, function* () {
            const { mobile_number, firstname, lastname, date, healthfacilityname } = smsdata;
            const url = `https://api.ng.termii.com/api/sms/send`;
            const data = {
                api_key: process.env.TERMIIKEY,
                type: "plain",
                to: `${mobile_number}`,
                from: "opticcs",
                channel: "generic",
                sms: `${firstname} ${lastname} this is to remind you of your scheduled antenatal visit tomorrow ${date} at ${healthfacilityname}`,
            };
            try {
                const response = yield fetch(url, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                });
                return response;
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
}
exports.SmsService = SmsService;
