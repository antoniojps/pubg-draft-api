const { gql } = require('apollo-server-micro')
const { getFaceitPlayerPubg } = require('./../../services/faceit')
const { getPlayerStats } = require('./../../services/pubg')

const typeDefs = gql`
  type Player {
    player_id: ID
    nickname: String
    avatar: String
    country: String
    skill_level: Int
    faceit_elo: Int
    game_player_name: String!
  }

  type Faceit {
    player: Player
    stats: JSON
  }

  type Pubg {
    gameMode: String
    stats: JSON
  }

  type Stats {
    faceit: Faceit
    pubg: Pubg
  }

  extend type Query {
    player(faceitUsername: String!): Stats!
  }
`

const resolvers = {
  Query: {
    player: async (_, { faceitUsername }) => {
      if (typeof faceitUsername !== 'string' || !faceitUsername)
        throw Error('Missing required Player param')

      try {
        const faceitData = await getFaceitPlayerPubg(faceitUsername)
        const pubgSeasonStats = await getPlayerStats(
          faceitData.player['game_player_name']
        )
        return {
          faceit: faceitData,
          pubg: pubgSeasonStats
        }
      } catch (err) {
        throw Error(err)
      }
    }
  }
}

module.exports = {
  typeDefs,
  resolvers
}
