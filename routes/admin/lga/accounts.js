const express = require("express");
const {
  createLgaAccount,
  createLgaUserAccount,
  getLgaAccounts,
  getLgaUserAccounts,
} = require("../../../controllers/admin/lga/accounts");
const {
  signin,
  handleRefreshToken,
  generatelgadetails,
} = require("../../../controllers/admin/lga/auth");
const router = express.Router();

router.post("/", createLgaAccount);

router.get("/find", getLgaAccounts);

router.post("/signin", signin);

router.get("/generateuser", generatelgadetails);

router.get("/refresh", handleRefreshToken);

router.post("/users", createLgaUserAccount);

router.get("/users", getLgaUserAccounts);

module.exports = router;
