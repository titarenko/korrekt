const v = require('../..')
const should = require('should')

describe('korrekt.number', function () {
	it('should check that value is number', function (done) {
		const validator = v.create({ height: v.number() })
		validator({ height: 'Bob' }).then(done).catch(v.ValidationError, error => {
			error.fields.should.eql({ height: '"height" must be number' })
			done()
		}).catch(done)
	})

	it('should check that value is number not less than min', function (done) {
		const validator = v.create({ height: v.number({ min: 10 }) })
		validator({ height: '9.9' }).then(done).catch(v.ValidationError, error => {
			error.fields.should.eql({ height: '"height" must be number not less than 10' })
			done()
		}).catch(done)
	})

	it('should check that value is number not greater than max', function (done) {
		const validator = v.create({ height: v.number({ max: 10 }) })
		validator({ height: 10.2 }).then(done).catch(v.ValidationError, error => {
			error.fields.should.eql({ height: '"height" must be number not greater than 10' })
			done()
		}).catch(done)
	})

	it('should check that value is number not less than min and not greater than max', function (done) {
		const validator = v.create({ height: v.number({ min: 2, max: 10 }) })
		validator({ height: 10.1 }).then(done).catch(v.ValidationError, error => {
			error.fields.should.eql({ height: '"height" must be number between 2 and 10' })
			done()
		}).catch(done)
	})

	it('should use custom message', function (done) {
		const validator = v.create({ 
			height: v.number({ min: 2, max: 10 }, (params, options) => `${params.field}: ${params.value} is not between ${options.min} and ${options.max}`)
		})
		validator({ height: 1.59 }).then(done).catch(v.ValidationError, error => {
			error.fields.should.eql({ height: 'height: 1.59 is not between 2 and 10' })
			done()
		}).catch(done)
	})
})
