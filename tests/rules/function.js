const v = require('../..')
const should = require('should')

describe('korrekt.function', function () {
  it('should pass on functions', async function () {
    const validator = v.create({
      valid: v.function()
    })
    await validator({ valid: () => true })
  })

  it('should fail on objects', async function () {
    const validator = v.create({ valid: v.function() })
    try {
      await validator({ valid: { fun: true } })
      throw new Error('false negative')
    } catch (e) {
      if (e instanceof v.ValidationError) {
        e.result.should.eql({ valid: { message: 'must be a function' } })
      } else {
        throw e
      }
    }
  })

  it('should fall to length validator if options provided', async function () {
    const validator = v.create({ valid: v.function({ min: 2, max: 4 }) })
    try {
      await validator({ valid: () => true })
      throw new Error('false negative')
    } catch (e) {
      if (e instanceof v.ValidationError) {
        e.result.should.eql({ valid: { message: 'must be longer', meta: { min: 2 } } })
      } else {
        throw e
      }
    }
  })
})
