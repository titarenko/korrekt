module.exports = ({ min, max } = { }) =>
	value =>
		value == null ? undefined : run(min, max, value)

function run (min, max, value) {
	const number = Number(value)
	if (isNaN(number)) {
		return 'must be a number'
	}
	if (min != null && number < min) {
		return ['must be larger', { min }]
	}
	if (max != null && number > max) {
		return ['must be smaller', { max }]
	}
}
