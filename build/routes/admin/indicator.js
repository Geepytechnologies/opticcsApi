"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const indicator_1 = __importDefault(require("../../controllers/admin/indicator"));
/**
 * @openapi
 * /api/admin/indicators/intermediateresult1:
 *   get:
 *     description: Returns intermediateresult1 results.
 *     responses:
 *       200:
 *         description: intermediateresult1 results.
 */
router.get("/intermediateresult1", indicator_1.default.intermediateResult1);
router.get("/intermediateresult2", indicator_1.default.intermediateResult2);
exports.default = router;
