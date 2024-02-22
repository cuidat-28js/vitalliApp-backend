const express = require("express");
const router = express.Router();
const appointmentController = require("../controllers/appointment");

router.post("/create-appointment", appointmentController.createAppointment);

module.exports = router;
