"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const users_1 = require("../../controllers/admin/users");
const router = express_1.default.Router();
//update user
// router.put("/:id", verifyToken, update);
//update user for purchase
// router.put("/purchase/:id", verifyToken, updateuserforpurchase);
//update user for purchase
// router.put("/purchase/special/:id", verifyToken, updateforspecialpackage);
//update user for purchase
// router.put("/purchase/special/earned/:id", verifyToken, updatespecialearned);
//update user referraldata
// router.put("/referral/:id", verifyToken, updatereferralbonus);
//update user referraldata on signup
// router.put("/signup/:id", updatereferral);
//delete user
// router.delete("/:id", verifyTokenAndAuthorization, deleteUser);
//get a user
// router.get("/find/:id", getUserById);
// router.post("/find/one", getUserByProp);
//get all users
router.get("/find", users_1.getAllUsers);
exports.default = router;
