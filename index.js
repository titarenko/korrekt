const validator = require('./validator')
const rules = require('./rules')
const messages = require('./messages')
const errors = require('./errors')

module.exports = new Proxy({
	create: validator.create,
	register: rules.register,
	customize: messages.customize,
	format: messages.format,
	ValidationError: errors.ValidationError,
}, { get: (target, property) => property in target ? target[property] : rules[property] })
