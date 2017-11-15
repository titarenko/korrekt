module.exports = ({ min, max } = { }) =>
	value =>
		value == null ? undefined : run(min, max, value)

function run (min, max, value) {
	if (value.length == null) {
		return 'does not have length'
	}
	if (min != null && value.length < min) {
		return ['must be longer', { min }]
	}
	if (max != null && value.length > max) {
		return ['must be shorter', { max }]
	}
}
