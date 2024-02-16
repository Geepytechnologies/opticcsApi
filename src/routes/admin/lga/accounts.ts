import express from "express";
import {
  createLgaAccount,
  createLgaUserAccount,
  getLgaAccounts,
  getLgaUserAccounts,
} from "../../../controllers/admin/lga/accounts";
import {
  signin,
  handleRefreshToken,
  generatelgadetails,
  signout,
  resetpassword,
} from "../../../controllers/admin/lga/auth";
import { verifyLgAdminToken } from "../../../middlewares/verifyLgAdminToken";
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

export default router;
