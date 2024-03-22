const { Schema, model, default: mongoose } = require("mongoose");
const uniqueValidatior = require("mongoose-unique-validator");

const chronicDeseaseRecordSchema = new Schema(
  {
    user_id:{
      require: true,
      type: mongoose.Types.ObjectId,
      ref: 'User'
      },
    chronicDesease: {
      type: Array,
    },
    
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

medicalRecordSchema.plugin(uniqueValidatior);
const ChronicDeseaseRecord = model("chronicDeseaseRecord", chronicDeseaseRecordSchema);
module.exports = ChronicDeseaseRecord;