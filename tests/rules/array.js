const v = require('../..')
const should = require('should')

describe('korrekt.array', function () {
  it('should pass if value is an array and all of items are valid', async function () {
    const validator = v.create({ x: v.array(v.number()) })
    await validator({ x: [1, 2, 3] })
  })

  it('should fail if value is not an array', async function () {
    const validator = v.create({ x: v.array(v.number()) })
    try {
      await validator({ x: '123' })
      throw new Error('false negative')
    } catch (e) {
      if (e instanceof v.ValidationError) {
        e.result.should.eql({ x: { message: 'must be an array' } })
      } else {
        throw e
      }
    }
  })

  it('should fail if any item is not valid', async function () {
    const validator = v.create({ x: v.array(v.number()) })
    try {
      await validator({ x: ['123', 'asd'] })
      throw new Error('false negative')
    } catch (e) {
      if (e instanceof v.ValidationError) {
        e.result.should.eql({
          x: {
            message: 'must have valid items',
            meta: [undefined, { message: 'must be a number' }],
          },
        })
      } else {
        throw e
      }
    }
  })

  it('should skip null or undefined values', async function () {
    const validator = v.create({ y: v.array(v.length({ min: 3 })) })
    await validator({ z: 123 })
  })

  it('should fail if array is too short', async function () {
    const validator = v.create({ x: v.array(v.number(), { min: 3 }) })
    try {
      await validator({ x: [123] })
      throw new Error('false negative')
    } catch (e) {
      if (e instanceof v.ValidationError) {
        e.result.should.eql({ x: { message: 'must be longer', meta: { min: 3 } } })
      } else {
        throw e
      }
    }
  })

  it('should fail if array is too long', async function () {
    const validator = v.create({ x: v.array(v.number(), { max: 2 }) })
    try {
      await validator({ x: [123, 1, 2, 3] })
      throw new Error('false negative')
    } catch (e) {
      if (e instanceof v.ValidationError) {
        e.result.should.eql({ x: { message: 'must be shorter', meta: { max: 2 } } })
      } else {
        throw e
      }
    }
  })
})
