const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");
const auth = require("../middlewares/auth");

router.post("/signup", [auth.authToken], userController.userCreate);

router.post("/login", userController.login);

module.exports = router;
