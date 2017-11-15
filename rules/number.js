module.exports = ({ min, max } = { }) =>
	value =>
		value == null ? undefined : run(min, max, value)

function predicate (min, max, value) {
	const number = Number(value)
	if (isNaN(number)) {
		return 'not a number'
	}
	if (min != null && number < min) {
		return ['less than minimum', { min }]
	}
	if (max != null && number > max) {
		return ['greater than maximum', { max }]
	}
}
