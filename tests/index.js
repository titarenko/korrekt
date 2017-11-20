const v = require('../')
const should = require('should')

describe('korrekt', function () {
	it('should validate 1 field with 1 rule', async function () {
		const validator = v.create(v.object({ login: v.required() }))
		try {
			await validator({ password: '123' })
			throw new Error('false negative')
		} catch (e) {
			if (e instanceof v.ValidationError) {
				e.result.should.eql({ login: { message: 'required' } })
			} else {
				throw e
			}
		}
	})

	it('should validate 1 field with 2 rules', async function () {
		const validator = v.create(v.object({
			login: v.all(v.required(), v.length({ min: 3 }))
		}))
		try {
			await validator({ login: '12' })
			throw new Error('false negative')
		} catch (e) {
			if (e instanceof v.ValidationError) {
				e.result.should.eql({ login: { message: 'must be longer', meta: { min: 3 } } })
			} else {
				throw e
			}
		}
	})

	it('should validate 1 field with 1 conditional rule when predicate returns true', async function () {
		const validator = v.create(v.object({
			login: v.when(it => it.password, v.required())
		}))
		try {
			await validator({ password: '12' })
			throw new Error('false negative')
		} catch (e) {
			if (e instanceof v.ValidationError) {
				e.result.should.eql({ login: { message: 'required' } })
			} else {
				throw e
			}
		}
	})

	it('should not validate 1 field with 1 conditional rule when predicate returns false', async function () {
		const validator = v.create(v.object({
			login: v.when(it => it.password, v.required('login is required along with password'))
		}))
		await validator({ name: '12' })
	})

	it('should validate 1 field with 2 conditional rules when predicate returns true', async function () {
		const validator = v.create(v.object({
			login: v.when(it => it.password, v.all(
				v.required('login is required along with password'),
				v.length({ min: 3 }, 'login is too short')
			))
		}))
		try {
			await validator({ password: '12', login: '12' })
			throw new Error('false negative')
		} catch (e) {
			if (e instanceof v.ValidationError) {
				e.result.should.eql({ login: { message: 'must be longer', meta: { min: 3 } } })
			} else {
				throw e
			}
		}
	})

	it('should return subject of validation if it is valid', async function () {
		const validator = v.create(v.object({
			login: v.when(it => it.password, v.all(
				v.required('login is required along with password'),
				v.length({ min: 3 }, 'login is too short')
			))
		}))
		const sut = { password: '12', login: '124' }
		const actual = await validator(sut)
		sut.should.be.eql(actual)
	})

	it('should allow to register custom rules', async function () {
		const same = field =>
			(value, _, instance) =>
				value != instance[field] ? 'not same' : undefined
		v.register('same', same)
		const validator = v.create(v.object({
			password: v.required(),
			password_confirmation: v.same('password'),
		}))
		try {
			await validator({ password: '1', password_confirmation: '2' })
			throw new Error('false negative')
		} catch (e) {
			if (e instanceof v.ValidationError) {
				e.result.should.eql({ password_confirmation: 'not same' })
			} else {
				throw e
			}
		}
	})

	it('should not allow to overwrite existing rule silently', function () {
		v.register('aba', () => undefined)
		should.throws(() => v.register('aba', () => undefined), 'rule aba already exists')
	})

	it('should allow to overwrite existing rule explicitly', function () {
		v.register('bab', () => undefined)
		should.doesNotThrow(() => v.register('bab', () => undefined, true))
	})
})
