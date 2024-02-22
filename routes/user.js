const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");
const auth = require("../middlewares/auth");

router.post("/signup", [auth.authToken], userController.register);

router.post("/login", userController.login);

// router.post("/create-profile", userController.userCreate);

module.exports = router;
