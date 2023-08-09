const express = require("express");
const {
  getparity,
  getedd,
  graviditylessthan8,
  graviditygreaterthan8,
  numberofwomenwith4visits,
  getbabysmovement,
} = require("../../../controllers/admin/national/data");

const router = express.Router();

router.get("/find/4visits", numberofwomenwith4visits);

router.get("/gravidity/find/greater", graviditygreaterthan8);

router.get("/gravidity/find/lesser", graviditylessthan8);

router.get("/edd/find", getedd);

router.get("/parity/find", getparity);

router.get("/getbabysmovement/find", getbabysmovement);

module.exports = router;
