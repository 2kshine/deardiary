//importing userAuthController
const userAuthController = require("../controllers/userAuthController");
const express = require("express");
const router = express.Router();
const {ensureAuth, ensureGuest} = require('../middleware/authMiddleware')
// @desc Login 
//@route GET /
router.get("/",ensureGuest, userAuthController.userLogin);

module.exports = router;
