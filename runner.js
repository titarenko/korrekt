const bluebird = require('bluebird')

module.exports = function runner (rule, params) {
	if (Array.isArray(rule)) {
		return bluebird
			.resolve(rule)
			.map(innerRule => runner(innerRule, params))
			.filter(result => result)
			.then(results => results.join(', '))
	} else {
		return rule(params)
	}
}
