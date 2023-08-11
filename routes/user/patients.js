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
  getPatientRecordWithVisits,
  createdeliveryreport,
  requestingatest,
  createtestoptions,
  datanumbers,
} = require("../../controllers/user/patients");
const router = express.Router();

router.post("/create", createPatient);

router.post("/create/return", createPatientEveryVisit);

router.post("/test", createTest);

router.post("/testoption", createtestoptions);

router.put("/test/:id", updateTest);

router.get("/test/find", getAPatientsTest);

router.post("/test/requestatest", requestingatest);

router.post("/deliveryreport", createdeliveryreport);

router.put("/deliveryreport/:id", updateTest);

router.get("/deliveryreport/find", getAPatientsTest);

router.get("/find/:id", getPatientRecord);

router.get("/findwithvisits/:id", getPatientRecordWithVisits);

router.get("/find/firstvisit/:id", getPatientFirstVisit);

router.get("/find/returnvisit/:id", getPatientReturnVisit);

router.get("/find", getAllPatients);

router.get("/datanumbers/find", datanumbers);

router.get("/findwithworkers", getAllPatientsAndHealthworker);

router.get("/find/personal/:id", getPatientPersonalinfo);

module.exports = router;
