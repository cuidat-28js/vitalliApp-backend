const express = require("express");
const router = express.Router();
const chronicDeseaseRecordController = require("../controllers/chronicDesease");
const auth = require("../middlewares/auth");

router.post("/create",[auth.authToken], chronicDeseaseRecordController.createChronicDeseaseRecord);

router.patch("/edit:id",[auth.authToken], chronicDeseaseRecordController.updateChronicDeseaseRecord);

router.get("/:id",[auth.authToken], chronicDeseaseRecordController.getChronicById);

module.exports = router;