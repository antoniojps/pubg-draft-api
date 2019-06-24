const { gql } = require('apollo-server-micro')
const Player = require('./../../models/player')

const typeDefs = gql`
  type Player {
    nickname: String!
    faceit: Faceit
    pubg: Pubg
  }

  type FaceitPlayer {
    player_id: ID
    nickname: String
    avatar: String
    country: String
    skill_level: Int
    faceit_elo: Int
    game_player_name: String!
  }

  type Faceit {
    player: FaceitPlayer
    stats: Stats
  }

  type Pubg {
    stats: Stats
  }

  type Stats {
    gameMode: String
    kdRatio: Float
    avgDamage: Float
    matches: Int
  }

  extend type Query {
    player(faceitUsername: String!): Player!
  }
`

const resolvers = {
  Query: {
    player: async (_, { faceitUsername }) => {
      if (typeof faceitUsername !== 'string' || !faceitUsername)
        throw Error('Missing required faceitUsername param')

      try {
        const player = await Player.findOrCreateByNickname(faceitUsername)
        return player
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
