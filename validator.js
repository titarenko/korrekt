const bluebird = require('bluebird')
const runner = require('./runner')
const errors = require('./errors')

module.exports = { create }

function create (schema) {
	const fields = Object.getOwnPropertyNames(schema)
	return function (subject) {
		return bluebird.resolve(fields)
			.map(field => bluebird.props({ 
				field,
				value: runner(schema[field], {
					value: subject[field],
					field,
					subject
				})
			}))
			.filter(result => result.value)
			.then(results => {
				if (results.length > 0) {
					throw new errors.ValidationError(results)
				}
				return subject
			})
	}
}
