const messages = require('../messages')

messages.customize('integer', function (params, options) {
	if (options.min && options.max) {
		return `"${params.field}" must be integer between ${options.min} and ${options.max}`
	} else if (options.min && !options.max) {
		return `"${params.field}" must be integer not less than ${options.min}`
	} else if (!options.min && options.max) {
		return `"${params.field}" must be integer not greater than ${options.max}`
	} else {
		return `"${params.field}" must be integer`
	}
})

module.exports = function builder (options, message) {
	return function (params) {
		const number = Number(params.value)
		if (!Number.isInteger(number) ||
			options && options.min && number < options.min ||
			options && options.max && number > options.max) {
			return messages.format({
				rule: 'integer',
				params,
				options,
				message
			})
		}
	}
}