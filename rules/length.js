const messages = require('../messages')

messages.customize('length', function (params, options) {
	if (options && options.min != null && options.max != null) {
		return `"${params.field}" length must be from ${options.min} to ${options.max}`
	} else if (options && options.min != null && options.max == null) {
		return `"${params.field}" length must be at least ${options.min}`
	} else if (options && options.min == null && options.max != null) {
		return `"${params.field}" length must be at most ${options.max}`
	} else {
		return `"${params.field}" must not be empty`
	}
})

module.exports = function build (options, message) {
	return function (params) {
		if (!params.value ||
			options && options.min != null && params.value.length < options.min ||
			options && options.max != null && params.value.length > options.max) {
			return messages.format({
				rule: 'length',
				params,
				options,
				message
			})
		}
	}
}
