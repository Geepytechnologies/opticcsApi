const express = require("express");
const {
  createPatient,
  getPatientRecord,
  createPatientEveryVisit,
  getAllPatients,
  numberofwomenwith4visits,
  getAllPatientsAndHealthworker,
  getPatientPersonalinfo,
  getPatientFirstVisit,
} = require("../../controllers/user/patients");
const router = express.Router();

router.post("/create", createPatient);

router.post("/create/every", createPatientEveryVisit);

router.get("/find/:id", getPatientRecord);

router.get("/find/firstvisit/:id", getPatientFirstVisit);

router.get("/find/4visits", numberofwomenwith4visits);

router.get("/find", getAllPatients);

router.get("/findwithworkers", getAllPatientsAndHealthworker);

router.get("/find/personal/:id", getPatientPersonalinfo);

// router.get("/find/first/:id", getPatientFirstVisit);

// router.get("/find/every/:id", getPatientEveryVisit);

// router.get("/find/schedule/:id", getPatientSchedule);

module.exports = router;
