// @ts-nocheck
import cron from "node-cron";
import db from "../config/db";
import storage from "node-persist";
import { SmsService } from "./sms.service";
import logger from "../logger";
import { Global } from "../utils/global";

const initializeStorage = async () => {
  await storage.init();
};

initializeStorage();

const SMSservice = new SmsService();

export class ScheduleReminder {
  static task;

  static stop() {
    if (this.task) {
      ScheduleReminder.task.stop();
      console.log("Task stopped.");
    } else {
      console.log("No task to stop.");
    }
  }

  static updateSchedule = async (id) => {
    const connection = await db.getConnection();
    try {
      const q = `UPDATE schedule
        SET
          remindersms = true
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

  static getCloseSchedules = async () => {
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
    WHERE schedule.remindersms = false AND 
      DATE(schedule.datefrom) = DATE_SUB(CURDATE(), INTERVAL 1 DAY);      
      `;
      const result = await connection.execute(q);
      console.log(result[0]);
      return { statusCode: "200", message: "successful", result: result[0] };
    } catch (error) {
      logger.error("error from getCloseSchedules" + " :" + error);
      return { statusCode: "500", message: "error getting schedule", error };
    } finally {
      if (connection) {
        connection.release();
      }
    }
  };
}

const sendSms = async () => {
  try {
    const response = await ScheduleReminder.getCloseSchedules();
    const users = response.result;
    for (const item of users) {
      const smsdata = {
        mobile_number: item.phone,
        firstname: item.firstname,

        lastname: item.lastname,
        date: Global.formatDate(item.dateto),
        healthfacilityname: item.healthFacility,
        state: item.state,
      };
      const res = await SMSservice.scheduledvisitreminderSMSforPatient(smsdata);
      console.log(res);
      if (res.status == 200) {
        await ScheduleReminder.updateSchedule(item.id);
      }
    }
  } catch (error) {
    console.error("Error in sendSms:", error);
  } finally {
  }
};

export const reminderSMS = cron.schedule("00 8 * * *", async () => {
  const date = new Date();
  await sendSms();
  logger.info(`Ran the reminderSMS task on ` + date.toUTCString());
});
