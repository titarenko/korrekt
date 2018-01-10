const v = require('../..')
const should = require('should')

describe('korrekt.string', function () {
  it('should pass on strings', async function () {
    const validator = v.create({ 
      name: v.string()
    })
    await validator({ name: 'aba' })
  })

  it('should fail on arrays', async function () {
    const validator = v.create({ name: v.string() })
    try {
      await validator({ name: [1, 2, 3] })
      throw new Error('false negative')
    } catch (e) {
      if (e instanceof v.ValidationError) {
        e.result.should.eql({ name: { message: 'must be a string' } })
      } else {
        throw e
      }
    }
  })

  it('should fall to length validator if options provided', async function () {
    const validator = v.create({ name: v.string({ min: 2, max: 4 }) })
    try {
      await validator({ name: 'a' })
      throw new Error('false negative')
    } catch (e) {
      if (e instanceof v.ValidationError) {
        e.result.should.eql({ name: { message: 'must be longer', meta: { min: 2 } } })
      } else {
        throw e
      }
    }
  })
})
