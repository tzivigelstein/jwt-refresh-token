const express = require('express')
const createUser = require('../controllers/createUser')
const router = express.Router()

router.post('/', createUser)

module.exports = router
