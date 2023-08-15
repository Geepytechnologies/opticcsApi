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
  getAPatientsDeliveryreport,
  getAllDeliveryreports,
  getAllDeliveryreportsByAWorker,
  updaterequestedtest,
  getrequestedtests,
} = require("../../controllers/user/patients");
const { verifyToken } = require("../../middlewares/verifyToken");
const router = express.Router();

router.post("/create", createPatient);

router.post("/create/return", createPatientEveryVisit);

router.post("/test", createTest);

router.post("/testoption", createtestoptions);

router.put("/test/:id", updateTest);

router.get("/test/find", getAPatientsTest);

router.get("/test/requestedtests", getrequestedtests);

router.post("/test/requestatest", requestingatest);

router.put("/test/requestedtest/:id", updaterequestedtest);

router.post("/deliveryreport", createdeliveryreport);

router.put("/deliveryreport/:id", updateTest);

router.get("/deliveryreport/find", getAPatientsDeliveryreport);

router.get("/deliveryreport/findall", getAllDeliveryreports);

router.get(
  "/deliveryreport/worker/findall",
  verifyToken,
  getAllDeliveryreportsByAWorker
);

router.get("/find/:id", getPatientRecord);

router.get("/findwithvisits/:id", getPatientRecordWithVisits);

router.get("/find/firstvisit/:id", getPatientFirstVisit);

router.get("/find/returnvisit/:id", getPatientReturnVisit);

router.get("/find", getAllPatients);

router.get("/datanumbers/find", datanumbers);

router.get("/findwithworkers", getAllPatientsAndHealthworker);

router.get("/find/personal/:id", getPatientPersonalinfo);

module.exports = router;
