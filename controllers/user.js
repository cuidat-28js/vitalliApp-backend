const User = require("../models/user");
const auth = require("../middlewares/auth");
const encrypt = require("../lib/encrypt");

module.exports = {
  getUsers: async (req, res) => {
    try {
      const users = await User.find({});
      res.json({
        msg: "users list",
        data: {
          users,
        },
      });
    } catch (error) {
      res.status(400).send({ msg: error.message });
    }
  },

  register: async (req, res, next) => {
    try {
      const { email } = await req.body;
      let userEmail = (await User.findOne({ email })) || null;
      if (userEmail !== null) {
        return res.status(400).send({ msg: "Error, email exist" });
      }

      if (!req.body.password) {
        return res.status(400).send({ msg: "Password is required" });
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
        return res.status(502).send({ msg: "user not created", err: user });
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

  editProfile: async (req, res, next) => {
    try {
      const { id } = req.params;
      const newData = req.body;

      if (!id || !newData) {
        res.status(404).send({ msg: "user id not found", err: error });
      }
      const userUpdated = await User.findByIdAndUpdate(id, newData, {
        new: true,
      });
      await userUpdated.save();
      res
        .status(200)
        .send({ msg: "medical record updated", data: userUpdated });
    } catch (error) {
      console.log("errorrrrrr");
      next(error, req, res);
    }
  },
};
