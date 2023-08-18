const express = require("express");
const {
  numberofwomenwith4visits,
  healthfacilitygeneraldata,
} = require("../../../controllers/admin/healthfacility/data");

const router = express.Router();

router.get("/find/4visits", numberofwomenwith4visits);

router.get("/general", healthfacilitygeneraldata);

module.exports = router;
