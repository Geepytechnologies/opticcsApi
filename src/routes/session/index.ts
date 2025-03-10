import express from "express";
import {
  startSessionRequest,
  endSession,
  getCurrentusersessionrequest,
  getAllsessions,
  getsessiongraph,
  getAllsessionsState,
  getAllsessionsLga,
  getAllsessionshf,
  getsessiongraphstate,
  getsessiongraphlga,
  getsessiongraphhealthfacility,
  getAllsessionsForAprilAndMay,
} from "../../controllers/session";
const router = express.Router();

router.post("/start", startSessionRequest);
router.post("/end", endSession);
router.get("/find/user/:id", getCurrentusersessionrequest);
router.get("/find/all", getAllsessions);
router.get("/find/april&may", getAllsessionsForAprilAndMay);
router.get("/find/state", getAllsessionsState);
router.get("/find/lga", getAllsessionsLga);
router.get("/find/healthfacility", getAllsessionshf);
router.get("/data", getsessiongraph);
router.get("/data/state", getsessiongraphstate);
router.get("/data/lga", getsessiongraphlga);
router.get("/data/healthfacility", getsessiongraphhealthfacility);

export default router;
