const v = require('../..')
const should = require('should')

describe('korrekt.email', function () {
	it('should not complain about valid email', function () {
		const validator = v.create(v.object({ email: v.email() }))
		return validator({ email: 'bob.atkins@gmail.com' }).catch(console.log)
	})

	it('should catch wrong email', function (done) {
		const validator = v.create({ email: v.email() })
		validator({ email: 'bob;peterson@gmail.com' }).then(done).catch(v.ValidationError, error => {
			error.fields.should.eql({ email: 'bob;peterson@gmail.com is not valid email' })
			done()
		}).catch(done)
	})

	it('should skip null', function (done) {
		const validator = v.create({ email: v.email() })
		validator({ email: null }).then(() => done()).catch(done)
	})
})
