module.exports = (predicate, rule) =>
  (...args) => run(predicate, rule, args)

function run (predicate, rule, args) {
  if (predicate(args[2])) {
    return rule(...args)
  }
}
