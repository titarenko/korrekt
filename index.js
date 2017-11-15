const validator = (...builderArgs) => (...validatorArgs) => `error`


const messages = require('./messages')
const rules = require('./rules')

const rules = {
  register,

  when: require('./when'),

  required: require('./required'),
  length: require('./length'),
  
  integer: require('./integer'),
  number: require('./number'),

  match: require('./match'),
  enum: require('./enum'),

  email: require('./email'),
}

module.exports = rules

function register (name, builder, overwrite) {
  if (rules[name] && !overwrite) {
    throw new Error(`Rule ${name} already exists!`)
  }
  rules[name] = builder
}


class ValidationError extends Error {
  constructor (fields) {
    super('Validation failed.')
    this.fields = fields
  }
}

function create (schema) {
  
}

const create = schema => async instance => {


  const errors = await walk(schema, sut)
  if (errors) {
    throw new ValidationError(errors)
  }
  return sut
}

module.exports = new Proxy(
  create,
  register: rules.register,
  customize: messages.customize,
  format: messages.format,
  ValidationError: errors.ValidationError,
}, { get: (target, property) => property in target ? target[property] : rules[property] })

module.exports = { create, ValidationError }

async function walk (schema, sut) {
  const fields = Object.getOwnPropertyNames(schema)
  const promises = fields.map(async field => {
    const rule = schema[field]
    const error = isObject(rule)
      ? await walk(rule, sut[field])
      : await exec(rule, sut, field)
    if (error) {
      return [field, error]
    }
  })
  const errors = await Promise.all(promises)
  return errors
    .filter(Boolean)
    .reduce((m, [f, e]) => Object.assign(m || { }, { [f]: e }), undefined)
}

function exec (rule, sut, field) {
  if (!Array.isArray(rule)) {
    rule = [rule]
  }
  const promises = rule.map(r => r(sut[field], sut, field))
  const errors = await Promise.all(promises).then(errors => errors.filter(Boolean))
  if (errors.length !== 0) {
    return errors
  }
}

function isObject (x) {
  return x !== null
    && typeof x === 'object'
    && !Array.isArray(x)
}

const validator = require('./validator')
const rules = require('./rules')
const messages = require('./messages')
const errors = require('./errors')

