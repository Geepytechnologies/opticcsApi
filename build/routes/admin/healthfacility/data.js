"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const data_1 = require("../../../controllers/admin/healthfacility/data");
const router = express_1.default.Router();
router.get("/find/4visits", data_1.numberofwomenwith4visits);
router.get("/general", data_1.healthfacilitygeneraldata);
router.get("/find/healthfacility", data_1.getAllHealthfacility);
router.get("/schedule", data_1.healthfacilityscheduledata);
router.get("/test", data_1.healthfacilitytestdata);
router.get("/general/return", data_1.healthfacilityreturnvisitdata);
exports.default = router;
