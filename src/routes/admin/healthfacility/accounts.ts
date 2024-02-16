import express from "express";
import {
  createHealthfacilityAccount,
  createHealthfacilityUserAccount,
  verifyHealthWorker,
  getHealthfacilityAccounts,
  getHealthfacilityUserAccounts,
  getHealthfacilityAccountsFiltered,
} from "../../../controllers/admin/healthfacility/accounts";
import {
  signin,
  handleRefreshToken,
  generatehealthfacilitydetails,
  signout,
  resetpassword,
} from "../../../controllers/admin/healthfacility/auth";
import { verifyHealthfacilityAdminToken } from "../../../middlewares/verifyHealthfacilityAdminToken";
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

export default router;
