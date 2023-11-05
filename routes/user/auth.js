const express = require("express");
const router = express.Router();
const {
  signup,
  signin,
  signout,
  changepassword,
  forgotpassword,
  confirmOtp,
  sendOtp,
  retryOtp,
  sendPasswordresetOtp,
  confirmpasswordresetOtp,
  retrypasswordresetOtp,
  resetpassword,
} = require("../../controllers/user/auth");

router.post("/signup", signup);

router.post("/sendOtp", sendOtp);

router.post("/password/sendOtp", sendPasswordresetOtp);

router.get("/confirmOtp", confirmOtp);

router.get("/password/confirmOtp", confirmpasswordresetOtp);

router.get("/retryOtp", retryOtp);

router.get("/password/retryOtp", retrypasswordresetOtp);

router.put("/changepassword", changepassword);

router.post("/resetpassword", resetpassword);

router.post("/signin", signin);

router.get("/signout", signout);

module.exports = router;
