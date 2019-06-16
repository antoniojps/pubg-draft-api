module.exports = async (req, res) => {
  const data = {
    message: 'Hello modafoca'
  }
  res.setHeader('Content-Type', 'application/json')
  res.end(
    JSON.stringify({
      data
    })
  )
}
