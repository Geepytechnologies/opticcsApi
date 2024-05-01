import express from "express";
import {
  createHealthfacilityAccount,
  createHealthfacilityUserAccount,
  verifyHealthWorker,
  getHealthfacilityAccounts,
  getHealthfacilityUserAccounts,
  getHealthfacilityAccountsFiltered,
  getHealthfacilityAccountsForLGA,
} from "../../../controllers/admin/healthfacility/accounts";
import {
  signin,
  handleRefreshToken,
  generatehealthfacilitydetails,
  signout,
  resetpassword,
} from "../../../controllers/admin/healthfacility/auth";
import { verifyHealthfacilityAdminToken } from "../../../middlewares/verifyHealthfacilityAdminToken";
const router = express.Router();
/**
 * @swagger
 * tags:
 *   name: Healthfacility
 *   description: Operations related to healthfacility
 */

/**
 * @openapi
 * /api/admin/healthfacility:
 *   post:
 *     description: create healthfacility account
 *     tags: [Healthfacility]
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ward:
 *                 type: string
 *               state:
 *                 type: string
 *               lga:
 *                 type: string
 *               healthfacilityname:
 *                 type: string
 *               healthfacilityID:
 *                 type: string
 *               officeaddress:
 *                 type: string
 *               phone:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Returns new object.
 *       500:
 *          description: Server error
 */

router.post("/", createHealthfacilityAccount);

router.get("/find", getHealthfacilityAccounts);
router.get("/find/lga", getHealthfacilityAccountsForLGA);

router.get("/find/filtered", getHealthfacilityAccountsFiltered);

router.get("/find/users", getHealthfacilityUserAccounts);

router.post("/signin", signin);

router.get("/signout", verifyHealthfacilityAdminToken, signout);

router.get("/generateuser", generatehealthfacilitydetails);

router.post("/resetpassword", verifyHealthfacilityAdminToken, resetpassword);

router.get("/refresh", handleRefreshToken);

router.post("/users", createHealthfacilityUserAccount);

router.put("/verify/:id", verifyHealthWorker);

export default router;
