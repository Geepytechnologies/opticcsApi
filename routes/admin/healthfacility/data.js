const express = require("express");
const {
  numberofwomenwith4visits,
  healthfacilitygeneraldata,
  healthfacilityscheduledata,
  healthfacilityreturnvisitdata,
} = require("../../../controllers/admin/healthfacility/data");

const router = express.Router();

router.get("/find/4visits", numberofwomenwith4visits);

router.get("/general", healthfacilitygeneraldata);

router.get("/schedule", healthfacilityscheduledata);

router.get("/general/return", healthfacilityreturnvisitdata);

module.exports = router;
