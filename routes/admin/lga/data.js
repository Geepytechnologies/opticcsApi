const express = require("express");
const {
  numberofwomenwith4visits,
  lgageneraldata,
  lgareturnvisitdata,
  lgascheduledata,
} = require("../../../controllers/admin/lga/data");

const router = express.Router();

router.get("/find/4visits", numberofwomenwith4visits);

router.get("/general", lgageneraldata);

router.get("/schedule", lgascheduledata);

router.get("/general/return", lgareturnvisitdata);

module.exports = router;
