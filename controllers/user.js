const User = require("../models/user");
const auth = require("../middlewares/auth");

module.exports = {
  userCreate: async (req, res, next) => {
    try {
      req.body.password = await User.encrypPassword(req.body.password);
      let user = await User.create(req.body);
      if (!user) {
        res.status(502).send({ msg: "user not created", err: user });
      }
      await user.save();
      res.status(201).send({ msg: "user created", data: user });
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
    let validPass = await User.comparePassword(password, user.password);
    if (!validPass) {
      return res.status(401).send({ msg: "Incorrect password" });
    }
    let token = auth.generateToken(user);
    return res.status(200).send({ msg: "success", data: token });
  },
};
