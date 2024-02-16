import express from "express";
const router = express.Router();
import {
  signup,
  signin,
  signout,
  changepassword,
  forgotpassword,
  verifyEmail,
  sendOtp,
  confirmOtp,
} from "../../controllers/admin/adminauth";

router.post("/sendOtp", sendOtp);

router.post("/confirmOtp", confirmOtp);

router.post("/signup", signup);

router.put("/changepassword", changepassword);

router.post("/forgotpassword", forgotpassword);

router.post("/signin", signin);

router.get("/signout", signout);

router.get("/verify-email", verifyEmail);

export default router;
