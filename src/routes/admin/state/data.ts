import express from "express";
import {
  numberofwomenwith4visits,
  stategeneraldata,
  statereturnvisitdata,
  statescheduledata,
  getAllStates,
  statetestdata,
  getAllStatesAsArray,
} from "../../../controllers/admin/state/data";

const router = express.Router();

router.get("/find/4visits", numberofwomenwith4visits);

router.get("/general", stategeneraldata);

router.get("/find/states", getAllStates);

router.get("/find/states/v2", getAllStatesAsArray);

router.get("/schedule", statescheduledata);
router.get("/test", statetestdata);

router.get("/general/return", statereturnvisitdata);

export default router;
