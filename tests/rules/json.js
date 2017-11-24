const v = require('../..')
const should = require('should')

describe('korrekt.json', function () {
  it('should not complain about valid json', async function () {
    const validator = v.create(v.object({ params: v.json() }))
    await validator({ params: '{ "name": "value" }' })
  })

  it('should catch wrong json', async function () {
    const validator = v.create(v.object({ config: v.json() }))
    try {
      await validator({ config: '{ name: "value" }' })
      throw new Error('false negative')
    } catch (e) {
      if (e instanceof v.ValidationError) {
        e.result.should.eql({ config: { message: 'must be json' } })
      } else {
        throw e
      }
    }
  })

  it('should skip null', async function () {
    const validator = v.create({ params: v.json() })
    await validator({ params: null })
  })
})
