module.exports = (predicate, rule) =>
  value =>
    value == null ? undefined : run(predicate, rule, value)

function run (predicate, rule, value) {
  if (predicate(value)) {
    return rule(value)
  }
}
