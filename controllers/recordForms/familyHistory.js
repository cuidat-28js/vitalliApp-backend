const { error } = require("console");
const FamilyHistoryRecord = require("../models/familyHistoryRecord");

module.exports = {
  createFamilyHistoryRecord: async (req, res, next) => {
    try {
      const {
        familyHistory,
      } = req.body;
      let familyHistoryRecord = await FamilyHistoryRecord.create({
        user_id: req.user.id,
        familyHistory,
      });
      if (!familyHistoryRecord) {
        res
          .status(502)
          .send({ msg: "family history record not created", err: familyHistoryRecord });
      }
      await familyHistoryRecord.save();
      res
        .status(201)
        .send({ msg: "family history record created", data: familyHistoryRecord });
    } catch (error) {
      next(error, req, res);
    }
  },

  updateFamilyHistoryRecord: async (req, res, next) => {
    try {
      const { id } = req.params;
      const newData = req.body;

      if (!id || !newData) {
        res
          .status(404)
          .send({ msg: "family history record id not found", err: error });
      }
      const familyHistoryRecordUpdated = await FamilyHistoryRecord.findByIdAndUpdate(
        id,
        newData,
        { new: true }
      );
      await familyHistoryRecordUpdated.save();
      res
        .status(200)
        .send({ msg: "family history record updated", data: familyHistoryRecordUpdated });
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
      const familyHistoryRecord = await FamilyHistoryRecord.findById(id);
      res.json({
        msg: "family history record",
        data: {
          familyHistoryRecord,
        },
      });
    } catch (error) {
      res.status(400).send({ msg: error.message });
    }
  },
};