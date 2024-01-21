const express = require("express");
const {
  numberofwomenwith4visits,
  healthfacilitygeneraldata,
  healthfacilityscheduledata,
  healthfacilityreturnvisitdata,
  healthfacilitytestdata,
} = require("../../../controllers/admin/healthfacility/data");

const router = express.Router();

router.get("/find/4visits", numberofwomenwith4visits);

router.get("/general", healthfacilitygeneraldata);

router.get("/schedule", healthfacilityscheduledata);

router.get("/test", healthfacilitytestdata);

router.get("/general/return", healthfacilityreturnvisitdata);

module.exports = router;
