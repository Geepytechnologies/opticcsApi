const express = require("express");
const {
  createStateAccount,
  createStateUserAccount,
} = require("../../../controllers/admin/state/accounts");
const {
  handleRefreshToken,
  signin,
} = require("../../../controllers/admin/state/auth");
const router = express.Router();

router.post("/", createStateAccount);

router.get("/refresh", handleRefreshToken);

router.get("/signin", signin);

router.post("/user", createStateUserAccount);

module.exports = router;
