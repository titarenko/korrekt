const rules = {
	register,

	when: require('./when'),

	required: require('./required'),
	length: require('./length'),
	
	integer: require('./integer'),
	number: require('./number'),

	match: require('./match'),
	enum: require('./enum'),

	email: require('./email'),
}

module.exports = rules

function register (name, builder, overwrite) {
	if (rules[name] && !overwrite) {
		throw new Error(`rule ${name} already exists`)
	}
	rules[name] = builder
}
