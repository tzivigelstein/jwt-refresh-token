const createToken = require('../helpers/createToken')
const users = require('../index')
const jwt = require('jsonwebtoken')

module.exports = (req, res) => {
  const { body } = req

  const user = users.find(({ email, password }) => email === body.email && password === body.password)

  if (!user) {
    return res.status(403).json({ error: 'user not registered' })
  }

  const access = createToken({ user: body }, '15m')
  const refresh = createToken({}, '30m')

  const exp = jwt.decode(access).exp

  return res.status(200).json({ access, refresh, exp })
}
