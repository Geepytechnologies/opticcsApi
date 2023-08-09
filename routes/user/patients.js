const express = require("express");
const {
  createPatient,
  getPatientRecord,
  createPatientEveryVisit,
  getAllPatients,
  getAllPatientsAndHealthworker,
  getPatientPersonalinfo,
  getPatientFirstVisit,
  getPatientReturnVisit,
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

router.get("/find", getAllPatients);

router.get("/findwithworkers", getAllPatientsAndHealthworker);

router.get("/find/personal/:id", getPatientPersonalinfo);

module.exports = router;
