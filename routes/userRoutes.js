//importing userAuthController
const userAuthController = require("../controllers/userAuthController");
const express = require("express");
const router = express.Router();

// @desc Login 
//@route GET /
router.get("/", userAuthController.userLogin);

module.exports = router;
