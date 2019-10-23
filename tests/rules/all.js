const v = require('../..')
const should = require('should')

describe('korrekt.all', function () {
  it('should pass if each rule passes', async function () {
    const validator = v.create({ value: v.all(v.integer(), v.length({ min: 3 })) })
    await validator({ value: '1000' })
  })

  it('should fail if any rule fails', async function () {
    const validator = v.create({ value: v.all(v.length({ min: 5 }), v.match(/\D+/)) })
    try {
      await validator({ value: 'asd' })
      throw new Error('false negative')
    } catch (e) {
      if (e instanceof v.ValidationError) {
        e.result.should.eql({ value: { message: 'must be longer', meta: { min: 5 } } })
      } else {
        throw e
      }
    }
  })

  it('should pass null or undefined values', async function () {
    const validator = v.create({ name: v.all(v.integer(), v.length({ min: 1 })) })
    await validator({ })
  })

  it('should pass key and instance to each rule', async function () {
    let callArgs = null
    const customRule = (...args) => { callArgs = args }
    const instance = { name: 'bob' }
    const validator = v.create({ name: v.all(customRule) })
    await validator(instance)
    callArgs.should.eql([
      'bob',
      'name',
      instance,
    ])
  })
})
