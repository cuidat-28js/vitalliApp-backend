const { error } = require("console");
const AllergiesRecord = require("../models/allergiesRecord");

module.exports = {
  createAllergiesRecord: async (req, res, next) => {
    try {
      const {
        allergies,
      } = req.body;
      let allergiesRecord = await AllergiesRecord.create({
        user_id: req.user.id,
        allergies,
      });
      if (!allergiesRecord) {
        res
          .status(502)
          .send({ msg: "allergies record not created", err: allergiesRecord });
      }
      await allergiesRecord.save();
      res
        .status(201)
        .send({ msg: "allergies record created", data: allergiesRecord });
    } catch (error) {
      next(error, req, res);
    }
  },

  updateAllergiesRecord: async (req, res, next) => {
    try {
      const { id } = req.params;
      const newData = req.body;

      if (!id || !newData) {
        res
          .status(404)
          .send({ msg: "allergies record id not found", err: error });
      }
      const allergiesRecordUpdated = await AllergiesRecord.findByIdAndUpdate(
        id,
        newData,
        { new: true }
      );
      await allergiesRecordUpdated.save();
      res
        .status(200)
        .send({ msg: "allergies record updated", data: allergiesRecordUpdated });
    } catch (error) {
      next(error, req, res);
    }
  },
  getMRById: async (req, res) => {
    try {
      const { id } = req.params;
      if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(400).send({ msg: "id invalid" });
      }
      const allergiesRecord = await AllergiesRecord.findById(id);
      res.json({
        msg: "allergies record",
        data: {
          allergiesRecord,
        },
      });
    } catch (error) {
      res.status(400).send({ msg: error.message });
    }
  },
};