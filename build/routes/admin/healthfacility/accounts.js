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
router.post("/", accounts_1.createHealthfacilityAccount);
router.get("/find", accounts_1.getHealthfacilityAccounts);
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