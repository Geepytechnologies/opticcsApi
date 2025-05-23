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
//@ts-nocheck
const node_cron_1 = __importDefault(require("node-cron"));
const db_1 = __importDefault(require("../config/db"));
const node_persist_1 = __importDefault(require("node-persist"));
const initializeStorage = () => __awaiter(void 0, void 0, void 0, function* () {
    yield node_persist_1.default.init();
});
initializeStorage();
const patientscheduledvisitremindersms = (mobile_number, firstname, lastname, date, healthfacilityname) => __awaiter(void 0, void 0, void 0, function* () {
    const url = "https://control.msg91.com/api/v5/flow/";
    const authkey = "394982AVwwiRgqf64d2116bP1";
    const template_id = "64d691aad6fc052a1473dc42";
    const body = JSON.stringify({
        template_id,
        sender: "Opticcs",
        short_url: "1",
        mobiles: mobile_number,
        firstname,
        lastname,
        date,
        healthfacilityname,
    });
    const headers = {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authkey: authkey,
    };
    try {
        const response = yield fetch(url, {
            method: "POST",
            headers,
            body,
        });
        const result = yield response.json();
        if (!response.ok) {
            throw new Error(`An error occurred while sending Message. Status Code: ${response.status}`);
        }
        return { statusCode: response.status.toString(), result };
    }
    catch (error) {
        return {
            statusCode: "500",
            error: error.message || "Internal Server Error",
        };
    }
});
const updateSchedule = (id) => __awaiter(void 0, void 0, void 0, function* () {
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
const getCloseSchedules = () => __awaiter(void 0, void 0, void 0, function* () {
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
        console.log(error);
        return { statusCode: "500", message: "error getting schedule", error };
    }
    finally {
        if (connection) {
            connection.release();
        }
    }
});
const formatDate = (date) => {
    const originalDate = new Date(date);
    const year = originalDate.getFullYear();
    const month = String(originalDate.getMonth() + 1).padStart(2, "0");
    const day = String(originalDate.getDate()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
};
const sendSms = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield getCloseSchedules();
        const users = response.result;
        for (const item of users) {
            yield patientscheduledvisitremindersms(item.phone, item.firstname, item.lastname, formatDate(item.dateto), item.healthFacility);
            yield updateSchedule(item.id);
        }
    }
    catch (error) {
        console.error("Error in sendSms:", error);
    }
    finally {
    }
});
const task = node_cron_1.default.schedule("* * * * * *", () => __awaiter(void 0, void 0, void 0, function* () {
    // Check the last execution time
    const lastExecutionTime = (yield node_persist_1.default.getItem("reminderlastExecutionTime")) || 0;
    const currentTime = new Date().getTime();
    // console.log(currentTime - lastExecutionTime, 60 * 60 * 1000);
    if (currentTime - lastExecutionTime >= 60 * 60 * 1000) {
        console.log("Running the job of reminder at..." + new Date());
        // await sendSms();
        yield node_persist_1.default.setItem("reminderlastExecutionTime", currentTime);
    }
    else {
        // console.log("Not time to run the job yet." + new Date());
    }
}));
// task.start();
