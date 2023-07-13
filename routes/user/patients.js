const express = require("express");
const {
  createPatient,
  getPatientRecord,
} = require("../../controllers/user/patients");
const router = express.Router();

router.post("/create", createPatient);

router.get("/find/:id", getPatientRecord);

module.exports = router;
