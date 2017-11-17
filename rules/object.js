module.exports = schema =>
  value =>
    value == null ? undefined : run(schema, value)

async function run (schema, value) {
  if (typeof value !== 'object' || Array.isArray(value)) {
    return 'must be an object'
  }

  const keys = Object.keys(schema)
  const promises = keys.map(k => schema[k](value[k]))
  const errors = await Promise.all(promises)

  return keys.reduce((m, k, i) => {
    const e = errors[i]
    if (e) {
      return Object.assign(m || { }, { [k]: e })
    }
  }, undefined)
}
