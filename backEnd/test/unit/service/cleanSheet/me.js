const { expect } = require('chai')
const sinon = require('sinon')
const meService = require('../../../../server/service/cleanSheet/me.js')
const meModel = require('../../../../server/model/cleanSheet/me.js')
const path = require('path')
const fs = require('fs')

describe('CleanSheet me', () => {
  describe('me service getMeprojectList function', () => {
    it('getMeprojectList ', async () => {
      let mockResult = {
        numberOfProjects: 999.99,
        projectList:
                    [{
                      projectCode: 'A00001',
                      projectName: 'UNITTEST',
                      product: 'UNITTEST1',
                      bg: 'CPBG',
                      stage: 'A',
                      stageName: 'A',
                      sourcerCost: 111,
                      systemCost: 112.23,
                      currency: 'NTD',
                      productSpec: 'A',
                      lastSubmitBy: 'admin',
                      confirmedBy: 'superUser',
                      bomFileDate: '2019-01-29 15:00:00',
                    }],
      }
      sinon.stub(meModel, 'getMeprojectList').returns([
        {
          projectname: 'UNITTEST',
          projectcode: 'A00001',
          product: 'UNITTEST1',
          productspec: 'A',
          bgkey: 'CPBG',
          profitcenter: 'AA',
          submitby: 'admin',
          stage: 'A',
          confirmby: 'superUser',
          filedate: '2019-01-29 15:00:00',
          currency: 'NTD',
          sourcercost: 111.00,
          systemcost: 112.23,
          stagename: 'A',
        }])
      sinon.stub(meModel, 'getMeprojectAmount').returns(999.99)
      let res = await meService.getMeprojectList(1, 10, undefined, undefined, undefined)
      expect(res).to.have.property('projectList')
      expect(res.projectList).to.be.a('array')
      expect(res).to.deep.equal(mockResult)
    })
    afterEach(() => {
      // Restore the default sandbox here
      sinon.restore()
    })
  })

  describe('me service getMeprojectInfo function', () => {
    it('getMeprojectInfo function vsersion is equal stage', async () => {
      let mockResult =  {
        projectCode: 'A1',
        projectName: 'UTTEST',
        product: 'A1',
        bg: 'A12',
        productSpec: 'A12',
        stageList:
         [{ stage: 'C6',
           stageName: 'UT1',
           currentVersion: 'A1',
           updateBy: 'testuser',
           lastUpdateTime: '2019-01-19 15:30:00',
           isActive: false }],
      }
      sinon.stub(meModel, 'getMeprojectInfo').returns({
        projectname: 'UTTEST',
        projectcode: 'A1',
        product: 'A1',
        productspec: 'A12',
        bgkey: 'A12',
        profitcenter: 'A11',
        versionid: '1',
        createby: 'testuser',
      })
      sinon.stub(meModel, 'getVersionInfo').returns([{
        stage: 'C6',
        stagename: 'UT1',
        versionnumber: 'A1',
        submittime: '2019-01-19 15:30:00',
        createby: 'testuser',
      }])
      sinon.stub(meModel, 'getDashBoardInfo').returns({
        projectionc0duedate: '2019-01-21 15:30:00',
        projectionc1duedate: '2019-01-21 15:30:00',
        projectionc2duedate: '2019-01-21 15:30:00',
        projectionc3duedate: '2019-01-21 15:30:00',
        projectionc4duedate: '2019-01-21 15:30:00',
        projectionc5duedate:'2019-01-17 15:30:00',
      })
      let res = await meService.getMeprojectInfo('')
      expect(res).to.deep.equal(mockResult)
    })
    afterEach(() => {
      // Restore the default sandbox here
      sinon.restore()
    })
  })

  describe('me service getMeBom function', () => {
    it('getMeBom function', async () => {
      await meService.getMeBom('', '91.73F41.301', 'SOFHD_42_MT01_PA', 'TV', 'CPBG', 'C0', 'RFI', '14', 'WSG')
      let filePath = path.resolve(__dirname, '../../../../server/utils/excel/bom.xlsx')
      fs.exists(filePath, (isExist) =>{
        expect(isExist).to.be.true
      })
    })
    afterEach(() => {
      // Restore the default sandbox here
      sinon.restore()
    })
  })

  describe('me service updateMeBom function', () => {
    it('updateMeBom function', async () => {
      let costbom = []
      costbom[1] = {
        partLevel: 'V',
        customerPN: 'UTTEST',
        modifiedVersion: 1,
        partName: 'UTTEST',
        qty: 100,
      }
      let mockResult =  {
        projectCode: '91.73F41.301',
        idCMFFileDate: '2019/1/29',
        initator: '2019/1/29',
        projectLeader: 'Admin',
        approveBy: 'PowerUser',
        costbomData:costbom,
      }
      let filePath = path.resolve(__dirname, './Unit_updateMeBom.xlsx')
      let fileInfo = {
        path: filePath,
        name: 'Unit_updateMeBom.xlsx',
      }
      let res = await meService.updateMeBom(fileInfo)
      expect(res).to.deep.equal(mockResult)
    })
  })
})