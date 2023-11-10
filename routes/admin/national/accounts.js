const express = require("express");
const {
  createNationalUserAccount,
} = require("../../../controllers/admin/national/accounts");
const {
  handleRefreshToken,
  signin,
  signout,
  resetpassword,
  changepassword,
  sendPasswordresetOtp,
  confirmpasswordresetOtp,
  retrypasswordresetOtp,
} = require("../../../controllers/admin/national/auth");
const { verifyToken } = require("../../../middlewares/verifyToken");
const {
  verifyNationalAdminToken,
} = require("../../../middlewares/verifyNationalAdminToken");

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

module.exports = router;
