const v = require('../..')
const should = require('should')

describe('korrekt.any', function () {
  it('should pass if at least one of rules passes', async function () {
    const validator = v.create({ value: v.any(v.integer(), v.length({ min: 3 })) })
    await validator({ value: '10' })
  })

  it('should fail if each rule fails', async function () {
    const validator = v.create({ value: v.any(v.number(), v.match(/\d+/)) })
    try {
      await validator({ value: 'asd' })
      throw new Error('false negative')
    } catch (e) {
      if (e instanceof v.ValidationError) {
        e.result.should.eql({ value: { message: 'must be a number' } })
      } else {
        throw e
      }
    }
  })

  it('should pass null or undefined values', async function () {
    const validator = v.create({ name: v.any(v.integer(), v.length({ min: 1 })) })
    await validator({ })
  })
})
