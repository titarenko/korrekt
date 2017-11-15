module.exports = (denyEmptyString = false) =>
  value =>
    value != null && (!denyEmptyString || value != '')
      ? undefined
      : 'required'
