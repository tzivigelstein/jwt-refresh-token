const jwt = require('jsonwebtoken')

module.exports = (payload, expiresIn) => {
  return jwt.sign(payload, 'key', {
    expiresIn,
  })
}
