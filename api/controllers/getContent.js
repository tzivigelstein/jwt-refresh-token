const RESPONSES = [
  'Some new content',
  'Awesome to see you again!',
  'What are you looking for?',
  "I'm here to help!",
  '๐งก๐๐๐๐๐ค๐ค๐ค'
]

module.exports = (req, res) => {
  const random = Math.floor(Math.random() * RESPONSES.length)
  return res.status(200).json({ content: RESPONSES[random] })
}
