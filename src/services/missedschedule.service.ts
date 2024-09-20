//@ts-nocheck
import cron from "node-cron";
import db from "../config/db";
import storage from "node-persist";
import logger from "../logger";
import { Global } from "../utils/global";
import { SmsService } from "./sms.service";

const initializeStorage = async () => {
  await storage.init();
};

initializeStorage();

const SMSservice = new SmsService();

export class MissedSchedule {
  static task;

  static stop() {
    if (this.task) {
      MissedSchedule.task.stop();
      logger.log("Task stopped.");
    } else {
      logger.log("No task to stop.");
    }
  }
  static updateSchedule = async (id: string) => {
    const connection = await db.getConnection();
    try {
      const q = `UPDATE schedule
      SET
        missed = true,
        missedsms = true
      WHERE id = ?;
      `;
      const result = await connection.execute(q, [id]);
      return { statusCode: "200", message: "successful", result: result[0] };
    } catch (error) {
      return error;
    } finally {
      if (connection) {
        connection.release();
      }
    }
  };

  static getMissedSchedules = async () => {
    const connection = await db.getConnection();
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
      const result = await connection.execute(q);
      return { statusCode: "200", message: "successful", result: result[0] };
    } catch (error) {
      return { statusCode: "500", message: "error getting schedule", error };
    } finally {
      if (connection) {
        connection.release();
      }
    }
  };
}
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
const sendSms = async () => {
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
    const response = await MissedSchedule.getMissedSchedules();
    const users = response.result;
    if (Array.isArray(users)) {
      for (const item of users) {
        const day = item.dateto.getDay();
        const actualDate = daysOfTheweek[day];
        const smsdata = {
          mobile_number: item.phone,
          firstname: item.firstname,

          lastname: item.lastname,
          day: actualDate,
          date: Global.formatDate(item.dateto),
          healthfacilityname: item.healthFacility,
        };
        const res = await SMSservice.scheduledvisitmissedSMSforPatient(smsdata);
        if (res.status == 200) {
          await MissedSchedule.updateSchedule(item.id);
        }
      }
    }
  } catch (error) {
    console.error("Error in sendSms:", error);
  } finally {
  }
};

export const missedscheduleSMS = cron.schedule("00 8 * * *", async () => {
  const date = new Date();
  await sendSms();
  logger.info(`Ran the missedscheduleSMS task on ` + date.toUTCString());
});
