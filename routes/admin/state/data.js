const express = require("express");
const {
  numberofwomenwith4visits,
  stategeneraldata,
  statereturnvisitdata,
  statescheduledata,
} = require("../../../controllers/admin/state/data");

const router = express.Router();

router.get("/find/4visits", numberofwomenwith4visits);

router.get("/general", stategeneraldata);

router.get("/schedule", statescheduledata);

router.get("/general/return", statereturnvisitdata);

module.exports = router;
