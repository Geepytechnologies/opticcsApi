const express = require("express");
const {
  createPatient,
  getPatientRecord,
  createPatientEveryVisit,
} = require("../../controllers/user/patients");
const router = express.Router();

router.post("/create", createPatient);

router.post("/create/every", createPatientEveryVisit);

router.get("/find/:id", getPatientRecord);

module.exports = router;
