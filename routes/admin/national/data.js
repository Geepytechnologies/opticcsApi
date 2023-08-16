const express = require("express");
const {
  getparity,
  getedd,
  graviditylessthan8,
  graviditygreaterthan8,
  numberofwomenwith4visits,
  getbabysmovement,
  nationalgeneraldata,
} = require("../../../controllers/admin/national/data");

const router = express.Router();

router.get("/find/4visits", numberofwomenwith4visits);

router.get("/general", nationalgeneraldata);

module.exports = router;
