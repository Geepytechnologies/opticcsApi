const express = require("express");
const {
  createNationalUserAccount,
} = require("../../../controllers/admin/national/accounts");
const {
  handleRefreshToken,
  signin,
} = require("../../../controllers/admin/national/auth");

const router = express.Router();

router.post("/users", createNationalUserAccount);

router.get("/refresh", handleRefreshToken);

router.post("/signin", signin);

module.exports = router;
