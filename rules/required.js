const messages = require('../messages')

messages.customize('required', params => `"${params.field}" is required`)

module.exports = function builder (message) {
	return function rule (params) {
		if (params.value == null) {
			return messages.format({
				rule: 'required',
				params,
				message
			})
		}
	}
}
