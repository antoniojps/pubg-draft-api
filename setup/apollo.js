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

// Fixed cors, read issue: https://github.com/apollographql/apollo-server/issues/2473

module.exports = function() {
  return cors((req, res) => {
    if (req.method === 'OPTIONS') {
      res.end()
      return
    }
    return apolloServer.createHandler()(req, res)
  })
}
