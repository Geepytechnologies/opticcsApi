const express = require("express");
const {
  getAllUsers,
  getUserByPhone,
  getUsersPatients,
  createPatient,
  createPatientFirstVisit,
  createPatientFirstvisitPersonalInfo,
  createPatientFirstvisitDailyhabits,
  createPatientFirstvisitObstetric,
  createPatientFirstvisitMedication,
  createPatientFirstvisitMedicationPulmonary,
  createPatientFirstvisitMedicationCardiovascular,
  createPatientFirstvisitMedicationNeuro,
  createPatientFirstvisitMedicationGastro,
  createPatientFirstvisitMedicationUrinary,
  createPatientFirstvisitMedicationGynae,
  createPatientFirstvisitMedicationHistoryof,
  createPatientFirstvisitMedicationDiagnosedof,
  createPatientFirstvisitMedicationOnmedications,
  sendMessage,
  sendBulkMessage,
  sendAMessageToWorker,
  createASchedule,
  createDeliveryReport,
  getUnverifiedworkers,
  getHealthworkerInfo,
  createHealthworkerSchedule,
  updateHealthworkerScheduleCompleted,
  deleteAHealthworkerSchedule,
  getAllHealthworkersSchedule,
  getAllSchedule,
  getAllCompletedSchedule,
  getAllUpcomingSchedule,
  getAllMissedSchedule,
  getAllFlaggedSchedule,
} = require("../../controllers/user/users.js");
const {
  verifyToken,
  verifyTokenAndAuthorization,
} = require("../../middlewares/verifyToken.js");
const {
  createACadre,
  updateACadre,
  deleteACadre,
} = require("../../controllers/user/cadre.js");

const router = express.Router();

//update user
router.get("/find/details", verifyToken, getHealthworkerInfo);

router.post("/sms", sendMessage);

router.post("/sms/bulk", sendBulkMessage);

router.post("/send/:id", sendAMessageToWorker);

router.post("/schedule/:id", verifyToken, createHealthworkerSchedule);

router.get("/schedule/find", verifyToken, getAllHealthworkersSchedule);

router.get("/schedule/find/all", getAllSchedule);

router.get("/schedule/find/completed", verifyToken, getAllCompletedSchedule);
router.get("/schedule/find/upcoming", verifyToken, getAllUpcomingSchedule);
router.get("/schedule/find/missed", verifyToken, getAllMissedSchedule);
router.get("/schedule/find/flagged", verifyToken, getAllFlaggedSchedule);

router.delete("/schedule/:id", verifyToken, deleteAHealthworkerSchedule);

router.put(
  "/schedule/update/:id",
  verifyToken,
  updateHealthworkerScheduleCompleted
);

router.post("/deliveryreport/:id", createDeliveryReport);

// get a user by phone
router.get("/find/phone", getUserByPhone);

// get user patients
router.get("/find/patients/:id", getUsersPatients);

// router.post("/find/one", getUserByProp);

//get all users
router.get("/find", getAllUsers);

//get unverified users
router.get("/find/unverified", getUnverifiedworkers);

// create a cadre
router.post("/cadre", createACadre);

// update a cadre
router.put("/cadre/:id", updateACadre);

// delete a cadre
router.delete("/cadre/:id", deleteACadre);

//create patient personal info
router.post("/patient/firstvisit/info", createPatientFirstvisitPersonalInfo);

//create patient firstvisit daily habits
router.post(
  "/patient/firstvisit/dailyhabits",
  createPatientFirstvisitDailyhabits
);

//create patient firstvisit obstetric
router.post("/patient/firstvisit/obstetric", createPatientFirstvisitObstetric);

//create patient firstvisit medication
router.post(
  "/patient/firstvisit/medication",
  createPatientFirstvisitMedication
);
router.post(
  "/patient/firstvisit/medication/pulmonary",
  createPatientFirstvisitMedicationPulmonary
);
router.post(
  "/patient/firstvisit/medication/cardio",
  createPatientFirstvisitMedicationCardiovascular
);
router.post(
  "/patient/firstvisit/medication/neuro",
  createPatientFirstvisitMedicationNeuro
);
router.post(
  "/patient/firstvisit/medication/gastro",
  createPatientFirstvisitMedicationGastro
);
router.post(
  "/patient/firstvisit/medication/urinary",
  createPatientFirstvisitMedicationUrinary
);
router.post(
  "/patient/firstvisit/medication/gynae",
  createPatientFirstvisitMedicationGynae
);
router.post(
  "/patient/firstvisit/medication/historyof",
  createPatientFirstvisitMedicationHistoryof
);
router.post(
  "/patient/firstvisit/medication/diagnosedof",
  createPatientFirstvisitMedicationDiagnosedof
);

router.post(
  "/patient/firstvisit/medication/onmedications",
  createPatientFirstvisitMedicationOnmedications
);

//create patient personal info
router.post("/patient", createPatient);

//create patient firstvisit
router.post("/patient/firstvisit", createPatientFirstVisit);

module.exports = router;
