const v = require('../..')
const should = require('should')

describe('korrekt.integer', function () {
	it('should check that value is integer', function (done) {
		const validator = v.create({ age: v.integer() })
		validator({ age: 'Bob' }).then(done).catch(v.ValidationError, error => {
			error.fields.should.eql({ age: '"age" must be integer' })
			done()
		}).catch(done)
	})

	it('should check that value is integer, even if it is number', function (done) {
		const validator = v.create({ age: v.integer() })
		validator({ age: 12.2 }).then(done).catch(v.ValidationError, error => {
			error.fields.should.eql({ age: '"age" must be integer' })
			done()
		}).catch(done)
	})

	it('should check that value is integer not less than min', function (done) {
		const validator = v.create({ age: v.integer({ min: 10 }) })
		validator({ age: 9 }).then(done).catch(v.ValidationError, error => {
			error.fields.should.eql({ age: '"age" must be integer not less than 10' })
			done()
		}).catch(done)
	})

	it('should check that value is integer not greater than max', function (done) {
		const validator = v.create({ age: v.integer({ max: 10 }) })
		validator({ age: 11 }).then(done).catch(v.ValidationError, error => {
			error.fields.should.eql({ age: '"age" must be integer not greater than 10' })
			done()
		}).catch(done)
	})

	it('should check that value is integer not less than min and not greater than max', function (done) {
		const validator = v.create({ age: v.integer({ min: 2, max: 10 }) })
		validator({ age: 1 }).then(done).catch(v.ValidationError, error => {
			error.fields.should.eql({ age: '"age" must be integer between 2 and 10' })
			done()
		}).catch(done)
	})

	it('should use custom message', function (done) {
		const validator = v.create({ 
			age: v.integer({ min: 2, max: 10 }, (params, options) => `are you crazy to specify ${params.value} for ${params.field} (while you should fit ${options.min} – ${options.max})?`)
		})
		validator({ age: 1 }).then(done).catch(v.ValidationError, error => {
			error.fields.should.eql({ age: 'are you crazy to specify 1 for age (while you should fit 2 – 10)?' })
			done()
		}).catch(done)
	})
})
