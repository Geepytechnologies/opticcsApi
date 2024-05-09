import express from "express";

import WardController from "../controllers/ward";
import { verifyToken } from "../middlewares/verifyToken";

const router = express.Router();

router.post("/create", WardController.create);
router.get("/getAllWards", WardController.getAllWards);
router.get("/getAllWardsForLga", WardController.getAllWardsForLGA);
router.get("/getAllWardsForState", WardController.getAllWardsForState);

export default router;
