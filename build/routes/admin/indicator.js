"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
/**
 * @openapi
 * /api/admin/indicators/find/4visits:
 *   get:
 *     description: Returns users with 4 visits.
 *     responses:
 *       200:
 *         description: A list of users with 4 visits.
 */
router.get("/find/4visits");
exports.default = router;
