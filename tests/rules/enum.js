const v = require('../..')
const should = require('should')

describe('korrekt.enum', function () {
	it('should check value is one from specified enumeration', function (done) {
		const validator = v.create({ status: v.enum(['pending', 'done']) })
		validator({ status: 'bad' }).then(done).catch(v.ValidationError, error => {
			error.fields.should.eql({ status: '"status" must be one of "pending", "done"' })
			done()
		}).catch(done)
	})

	it('should allow value, even if it does not pass strict comparison with allowed ones', function (done) {
		const validator = v.create({ choice: v.enum([1, 2]) })
		validator({ choice: '2' }).then(() => done()).catch(done)
	})

	it('should use custom message', function (done) {
		const validator = v.create({ choice: v.enum([1, 2], params => `${params.value} is bad`) })
		validator({ choice: '3' }).then(done).catch(v.ValidationError, error => {
			error.fields.should.eql({ choice: '3 is bad' })
			done()
		}).catch(done)
	})
})