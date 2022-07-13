const express = require('express')
const router = express.Router()
const getContent = require('../controllers/getContent')
const authVerify = require('../middlewares/authVerify')

router.get('/', authVerify, getContent)

module.exports = router
