const merge = require('lodash.merge')
const { resolvers: PlayerResolvers } = require('./schemas/player')
const jsonScalar = require('graphql-type-json')

const setupResolvers = {
  JSON: jsonScalar,

  Query: {},

  Mutation: {}
}

const resolvers = merge(setupResolvers, PlayerResolvers)

module.exports = resolvers
