const v = require('../..')
const should = require('should')

describe('korrekt.required', function () {
	it('should not allow to omit property', function (done) {
		const validator = v.create({ name: v.required() })
		validator({ age: 20 }).then(done).catch(v.ValidationError, error => {
			error.fields.should.eql({ name: '"name" is required' })
			done()
		}).catch(done)
	})

	it('should not treat null as absence of value', function (done) {
		const validator = v.create({ name: v.required() })
		validator({ name: null }).then(() => done()).catch(done)
	})
})