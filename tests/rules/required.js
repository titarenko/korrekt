const v = require('../..')
const should = require('should')

describe('korrekt.required', function () {
	it('should not allow to omit property', async function () {
		const validator = v.create({ name: v.required() })
		try {
			await validator({ age: 20 })
			throw new Error('false negative')
		} catch (e) {
			if (e instanceof v.ValidationError) {
				e.result.should.eql({ name: { message: 'required' } })
			} else {
				throw e
			}
		}
	})

	it('should treat null as absence of value', async function () {
		const validator = v.create({ name: v.required() })
		try {
			await validator({ name: null })
			throw new Error('false negative')
		} catch (e) {
			if (e instanceof v.ValidationError) {
				e.result.should.eql({ name: { message: 'required' } })
			} else {
				throw e
			}
		}
	})
})
