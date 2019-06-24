function updatedInLast24Hours(date) {
  const yesterday = new Date(new Date().getTime() - 24 * 60 * 60 * 1000)
  return date > yesterday
}

function roundHundredth(number) {
  return Math.round(number * 100) / 100
}

module.exports = {
  updatedInLast24Hours,
  roundHundredth
}
