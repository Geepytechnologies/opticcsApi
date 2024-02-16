"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const data_1 = require("../../../controllers/admin/lga/data");
const router = express_1.default.Router();
router.get("/find/4visits", data_1.numberofwomenwith4visits);
router.get("/general", data_1.lgageneraldata);
router.get("/find/lga", data_1.getAllLga);
router.get("/schedule", data_1.lgascheduledata);
router.get("/test", data_1.lgatestdata);
router.get("/general/return", data_1.lgareturnvisitdata);
exports.default = router;
