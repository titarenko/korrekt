const util = require('util')

module.exports = { ValidationError }

function ValidationError (results) {
	this.message = 'validation failed'
	this.fields = { }
	results.forEach(result => this.fields[result.field] = result.value)
	Error.captureStackTrace(this, ValidationError)
}

util.inherits(ValidationError, Error)
