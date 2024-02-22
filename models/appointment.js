const { Schema, model } = require("mongoose");
const uniqueValidatior = require("mongoose-unique-validator");

const appointmentSchema = new Schema(
  {
    date: {
      type: Date,
    },
    type_of_specilist: {
      type: String,
    },
    doctors_name: {
      type: String,
    },
    symptoms: {
      type: String,
    },
    cost: {
      type: Number,
    },
    diagnosis: {
      type: String,
    },
    adress: {
      type: String,
    },
    prescription: {
      type: String,
    },
    medicine: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

appointmentSchema.plugin(uniqueValidatior);
const Appointment = model("appointment", appointmentSchema);
module.exports = Appointment;
