const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");
const auth = require("../middlewares/auth");

router.get("/", userController.getUsers);

router.post("/register", userController.register);

router.post("/login", userController.login, [auth.authToken]);

router.patch("/editProfile/:id", userController.editProfile);

// router.post("/create-profile", userController.userCreate);

module.exports = router;
