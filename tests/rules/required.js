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

	it('should support nested rules', async function () {
		const validator = v.create({ name: v.required(v.length({ min: 3 })) })
		try {
			await validator({ name: 'ab' })
			throw new Error('false negative')
		} catch (e) {
			if (e instanceof v.ValidationError) {
				e.result.should.eql({ name: { message: 'must be longer', meta: { min: 3 } } })
			} else {
				throw e
			}
		}
	})
})
