var _ = require('lodash');

module.exports = _.extend(
	require('./builder'), 
	require('./wrapped-validator'), 
	require('./rules'), 
	{ when: require('./when') }
);
