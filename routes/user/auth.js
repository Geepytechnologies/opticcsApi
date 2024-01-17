const express = require("express");
const router = express.Router();
const {
  signup,
  signin,
  signout,
  changepassword,
  confirmOtp,
  sendOtp,
  sendPasswordresetOtp,
  confirmpasswordresetOtp,
  retrypasswordresetOtp,
  resetpassword,
  voiceOtp,
} = require("../../controllers/user/auth");

router.post("/signup", signup);

router.post("/sendOtp", sendOtp);

router.post("/voiceOtp", voiceOtp);

router.post("/password/sendOtp", sendPasswordresetOtp);

router.post("/confirmOtp", confirmOtp);

router.get("/password/confirmOtp", confirmpasswordresetOtp);

router.get("/password/retryOtp", retrypasswordresetOtp);

router.put("/changepassword", changepassword);

router.post("/resetpassword", resetpassword);

router.post("/signin", signin);

router.get("/signout", signout);

module.exports = router;
