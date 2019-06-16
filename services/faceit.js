const axios = require('axios')
const { FACEIT_API_KEY } = require('./config')

const faceit = axios.create({
  baseURL: 'https://open.faceit.com/data/v4/',
  timeout: 1000,
  headers: {
    Authorization: `Bearer ${FACEIT_API_KEY}`,
    Accept: 'application/json"'
  }
})

const getPlayer = async player => {
  if (typeof player !== 'string' || !player) throw Error('Invalid player name')
  try {
    const {
      data: { player_id, nickname, avatar, country, games }
    } = await faceit.get('players', {
      params: {
        nickname: player
      }
    })

    if (!games.pubg) throw Error('Player does not play pubg')

    const { skill_level, faceit_elo, game_player_name } = games.pubg
    const data = {
      player_id,
      nickname,
      avatar,
      country,
      skill_level,
      faceit_elo,
      game_player_name
    }
    return data
  } catch (err) {
    throw Error(err)
  }
}

const getPlayerStats = async playerId => {
  if (typeof playerId !== 'string' || !playerId)
    throw Error('Invalid player id')
  try {
    const {
      data: { lifetime }
    } = await faceit.get(`players/${playerId}/stats/pubg`)
    const data = {
      ...lifetime
    }
    return data
  } catch (err) {
    throw Error(err)
  }
}

const getFaceitPlayerPubg = async player => {
  if (typeof player !== 'string' || !player)
    throw Error('Invalid player nickname')
  try {
    const playerData = await getPlayer(player)
    const { player_id: playerId } = playerData
    const stats = await getPlayerStats(playerId)
    const data = {
      player: playerData,
      stats
    }
    return data
  } catch (err) {
    throw Error(err)
  }
}

module.exports = {
  getFaceitPlayerPubg
}
