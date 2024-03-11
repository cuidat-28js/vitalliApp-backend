const express = require("express");
const router = express.Router();
const medicalRecordController = require("../controllers/medicalRecord");

router.post("/create", medicalRecordController.createMedicalRecord);

router.patch("/edit/:id", medicalRecordController.updateMedicalRecord);

router.get("/:id", medicalRecordController.getMRById);

module.exports = router;
