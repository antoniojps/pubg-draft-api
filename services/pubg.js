const axios = require('axios')
const { PUBG_API_KEY } = require('./config')
const { roundHundredth } = require('./utilities')

// config
const pubg = axios.create({
  baseURL: 'https://api.playbattlegrounds.com/shards/',
  timeout: 10000,
  headers: {
    Authorization: `Bearer ${PUBG_API_KEY}`,
    Accept: 'application/vnd.api+json',
    'Accept-Encoding': 'gzip'
  }
})

/**
 * gets seasons
 * @param {string} - shards (platform: steam)
 * @returns {promise}
 */
async function getCurrentSeason(shards = 'steam') {
  const url = `${shards}/seasons`
  try {
    const {
      data: { data: seasons }
    } = await pubg.get(url)
    const currentSeason = seasons.find(
      season => season.attributes.isCurrentSeason
    )
    return currentSeason
  } catch (err) {
    throw Error(err)
  }
}

/**
 * gets player id
 * @param {string} - player name - case sensitive
 * @param {string} - platform-server (pc-eu/pc-na...)
 * @returns {promise}
 */
async function getPlayerId(player, shards = 'steam') {
  const url = `${shards}/players?filter[playerNames]=${player}`
  if (typeof player !== 'string' || !player) throw Error('Missing player name')
  try {
    const {
      data: { data }
    } = await pubg.get(url)
    const accountId = data[0].id || null
    if (!accountId) throw Error('Player not found')
    return accountId
  } catch (err) {
    throw Error(err)
  }
}

/**
 * gets player squad-fpp stats
 * @param {string} - shards (platform: steam)
 * @returns {promise}
 */
async function getPlayerStats(
  player,
  shards = 'steam',
  gameMode = 'squad-fpp'
) {
  if (typeof player !== 'string' || !player) throw Error('Missing player name')

  try {
    const { id: seasonId } = await getCurrentSeason()
    const playerId = await getPlayerId(player)

    const url = `${shards}/players/${playerId}/seasons/${seasonId}`
    const {
      data: {
        data: {
          attributes: { gameModeStats }
        }
      }
    } = await pubg.get(url)

    const pubgStats = gameModeStats[gameMode]
    const { roundsPlayed, wins, kills, damageDealt } = pubgStats
    const kd = kills / (roundsPlayed - wins)
    const avgDamage = damageDealt / roundsPlayed

    return {
      stats: {
        gameMode,
        kdRatio: roundHundredth(kd),
        avgDamage: roundHundredth(avgDamage),
        matches: pubgStats.roundsPlayed
      }
    }
  } catch (err) {
    throw Error(err)
  }
}

module.exports = {
  getPlayerStats
}
