const { error } = require("console");
const BloodGroupRecord = require("../models/bloodGroupRecord");

module.exports = {
  getBloodGroup: async (req, res) => {
    try {
      console.log(req.user.id, "user id");
      const bloodGroup = await BloodGroupRecord.find({
        user_id: req.user.id,
      });
      console.log(bloodGroup);
      res.json({
        msg: "blood group",
        bloodGroup,
      });
    } catch (error) {
      res.status(400).send({ msg: error.message });
    }
  },
  createBloodGroupRecord: async (req, res, next) => {
    try {
      const {
        blood_type,
      } = req.body;
      let bloodGroupRecord = await BloodGroupRecord.create({
        user_id: req.user.id,
        blood_type,
      });
      if (!bloodGroupRecord) {
        res
          .status(502)
          .send({ msg: "blood group record not created", err: bloodGroupRecord });
      }
      await bloodGroupRecord.save();
      res
        .status(201)
        .send({ msg: "blood group record created",  bloodGroupRecord });
    } catch (error) {
      next(error, req, res);
    }
  },

  updateBloodGroupRecord: async (req, res, next) => {
    try {
      const { id } = req.params;
      const newData = req.body;

      if (!id || !newData) {
        res
          .status(404)
          .send({ msg: "blood group record id not found", err: error });
      }
      const bloodGroupRecordUpdated = await BloodGroupRecord.findByIdAndUpdate(
        id,
        newData,
        { new: true }
      );
      await bloodGroupRecordUpdated.save();
      res
        .status(200)
        .send({ msg: "blood group record updated", data: bloodGroupRecordUpdated });
    } catch (error) {
      next(error, req, res);
    }
  },
  getBloodById: async (req, res) => {
    try {
      const { id } = req.params;
      if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(400).send({ msg: "id invalid" });
      }
      const bloodGroupRecord = await BloodGroupRecord.findById(id);
      res.json({
        msg: "blood group record",
        data: {
          bloodGroupRecord,
        },
      });
    } catch (error) {
      res.status(400).send({ msg: error.message });
    }
  },
};