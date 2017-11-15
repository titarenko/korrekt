module.exports = () =>
  value =>
    value == null ? undefined : run(value)

function run (value) {
  if (!value.includes('@')) {
    return 'not an email'
  }
}
