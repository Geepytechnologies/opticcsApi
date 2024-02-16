import express from "express";
import {
  numberofwomenwith4visits,
  nationalgeneraldata,
  getvisitdates,
  nationalreturnvisitdata,
  nationalscheduledata,
  nationaltestdata,
} from "../../../controllers/admin/national/data";

const router = express.Router();

router.get("/find/4visits", numberofwomenwith4visits);

router.get("/general", nationalgeneraldata);

router.get("/general/return", nationalreturnvisitdata);

router.get("/visitdates/:id", getvisitdates);

router.get("/schedule", nationalscheduledata);
router.get("/test", nationaltestdata);

export default router;
