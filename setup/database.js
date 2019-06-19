const mongoose = require('mongoose')
const { MONGODB_URI } = require('./../services/config')

mongoose.Promise = global.Promise

module.exports = async function() {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useCreateIndex: true
    })
    console.log(`Connected to MONGO DATABASE: ${MONGODB_URI}`)
  } catch (err) {
    console.log('Failed connection to MONGO DATABASE')
    console.error(err.message)
  }
}
