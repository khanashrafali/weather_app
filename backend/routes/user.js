const express = require("express");
const router = express.Router();
const validator = require("./validator");
const userController = require("../controller/user.controller");


router.post("/signup", validator.signup, userController.signup );
router.post( "/login", validator.login, userController.login );


module.exports = router;
