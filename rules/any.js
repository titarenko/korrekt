module.exports = rules =>
  value =>
    value == null ? undefined : run(rules, value)

function run (rules, value) {
  const errors = await Promise.all(rules.map(r => r(value)))
  let first
  for (let e of errors) {
    if (!e) {
      return
    } else if (!first) {
      first = e
    }
  }
  return first
}
