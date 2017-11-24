module.exports = options =>
	value =>
		value == null ? undefined : run(options, value)

function run (options, value) {
	if (!options.some(it => it == value)) {
		return ['not found in options', options]
	}
}
