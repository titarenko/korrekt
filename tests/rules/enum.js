const v = require('../..')
const should = require('should')

describe('korrekt.enum', function () {
	it('should check value is one from specified enumeration', async function () {
		const validator = v.create({ status: v.enum(['pending', 'done']) })
		try {
			await validator({ status: 'bad' })
			throw new Error('false negative')
		} catch (e) {
			if (e instanceof v.ValidationError) {
				e.result.should.eql({ status: { message: 'not found in options', meta: ['pending', 'done'] } })
			} else {
				throw e
			}
		}
	})

	it('should allow value, even if it does not pass strict comparison with allowed ones', async function () {
		const validator = v.create({ choice: v.enum([1, 2]) })
		await validator({ choice: '2' })
	})

	it('should skip null', async function () {
		const validator = v.create({ choice: v.enum([1, 2]) })
		await validator({ choice: null })
	})
})
