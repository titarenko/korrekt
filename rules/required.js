module.exports = (denyEmptyString = false) =>
  value => typeof denyEmptyString === 'function'
    ? requiredRule(value, denyEmptyString)
    : requiredValue(value, denyEmptyString)

function requiredValue (value, denyEmptyString) {
  return value != null && (!denyEmptyString || value != '')
    ? undefined
    : 'required'
}

function requiredRule (value, rule) {
  return value == null && 'required' || rule(value)
}
