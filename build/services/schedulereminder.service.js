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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.reminderSMS = exports.ScheduleReminder = void 0;
// @ts-nocheck
const node_cron_1 = __importDefault(require("node-cron"));
const db_1 = __importDefault(require("../config/db"));
const node_persist_1 = __importDefault(require("node-persist"));
const sms_service_1 = require("./sms.service");
const logger_1 = __importDefault(require("../logger"));
const global_1 = require("../utils/global");
const initializeStorage = () => __awaiter(void 0, void 0, void 0, function* () {
    yield node_persist_1.default.init();
});
initializeStorage();
const SMSservice = new sms_service_1.SmsService();
class ScheduleReminder {
    static stop() {
        if (this.task) {
            _a.task.stop();
            console.log("Task stopped.");
        }
        else {
            console.log("No task to stop.");
        }
    }
}
exports.ScheduleReminder = ScheduleReminder;
_a = ScheduleReminder;
ScheduleReminder.updateSchedule = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield db_1.default.getConnection();
    try {
        const q = `UPDATE schedule
        SET
          remindersms = true
        WHERE id = ?;
        `;
        const result = yield connection.execute(q, [id]);
        return { statusCode: "200", message: "successful", result: result[0] };
    }
    catch (error) {
        return error;
    }
    finally {
        if (connection) {
            connection.release();
        }
    }
});
ScheduleReminder.getCloseSchedules = () => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield db_1.default.getConnection();
    try {
        const q = `SELECT
      schedule.*,
      healthpersonnel.healthFacility,
      healthpersonnel.state,
      healthpersonnel.lga
    FROM
      schedule
    LEFT JOIN
      healthpersonnel ON schedule.healthpersonnel_id = healthpersonnel.id
    WHERE schedule.remindersms = false AND 
      DATE(schedule.datefrom) = DATE_SUB(CURDATE(), INTERVAL 1 DAY);      
      `;
        const result = yield connection.execute(q);
        console.log(result[0]);
        return { statusCode: "200", message: "successful", result: result[0] };
    }
    catch (error) {
        logger_1.default.error("error from getCloseSchedules" + " :" + error);
        return { statusCode: "500", message: "error getting schedule", error };
    }
    finally {
        if (connection) {
            connection.release();
        }
    }
});
const sendSms = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield ScheduleReminder.getCloseSchedules();
        const users = response.result;
        for (const item of users) {
            const smsdata = {
                mobile_number: item.phone,
                firstname: item.firstname,
                lastname: item.lastname,
                date: global_1.Global.formatDate(item.dateto),
                healthfacilityname: item.healthFacility,
                state: item.state,
            };
            const res = yield SMSservice.scheduledvisitreminderSMSforPatient(smsdata);
            console.log(res);
            if (res.status == 200) {
                yield ScheduleReminder.updateSchedule(item.id);
            }
        }
    }
    catch (error) {
        console.error("Error in sendSms:", error);
    }
    finally {
    }
});
exports.reminderSMS = node_cron_1.default.schedule("00 8 * * *", () => __awaiter(void 0, void 0, void 0, function* () {
    const date = new Date();
    yield sendSms();
    logger_1.default.info(`Ran the reminderSMS task on ` + date.toUTCString());
}));
