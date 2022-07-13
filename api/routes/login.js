const express = require('express')
const router = express.Router()
const authUser = require('../controllers/authUser')

router.post('/', authUser)

module.exports = router
