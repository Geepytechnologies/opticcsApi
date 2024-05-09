import { Request, Response } from "express";
import db from "../../config/db";
import { ScheduleRepository } from "../../repositories/ScheduleRepository";
import { ScheduleService } from "../../services/schedule.service";

class ScheduleController {
  async getAllSchedule(req: any, res: Response) {
    const page = req.query.page || 1;
    const pageSize = 20;
    const offset = (page - 1) * pageSize;
    const state = req.query.state || "";
    const lga = req.query.lga || "";
    const healthfacility = req.query.healthfacility || "";
    const from = req.query.from || "";
    const to = req.query.to || "";
    const filter = req.query.filter;
    console.log("filter: " + filter);
    const connection = await db.getConnection();
    const scheduleRepo = new ScheduleRepository(connection);
    const scheduleService = new ScheduleService(scheduleRepo);
    try {
      const result: any = await scheduleService.getAllSchedule(
        pageSize,
        offset,
        filter,
        state,
        lga,
        healthfacility,
        from,
        to
      );
      res.status(200).json({ result: result.result, count: result.count });
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    } finally {
      if (connection) {
        connection.release();
      }
    }
  }
}

export default new ScheduleController();
