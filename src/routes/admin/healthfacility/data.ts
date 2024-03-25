import express from "express";
import {
  numberofwomenwith4visits,
  healthfacilitygeneraldata,
  healthfacilityscheduledata,
  healthfacilityreturnvisitdata,
  healthfacilitytestdata,
  getAllHealthfacility,
} from "../../../controllers/admin/healthfacility/data";

const router = express.Router();

router.get("/find/4visits", numberofwomenwith4visits);

router.get("/general", healthfacilitygeneraldata);

router.get("/find/healthfacility", getAllHealthfacility);

router.get("/schedule", healthfacilityscheduledata);

router.get("/test", healthfacilitytestdata);

router.get("/general/return", healthfacilityreturnvisitdata);

export default router;
