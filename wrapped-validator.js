var _ = require('lodash');

module.exports = adapt(require('validator'));

function adapt (validator) {
	return _.transform(validator, function (builders, method, name) {
		builders[name] = _.partial(builder, validator, method);
	});
}

function builder (validator, method) {
	var builderParams = _.slice(arguments, 2);

	var message = _.last(builderParams);
	var methodParams = _.initial(builderParams);

	return function validate (value, field, obj) {
		var params = _.clone(methodParams);
		params.unshift(value);

		if (!method.apply(validator, params)) {
			return message;
		}
	};
}
