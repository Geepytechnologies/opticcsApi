import express from "express";

const router = express.Router();
import IndicatorController from "../../controllers/admin/indicator";

/**
 * @openapi
 * /api/admin/indicators/intermediateresult1:
 *   get:
 *     description: Returns intermediateresult1 results.
 *     responses:
 *       200:
 *         description: intermediateresult1 results.
 */

router.get("/intermediateresult1", IndicatorController.intermediateResult1);
router.get("/intermediateresult2", IndicatorController.intermediateResult2);

export default router;
