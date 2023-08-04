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
  getPatientReturnVisit,
  graviditygreaterthan8,
  graviditylessthan8,
  getedd,
  createTest,
  updateTest,
  getAPatientsTest,
} = require("../../controllers/user/patients");
const router = express.Router();

router.post("/create", createPatient);

router.post("/create/return", createPatientEveryVisit);

router.post("/test", createTest);

router.put("/test/:id", updateTest);

router.get("/test/find", getAPatientsTest);

router.get("/find/:id", getPatientRecord);

router.get("/find/firstvisit/:id", getPatientFirstVisit);

router.get("/find/returnvisit/:id", getPatientReturnVisit);

router.get("/find/4visits", numberofwomenwith4visits);

router.get("/gravidity/find/greater", graviditygreaterthan8);

router.get("/gravidity/find/lesser", graviditylessthan8);

router.get("/edd/find", getedd);

router.get("/find", getAllPatients);

router.get("/findwithworkers", getAllPatientsAndHealthworker);

router.get("/find/personal/:id", getPatientPersonalinfo);

// router.get("/find/first/:id", getPatientFirstVisit);

// router.get("/find/every/:id", getPatientEveryVisit);

// router.get("/find/schedule/:id", getPatientSchedule);

module.exports = router;
