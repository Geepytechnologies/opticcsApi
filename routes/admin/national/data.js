const express = require("express");
const {
  getparity,
  getedd,
  graviditylessthan8,
  graviditygreaterthan8,
  numberofwomenwith4visits,
  getbabysmovement,
  nationalgeneraldata,
  getvisitdates,
  nationalreturnvisitdata,
  nationalscheduledata,
  nationaltestdata,
} = require("../../../controllers/admin/national/data");

const router = express.Router();

router.get("/find/4visits", numberofwomenwith4visits);

router.get("/general", nationalgeneraldata);

router.get("/general/return", nationalreturnvisitdata);

router.get("/visitdates/:id", getvisitdates);

router.get("/schedule", nationalscheduledata);
router.get("/test", nationaltestdata);

module.exports = router;
