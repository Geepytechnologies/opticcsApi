const express = require("express");
const {
  createStateAccount,
  createStateUserAccount,
} = require("../../../controllers/admin/state/accounts");
const {
  handleRefreshToken,
  signin,
  signout,
} = require("../../../controllers/admin/state/auth");
const router = express.Router();

router.post("/", createStateAccount);

router.get("/refresh", handleRefreshToken);

router.post("/signin", signin);

router.get("/signout", signout);

router.post("/user", createStateUserAccount);

module.exports = router;
