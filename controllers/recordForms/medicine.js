const { error } = require("console");
const MedicineRecord = require("../models/medicineRecord");

module.exports = {
  createMedicineRecord: async (req, res, next) => {
    try {
      const {
        medicine,
      } = req.body;
      let medicineRecord = await MedicineRecord.create({
        user_id: req.user.id,
        medicine,
      });
      if (!medicineRecord) {
        res
          .status(502)
          .send({ msg: "medicine record not created", err: medicineRecord });
      }
      await medicineRecord.save();
      res
        .status(201)
        .send({ msg: "medicine record created", data: medicineRecord });
    } catch (error) {
      next(error, req, res);
    }
  },

  updateMedicineRecord: async (req, res, next) => {
    try {
      const { id } = req.params;
      const newData = req.body;

      if (!id || !newData) {
        res
          .status(404)
          .send({ msg: "medicine record id not found", err: error });
      }
      const medicineRecordUpdated = await MedicineRecord.findByIdAndUpdate(
        id,
        newData,
        { new: true }
      );
      await medicineRecordUpdated.save();
      res
        .status(200)
        .send({ msg: "medicine record updated", data: medicineRecordUpdated });
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
      const medicineRecord = await MedicineRecord.findById(id);
      res.json({
        msg: "medicine record",
        data: {
          medicineRecord,
        },
      });
    } catch (error) {
      res.status(400).send({ msg: error.message });
    }
  },
};