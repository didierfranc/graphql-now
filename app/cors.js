module.exports = next => (req, res) => {
  res.setHeader('Access-Control-Allow-Headers', 'content-type')
  res.setHeader('Access-Control-Allow-Origin', '*')
  if (req.method === 'OPTIONS') res.end()
  else next(req, res)
}
