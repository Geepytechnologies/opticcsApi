import express from "express";

import WardController from "../controllers/ward";
import { verifyToken } from "../middlewares/verifyToken";

const router = express.Router();

router.post("/create", WardController.create);
router.post("/getAllWards", WardController.getAllWards);
router.post("/getAllWardsForLga", WardController.getAllWardsForLGA);
router.post("/getAllWardsForState", WardController.getAllWardsForState);

export default router;
