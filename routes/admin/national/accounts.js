const express = require("express");
const {
  createNationalUserAccount,
} = require("../../../controllers/admin/national/accounts");
const {
  handleRefreshToken,
  signin,
} = require("../../../controllers/admin/national/auth");

const router = express.Router();

router.post("/user", createNationalUserAccount);

router.get("/refresh", handleRefreshToken);

router.get("/signin", signin);

module.exports = router;
