import express from "express";
import {
  getAllUsers,
  deleteAUser,
  getUserByPhone,
  getAllUnverifiedworkers,
  getUsersPatients,
  createPatient,
  createPatientFirstvisitPersonalInfo,
  sendAMessageToWorker,
  createASchedule,
  createDeliveryReport,
  getUnverifiedworkers,
  deVerifyAUser,
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
  patientscheduledvisitsms,
  patientscheduledvisitremindersms,
  patientscheduledvisitmissedsms,
  getMissedSchedulewithWorker,
  getAPatientSchedule,
  getAllUsersFiltered,
} from "../../controllers/user/users";
import {
  verifyToken,
  verifyTokenAndAuthorization,
} from "../../middlewares/verifyToken";
import {
  createACadre,
  updateACadre,
  deleteACadre,
} from "../../controllers/user/cadre";

const router = express.Router();

//update user
router.get("/find/details", verifyToken, getHealthworkerInfo);

router.post("/sms/schedule", patientscheduledvisitsms);

router.post("/sms/schedulereminder", patientscheduledvisitremindersms);

router.post("/sms/schedulemissed", patientscheduledvisitmissedsms);

router.post("/send/:id", sendAMessageToWorker);

router.post("/schedule/:id", verifyToken, createHealthworkerSchedule);

router.get("/schedule/find", verifyToken, getAllHealthworkersSchedule);

router.get("/schedule/find/all", getAllSchedule);

router.get("/schedule/find/patient/all", getAPatientSchedule);

router.get("/schedule/find/completed", verifyToken, getAllCompletedSchedule);
router.get("/schedule/find/upcoming", verifyToken, getAllUpcomingSchedule);
router.get("/schedule/find/missed", verifyToken, getAllMissedSchedule);

router.get(
  "/schedule/find/missedbypatient",
  verifyToken,
  getMissedSchedulewithWorker
);
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
//delete a user
router.delete("/healthpersonnel/:id", deleteAUser);
// get user patients
router.get("/find/patients/:id", getUsersPatients);

// router.post("/find/one", getUserByProp);

//get all users
router.get("/find", getAllUsers);
//get all users filter
router.get("/find/filtered", getAllUsersFiltered);

//get unverified users in healthfacility
router.get("/find/unverified", getUnverifiedworkers);

//get all unverified users
router.get("/find/unverified/all", getAllUnverifiedworkers);

//deverify a user
router.put("/deverify", deVerifyAUser);

// create a cadre
router.post("/cadre", createACadre);

// update a cadre
router.put("/cadre/:id", updateACadre);

// delete a cadre
router.delete("/cadre/:id", deleteACadre);

//create patient personal info
router.post("/patient/firstvisit/info", createPatientFirstvisitPersonalInfo);

//create patient personal info
router.post("/patient", createPatient);

export default router;
