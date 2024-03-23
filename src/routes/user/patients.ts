import express from "express";
import {
  // createPatient,
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
  getATestByAUser,
  getAllTests,
  getAllPatientstate,
  getAllPatientlga,
  getAllPatientsAndHealthworkerpaginated,
  getAllPatientFirstVisits,
  getAllPatientReturnVisit,
  deleteAPatient,
} from "../../controllers/user/patients";
import PatientController from "../../controllers/user/patients2";
import { verifyToken } from "../../middlewares/verifyToken";

const router = express.Router();

router.post("/create", PatientController.createpatient);

router.post(
  "/create/return",
  verifyToken,
  PatientController.createPatientEveryVisit
);

router.post("/test", createTest);

router.post("/testoption", createtestoptions);

router.put("/test/:id", updateTest);

router.get("/test/find", getAPatientsTest);

router.get("/test/find/all", getAllTests);

router.get("/test/user/find/:id", getATestByAUser);

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
router.delete("/:id", deleteAPatient);

router.get("/find/:id", getPatientRecord);

router.get("/findwithvisits/:id", getPatientRecordWithVisits);

router.get("/firstvisits/find", getAllPatientFirstVisits);
router.get("/returnvisits/find", getAllPatientReturnVisit);

router.get("/find/firstvisit/:id", getPatientFirstVisit);

router.get("/find/returnvisit/:id", getPatientReturnVisit);

router.get("/find", getAllPatients);

router.get("/state/find", getAllPatientstate);

router.get("/lga/find", getAllPatientlga);

router.get("/datanumbers/find", datanumbers);

router.get("/findwithworkers", getAllPatientsAndHealthworker);

router.get("/findwithworkerspaginated", getAllPatientsAndHealthworkerpaginated);

router.get("/find/personal/:id", getPatientPersonalinfo);

export default router;
