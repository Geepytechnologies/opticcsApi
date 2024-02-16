"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const data_1 = require("../../../controllers/admin/state/data");
const router = express_1.default.Router();
router.get("/find/4visits", data_1.numberofwomenwith4visits);
router.get("/general", data_1.stategeneraldata);
router.get("/find/states", data_1.getAllStates);
router.get("/find/states/v2", data_1.getAllStatesAsArray);
router.get("/schedule", data_1.statescheduledata);
router.get("/test", data_1.statetestdata);
router.get("/general/return", data_1.statereturnvisitdata);
exports.default = router;
