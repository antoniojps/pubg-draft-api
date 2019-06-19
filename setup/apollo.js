const { ApolloServer, gql } = require('apollo-server-micro')
const typeDefs = require('./../graphql/typeDefs')
const resolvers = require('./../graphql/resolvers')
const cors = require('micro-cors')()

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  playground: true
})

module.exports = function() {
  return cors(apolloServer.createHandler())
}
