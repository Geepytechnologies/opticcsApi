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
exports.missedscheduleSMS = exports.MissedSchedule = void 0;
//@ts-nocheck
const node_cron_1 = __importDefault(require("node-cron"));
const db_1 = __importDefault(require("../config/db"));
const node_persist_1 = __importDefault(require("node-persist"));
const logger_1 = __importDefault(require("../logger"));
const global_1 = require("../utils/global");
const sms_service_1 = require("./sms.service");
const initializeStorage = () => __awaiter(void 0, void 0, void 0, function* () {
    yield node_persist_1.default.init();
});
initializeStorage();
const SMSservice = new sms_service_1.SmsService();
class MissedSchedule {
    static stop() {
        if (this.task) {
            _a.task.stop();
            logger_1.default.log("Task stopped.");
        }
        else {
            logger_1.default.log("No task to stop.");
        }
    }
}
exports.MissedSchedule = MissedSchedule;
_a = MissedSchedule;
MissedSchedule.updateSchedule = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield db_1.default.getConnection();
    try {
        const q = `UPDATE schedule
      SET
        missed = true,
        missedsms = true
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
MissedSchedule.getMissedSchedules = () => __awaiter(void 0, void 0, void 0, function* () {
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
    WHERE schedule.missedsms = false AND 
    schedule.dateto < CURDATE();;      
      `;
        const result = yield connection.execute(q);
        return { statusCode: "200", message: "successful", result: result[0] };
    }
    catch (error) {
        return { statusCode: "500", message: "error getting schedule", error };
    }
    finally {
        if (connection) {
            connection.release();
        }
    }
});
// cron.schedule("05 * * * * *", async () => {
//   console.log("task at date");
//   console.log({ next: nextExecutionTime, current: currentTime });
//   console.log("missed");
//   let currentDate = new Date();
//   // Set hours, minutes, seconds, and milliseconds to 7am
//   const nextScheduleTime = currentDate.setHours(7, 0, 0, 0).getTime();
//   // Check the last execution time
//   const nextExecutionTime =
//     (await storage.getItem("remindernextExecutionTime")) || 0;
//   const currentTime = new Date().getTime();
//   // console.log(currentTime - lastExecutionTime, 60 * 60 * 1000);
//   if (currentTime >= nextExecutionTime) {
//     console.log("Running the job of reminder at..." + new Date());
//     await sendSms();
//     await storage.setItem("remindernextExecutionTime", nextScheduleTime);
//   } else {
//     console.log("Not time to run the job yet." + new Date());
//   }
// });
const sendSms = () => __awaiter(void 0, void 0, void 0, function* () {
    const daysOfTheweek = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];
    try {
        const response = yield MissedSchedule.getMissedSchedules();
        const users = response.result;
        for (const item of users) {
            const day = item.dateto.getDay();
            const actualDate = daysOfTheweek[day];
            const smsdata = {
                mobile_number: item.phone,
                firstname: item.firstname,
                lastname: item.lastname,
                day: actualDate,
                date: global_1.Global.formatDate(item.dateto),
                healthfacilityname: item.healthFacility,
            };
            const res = yield SMSservice.scheduledvisitmissedSMSforPatient(smsdata);
            if (res.status == 200) {
                yield MissedSchedule.updateSchedule(item.id);
            }
        }
    }
    catch (error) {
        console.error("Error in sendSms:", error);
    }
    finally {
    }
});
exports.missedscheduleSMS = node_cron_1.default.schedule("00 8 * * *", () => __awaiter(void 0, void 0, void 0, function* () {
    const date = new Date();
    yield sendSms();
    logger_1.default.info(`Ran the missedscheduleSMS task on ` + date.toUTCString());
}));
