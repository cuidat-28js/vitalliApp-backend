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
  editProfile: async (req, res, next) => {
    try {
      const { id } = req.user;
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
        .send({ msg: "profile updated", data: userUpdated });
    } catch (error) {
      console.log("errorrrrrr");
      next(error, req, res);
    }
  },

  getUserById: async (req, res) => {
    try {
      const { id } = req.user;
      if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(400).send({ msg: "id invalid" });
      }
      const user = await User.findById(id);
      res.json({
        msg: "user",
        data: {
          user,
        },
      });
    } catch (error) {
      res.status(400).send({ msg: error.message });
    }
  },
};
