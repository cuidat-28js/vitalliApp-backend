const { Schema, model, default: mongoose } = require("mongoose");
const bcrypt = require("bcrypt");
const uniqueValidatior = require("mongoose-unique-validator");

const userSchema = new Schema(
  {
    name: {
      type: String,
      // required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "email invalid"],
    },
    lastName: {
      type: String,
      // required: true,
    },
    password: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: {
        values: ["Male", "Female"],
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
    },
    appointment_id:{
      type: mongoose.Types.ObjectId
    },
    medicalrecord_id:{
      type: mongoose.Types.ObjectId
    }
  },
  {
    versionKey: false,
    timestamps: true,
    statics: {
      encrypPassword: async (password) => {
        if (
          !password.match(
            /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
          )
        ) {
          throw new Error("password not valid");
        }
        const salt = await bcrypt.genSalt(15);
        return await bcrypt.hash(password, salt);
      },
      comparePassword: async (password, hash) => {
        return await bcrypt.compare(password, hash);
      },
    },
  }
);

userSchema.plugin(uniqueValidatior);
const User = model("user", userSchema);
module.exports = User;
