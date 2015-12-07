var _ = require('lodash');
var Promise = require('bluebird');

module.exports = {
	run: run,
	get: get,
	compact: compact
};

function run (rules, value, field, obj) {
	var context = this;
	var results = rules.map(function runRule (rule) {
		return rule.call(context, value, field, obj);
	});
	return Promise.all(results).then(get);
}

function get (results) {
	return _(results).filter(function (it) {
		return it !== null && it !== undefined;
	}).first();
}

function compact (validationResult) {
	return _.transform(validationResult, function (result, value, key) {
		if (value !== null && value !== undefined) {
			result[key] = value;
		}
	});
}
