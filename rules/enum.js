module.exports = options =>
	value =>
		value == null ? undefined : run(options, value)

function run (options, value) {
	if (!options.includes(value)) {
		return ['not found in options', options]
	}
}
