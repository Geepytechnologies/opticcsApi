"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const adminauth_1 = require("../../controllers/admin/adminauth");
router.post("/sendOtp", adminauth_1.sendOtp);
router.post("/confirmOtp", adminauth_1.confirmOtp);
router.post("/signup", adminauth_1.signup);
router.put("/changepassword", adminauth_1.changepassword);
router.post("/forgotpassword", adminauth_1.forgotpassword);
router.post("/signin", adminauth_1.signin);
router.get("/signout", adminauth_1.signout);
router.get("/verify-email", adminauth_1.verifyEmail);
exports.default = router;
