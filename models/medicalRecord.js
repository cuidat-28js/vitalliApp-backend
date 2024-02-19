const { Schema, model } = require("mongoose");
const uniqueValidatior = require("mongoose-unique-validator");

const medicalRecordSchema = new Schema(
  {
    blood_type: {
      type: String,
    },
    chronic_deseases: {
      type: String,
    },
    alergies: {
      type: Array,
    },
    cardiovascular_deseases: {
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
    medicine: {
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

userSchema.plugin(uniqueValidatior);
const MedicalReord = model("medicalRecord", medicalRecordSchema);
module.exports = MedicalReord;
