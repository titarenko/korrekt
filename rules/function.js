const length = require('./length')

module.exports = options =>
  value =>
    value == null || typeof value === 'function'
      ? options == null
        ? undefined
        : length(options)(value)
      : 'must be a function'
