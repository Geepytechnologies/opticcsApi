"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const data_1 = __importDefault(require("../../../controllers/admin/national/data"));
const router = express_1.default.Router();
router.get("/find/4visits", data_1.default.numberofwomenwith4visits);
router.get("/general", data_1.default.nationalgeneraldata);
router.get("/general/return", data_1.default.nationalreturnvisitdata);
router.get("/visitdates/:id", data_1.default.getvisitdates);
router.get("/schedule", data_1.default.nationalscheduledata);
router.get("/test", data_1.default.nationaltestdata);
exports.default = router;
