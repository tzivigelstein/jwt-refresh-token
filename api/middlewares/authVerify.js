const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  const { access } = JSON.parse(req.headers.authorization)

  const verifyAccessToken = access.replace('Bearer ', '')

  try {
    const encoded = jwt.verify(verifyAccessToken, 'key')
    req.auth = encoded.user
    next()
  } catch (error) {
    res.status(401).json({ msg: 'Invalid token' })
  }
}
