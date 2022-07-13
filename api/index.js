const express = require('express')
const cors = require('cors')
const jwt = require('jsonwebtoken')

const port = 4000

const app = express()

app.use(express.json())
app.use(cors())

const users = []

module.exports = users

app.use('/renew', require('./routes/authRenovation'))
app.use('/signup', require('./routes/signup'))
app.use('/login', require('./routes/login'))
app.use('/request', require('./routes/request'))

app.listen(port, () => console.log(`Server running in port ${port}`))
