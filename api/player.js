const faceit = require('../services/faceit')
const express = require('express')
const helmet = require('helmet')
const bodyParser = require('body-parser')
const cors = require('cors')

const { getFaceitPlayerPubg } = faceit

const app = express()

// middleware
app.use(helmet())
app.use(bodyParser.json())
app.use(cors())

app.get('*', async (req, res) => {
  res.set('Content-Type', 'application/json')
  const { player } = req.query
  if (typeof player !== 'string' || !player)
    return res.status(400).send({
      code: 400,
      message: 'Missing required Player param'
    })
  try {
    const faceitData = await getFaceitPlayerPubg(player)
    res.status(200).send({
      faceit: faceitData
    })
  } catch (err) {
    res.status(400).send(err)
  }
})

module.exports = app
