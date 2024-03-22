const express = require("express");
const router = express.Router();
const medicalRecordController = require("../controllers/medicalRecord");
const auth = require("../middlewares/auth");

router.post("/create",[auth.authToken], medicalRecordController.createMedicalRecord);

router.patch("/edit/:id",[auth.authToken], medicalRecordController.updateMedicalRecord);

router.get("/:id",[auth.authToken], medicalRecordController.getMRById);

module.exports = router;
