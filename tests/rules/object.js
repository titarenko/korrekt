const v = require('../..')
const should = require('should')

describe('korrekt.object', function () {
  it('should fail if value is not an object', async function () {
    const validator = v.create(v.object({ age: v.integer({ min: 1, max: 99 }) }))
    try {
      await validator(20)
      throw new Error('false negative')
    } catch (e) {
      if (e instanceof v.ValidationError) {
        e.result.should.eql({ message: 'must be an object' })
      } else {
        throw e
      }
    }
  })

  it('should pass null or undefined values', async function () {
    const validator = v.create({ person: v.object({ name: v.required() }) })
    await validator({ person: null })
  })

  it('should return error if last field does not have error', async function () {
    const validator = v.create({
      password: v.length({ min: 10 }),
      login: v.length({ min: 1 }),
    })
    try {
      await validator({ password: 'boney m', login: 'abba' })
      throw new Error('false negative')
    } catch (e) {
      if (e instanceof v.ValidationError) {
        e.result.should.eql({ password: { message: 'must be longer', meta: { min: 10 } } })
      } else {
        throw e
      }
    }
  })
})
