const messages = require('../messages')

messages.customize('length', function (params, options) {
	if (options.min && options.max) {
		return `"${params.field}" length must be from ${options.min} to ${options.max}`
	} else if (options.min && !options.max) {
		return `"${params.field}" length must be at least ${options.min}`
	} else if (!options.min && options.max) {
		return `"${params.field}" length must be at most ${options.max}`
	} else {
		return `"${params.field}" must not be empty`
	}
})

module.exports = function build (options, message) {
	return function (params) {
		if (!params.value ||
			options && options.min && params.value.length < options.min ||
			options && options.max && params.value.length > options.max) {
			return messages.format({
				rule: 'length',
				params,
				options,
				message
			})
		}
	}
}
