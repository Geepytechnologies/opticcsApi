import express from "express";
import {
  numberofwomenwith4visits,
  lgageneraldata,
  lgareturnvisitdata,
  lgascheduledata,
  getAllLga,
  lgatestdata,
} from "../../../controllers/admin/lga/data";

const router = express.Router();

router.get("/find/4visits", numberofwomenwith4visits);

router.get("/general", lgageneraldata);

router.get("/find/lga", getAllLga);

router.get("/schedule", lgascheduledata);
router.get("/test", lgatestdata);

router.get("/general/return", lgareturnvisitdata);

export default router;
