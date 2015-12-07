var _ = require('lodash');
var validator = require('validator');

module.exports = {
	isArrayOf: isArrayOfBuilder,
	isExisting: isExistingBuilder
};

function isArrayOfBuilder (rules, message) {
	rules = _.isArray(rules) ? rules : [rules];
	return function isArrayOf (it, field, instance) {
		if (!_.isArray(it)) {
			return message;
		}
		return Promise.all(it.map(function (item) {
			return runner.run(rules, item, field, instance);
		})).then(runner.get);
	}
}

function isExistingBuilder (entity, search, message) {
	return function isExisting (it) {
		return search(entity, it).then(function (result) {
			if (!result) {
				return message;
			}
		});
	}
}
