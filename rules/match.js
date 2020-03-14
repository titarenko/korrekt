module.exports = regex =>
	value =>
		value == null ? undefined : run(regex, value)

function run (regex, value) {
	if (typeof value.match !== 'function' || !value.match(regex)) {
		return ['must match', { regex }]
	}
}
