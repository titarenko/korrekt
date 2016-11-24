const messages = require('../messages')

messages.customize('email', (params) => `${params.value} is not valid email`)

module.exports = function (message) {
	return function (params) {
		if (params.value != null && !params.value.match(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/)) {
			return messages.format({
				rule: 'email',
				params,
				message
			})
		}
	}
}