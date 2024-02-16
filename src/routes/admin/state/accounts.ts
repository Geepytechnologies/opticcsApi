import express from "express";
import {
  createStateAccount,
  createStateUserAccount,
  deleteState,
  getAllStates,
  getAllStateUsers,
} from "../../../controllers/admin/state/accounts";
import {
  handleRefreshToken,
  signin,
  signout,
  generatestatedetails,
  resetpassword,
} from "../../../controllers/admin/state/auth";
import { verifyStateAdminToken } from "../../../middlewares/verifyStateAdminToken";
const router = express.Router();

router.post("/", createStateAccount);

router.delete("/delete/:id", deleteState);

router.get("/find", getAllStates);

router.get("/find/users", getAllStateUsers);

router.get("/refresh", handleRefreshToken);

router.get("/generateuser", generatestatedetails);

router.post("/resetpassword", verifyStateAdminToken, resetpassword);

router.post("/signin", signin);

router.get("/signout", verifyStateAdminToken, signout);

router.post("/user", createStateUserAccount);

export default router;
