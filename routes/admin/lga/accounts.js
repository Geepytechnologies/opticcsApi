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
  signout,
  resetpassword,
} = require("../../../controllers/admin/lga/auth");
const {
  verifyLgAdminToken,
} = require("../../../middlewares/verifyLgAdminToken");
const router = express.Router();

router.post("/", createLgaAccount);

router.get("/find", getLgaAccounts);

router.post("/signin", signin);

router.get("/signout", verifyLgAdminToken, signout);

router.get("/generateuser", generatelgadetails);

router.get("/refresh", handleRefreshToken);

router.post("/resetpassword", verifyLgAdminToken, resetpassword);

router.post("/users", createLgaUserAccount);

router.get("/users", getLgaUserAccounts);

module.exports = router;
