var util = require('util');
var Promise = require('bluebird');
var _ = require('lodash');
var runner = require('./runner');

module.exports = validatorBuilder;

function validatorBuilder (schema, schema1, schema2, schema3) {
	var schemas = _.slice(arguments, 0);
	if (_.isEmpty(schemas)) {
		throw new Error('No validation schema provided!');
	}

	schemas.unshift({});
	var schema = _.extend.apply(_, schemas);
	_.each(schema, function (rules, field) {
		schema[field] = _.isArray(rules) ? rules : [rules];
	});

	return function validate (obj) {
		var context = this;
		var validationResult = _.transform(schema, function validateField (validationResult, rules, field) {
			validationResult[field] = runner.run(rules, obj[field], field, obj);
		});
		return Promise.props(validationResult).then(runner.compact).then(function (result) {
			if (!_.isEmpty(result)) {
				throw new ValidationError(result);
			}
		});
	};
}

function ValidationError (validationResult) {
	this.message = util.format('Object is invalid: %j!', validationResult);
	this.fields = validationResult;
	Error.apply(this, arguments);
	Error.captureStackTrace(this, ValidationError);
}

util.inherits(ValidationError, Error);
validatorBuilder.ValidationError = ValidationError;
