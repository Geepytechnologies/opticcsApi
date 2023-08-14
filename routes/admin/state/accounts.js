const express = require("express");
const {
  createStateAccount,
  createStateUserAccount,
  getAllStates,
  getAllStateUsers,
} = require("../../../controllers/admin/state/accounts");
const {
  handleRefreshToken,
  signin,
  signout,
  generatestatedetails,
  resetpassword,
} = require("../../../controllers/admin/state/auth");
const {
  verifyStateAdminToken,
} = require("../../../middlewares/verifyStateAdminToken");
const router = express.Router();

router.post("/", createStateAccount);

router.get("/find", getAllStates);

router.get("/find/users", getAllStateUsers);

router.get("/refresh", handleRefreshToken);

router.get("/generateuser", generatestatedetails);

router.post("/resetpassword", verifyStateAdminToken, resetpassword);

router.post("/signin", signin);

router.get("/signout", signout);

router.post("/user", createStateUserAccount);

module.exports = router;
