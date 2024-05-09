"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const accounts_1 = require("../../../controllers/admin/healthfacility/accounts");
const auth_1 = require("../../../controllers/admin/healthfacility/auth");
const verifyHealthfacilityAdminToken_1 = require("../../../middlewares/verifyHealthfacilityAdminToken");
const router = express_1.default.Router();
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
router.post("/", accounts_1.createHealthfacilityAccount);
router.get("/find", accounts_1.getHealthfacilityAccounts);
router.get("/find/all", accounts_1.getAllHealthfacility);
router.get("/find/lga", accounts_1.getHealthfacilityAccountsForLGA);
router.get("/find/filtered", accounts_1.getHealthfacilityAccountsFiltered);
router.get("/find/users", accounts_1.getHealthfacilityUserAccounts);
router.post("/signin", auth_1.signin);
router.get("/signout", verifyHealthfacilityAdminToken_1.verifyHealthfacilityAdminToken, auth_1.signout);
router.get("/generateuser", auth_1.generatehealthfacilitydetails);
router.post("/resetpassword", verifyHealthfacilityAdminToken_1.verifyHealthfacilityAdminToken, auth_1.resetpassword);
router.get("/refresh", auth_1.handleRefreshToken);
router.post("/users", accounts_1.createHealthfacilityUserAccount);
router.put("/verify/:id", accounts_1.verifyHealthWorker);
exports.default = router;
