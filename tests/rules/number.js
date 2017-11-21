const v = require('../..')
const should = require('should')

describe('korrekt.number', function () {
	it('should check that value is number', async function () {
		const validator = v.create({ height: v.number() })
		try {
			await validator({ height: 'Bob' })
			throw new Error('false negative')
		} catch (e) {
			if (e instanceof v.ValidationError) {
				e.result.should.eql({ height: { message: 'must be a number' } })
			} else {
				throw e
			}
		}
	})

	it('should check that value is number not less than min', async function () {
		const validator = v.create({ height: v.number({ min: 10 }) })
		try {
			await validator({ height: '9.9' })
			throw new Error('false negative')
		} catch (e) {
			if (e instanceof v.ValidationError) {
				e.result.should.eql({ height: { message: 'must be larger', meta: { min: 10 } } })
			} else {
				throw e
			}
		}
	})

	it('should check that value is number not greater than max', async function () {
		const validator = v.create({ height: v.number({ max: 10 }) })
		try {
			await validator({ height: 10.2 })
			throw new Error('false negative')
		} catch (e) {
			if (e instanceof v.ValidationError) {
				e.result.should.eql({ height: { message: 'must be smaller', meta: { max: 10 } } })
			} else {
				throw e
			}
		}
	})

	it('should check that value is number not less than min and not greater than max', async function () {
		const validator = v.create({ height: v.number({ min: 2, max: 10 }) })
		try {
			await validator({ height: 10.1 })
			throw new Error('false negative')
		} catch (e) {
			if (e instanceof v.ValidationError) {
				e.result.should.eql({ height: { message: 'must be smaller', meta: { max: 10 } } })
			} else {
				throw e
			}
		}
	})

	it('should skip null', async function () {
		const validator = v.create({ it: v.number() })
		await validator({ it: null })
	})

	it('should skip undefined', async function () {
		const validator = v.create({ it: v.number() })
		await validator({ })
	})
})
