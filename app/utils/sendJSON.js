function sendJSON(res, obj) {
  res.setHeader('Content-Type', 'application/json')
  res.send(JSON.stringify(obj))
}

module.exports = sendJSON
