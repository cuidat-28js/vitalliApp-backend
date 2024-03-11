const { error } = require("console");
const Appointment = require("../models/appointment");

module.exports = {
  getAppointments: async (req, res) => {
    try {
      const appointments = await Appointment.find({});
      res.json({
        msg: "appointment list",
        data: {
          appointments,
        },
      });
    } catch (error) {
      res.status(400).send({ msg: error.message });
    }
  },
  createAppointment: async (req, res, next) => {
    try {
      let appointment = await Appointment.create(req.body);
      if (!appointment) {
        res
          .status(502)
          .send({ msg: "appointment not created", err: appointment });
      }
      await appointment.save();
      res.status(201).send({ msg: "appointment created", data: appointment });
    } catch (error) {
      next(error, req, res);
    }
  },
  updateAppointment: async (req, res, next) => {
    try {
      const { id } = req.params;
      const newData = req.body;

      if (!id || !newData) {
        res.status(404).send({ msg: "appointment id not found", err: error });
      }
      const appointmentUpdated = await Appointment.findByIdAndUpdate(
        id,
        newData,
        { new: true }
      );
      await appointmentUpdated.save();
      res
        .status(200)
        .send({ msg: "appointment updated", data: appointmentUpdated });
    } catch (error) {
      next(error, req, res);
    }
  },
  deleteAppointment: async (req, res, next) => {
    try {
      const { id } = req.params;

      if (!id) {
        res.status(404).send({ msg: "appointment id not found", err: error });
      }
      const appointmentDeleted = await Appointment.findByIdAndDelete(id);

      res
        .status(200)
        .send({ msg: "appointment deletd", data: appointmentDeleted });
    } catch (error) {
      next(error, req, res);
    }
  },
};
