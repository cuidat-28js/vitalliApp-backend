const express = require("express");
const router = express.Router();
const medicalRecordController = require("../controllers/medicalRecord");

router.post("/create", medicalRecordController.createMedicalRecord);

router.patch("/edit/:id", medicalRecordController.updateMedicalRecord);

module.exports = router;
