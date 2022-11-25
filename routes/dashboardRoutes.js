//Import controllers
const dashboardController = require('../controllers/dashboardController')
const express = require('express')
const router = express.Router()
const {ensureAuth, ensureGuest} = require('../middleware/authMiddleware')

// @desc Dashboard
// @route GET /api/v1/dashboard
router.get("/dashboard",ensureAuth, dashboardController.getDashboard)

module.exports = router;