"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ward_1 = __importDefault(require("../controllers/ward"));
const router = express_1.default.Router();
router.post("/create", ward_1.default.create);
router.post("/getAllWards", ward_1.default.getAllWards);
router.post("/getAllWardsForLga", ward_1.default.getAllWardsForLGA);
router.post("/getAllWardsForState", ward_1.default.getAllWardsForState);
exports.default = router;
