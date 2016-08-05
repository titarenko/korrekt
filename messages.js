const formatters = { }

module.exports = {
	customize,
	format,
}

function customize (rule, message) {
	formatters[rule] = build(message)
}

function format ({ rule, params, options, message }) {
	const formatter = message ? build(message) : formatters[rule]
	return formatter(params, options)
}

function build (message) {
	return typeof message == 'function' ? message : () => message
}
