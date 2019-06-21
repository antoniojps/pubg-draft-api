const { getFaceitPlayerPubg } = require('./faceit')
const { getPlayerStats } = require('./pubg')

async function getAllPlayerStats(faceitUsername) {
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

module.exports = {
  getAllPlayerStats
}
