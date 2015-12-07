var _ = require('lodash');
var Promise = require('bluebird');
var runner = require('./runner');

module.exports = whenBuilder;

function whenBuilder (predicate, rules) {
	rules = _.isArray(rules) ? rules : [rules];
	return function when (value, field, instance) {
		var result = predicate.call(this, instance, field, instance[field]);
		return Promise.resolve(result).then(function (result) {
			if (result) {
				return runner.run(rules, value, field, instance);
			}
		});
	};
}
