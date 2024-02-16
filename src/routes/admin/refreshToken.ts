import express from "express";
const router = express.Router();
import { handleRefreshToken } from "../../controllers/admin/refreshToken";

router.get("/", handleRefreshToken);

export default router;
