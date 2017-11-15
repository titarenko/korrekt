module.exports = ({ min, max } = { }) =>
	value =>
		value == null ? undefined : run(min, max, value)

function run (min, max, value) {
	const number = Number(value)
	if (!Number.isInteger(number)) {
		return 'not an integer'
	}
	if (min != null && number < min) {
		return ['less than minimum', { min }]
	}
	if (max != null && number > max) {
		return ['greater than maximum', { max }]
	}
}
