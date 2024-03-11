const { error } = require("console");
const MedicalRecord = require("../models/medicalRecord");

module.exports = {
  createMedicalRecord: async (req, res, next) => {
    try {
      let medicalRecord = await MedicalRecord.create(req.body);
      if (!medicalRecord) {
        res
          .status(502)
          .send({ msg: "medical record not created", err: medicalRecord });
      }
      await medicalRecord.save();
      res
        .status(201)
        .send({ msg: "medical record created", data: medicalRecord });
    } catch (error) {
      next(error, req, res);
    }
  },

  updateMedicalRecord: async (req, res, next) => {
    try {
      const { id } = req.params;
      const newData = req.body;

      if (!id || !newData) {
        res
          .status(404)
          .send({ msg: "medical record id not found", err: error });
      }
      const medicalRecordUpdated = await MedicalRecord.findByIdAndUpdate(
        id,
        newData,
        { new: true }
      );
      await medicalRecordUpdated.save();
      res
        .status(200)
        .send({ msg: "medical record updated", data: medicalRecordUpdated });
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
      const medicalRecord = await MedicalRecord.findById(id);
      res.json({
        msg: "medical record",
        data: {
          medicalRecord,
        },
      });
    } catch (error) {
      res.status(400).send({ msg: error.message });
    }
  },
};
