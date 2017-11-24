module.exports = () => value => {
  try {
    JSON.parse(value)
  } catch (e) {
    return 'must be json'
  }
}
