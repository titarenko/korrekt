const messages = require('../messages')

messages.customize('enum', (params, options) => `"${params.field}" must be one of ${options.map(it => `"${it}"`).join(', ')}`)

module.exports = function builder (options, message) {
	return function (params) {
		if (!options.some(it => it == params.value)) {
			return messages.format({
				rule: 'enum',
				params,
				options,
				message
			})
		}
	}
}
