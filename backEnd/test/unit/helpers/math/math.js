const { expect } = require('chai')
const sinon = require('sinon')

const math = require('../../../../server/helpers/math/math.js')

describe('Helpers math', () => {
  describe('Helpers service fixedPoint function', () => {
    it('fixedPoint', async () => {
      let res = math.fixedPoint(100.865, 2)
      expect(res).to.equal(100.87)
    })
  })
  describe('Helpers service fixPercent function', () => {
    it('fixPercent shorter', async () => {
      let res = math.fixPercent([24, 25, 33, 14], 100)
      expect(res).to.have.lengthOf(4)
      expect(res).to.deep.equal([28, 25, 33, 14])
    })

    it('fixPercent higher', async () => {
      let res = math.fixPercent([24, 25, 33, 20], 100)
      expect(res).to.have.lengthOf(4)
      expect(res).to.deep.equal([24, 25, 33, 18])
    })

    afterEach(() => {
      // Restore the default sandbox here
      sinon.restore()
    })
  })
})