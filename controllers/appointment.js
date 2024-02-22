const Appointment = require("../models/appointment");

module.exports = {
    createAppointment: async (req, res, next) => {
        try {
          let appointment = await Appointment.create(req.body);
          if (!appointment) {
            res.status(502).send({ msg: "appointment not created", err: appointment });
          }
          await appointment.save();
          res.status(201).send({ msg: "appointment created", data: appointment });
        } catch (error) {
          next(error, req, res);
        }
      },
};
