const express = require("express");
const {
  createHealthfacilityAccount,
  createHealthfacilityUserAccount,
  verifyHealthWorker,
  getHealthfacilityAccounts,
  getHealthfacilityUserAccounts,
} = require("../../../controllers/admin/healthfacility/accounts");
const {
  signin,
  handleRefreshToken,
} = require("../../../controllers/admin/healthfacility/auth");
const router = express.Router();

router.post("/", createHealthfacilityAccount);

router.get("/find", getHealthfacilityAccounts);

router.get("/find/users", getHealthfacilityUserAccounts);

router.post("/signin", signin);

router.get("/refresh", handleRefreshToken);

router.post("/users", createHealthfacilityUserAccount);

router.put("/verify/:id", verifyHealthWorker);

module.exports = router;
