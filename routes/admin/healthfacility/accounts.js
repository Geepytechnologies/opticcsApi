const express = require("express");
const {
  createHealthfacilityAccount,
  createHealthfacilityUserAccount,
  verifyHealthWorker,
  getHealthfacilityAccounts,
  getHealthfacilityUserAccounts,
  getHealthfacilityAccountsFiltered,
} = require("../../../controllers/admin/healthfacility/accounts");
const {
  signin,
  handleRefreshToken,
  generatehealthfacilitydetails,
  signout,
  resetpassword,
} = require("../../../controllers/admin/healthfacility/auth");
const {
  verifyHealthfacilityAdminToken,
} = require("../../../middlewares/verifyHealthfacilityAdminToken");
const router = express.Router();

router.post("/", createHealthfacilityAccount);

router.get("/find", getHealthfacilityAccounts);

router.get("/find/filtered", getHealthfacilityAccountsFiltered);

router.get("/find/users", getHealthfacilityUserAccounts);

router.post("/signin", signin);

router.get("/signout", verifyHealthfacilityAdminToken, signout);

router.get("/generateuser", generatehealthfacilitydetails);

router.post("/resetpassword", verifyHealthfacilityAdminToken, resetpassword);

router.get("/refresh", handleRefreshToken);

router.post("/users", createHealthfacilityUserAccount);

router.put("/verify/:id", verifyHealthWorker);

module.exports = router;
