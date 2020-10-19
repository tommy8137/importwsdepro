const { expect } = require('chai')
const sinon = require('sinon')

const cleanSheetService = require('../../../../server/service/cleanSheet/cleanSheet.js')
const cleanSheetModel = require('../../../../server/model/cleanSheet/cleanSheet.js')

describe('CleanSheet cleansheet', () => {
  describe('cleansheet service fetchPlm function', () => {
    it('cleansheet service fetchPlm function', async () => {
      let mockResult = {
        projectList:
                    [{
                      projectCode: '4PD06V270001',
                      projectName: 'RedQueen',
                      product: 'Cradle/Docking',
                      stage: 'C6',
                      bg: 'CPBG',
                      stagename: null,
                    }],
      }
      sinon.stub(cleanSheetModel, 'getPlm').returns([
        {
          projectname: '4PD06V270001',
          acrprjname: 'RedQueen',
          producttype: 'Cradle/Docking',
          profitcenter: 'PCL200',
          projectionc0duedate: '2015-04-08 16:00:00',
          projectionc1duedate: '2015-04-17 16:00:00',
          projectionc2duedate: '2015-05-10 16:00:00',
          projectionc3duedate: '2015-06-07 16:00:00',
          projectionc4duedate: '2015-07-30 16:00:00',
          projectionc5duedate: '2015-11-08 16:00:00',
          projectionc6duedate: '2017-02-27 16:00:00',
          bg_key: 'CPBG',
        },
      ])
      sinon.stub(cleanSheetModel, 'getStageName').returns([])
      sinon.stub(cleanSheetModel, 'getBgByProfitcenter').returns([{ bg_key: 'CPBG' }])
      let result = await cleanSheetService.fetchPlm({})
      expect(result).to.have.property('projectList')
      expect(result.projectList).to.be.a('array')
      expect(result).to.deep.equal(mockResult)
    })
    afterEach(() => {
      // Restore the default sandbox here
      sinon.restore()
    })
  })

  describe('cleansheet service cleanSheet function', () => {
    it('cleansheet service cleanSheet function', async () => {
      let reqData = {
        body:{
          'bg': 'CPBG',
          'projectName' : 'Bucky N5 14"',
          'projectCode' : '91.73F41.301',
          'product': 'NB',
          'site': 'WCD',
          'productSpec': '15"',
          'bomFileDate': '2018/07/06',
          'bomVersion': 'V01',
          'stage': 'MP',
          'idCMFFileDate': 'V0.5', // ME BOM excel A10 (目前不寫入DB)
          'initator': 'Some people', // ME BOM excel A11 (目前不寫入DB)
          'projectLeader': 'Some people',  // ME BOM excel A12 (目前不寫入DB)
          'approveBy': 'Some people',  // ME BOM excel A13 (目前不寫入DB)
          'costbomData': [
            {
              'partLevel': 1,
              'customerPN': '10KG8',
              'modifiedVersion': '',
              'partName': 'LCD ASSY',
              'qty': 3,
            },
          ],
        },
        user:{
          userID:'11223',
        },
      }
      sinon.stub(cleanSheetModel, 'triggerProjectME').returns(true)
      let result = await cleanSheetService.triggerProjectME(reqData)
      expect(result).to.be.true
    })
    afterEach(() => {
      // Restore the default sandbox here
      sinon.restore()
    })
  })

  describe('cleansheet service getSinglePartCleanSheet function', () => {
    it('cleansheet service getSinglePartCleanSheet partlevel is 1 function', async () => {
      let mockResult =  {
        info:{
          projectCode:'testP1',
          projectName:'testP1',
          product:'testP1',
          bg:'CPBG',
          stage:'A',
          stageName:'A1',
          currency:'NTD',
          partName:'10KG8',
          site:'WSO',
          partNumberAssy:'',
          partNumberSingle:'TESTA1',
          bomFileDate:'2019-01-29 :15:30:00',
          vendor:'TESTV1',
          productSpec:'A1',
          remark:'undefined',
        },
        cost:{
          material:'211.12',
          process:'211.12',
          component:'211.12',
          stamping:'211.12',
          package:'211.12',
          profit:'42.224000000000004',
          sourceCost:'1097.8239999999998',
        },
        data:{ material:'A12', process:'A12', component:'A12', stamping:'A12' },
      }
      sinon.stub(cleanSheetModel, 'getProjectInfo').returns(
        {
          uuid:'as12350977123997123',
          cleansheetid:'1234',
          projectcode:'testP1',
          projectname:'testP1',
          product:'testP1',
          bg:'CPBG',
          site:'WSO',
          createtime:'2019-01-29 :15:30:00',
          producrspec:'A1',
          costname:'test',
          costdata:'test',
          costprice:123.00,
        }
      )
      sinon.stub(cleanSheetModel, 'getStage').returns({
        uuid:'as12350977123997123',
        stage:'A',
        stagename:'A1',
        versionnumber:'A1',
        createtime:'2019-1-29 15:00:00',
        submitby:'admin',
        submittime:'2019-1-29 15:00:00',
        confirmby:'superUser',
        confirmtime:'2019-1-29 15:00:00',
        confirmstatus:true,
      })
      sinon.stub(cleanSheetModel, 'getPartsInfo').returns({
        partnumber:'TESTA1',
        currency:'NTD',
        partname:'10KG8',
        partlevel:1,
      })
      sinon.stub(cleanSheetModel, 'getVendor').returns({
        vendor:'TESTV1',
      })
      sinon.stub(cleanSheetModel, 'getDataCost').returns({
        costprice:211.12,
        costdata:'A12',
      })
      let result = await cleanSheetService.getSinglePartCleanSheet('', '')
      expect(result).to.deep.equal(JSON.stringify(mockResult))
    })
    it('cleansheet service getSinglePartCleanSheet partlevel is 2 function', async () => {
      let mockResult =   {
        info:{
          projectCode:'testP1',
          projectName:'testP1',
          product:'testP1',
          bg:'CPBG',
          stage:'A',
          stageName:'A1',
          currency:'NTD',
          partName:'10KG8',
          site:'WSO',
          partNumberAssy:'TESTA1',
          partNumberSingle:'',
          bomFileDate:'2019-01-29 :15:30:00',
          vendor:'TESTV1',
          productSpec:'A1',
          remark:'undefined',
        },
        cost:{
          material:'211.12',
          process:'211.12',
          component:'211.12',
          stamping:'211.12',
          package:'211.12',
          profit:'42.224000000000004',
          sourceCost: '1097.8239999999998',
        },
        data:{ material: 'A12', process:'A12', component:'A12', stamping:'A12' },
      }
      sinon.stub(cleanSheetModel, 'getProjectInfo').returns(
        {
          uuid:'as12350977123997123',
          cleansheetid:'1234',
          projectcode:'testP1',
          projectname:'testP1',
          product:'testP1',
          bg:'CPBG',
          site:'WSO',
          createtime:'2019-01-29 :15:30:00',
          producrspec:'A1',
          costname:'test',
          costdata:'test',
          costprice:123.00,
        }
      )
      sinon.stub(cleanSheetModel, 'getStage').returns({
        uuid:'as12350977123997123',
        stage:'A',
        stagename:'A1',
        versionnumber:'A1',
        createtime:'2019-1-29 15:00:00',
        submitby:'admin',
        submittime:'2019-1-29 15:00:00',
        confirmby:'superUser',
        confirmtime:'2019-1-29 15:00:00',
        confirmstatus:true,
      })
      sinon.stub(cleanSheetModel, 'getPartsInfo').returns({
        partnumber:'TESTA1',
        currency:'NTD',
        partname:'10KG8',
        partlevel:2,
      })
      sinon.stub(cleanSheetModel, 'getVendor').returns({
        vendor:'TESTV1',
      })
      sinon.stub(cleanSheetModel, 'getDataCost').returns({
        costprice:211.12,
        costdata:'A12',
      })
      let result = await cleanSheetService.getSinglePartCleanSheet('', '')
      expect(result).to.deep.equal(JSON.stringify(mockResult))
    })
  })
  afterEach(() => {
    // Restore the default sandbox here
    sinon.restore()
  })
})


