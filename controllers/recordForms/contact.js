const { error } = require("console");
const ContactRecord = require("../models/contactRecord");

module.exports = {
  createContactRecord: async (req, res, next) => {
    try {
      const {
        contact,
      } = req.body;
      let contactRecord = await ContactRecord.create({
        user_id: req.user.id,
        contact,
      });
      if (!contactRecord) {
        res
          .status(502)
          .send({ msg: "contact record not created", err: contactRecord });
      }
      await contactRecord.save();
      res
        .status(201)
        .send({ msg: "contact record created", data: contactRecord });
    } catch (error) {
      next(error, req, res);
    }
  },

  updateContactRecord: async (req, res, next) => {
    try {
      const { id } = req.params;
      const newData = req.body;

      if (!id || !newData) {
        res
          .status(404)
          .send({ msg: "contact record id not found", err: error });
      }
      const contactRecordUpdated = await ContactRecord.findByIdAndUpdate(
        id,
        newData,
        { new: true }
      );
      await contactRecordUpdated.save();
      res
        .status(200)
        .send({ msg: "contact record updated", data: contactRecordUpdated });
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
      const contactRecord = await ContactRecord.findById(id);
      res.json({
        msg: "contact record",
        data: {
          contactRecord,
        },
      });
    } catch (error) {
      res.status(400).send({ msg: error.message });
    }
  },
};