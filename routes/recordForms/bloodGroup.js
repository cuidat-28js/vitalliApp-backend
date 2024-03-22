const express = require("express");
const router = express.Router();
const bloodGroupRecordController = require("../controllers/recordForms/bloodGroup");
const auth = require("../middlewares/auth");

router.post("/create",[auth.authToken], bloodGroupRecordController.createBloodGroupRecord);

router.patch("/edit:id",[auth.authToken], bloodGroupRecordController.updateBloodGroupRecord);

router.get("/:id",[auth.authToken], bloodGroupRecordController.getBloodById);

module.exports = bloodGroup