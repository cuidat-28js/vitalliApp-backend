const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");
const auth = require("../middlewares/auth");

router.get("/", userController.getUsers);

router.patch("/editProfile/:id", userController.editProfile);

router.get("/:id", userController.getUserById);

// router.post("/create-profile", userController.userCreate);

module.exports = router;
