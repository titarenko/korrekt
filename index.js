const validator = require('./validator')
const rules = require('./rules')
const messages = require('./messages')
const errors = require('./errors')

module.exports = Object.assign({
	create: validator.create,
	register: rules.register,
	customize: messages.customize,

	ValidationError: errors.ValidationError,
}, rules)
