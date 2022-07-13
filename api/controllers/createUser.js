const users = require('../index')

module.exports = (req, res) => {
  const { body } = req
  users.push(body)
  return res.status(200).json({ users })
}
