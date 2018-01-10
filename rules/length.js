module.exports = ({ min, max, exactly } = { }) =>
	value =>
		value == null ? undefined : run(min, max, exactly, value)

function run (min, max, exactly, value) {
	if (!value) {
		return 'must not be empty'
	}
	if (value.length == null) {
		return 'does not have length'
	}
	if (exactly != null && value.length !== exactly) {
    return ['must have exact length', { length: exactly }]
  }
	if (min != null && value.length < min) {
		return ['must be longer', { min }]
	}
	if (max != null && value.length > max) {
		return ['must be shorter', { max }]
	}
}
