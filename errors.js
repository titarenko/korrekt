const util = require('util')

module.exports = { ValidationError }

function ValidationError (results) {
	this.message = 'validation failed'
	if (Array.isArray(results)) {
		this.fields = { }
		results.forEach(result => this.fields[result.field] = result.value)
	} else {
		this.fields = results
	}
	Error.captureStackTrace(this, ValidationError)
}

util.inherits(ValidationError, Error)
