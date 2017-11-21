module.exports = (schema, { min, max } = { }) =>
  value =>
    value == null ? undefined : run(schema, min, max, value)

async function run (schema, min, max, value) {
  if (!Array.isArray(value)) {
    return 'must be an array'
  }
  if (min != null && value.length < min) {
    return ['must be longer', { min }]
  }
  if (max != null && value.length > max) {
    return ['must be shorter', { max }]
  }
  const errors = await Promise.all(value.map(schema))
  if (errors.some(Boolean)) {
    return ['must have valid items', errors]
  }
}
