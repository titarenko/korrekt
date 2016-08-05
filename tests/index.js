const v = require('../')
const should = require('should')
const Promise = require('bluebird')

describe('korrekt', function () {
	it('should validate 1 field with 1 rule', function (done) {
		const schema = {
			login: v.required('you can not omit login')
		}
		const validator = v.create(schema)
		validator({ password: '123' })
			.then(fail(done))
			.catch(v.ValidationError, error => {
				error.fields.should.eql({ login: 'you can not omit login' })
				done()
			})
			.catch(done)
	})

	it('should validate 1 field with 2 rules', function (done) {
		const schema = {
			login: [
				v.required('you can not omit login'),
				v.length({ min: 3 }, params => `"${params.field}" is too short`)
			]
		}
		const validator = v.create(schema)
		validator({ login: '12' })
			.then(fail(done))
			.catch(v.ValidationError, error => {
				error.fields.should.eql({ login: '"login" is too short' })
				done()
			})
			.catch(done)
	})

	it('should validate 1 field with 1 conditional rule when predicate returns true', function (done) {
		const schema = {
			login: v.when(it => it.password, v.required('login is required along with password'))
		}
		const validator = v.create(schema)
		validator({ password: '12' })
			.then(fail(done))
			.catch(v.ValidationError, error => {
				error.fields.should.eql({ login: 'login is required along with password'})
				done()
			})
			.catch(done)
	})

	it('should not validate 1 field with 1 conditional rule when predicate returns false', function (done) {
		const schema = {
			login: v.when(it => it.password, v.required('login is required along with password'))
		}
		const validator = v.create(schema)
		validator({ name: '12' })
			.then(() => done())
			.catch(done)
	})

	it('should validate 1 field with 2 conditional rules when predicate returns true', function (done) {
		const schema = {
			login: v.when(it => it.password, [
				v.required('login is required along with password'),
				v.length({ min: 3 }, 'login is too short')
			])
		}
		const validator = v.create(schema)
		validator({ password: '12', login: '12' })
			.then(fail(done))
			.catch(v.ValidationError, error => {
				error.fields.should.eql({ login: 'login is too short'})
				done()
			})
			.catch(done)
	})

	it('should return subject of validation if it is valid', function (done) {
		const schema = {
			login: v.when(it => it.password, [
				v.required('login is required along with password'),
				v.length({ min: 3 }, 'login is too short')
			])
		}
		const validator = v.create(schema)
		validator({ password: '12', login: '124' })
			.then(it => {
				it.should.eql({ password: '12', login: '124' })
				done()
			})
			.catch(done)
	})

	it('should allow to register custom rules', function (done) {
		v.register('same', (options, message) => function (params) {
			if (params.value != params.subject[options.field]) {
				return v.format({
					rule: 'same',
					params,
					options,
					message
				})
			}
		})
		v.customize('same', (params, options) => `${params.field} must match ${options.field}`)
		const validator = v.create({
			password: v.required(),
			password_confirmation: v.same({ field: 'password' })
		})
		validator({ password: '1', password_confirmation: '2' }).then(done).catch(v.ValidationError, error => {
			error.fields.should.eql({ password_confirmation: 'password_confirmation must match password'})
			done()
		}).catch(done)
	})

	it('should not allow to overwrite existing rule silently', function () {
		v.register('aba', () => { })
		should.throws(() => {
			v.register('aba', () => { })
		}, 'rule aba already exists')
	})

	it('should allow to overwrite existing rule explicitly', function () {
		v.register('bab', () => { })
		should.doesNotThrow(() => {
			v.register('bab', () => { }, true)
		})
	})
})

function fail (done) {
	return function () {
		done('seems like validator does not work, it should throw, but did not')
	}
}
