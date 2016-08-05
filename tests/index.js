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
})

function fail (done) {
	return function () {
		done('seems like validator does not work, it should throw, but did not')
	}
}
