const v = require('../..')
const should = require('should')

describe('korrekt.integer', function () {
	it('should check that value is integer', async function () {
		const validator = v.create({ age: v.integer() })
		try {
			await validator({ age: 'Bob' })
			throw new Error('false negative')			
		} catch (e) {
			if (e instanceof v.ValidationError) {
				e.result.should.eql({ age: { message: 'not an integer' } })
			} else {
				throw e
			}
		}
	})

	it('should check that value is integer, even if it is number', async function () {
		const validator = v.create({ age: v.integer() })
		try {
			await validator({ age: 12.2 })
			throw new Error('false negative')
		} catch (e) {
			if (e instanceof v.ValidationError) {
				e.result.should.eql({ age: { message: 'not an integer' } })
			} else {
				throw e
			}
		}
	})

	it('should check that value is integer not less than min', async function () {
		const validator = v.create({ age: v.integer({ min: 10 }) })
		try {
			await validator({ age: 9 })
			throw new Error('false negative')
		} catch (e) {
			if (e instanceof v.ValidationError) {
				e.result.should.eql({ age: { message: 'less than minimum', meta: { min: 10 } } })
			} else {
				throw e
			}
		}
	})

	it('should check that value is integer not greater than max', async function () {
		const validator = v.create({ age: v.integer({ max: 10 }) })
		try {
			await validator({ age: 11 })
			throw new Error('false negative')
		} catch (e) {
			if (e instanceof v.ValidationError) {
				e.result.should.eql({ age: { message: 'greater than maximum', meta: { max: 10 } } })
			} else {
				throw e
			}
		}
	})

	it('should check that value is integer not less than min and not greater than max', async function () {
		const validator = v.create({ age: v.integer({ min: 2, max: 10 }) })
		try {
			await validator({ age: 1 })
			throw new Error('false negative')
		} catch (e) {
			if (e instanceof v.ValidationError) {
				e.result.should.eql({ age: { message: 'less than minimum', meta: { min: 2 } } })
			} else {
				throw e
			}
		}
	})

	it('should skip null', async function () {
		const validator = v.create({ it: v.integer() })
		await validator({ it: null })
	})

	it('should skip undefined', async function () {
		const validator = v.create({ it: v.integer() })
		await validator({ })
	})
})
