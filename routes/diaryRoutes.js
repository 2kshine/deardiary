const express = require('express')
const router = express.Router()
const diariesController = require('../controllers/diariesController')
const {ensureAuth} = require('../middleware/authMiddleware')

// @desc Diaries
// @route GET /api/v1/Diaries
router.get("/diaries/add",ensureAuth, diariesController.getDiaries)

module.exports = router