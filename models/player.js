const mongoose = require('mongoose')
const { updatedInLast24Hours } = require('./../services/utilities')
const { getAllPlayerStats } = require('./../services/requests')
const { ObjectId } = mongoose.Schema

const PlayerSchema = mongoose.Schema({
  nickname: {
    type: String,
    required: true
  },
  faceit: {
    type: Object,
    sparce: true
  },
  pubg: {
    type: Object,
    sparce: true
  }
})

PlayerSchema.set('timestamps', true)

// instance
PlayerSchema.methods = {}

// model
PlayerSchema.statics = {
  async findOrCreateByNickname(nickname) {
    // find in DB
    const playerFromDB = await this.findOne({ nickname })

    if (playerFromDB) {
      const { updatedAt } = playerFromDB
      const updatedRecently = updatedInLast24Hours(updatedAt)

      // update stats if player stats not updated in last 24 hours
      if (!updatedRecently) {
        const stats = await getAllPlayerStats(nickname)
        const updatedPlayerStatsFromDB = await this.updatePlayerStats(
          nickname,
          stats
        )
        console.log(`player ${nickname} updated stats from api`)
        return updatedPlayerStatsFromDB
      }
      console.log(`player ${nickname} queried from db`)
      console.log({ playerFromDB })
      return playerFromDB
    }

    // get player from faceit and pubg api if not present in db
    const { pubg, faceit } = await getAllPlayerStats(nickname)
    const newPlayer = new Player({ nickname, pubg, faceit })
    await newPlayer.save()
    console.log(`player ${nickname} created from api to db`)

    return newPlayer
  },
  async updatePlayerStats(nickname, stats) {
    const { faceit, pubg } = stats
    const udpatedPlayer = await Player.findOneAndUpdate(
      {
        nickname
      },
      {
        $set: { nickname, faceit, pubg }
      },
      {
        new: true
      }
    )
    return udpatedPlayer
  }
}

const Player = mongoose.model('Player', PlayerSchema)

module.exports = Player
