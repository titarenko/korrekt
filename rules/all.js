module.exports = (...rules) =>
  (value, key, instance) =>
    value == null ? undefined : run(rules, value, key, instance)

async function run (rules, value, key, instance) {
  for (let r of rules) {
    const error = await r(value, key, instance)
    if (error) {
      return error
    }
  }
}
