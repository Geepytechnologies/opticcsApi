import express from "express";
import { createNationalUserAccount } from "../../../controllers/admin/national/accounts";
import {
  handleRefreshToken,
  signin,
  signout,
  resetpassword,
  changepassword,
  sendPasswordresetOtp,
  confirmpasswordresetOtp,
  retrypasswordresetOtp,
} from "../../../controllers/admin/national/auth";
const { verifyToken } = require("../../../middlewares/verifyToken");
import { verifyNationalAdminToken } from "../../../middlewares/verifyNationalAdminToken";

const router = express.Router();

router.post("/users", createNationalUserAccount);

router.get("/refresh", handleRefreshToken);

router.post("/signin", signin);

router.post("/changepassword", verifyNationalAdminToken, changepassword);
router.post("/resetpassword", resetpassword);

router.post("/password/sendOtp", sendPasswordresetOtp);
router.post("/password/confirmOtp", confirmpasswordresetOtp);
router.post("/password/retryOtp", retrypasswordresetOtp);

router.get("/signout", verifyNationalAdminToken, signout);

export default router;
