const reporters = { }

module.exports = {
	customize,
	report,
}

function customize (rule, messageOrReporter) {
	reporters[rule] = buildReporter(messageOrReporter)
}

function report ({ rule, args, options, message }) {
	const reporter = message ? buildReporter(message) : reporters[rule]
	return reporter(args, options)
}

function buildReporter (messageOrReporter) {
	return typeof messageOrReporter == 'function'
    ? messageOrReporter
    : () => messageOrReporter
}
