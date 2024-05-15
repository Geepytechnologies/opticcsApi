//@ts-nocheck
import cron from "node-cron";
import db from "../config/db";
import storage from "node-persist";

const initializeStorage = async () => {
  await storage.init();
};

initializeStorage();

export class ScheduleReminder {
  static task;
  static async start() {
    ScheduleReminder.task = cron.schedule("35 12 * * *", async () => {
      console.log({ next: nextExecutionTime, current: currentTime });
      console.log("task at date");

      let currentDate = new Date();

      // Set hours, minutes, seconds, and milliseconds to 7am
      const nextScheduleTime = currentDate.setHours(7, 0, 0, 0).getTime();
      // Check the last execution time
      const nextExecutionTime =
        (await storage.getItem("remindernextExecutionTime")) || 0;
      const currentTime = new Date().getTime();
      // console.log(currentTime - lastExecutionTime, 60 * 60 * 1000);

      if (currentTime >= nextExecutionTime) {
        console.log("Running the job of reminder at..." + new Date());
        await this.sendSms();

        await storage.setItem("remindernextExecutionTime", nextScheduleTime);
      } else {
        console.log("Not time to run the job yet." + new Date());
      }
    });
    ScheduleReminder.task.start();
  }
  static stop() {
    if (this.task) {
      ScheduleReminder.task.stop();
      console.log("Task stopped.");
    } else {
      console.log("No task to stop.");
    }
  }

  static patientscheduledvisitremindersms = async (
    mobile_number,
    firstname,
    lastname,
    date,
    healthfacilityname
  ) => {
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
      const response = await fetch(url, {
        method: "POST",
        headers,
        body,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          `An error occurred while sending Message. Status Code: ${response.status}`
        );
      }

      return { statusCode: response.status.toString(), result };
    } catch (error) {
      return {
        statusCode: "500",
        error: error.message || "Internal Server Error",
      };
    }
  };
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

  sendSms = async () => {
    try {
      const response = await this.getCloseSchedules();
      const users = response.result;
      for (const item of users) {
        await this.patientscheduledvisitremindersms(
          item.phone,
          item.firstname,
          item.lastname,
          formatDate(item.dateto),
          item.healthFacility
        );
        await this.updateSchedule(item.id);
      }
    } catch (error) {
      console.error("Error in sendSms:", error);
    } finally {
    }
  };
}
