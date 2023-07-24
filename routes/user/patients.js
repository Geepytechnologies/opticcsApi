const express = require("express");
const {
  createPatient,
  getPatientRecord,
  createPatientEveryVisit,
  getAllPatients,
  numberofwomenwith4visits,
} = require("../../controllers/user/patients");
const router = express.Router();

router.post("/create", createPatient);

router.post("/create/every", createPatientEveryVisit);

router.get("/find/:id", getPatientRecord);

router.get("/find/4visits", numberofwomenwith4visits);

router.get("/find", getAllPatients);

module.exports = router;
