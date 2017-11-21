const v = require('../..')
const should = require('should')

describe('korrekt.match', function () {
	it('should reject value if it does not match pattern', async function () {
		const validator = v.create({ name: v.match(/^\D+$/) })
		try {
			await validator({ name: 'bob1' })
			throw new Error('false negative')
		} catch (e) {
			if (e instanceof v.ValidationError) {
				e.result.should.eql({ name: { message: 'must match', meta: { regex: /^\D+$/ } } })
			} else {
				throw e
			}
		}
	})

	it('should accept valid value matching specified pattern', async function () {
		const validator = v.create({ number: v.match(/\d+/) })
		await validator({ number: '123' })
	})

	it('should skip null', async function () {
		const validator = v.create({ number: v.match(/\d+/) })
		await validator({ number: null })
	})
})
