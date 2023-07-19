const express = require("express");
const {
  createLgaAccount,
  createLgaUserAccount,
  getLgaAccounts,
} = require("../../../controllers/admin/lga/accounts");
const {
  signin,
  handleRefreshToken,
} = require("../../../controllers/admin/lga/auth");
const router = express.Router();

router.post("/", createLgaAccount);

router.get("/find", getLgaAccounts);

router.post("/signin", signin);

router.get("/refresh", handleRefreshToken);

router.post("/users", createLgaUserAccount);

module.exports = router;
