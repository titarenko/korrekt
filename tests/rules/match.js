const v = require('../..')
const should = require('should')

describe('korrekt.match', function () {
	it('should reject value if it does not match pattern', function (done) {
		const validator = v.create({ name: v.match(/^\D+$/) })
		validator({ name: 'bob1' }).then(done).catch(v.ValidationError, error => {
			error.fields.should.eql({ name: '"name" does not match required pattern'})
			done()
		}).catch(done)
	})

	it('should use custom message', function (done) {
		const validator = v.create({ email: v.match(/\w+@\w+\.[\w\.]+/, params => `${params.value} is not valid email`) })
		validator({ email: 'bob@com' }).then(done).catch(v.ValidationError, error => {
			error.fields.should.eql({ email: 'bob@com is not valid email'})
			done()
		}).catch(done)
	})

	it('should accept valid value matching specified pattern', function (done) {
		const validator = v.create({ number: v.match(/\d+/) })
		validator({ number: '123' }).then(() => done()).catch(done)
	})
})