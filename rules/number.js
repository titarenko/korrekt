const messages = require('../messages')

messages.customize('number', function (params, options) {
	if (options.min && options.max) {
		return `"${params.field}" must be number between ${options.min} and ${options.max}`
	} else if (options.min && !options.max) {
		return `"${params.field}" must be number not less than ${options.min}`
	} else if (!options.min && options.max) {
		return `"${params.field}" must be number not greater than ${options.max}`
	} else {
		return `"${params.field}" must be number`
	}
})

module.exports = function builder (options, message) {
	return function (params) {
		const number = Number(params.value)
		if (isNaN(number) ||
			options && options.min && number < options.min ||
			options && options.max && number > options.max) {
			return messages.format({
				rule: 'number',
				params,
				options,
				message
			})
		}
	}
}