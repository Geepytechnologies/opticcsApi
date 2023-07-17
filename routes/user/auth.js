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
} = require("../../controllers/user/auth");

router.post("/signup", signup);

router.post("/sendOtp", sendOtp);

router.post("/confirmOtp", confirmOtp);

router.put("/changepassword", changepassword);

router.post("/forgotpassword", forgotpassword);

router.post("/signin", signin);

router.get("/signout", signout);

module.exports = router;
