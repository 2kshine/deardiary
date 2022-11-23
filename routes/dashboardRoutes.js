//Import controllers
const dashboardController = require('../controllers/dashboardController')
const express = require('express')
const router = express.Router()

router.get("/dashboard", dashboardController.getDashboard)

module.exports = router;