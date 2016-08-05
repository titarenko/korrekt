const v = require('../..')
const should = require('should')

describe('korrekt.length', function () {
	it('should check that value has length', function (done) {
		const validator = v.create({ name: v.length() })
		validator({ name: '' }).then(done).catch(v.ValidationError, error => {
			error.fields.should.eql({ name: '"name" must not be empty' })
			done()
		}).catch(done)
	})

	it('should check that value has length not less than min', function (done) {
		const validator = v.create({ name: v.length({ min: 3 }) })
		validator({ name: 'ab' }).then(done).catch(v.ValidationError, error => {
			error.fields.should.eql({ name: '"name" length must be at least 3' })
			done()
		}).catch(done)
	})

	it('should check that value has length not greater than max', function (done) {
		const validator = v.create({ name: v.length({ max: 4 }) })
		validator({ name: 'abcde' }).then(done).catch(v.ValidationError, error => {
			error.fields.should.eql({ name: '"name" length must be at most 4' })
			done()
		}).catch(done)
	})

	it('should check that value has length not less than min and not greater than max', function (done) {
		const validator = v.create({ name: v.length({ min: 2, max: 4 }) })
		validator({ name: 'a' }).then(done).catch(v.ValidationError, error => {
			error.fields.should.eql({ name: '"name" length must be from 2 to 4' })
			done()
		}).catch(done)
	})

	it('should use custom message', function (done) {
		const validator = v.create({ 
			name: v.length({ min: 2, max: 3 }, (params, options) => `${params.field}'s length is not between ${options.min} and ${options.max}`)
		})
		validator({ name: '1' }).then(done).catch(v.ValidationError, error => {
			error.fields.should.eql({ name: 'name\'s length is not between 2 and 3' })
			done()
		}).catch(done)
	})

	it('should pass valid object', function (done) {
		const validator = v.create({ 
			name: v.length({ min: 2, max: 3 })
		})
		validator({ name: 'aba' }).then(() => done()).catch(done)
	})
})
