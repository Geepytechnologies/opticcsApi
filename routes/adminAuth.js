const express = require("express");
const router = express.Router();
const {
  signup,
  signin,
  signout,
  changepassword,
  forgotpassword,
  verifyEmail,
} = require("../controllers/adminauth");

router.post("/signup", signup);

router.put("/changepassword", changepassword);

router.post("/forgotpassword", forgotpassword);

router.post("/signin", signin);

router.get("/signout", signout);

router.get("/verify-email", verifyEmail);

module.exports = router;
