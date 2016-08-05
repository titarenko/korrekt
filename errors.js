const util = require('util')

module.exports = { ValidationError }

function ValidationError (results) {
	this.fields = { }
	results.forEach(result => this.fields[result.field] = result.value)
}

util.inherits(ValidationError, Error)
