import express from "express";

const router = express.Router();

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

export default router;
