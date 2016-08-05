const messages = require('../messages')

messages.customize('enum', (params, options) => `"${params.field}" must be one of ${options.join(' ')}`)

module.exports = function builder (options, message) {
	return function (params) {
		if (!options.includes(params.value)) {
			return messages.format({
				rule: 'enum',
				params,
				options,
				message
			})
		}
	}
}
