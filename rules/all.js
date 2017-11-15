module.exports = rules =>
  value =>
    value == null ? undefined : run(rules, value)

async function run (rules, value) {
  for (let r of rules) {
    const error = await r(value)
    if (error) {
      return error
    }
  }
}
