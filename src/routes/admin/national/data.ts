import express from "express";
import NationalDataController from "../../../controllers/admin/national/data";

const router = express.Router();

router.get("/find/4visits", NationalDataController.numberofwomenwith4visits);

router.get("/general", NationalDataController.nationalgeneraldata);

router.get("/general/return", NationalDataController.nationalreturnvisitdata);

router.get("/visitdates/:id", NationalDataController.getvisitdates);

router.get("/schedule", NationalDataController.nationalscheduledata);

router.get("/test", NationalDataController.nationaltestdata);

export default router;
