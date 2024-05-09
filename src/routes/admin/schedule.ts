import express from "express";

const router = express.Router();
import ScheduleController from "../../controllers/user/schedule";

router.get("/getAllSchedule", ScheduleController.getAllSchedule);

export default router;
