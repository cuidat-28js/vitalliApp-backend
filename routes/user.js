const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");
const auth = require("../middlewares/auth");

router.post("/register", userController.userCreate);

router.post("/login",userController.login ,[auth.authToken]);

module.exports = router;
