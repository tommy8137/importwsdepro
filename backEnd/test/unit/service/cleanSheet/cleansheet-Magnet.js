const { expect } = require('chai')
const sinon = require('sinon')

const cleanSheetMagnetService = require('../../../../server/service/cleanSheet/cleanSheet-Magnet.js')

describe('CleanSheet Magnet', () => {

  describe('cleansheet service cleanSheet Magnet Module', () => {
    it('test base Magnet class', async () => {
      new cleanSheetMagnetService.Magnet(1, 1, 250)
      let magnet = new cleanSheetMagnetService.Magnet(20, 12, 2)
      magnet.material = null
      magnet.material = 'Nd-Fe-B N52H'
      magnet.material = 'Nd-Fe-B N48H'
      magnet.material = 'Nd-Fe-B N52'
      magnet.material = 'Nd-Fe-B N48'
      expect(magnet.volume).to.eq(480)
      expect(magnet.finishWeight).to.eq(0.0036384)
      expect(magnet.costMaterial).to.eq(0.12770784000000002)
      expect(magnet.costProcessing).to.eq(0.113373)
      expect(magnet.costProcA).to.equal(0.045605)
      expect(magnet.costProcB).to.equal(0.048)
      expect(magnet.costProcC).to.equal(0.0166)
      expect(magnet.costProcD).to.equal(0.003168)
    })
    // afterEach(() => {
    //   // Restore the default sandbox here
    //   // sinon.restore()
    // })
  })
})


