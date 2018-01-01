const fs = require('fs')

const rules = fs.readdirSync(`${__dirname}/rules`)
  .filter(file => file.endsWith('.js'))
  .map(file => [file.slice(0, -3), require(`./rules/${file}`)])
  .reduce((m, [k, v]) => Object.assign(m, { [k]: wrapBuilder(v) }), { })

class ValidationError extends Error {
  constructor (result) {
    super('Validation failed.')
    this.result = result
  }
  toJSON () {
    return JSON.stringify(this.result)
  }
}

module.exports = new Proxy({
  create (rule) {
    if (typeof rule != 'function') {
      rule = rules['object'](rule)
    }
    return async value => {
      const result = await rule(value)
      if (result) {
        throw new ValidationError(result)
      } else {
        return value
      }
    }
  },
  register (name, builder, overwrite) {
    if (rules[name] && !overwrite) {
      throw new Error(`Rule ${name} already exists!`)
    }
    rules[name] = builder
  },
  ValidationError,
}, { get: (t, p) => p in t ? t[p] : rules[p] })

function wrapBuilder (builder) {
  return function wrappedBuilder (...builderArgs) {
    const validator = builder(...builderArgs)
    return async function wrappedValidator (...validatorArgs) {
      const result = await validator(...validatorArgs)
      if (typeof result === 'string') {
        return { message: result }
      } else if (Array.isArray(result)) {
        return { message: result[0], meta: result[1] }
      } else {
        return result
      }
    }
  }
}