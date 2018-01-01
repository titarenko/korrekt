const v = require('../')
const should = require('should')

describe('korrekt.ValidationError', function () {
  it('should have toJSON() method returing field errors as JSON', async function () {
    const error = new v.ValidationError({ field: 'error' })
    error.toJSON().should.eql({ field: 'error' })
  })
})
