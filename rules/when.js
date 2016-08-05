const runner = require('../runner')

module.exports = function builder (predicate, rule) {
	return function (params) {
		if (predicate(params.subject, params.field)) {
			return runner(rule, params)
		}
	}
}