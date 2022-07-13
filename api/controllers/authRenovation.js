const jwt = require('jsonwebtoken')
const users = require('..')
const createToken = require('../helpers/createToken')

module.exports = (req, res) => {
  const { body } = req
  const { refresh } = JSON.parse(req.headers.authorization)

  const user = users.find(({ email, password }) => body.email === email && body.password === password)
  const verifyRefreshToken = refresh.replace('Bearer ', '')

  jwt.verify(verifyRefreshToken, 'key', function (err, data) {
    if (err) throw err
    const newAccessToken = createToken({ user }, '15m')
    const newRefreshToken = createToken({}, '30m')

    return res.status(200).json({ access: newAccessToken, refresh: newRefreshToken })
  })
}
