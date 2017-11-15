module.exports = (schema, { min, max } = { }) =>
  value =>
    value == null ? undefined : run(schema, min, max, value)

async function run (error, schema, min, max, value) {
  if (!Array.isArray(value)) {
    return 'not an array'
  }
  if (min != null && value.length < min) {
    return ['length is less than minimum', { min }]
  }
  if (max != null && value.length > max) {
    return ['length is greater than maximum', { max }]
  }
  const errors = await Promise.all(value.map(schema))
  if (errors.some(Boolean)) {
    return ['invalid items', errors]
  }
}
