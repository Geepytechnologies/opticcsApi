const express = require("express");
const {
  createNationalUserAccount,
} = require("../../../controllers/admin/national/accounts");
const {
  handleRefreshToken,
  signin,
  signout,
} = require("../../../controllers/admin/national/auth");
const { verifyToken } = require("../../../middlewares/verifyToken");
const {
  verifyNationalAdminToken,
} = require("../../../middlewares/verifyNationalAdminToken");

const router = express.Router();

router.post("/users", createNationalUserAccount);

router.get("/refresh", handleRefreshToken);

router.post("/signin", signin);

router.get("/signout", verifyNationalAdminToken, signout);

module.exports = router;
