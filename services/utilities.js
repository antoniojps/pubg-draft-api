function updatedInLast24Hours(date) {
  const yesterday = new Date(new Date().getTime() - 24 * 60 * 60 * 1000)
  return date > yesterday
}

module.exports = {
  updatedInLast24Hours
}
