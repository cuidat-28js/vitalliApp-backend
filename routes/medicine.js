const express = require("express");
const router = express.Router();
const medicineRecordController = require("../controllers/medicine");
const auth = require("../middlewares/auth");

router.post("/create",[auth.authToken], medicineRecordController.createMedicineRecord);

router.patch("/edit:id",[auth.authToken], medicineRecordController.updateMedicineRecord);

router.get("/:id",[auth.authToken], medicineRecordController.getMedicineById);

module.exports = router;