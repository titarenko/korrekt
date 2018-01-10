const length = require('./length')

module.exports = options =>
  value =>
    value == null || typeof value === 'string'
      ?
        options == null
          ? undefined
          : length(options)(value)
      : 'must be a string'
