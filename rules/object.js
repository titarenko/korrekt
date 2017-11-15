module.exports = schema =>
  value =>
    value == null ? undefined : run(schema, value)

function run (schema, value) {
  if (typeof value !== 'object' || Array.isArray(value)) {
    return 'must be an object'
  }

  const keys = Object.keys(schema)
  const promises = keys.map(k => schema[k](value[k]))
  const errors = await Promise.all(promises)

  return keys.reduce((m, k, i) => {
    if (errors[i]) {
      return Object.assign(m || { }, { [k]: e[i] })
    }
  }, undefined)
}
