const express = require("express");
const router = express.Router();
const allergiesRecordController = require("../controllers/recordForms/allergies");
const auth = require("../middlewares/auth");

router.post("/create",[auth.authToken], allergiesRecordController.createAllergiasRecord);

router.patch("/edit:id",[auth.authToken],allergieslRecordController.updateAllergiasRecord);

router.get("/:id",[auth.authToken], allergiesRecordController.getMRById);

module.exports = router;