var _ = require('lodash');

function register(name, builder, overwrite) {
	if (this[name] && !overwrite) {
		throw new Error(name + ': such validator already exists!');
	}
	this[name] = builder;
}

module.exports = _.extend(
	require('./builder'), 
	require('./wrapped-validator'), 
	require('./rules'), 
	{ 
		when: require('./when'),
		optionally: require('./optionally'),
		register: register 
	}
);
