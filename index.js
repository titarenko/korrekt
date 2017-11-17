const fs = require('fs')

const rules = fs.readdirSync(`${__dirname}/rules`)
  .filter(file => file.endsWith('.js'))
  .map(file => [file.slice(0, -3), require(`./rules/${file}`)])
  .reduce((m, [k, v]) => Object.assign(m, { [k]: v }), { })

class ValidationError extends Error {
  constructor (result) {
    super('Validation failed.')
    this.result = result
  }
}

module.exports = new Proxy({
  create: rule => async value => {
    const result = await rule(value)
    if (result) {
      throw new ValidationError(result)
    } else {
      return value
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
