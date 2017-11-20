const v = require('../..')
const should = require('should')

describe('korrekt.email', function () {
	it('should not complain about valid email', async function () {
		const validator = v.create(v.object({ email: v.email() }))
		await validator({ email: 'bob.atkins@gmail.com' })
	})

	it('should catch wrong email', async function () {
		const validator = v.create(v.object({ email: v.email() }))
		try {
			await validator({ email: 'bobpetersongmail.com' })
			throw new Error('false negative')
		} catch (e) {
			if (e instanceof v.ValidationError) {
				e.result.should.eql({ email: { message: 'not an email' } })
			} else {
				throw e
			}
		}
	})

	it('should skip null', async function () {
		const validator = v.create({ email: v.email() })
		await validator({ email: null })
	})
})
