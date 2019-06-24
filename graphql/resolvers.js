const merge = require('lodash.merge')
const { resolvers: PlayerResolvers } = require('./schemas/player')

const setupResolvers = {
  Query: {},

  Mutation: {}
}

const resolvers = merge(setupResolvers, PlayerResolvers)

module.exports = resolvers
