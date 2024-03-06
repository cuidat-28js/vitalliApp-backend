const User = require("../models/user");
const auth = require("../middlewares/auth");
const encrypt = require("../lib/encrypt");

module.exports = {
  register: async (req, res, next) => {
    try {

      // if (req.body.email) {
      //   res.status(400).send({ msg: "Password is required" });
      //   return;
      // }

      if (!req.body.password) {
        res.status(400).send({ msg: "Password is required" });
        return;
      }

      let password = await req.body.password.toString();
      const passwordRegex =
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;

      if (!passwordRegex.test(password)) {
        res.status(400).send({
          msg: "Password should contain upper, lowercase, number and special caracter",
          err: req.body.password,
        });
        return;
      }

      req.body.password = await encrypt.encrypPassword(password);

      let user = await User.create(req.body);
      if (!user) {
        res.status(502).send({ msg: "user not created", err: user });
        return;
      }
      await user.save();
      return res.status(201).send({ msg: "user created", data: user });
    } catch (error) {
      next(error, req, res);
    }
  },


  login: async (req, res) => {
    const { email, password } = req.body;
    let user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).send({ msg: "user not found" });
    }
    let validPass = await encrypt.comparePassword(password, user.password);
    if (!validPass) {
      return res.status(401).send({ msg: "Incorrect password" });
    }
    let token = auth.generateToken(user);
    return res.status(200).send({ msg: "success", token: token });
  },
  //TODO: CREATE USER-PROFILE
  // createProfile: async (req, res, next) => {
  //   const resultado = await User.aggregate(
  //     [
  //       {
  //         $lookup:
  //         {
  //           from: 'appointment',
  //           localField: 'appointment_id',
  //           foreignField: '_id',
  //           as:'appointment_id_new'
  //         }
  //       }
  //     ]
  //   )
  // try {
  //   let user = await User.create(req.body);
  //   if (!user) {
  //     res.status(502).send({ msg: "user not created", err: user });
  //   }
  //   await user.save();
  //   res.status(201).send({ msg: "user created", data: user });
  // } catch (error) {
  //   next(error, req, res);
  // }
  // },
};
