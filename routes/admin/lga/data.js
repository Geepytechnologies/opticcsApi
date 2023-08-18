const express = require("express");
const {
  numberofwomenwith4visits,
  lgageneraldata,
} = require("../../../controllers/admin/lga/data");

const router = express.Router();

router.get("/find/4visits", numberofwomenwith4visits);

router.get("/general", lgageneraldata);

module.exports = router;
