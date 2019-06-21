const FACEIT_API_KEY = 'xxx'
const PUBG_API_KEY = 'xxx'
const MONGODB_URI =
  process.env === 'production' ? 'xxx' : 'mongodb://localhost:27017/PubgDraft'

module.exports = {
  FACEIT_API_KEY,
  PUBG_API_KEY,
  MONGODB_URI
}
