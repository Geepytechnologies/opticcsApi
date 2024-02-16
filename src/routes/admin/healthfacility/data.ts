import express from "express";
import {
  numberofwomenwith4visits,
  healthfacilitygeneraldata,
  healthfacilityscheduledata,
  healthfacilityreturnvisitdata,
  healthfacilitytestdata,
} from "../../../controllers/admin/healthfacility/data";

const router = express.Router();

router.get("/find/4visits", numberofwomenwith4visits);

router.get("/general", healthfacilitygeneraldata);

router.get("/schedule", healthfacilityscheduledata);

router.get("/test", healthfacilitytestdata);

router.get("/general/return", healthfacilityreturnvisitdata);

export default router;
