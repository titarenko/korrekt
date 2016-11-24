const messages = require('../messages')

messages.customize('match', params => `"${params.field}" does not match required pattern`)

module.exports = function builder (options, message) {
	return function (params) {
		if (params.value && !params.value.match(options)) {
			return messages.format({
				rule: 'match',
				params,
				options,
				message
			})
		}
	}
}