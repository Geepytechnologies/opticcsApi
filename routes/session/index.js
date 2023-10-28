const express = require("express");
const {
  startSessionRequest,
  endSession,
  getCurrentusersessionrequest,
} = require("../../controllers/session");
const router = express.Router();

router.post("/start", startSessionRequest);
router.post("/end", endSession);
router.get("/find/:id", getCurrentusersessionrequest);

module.exports = router;
