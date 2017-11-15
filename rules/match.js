module.exports = regex =>
	value =>
		value == null ? undefined : run(regex, value)

function run (regex, value) {
	if (!regex.match(value)) {
		return ['must match', { regex }]
	}
}
