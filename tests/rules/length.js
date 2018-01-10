const v = require('../..')
const should = require('should')

describe('korrekt.length', function () {
	it('should check that value has length', async function () {
		const validator = v.create({ name: v.length() })
		try {
			await validator({ name: '' })
			throw new Error('false negative')
		} catch (e) {
			if (e instanceof v.ValidationError) {
				e.result.should.eql({ name: { message: 'must not be empty' } })
			} else {
				throw e
			}
		}
	})

	it('should fail if value does not have property "length"', async function () {
		const validator = v.create({ name: v.length() })
		try {
			await validator({ name: 123 })
			throw new Error('false negative')
		} catch (e) {
			if (e instanceof v.ValidationError) {
				e.result.should.eql({ name: { message: 'does not have length' } })
			} else {
				throw e
			}
		}
	})

	it('should check that value has length not less than min', async function () {
		const validator = v.create({ name: v.length({ min: 3 }) })
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

	it('should check that value has length not greater than max', async function () {
		const validator = v.create({ name: v.length({ max: 4 }) })
		try {
			await validator({ name: 'abcde' })
			throw new Error('false negative')
		} catch (e) {
			if (e instanceof v.ValidationError) {
				e.result.should.eql({ name: { message: 'must be shorter', meta: { max: 4 } } })
			} else {
				throw e
			}
		}
	})

	it('should check that value has length not less than min and not greater than max', async function () {
		const validator = v.create({ name: v.length({ min: 2, max: 4 }) })
		try {
			await validator({ name: 'a' })
			throw new Error('false negative')
		} catch (e) {
			if (e instanceof v.ValidationError) {
				e.result.should.eql({ name: { message: 'must be longer', meta: { min: 2 } } })
			} else {
				throw e
			}
		}
	})

	it('should check that value has exact length', async function () {
		const validator = v.create({ name: v.length({ exactly: 4 }) })
		try {
			await validator({ name: 'a' })
			throw new Error('false negative')
		} catch (e) {
			if (e instanceof v.ValidationError) {
				e.result.should.eql({ name: { message: 'must have exact length', meta: { length: 4 } } })
			} else {
				throw e
			}
		}
	})

	it('should pass valid object', async function () {
		const validator = v.create({ 
			name: v.length({ min: 2, max: 3 })
		})
		await validator({ name: 'aba' })
	})

	it('should pass null or undefined value', async function () {
		const validator = v.create({ 
			name: v.length({ min: 2, max: 3 })
		})
		await validator({ name: null })
	})
})
