const express = require('express')
const router = express.Router()
const authRenovation = require('../controllers/authRenovation')

router.post('/', authRenovation)

module.exports = router
