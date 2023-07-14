const express = require("express");
const {
  getAllUsers,
  getUserByEmail,
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
// router.put("/:id", verifyToken, update);

//update user for purchase
// router.put("/purchase/:id", verifyToken, updateuserforpurchase);

//update user for purchase
// router.put("/purchase/special/:id", verifyToken, updateforspecialpackage);

//update user for purchase
// router.put("/purchase/special/earned/:id", verifyToken, updatespecialearned);

//update user referraldata
// router.put("/referral/:id", verifyToken, updatereferralbonus);

//update user referraldata on signup
// router.put("/signup/:id", updatereferral);

//delete user
// router.delete("/:id", verifyTokenAndAuthorization, deleteUser);

router.post("/sms", sendMessage);

router.post("/sms/bulk", sendBulkMessage);

router.post("/send/:id", sendAMessageToWorker);

router.post("/schedule/:id", createASchedule);

router.post("/deliveryreport/:id", createDeliveryReport);

// get a user by mail
router.get("/find/email", getUserByEmail);

// get a user by phone
router.get("/find/phone", getUserByPhone);

// get user patients
router.get("/find/patients/:id", getUsersPatients);

// router.post("/find/one", getUserByProp);

//get all users
router.get("/find", getAllUsers);

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
