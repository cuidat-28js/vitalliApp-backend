const { Schema, model, default: mongoose } = require("mongoose");
const uniqueValidatior = require("mongoose-unique-validator");

const userSchema = new Schema(
  {
    medicalrecord_id:{
      type: mongoose.Types.ObjectId
    },
    name: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "email invalid"],
    },
    lastName: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: {
        values: ["Masculino", "Femenino"],
        message: "{VALUE} is not a valid gender",
      },
    },
    age: { type: Date },
    telephone: {
      type: Number,
    },
    birthdate: {
      type: Date,
    },
    adress: {
      type: String,
    }
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

userSchema.plugin(uniqueValidatior);
const User = model("user", userSchema);
module.exports = User;
