"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const users_1 = require("../../controllers/user/users");
const verifyToken_1 = require("../../middlewares/verifyToken");
const cadre_1 = require("../../controllers/user/cadre");
const router = express_1.default.Router();
//update user
router.get("/find/details", verifyToken_1.verifyToken, users_1.getHealthworkerInfo);
router.post("/sms/schedule", users_1.patientscheduledvisitsms);
router.post("/sms/schedulereminder", users_1.patientscheduledvisitremindersms);
router.post("/sms/schedulemissed", users_1.patientscheduledvisitmissedsms);
router.post("/send/:id", users_1.sendAMessageToWorker);
router.post("/schedule/:id", verifyToken_1.verifyToken, users_1.createHealthworkerSchedule);
router.get("/schedule/find", verifyToken_1.verifyToken, users_1.getAllHealthworkersSchedule);
router.get("/schedule/find/all", users_1.getAllSchedule);
router.get("/schedule/find/patient/all", users_1.getAPatientSchedule);
router.get("/schedule/find/completed", verifyToken_1.verifyToken, users_1.getAllCompletedSchedule);
router.get("/schedule/find/upcoming", verifyToken_1.verifyToken, users_1.getAllUpcomingSchedule);
router.get("/schedule/find/missed", verifyToken_1.verifyToken, users_1.getAllMissedSchedule);
router.get("/schedule/find/missedbypatient", verifyToken_1.verifyToken, users_1.getMissedSchedulewithWorker);
router.get("/schedule/find/flagged", verifyToken_1.verifyToken, users_1.getAllFlaggedSchedule);
router.delete("/schedule/:id", verifyToken_1.verifyToken, users_1.deleteAHealthworkerSchedule);
router.put("/schedule/update/:id", verifyToken_1.verifyToken, users_1.updateHealthworkerScheduleCompleted);
router.post("/deliveryreport/:id", users_1.createDeliveryReport);
// get a user by phone
router.get("/find/phone", users_1.getUserByPhone);
//delete a user
router.delete("/healthpersonnel/:id", users_1.deleteAUser);
// get user patients
router.get("/find/patients/:id", users_1.getUsersPatients);
// router.post("/find/one", getUserByProp);
//get all users
router.get("/find", users_1.getAllUsers);
//get all users filter
router.get("/find/filtered", users_1.getAllUsersFiltered);
//get unverified users
router.get("/find/unverified", users_1.getUnverifiedworkers);
//deverify a user
router.put("/deverify", users_1.deVerifyAUser);
// create a cadre
router.post("/cadre", cadre_1.createACadre);
// update a cadre
router.put("/cadre/:id", cadre_1.updateACadre);
// delete a cadre
router.delete("/cadre/:id", cadre_1.deleteACadre);
//create patient personal info
router.post("/patient/firstvisit/info", users_1.createPatientFirstvisitPersonalInfo);
//create patient personal info
router.post("/patient", users_1.createPatient);
exports.default = router;
