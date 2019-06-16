const axios = require('axios')

// config
const ax = axios.create({
  baseURL: 'https://api.playbattlegrounds.com/shards/',
  timeout: 10000,
  headers: {
    Authorization: `Bearer ${process.env.PUBG_APIKEY}`,
    Accept: 'application/vnd.api+json',
    'Accept-Encoding': 'gzip'
  }
})
