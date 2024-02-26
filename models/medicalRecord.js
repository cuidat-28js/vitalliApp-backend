const { Schema, model } = require("mongoose");
const uniqueValidatior = require("mongoose-unique-validator");

const medicalRecordSchema = new Schema(
  {
    blood_type: {
      type: String,
      enum: {
        values: ["O+", "0-", "A+", "A-", "B+", "B-", "AB+", "AB-"],
        message: "{VALUE} is not a valid blood type",
      },
    },
    chronic_deseases: [String],
    alergies: {
      type: Array,
    },
    cardiovascular_deseases: [String],
    family_related_deseases: [{ name: String, ailment: String }],
    emergency_contact: [{ name: String, cel: Number }],
    medicine: [String],
    comments: {
      type: String,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

medicalRecordSchema.plugin(uniqueValidatior);
const MedicalRecord = model("medicalRecord", medicalRecordSchema);
module.exports = MedicalRecord;
