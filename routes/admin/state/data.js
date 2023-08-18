const express = require("express");
const {
  numberofwomenwith4visits,
  stategeneraldata,
} = require("../../../controllers/admin/state/data");

const router = express.Router();

router.get("/find/4visits", numberofwomenwith4visits);

router.get("/general", stategeneraldata);

module.exports = router;
