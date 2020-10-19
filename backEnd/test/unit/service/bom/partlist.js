const { expect } = require('chai')
const proxyquire = require('proxyquire').noPreserveCache()

// const partlistService = require('../../../../server/service/bom/partList')

describe('BOM Partist', () => {
  describe('取得噴塗製程的機台類型', () => {
    it('搜尋到0筆，要throw new Error("NO_RESULT_ERROR")', async () => {
      const fakeReturn = []
      const pathStub = {}
      const partlistService = proxyquire('../../../../server/service/bom/partList', { '../../model/bom/bomPartList': pathStub })
      pathStub.getPartlistDataByEmdmInfo = function () {
        return Promise.resolve(fakeReturn)
      }
      try {
        await partlistService.getCmfPaintingMachineType('', '', '')
      } catch (error) {
        expect(error).to.be.an('error')
        expect(error.message).to.eql('NO_RESULT_ERROR')
      }
    })
    it('搜尋到一筆，會照定義格式回傳', async () => {
      const fakeReturn = [{
        partlist_value: {
          formData: {
            hpCeParametersTab: { hpCeParameters: { cmfPaintingMachineType: 'MACHINE_TYPE' } },
          },
          version: 'emdm_1',
        },
        formate: 'housing-plastic',
      }]
      const pathStub = {}
      const partlistService = proxyquire('../../../../server/service/bom/partList', { '../../model/bom/bomPartList': pathStub })
      pathStub.getPartlistDataByEmdmInfo = function () {
        return Promise.resolve(fakeReturn)
      }
      let result = await partlistService.getCmfPaintingMachineType('', '', '')
      expect(result).to.deep.equal({ values: { cmfPaintingMachineType: 'MACHINE_TYPE' } })
    })
    it('搜尋到超過一筆，要throw new Error("NOT_UNIQUE_ERROR")', async () => {
      const fakeReturn = [
        { partlist_value: {} },
        { partlist_value: {} },
      ]
      const pathStub = {}
      const partlistService = proxyquire('../../../../server/service/bom/partList', { '../../model/bom/bomPartList': pathStub })
      pathStub.getPartlistDataByEmdmInfo = function () {
        return Promise.resolve(fakeReturn)
      }
      try {
        await partlistService.getCmfPaintingMachineType('', '', '')
      } catch (error) {
        expect(error).to.be.an('error')
        expect(error.message).to.eql('NOT_UNIQUE_ERROR')
      }
    })
    it('搜尋出來的partlist json無法解析，要throw new Error("PARSING_ERROR")', async () => {
      const fakeReturn = [
        { partlist_value: {} },
      ]
      const pathStub = {}
      const partlistService = proxyquire('../../../../server/service/bom/partList', { '../../model/bom/bomPartList': pathStub })
      pathStub.getPartlistDataByEmdmInfo = function () {
        return Promise.resolve(fakeReturn)
      }
      try {
        await partlistService.getCmfPaintingMachineType('', '', '')
      } catch (error) {
        expect(error).to.be.an('error')
        expect(error.message).to.eql('PARSING_ERROR')
      }
    })
  })
  describe('取得噴塗製程的CycleTime', () => {
    it('搜尋到0筆，要throw new Error("NO_RESULT_ERROR")', async () => {
      const fakeReturn = []
      const pathStub = {}
      const partlistService = proxyquire('../../../../server/service/bom/partList', { '../../model/bom/bomPartList': pathStub })
      pathStub.getPartlistDataByEmdmInfo = function () {
        return Promise.resolve(fakeReturn)
      }
      try {
        await partlistService.getCmfPaintingCycleTime('', '', '')
      } catch (error) {
        expect(error).to.be.an('error')
        expect(error.message).to.eql('NO_RESULT_ERROR')
      }
    })
    it('搜尋到一筆，會照定義格式回傳', async () => {
      const fakeReturn = [{
        partlist_value: {
          formData: {
            hpCeParametersTab: { hpCeParameters: { cmfPaintingCycleTime: 100 } },
          },
          version: 'emdm_1',
        },
        formate: 'housing-plastic',
      }]
      const pathStub = {}
      const partlistService = proxyquire('../../../../server/service/bom/partList', { '../../model/bom/bomPartList': pathStub })
      pathStub.getPartlistDataByEmdmInfo = function () {
        return Promise.resolve(fakeReturn)
      }
      let result = await partlistService.getCmfPaintingCycleTime('', '', '')
      expect(result).to.deep.equal({ values: { cmfPaintingCycleTime: '100' } })
      expect(result.values.cmfPaintingCycleTime).to.be.a('string')
    })
    it('搜尋到超過一筆，要throw new Error("NOT_UNIQUE_ERROR")', async () => {
      const fakeReturn = [
        { partlist_value: {} },
        { partlist_value: {} },
      ]
      const pathStub = {}
      const partlistService = proxyquire('../../../../server/service/bom/partList', { '../../model/bom/bomPartList': pathStub })
      pathStub.getPartlistDataByEmdmInfo = function () {
        return Promise.resolve(fakeReturn)
      }
      try {
        await partlistService.getCmfPaintingCycleTime('', '', '')
      } catch (error) {
        expect(error).to.be.an('error')
        expect(error.message).to.eql('NOT_UNIQUE_ERROR')
      }
    })
    it('搜尋出來的partlist json無法解析，要throw new Error("PARSING_ERROR")', async () => {
      const fakeReturn = [
        { partlist_value: {} },
      ]
      const pathStub = {}
      const partlistService = proxyquire('../../../../server/service/bom/partList', { '../../model/bom/bomPartList': pathStub })
      pathStub.getPartlistDataByEmdmInfo = function () {
        return Promise.resolve(fakeReturn)
      }
      try {
        await partlistService.getCmfPaintingCycleTime('', '', '')
      } catch (error) {
        expect(error).to.be.an('error')
        expect(error.message).to.eql('PARSING_ERROR')
      }
    })
  })
  describe('取得噴漆面,頂面數,長側面數,短側面數', () => {
    it('搜尋到0筆，要throw new Error("NO_RESULT_ERROR")', async () => {
      const fakeReturn = []
      const pathStub = {}
      const partlistService = proxyquire('../../../../server/service/bom/partList', { '../../model/bom/bomPartList': pathStub })
      pathStub.getPartlistDataByEmdmInfo = function () {
        return Promise.resolve(fakeReturn)
      }
      try {
        await partlistService.getCmfPaintingAreaInfo('', '', '')
      } catch (error) {
        expect(error).to.be.an('error')
        expect(error.message).to.eql('NO_RESULT_ERROR')
      }
    })
    it('搜尋到一筆，會照定義格式回傳', async () => {
      const fakeReturn = [{
        partlist_value: {
          formData: {
            hpCeParametersTab: {
              hpCeParameters: {
                cmfPaintingAreaLW: '1',
                cmfPaintingAreaLH: '2',
                cmfPaintingAreaWH: '2',
              },
            },
          },
          version: 'emdm_1',
        },
      }]
      const pathStub = {}
      const partlistService = proxyquire('../../../../server/service/bom/partList', { '../../model/bom/bomPartList': pathStub })
      pathStub.getPartlistDataByEmdmInfo = function () {
        return Promise.resolve(fakeReturn)
      }
      let result = await partlistService.getCmfPaintingAreaInfo('', '', '')
      expect(result).to.deep.equal({ values: { cmfPaintingAreaLW: '1', cmfPaintingAreaLH: '2', cmfPaintingAreaWH: '2' } })
    })
    it('搜尋到超過一筆，要throw new Error("NOT_UNIQUE_ERROR")', async () => {
      const fakeReturn = [
        { partlist_value: {} },
        { partlist_value: {} },
      ]
      const pathStub = {}
      const partlistService = proxyquire('../../../../server/service/bom/partList', { '../../model/bom/bomPartList': pathStub })
      pathStub.getPartlistDataByEmdmInfo = function () {
        return Promise.resolve(fakeReturn)
      }
      try {
        await partlistService.getCmfPaintingAreaInfo('', '', '')
      } catch (error) {
        expect(error).to.be.an('error')
        expect(error.message).to.eql('NOT_UNIQUE_ERROR')
      }
    })
    it('搜尋出來的partlist json無法解析，要throw new Error("PARSING_ERROR")', async () => {
      const fakeReturn = [
        { partlist_value: {} },
      ]
      const pathStub = {}
      const partlistService = proxyquire('../../../../server/service/bom/partList', { '../../model/bom/bomPartList': pathStub })
      pathStub.getPartlistDataByEmdmInfo = function () {
        return Promise.resolve(fakeReturn)
      }
      try {
        await partlistService.getCmfPaintingAreaInfo('', '', '')
      } catch (error) {
        expect(error).to.be.an('error')
        expect(error.message).to.eql('PARSING_ERROR')
      }
    })
  })
  describe('取得Metal(NB) 邊料尺寸 ', () => {
    it('搜尋到0筆，要throw new Error("NO_RESULT_ERROR")', async () => {
      const fakeReturn = []
      const pathStub = {}
      const partlistService = proxyquire('../../../../server/service/bom/partList', { '../../model/bom/bomPartList': pathStub })
      pathStub.getPartlistDataByEmdmInfo = function () {
        return Promise.resolve(fakeReturn)
      }
      try {
        await partlistService.getToolingMaterialInfo('', '', '')
      } catch (error) {
        expect(error).to.be.an('error')
        expect(error.message).to.eql('NO_RESULT_ERROR')
      }
    })
    it('搜尋到一筆，會照定義格式回傳', async () => {
      const fakeReturn = [{
        partlist_value: {
          formData: {
            hmCeParametersTab: {
              hmCeParameters: {
                hmToolingMaterialWidth: 5,
                hmToolingMaterialLength: 5,
              },
            },
          },
          version: 'emdm_1',
        },
      }]
      const pathStub = {}
      const partlistService = proxyquire('../../../../server/service/bom/partList', { '../../model/bom/bomPartList': pathStub })
      pathStub.getPartlistDataByEmdmInfo = function () {
        return Promise.resolve(fakeReturn)
      }
      let result = await partlistService.getToolingMaterialInfo('', '', '')
      expect(result).to.deep.equal({ values: { hmToolingMaterialWidth: 5, hmToolingMaterialLength: 5 } })
    })
    it('搜尋到超過一筆，要throw new Error("NOT_UNIQUE_ERROR")', async () => {
      const fakeReturn = [
        { partlist_value: {} },
        { partlist_value: {} },
      ]
      const pathStub = {}
      const partlistService = proxyquire('../../../../server/service/bom/partList', { '../../model/bom/bomPartList': pathStub })
      pathStub.getPartlistDataByEmdmInfo = function () {
        return Promise.resolve(fakeReturn)
      }
      try {
        await partlistService.getToolingMaterialInfo('', '', '')
      } catch (error) {
        expect(error).to.be.an('error')
        expect(error.message).to.eql('NOT_UNIQUE_ERROR')
      }
    })
    it('搜尋出來的partlist json無法解析，要throw new Error("PARSING_ERROR")', async () => {
      const fakeReturn = [
        { partlist_value: {} },
      ]
      const pathStub = {}
      const partlistService = proxyquire('../../../../server/service/bom/partList', { '../../model/bom/bomPartList': pathStub })
      pathStub.getPartlistDataByEmdmInfo = function () {
        return Promise.resolve(fakeReturn)
      }
      try {
        await partlistService.getToolingMaterialInfo('', '', '')
      } catch (error) {
        expect(error).to.be.an('error')
        expect(error.message).to.eql('PARSING_ERROR')
      }
    })
  })
})
