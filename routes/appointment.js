const express = require("express");
const router = express.Router();
const appointmentController = require("../controllers/appointment");

router.post("/create", appointmentController.createAppointment);

router.patch("/edit/:id", appointmentController.updateAppointment);

router.delete("/delete/:id", appointmentController.deleteAppointment);

module.exports = router;
