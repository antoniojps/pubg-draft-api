const setupApollo = require('./setup/apollo')
const setupDatabase = require('./setup/database')

function main() {
  setupDatabase()
  return setupApollo()
}

module.exports = main()
