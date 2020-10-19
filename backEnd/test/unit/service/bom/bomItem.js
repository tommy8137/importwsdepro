const { expect } = require('chai')
const sinon = require('sinon')

const bomItemService = require('../../../../server/service/bom/bomItem.js')
const bomItemModel = require('../../../../server/model/bom/bomItem.js')
const rbacService = require('../../../../server/service/admin/rbac.js')
const bomVersionModel = require('../../../../server/model/bom/bomVersion.js')
const bomDesigneeModel = require('../../../../server/model/bom/bomDesignee.js')
const parlistService = require('../../../../server/service/bom/partList.js')

describe('BOM items', () => {
  
  //describe('bom items service get assign list function', () => {
    /*it('bom items service get assign list function', async () => {
      let mockResult =   {
        'assignList': [
          {
            order: 1,
            assign: 'ME',
            isFunctionTeam: false,
            employeeID: '10700001',
            employeeName: 'TEST-1',
            tabOwner: true,
          },
          {
            order: null,
            assign: 'Tooling',
            isFunctionTeam: true,
            employeeID: '10700001',
            employeeName: 'TEST-1',
            tabOwner: true,
          },
        ],
      }

      sinon.stub(bomItemModel, 'getBomAssignList').returns([
        {
          order: 1,
          assign: '',
          isFunctionTeam: false,
          employeeID: '10700001',
          employeeName: 'TEST-1',
        },
        {
          order: null,
          assign: 'Tooling',
          isFunctionTeam: true,
          employeeID: '10700001',
          employeeName: 'TEST-1',
        },
      ])

      sinon.stub(bomItemModel, 'checkBomProjectExist').returns(true)
      sinon.stub(bomItemModel, 'bomRDMEPermission').returns(true)

      sinon.stub(rbacService, 'getPolicyByUser').returns({ Edit: { allow: ['me_bom_projects'], deny: [] } })
      sinon.stub(bomItemModel, 'bomVersionActionPermission').returns(0)

      let bomID = 2, userID = '10700001'
      let result = await bomItemService.getBomAssignList(bomID, userID)
      expect(result.assignList).to.deep.equal(mockResult.assignList)
    })
    */
    /*it('assign list function, wrong version, approvalAble have to be true', async () => {
      sinon.stub(bomItemModel, 'checkBomProjectExist').returns(true)
      sinon.stub(bomItemModel, 'bomRDMEPermission').returns(true)
      sinon.stub(rbacService, 'getPolicyByUser').returns({ Edit: { allow: ['me_bom_projects'], deny: [] } })
      sinon.stub(bomItemModel, 'bomVersionActionPermission').returns(0)
      sinon.stub(bomItemModel, 'getBomAssignList').returns([])


      let bomID = 2, userID = '10700001'
      let result = await bomItemService.getBomAssignList(bomID, userID)
      expect(result.approvalAble).to.equal(false)
    })*/

    /*it('assign list function, right version, approvalAble have to be true', async () => {
      sinon.stub(bomItemModel, 'checkBomProjectExist').returns(true)
      sinon.stub(bomItemModel, 'bomRDMEPermission').returns(true)
      sinon.stub(rbacService, 'getPolicyByUser').returns({ Edit: { allow: ['me_bom_projects'], deny: [] } })
      sinon.stub(bomItemModel, 'bomVersionActionPermission').returns(1)
      sinon.stub(bomItemModel, 'getBomAssignList').returns([])

      let bomID = 2, userID = '10700001'
      let result = await bomItemService.getBomAssignList(bomID, userID)
      expect(result.approvalAble).to.equal(true)
    })

    afterEach(() => {
      // Restore the default sandbox here
      sinon.restore()
    })*/
  //})

  describe('bom items get item list function', () => {
    /*it('bom items service get item list function', async () => {
      let mockResult = {
        'bomItems': [
          {
            'Item': 1,
            'id': 1,
            'Custom P/N': 'TEST-1',
            'Supply Type': 'AVAP',
            'Level': {
              'level': 'DC/65',
              'parentLevel': null,
              'subLevel': false,
            },
            'RFQ P/N': 'UWO1552972269762',
            'Reference Part Number': null,
            'Part Name': 'N0',
            'Image': null,
            'QTY': 1,
            'GB Assy Category': null,
            'Function Category': 'EMC\n',
            'Parts Category I': 'Thermal',
            'Parts Category II': 'Fan',
            'Material Spec': 'EMC\n',
            'Material': null,
            'partSize': {
              'l': '1.1',
              'w': '2.1',
              'h': '3.1',
              'ef': '4.1',
              'l2': '5.1',
              'w2': '6.1',
            },
            'Thickness': '7.1',
            'Part Weight(g)': '8.1',
            'Update Time': '19/03/19 13:12',
            'last_price':{
              unitPrice:10,
              validDate:'20991231',
            }
          },
          {
            'Item': 2,
            'id': 2,
            'Custom P/N': 'TEST-2',
            'Supply Type': 'AVAP',
            'Level': {
              'level': '2',
              'parentLevel': '130',
              'subLevel': true,
            },
            'RFQ P/N': 'RQZ1552972450983',
            'Reference Part Number': null,
            'Part Name': 'N0',
            'Image': null,
            'QTY': 1,
            'GB Assy Category': null,
            'Function Category': 'EMC\n',
            'Parts Category I': 'Thermal',
            'Parts Category II': 'Fan',
            'Material Spec': 'EMC\n',
            'Material': null,
            'partSize': {
              'l': '1.1',
              'w': '2.1',
              'h': '3.1',
              'ef': '4.1',
              'l2': '5.1',
              'w2': '6.1',
            },
            'Thickness': '7.1',
            'Part Weight(g)': '8.1',
            'Update Time': '19/03/19 13:12',
            'last_price':{
              unitPrice:10,
              validDate:'20991231',
            }
          },
        ],
      }
      sinon.stub(bomItemModel, 'checkBomProjectExist').returns(true)
      sinon.stub(bomItemModel, 'bomRDMEPermission').returns(true)
      sinon.stub(bomItemService.BomItems, 'getItemEditAble').returns(false)
      sinon.stub(rbacService, 'getPolicyByUser').returns({ View: { allow: ['me_bom_projects.bom_item.source_cost'], deny: [] } })
      sinon.stub(bomItemModel, 'getUploadFileRecord').returns(true)
      sinon.stub(bomItemModel, 'bomPNameAndDesc').returns([{
        project_name: 'test',
        sku_desc: 'test',
      }])
      sinon.stub(bomItemModel, 'getBomTable').returns({
        rows: [
          {
            id: 1,
            customPN: 'TEST-1',
            rfqPN: 'UWO1552972269762',
            referencePN: null,
            partName: 'N0',
            image_id: null,
            fpath: null,
            level: 'DC/65',
            parentLevel: null,
            subLevel: false,
            qty: 1,
            part_size_l: '1.1',
            part_size_w: '2.1',
            part_size_h: '3.1',
            part_size_ef: '4.1',
            part_size_l2: '5.1',
            part_size_w2: '6.1',
            partCategoryI: 'Thermal',
            partCategoryII: 'Fan',
            gbAssyCategory: null,
            functionCategory: 'EMC\n',
            supplyType: 'AVAP',
            materialSpec: 'EMC\n',
            material: null,
            thickness: '7.1',
            partWeight: '8.1',
            updateTime: '2019-03-19T05:09:18.667Z',
            last_price:{
              unitPrice:'10',
              validDate:'20991231',
              currency:'USD',
            },
            suggestion_cost_type:'system_cost'
          },
          {
            id: 2,
            customPN: 'TEST-2',
            rfqPN: 'RQZ1552972450983',
            referencePN: null,
            partName: 'N0',
            image_id: null,
            fpath: null,
            level: '2',
            parentLevel: '130',
            subLevel: true,
            qty: 1,
            part_size_l: '1.1',
            part_size_w: '2.1',
            part_size_h: '3.1',
            part_size_ef: '4.1',
            part_size_l2: '5.1',
            part_size_w2: '6.1',
            partCategoryI: 'Thermal',
            partCategoryII: 'Fan',
            gbAssyCategory: null,
            functionCategory: 'EMC\n',
            supplyType: 'AVAP',
            materialSpec: 'EMC\n',
            material: null,
            thickness: '7.1',
            partWeight: '8.1',
            updateTime: '2019-03-19T05:12:20.176Z',
            last_price:{
              unitPrice:'10',
              validDate:'20991231',
              currency:'USD',
            },
            suggestion_cost_type:'system_cost'
          },
        ],
        rowCount: 2,
      })

      let bomID = 2, userID = '10700001', assign = 'all'
      let result = await bomItemService.getBomItem(bomID, userID, assign)
      expect(result.assignList).to.deep.equal(mockResult.assignList)
    })*/

    it('item list function, test getItemEditAble function, assign: all, user is ME FMTM, res have to be true', async () => {
      let bomID = 2, userID = '10700001', assign = 'all'

      sinon.stub(rbacService, 'getPolicyByUser').returns({ Edit: { allow: ['me_bom_projects'], deny: [] } })
      let result = await bomItemService.BomItems.getItemEditAble(bomID, userID, assign)

      expect(result).to.deep.equal(true)
    })

    it('item list function, test getItemEditAble function, assign: all, res have to be false', async () => {
      let bomID = 2, userID = '10700001', assign = 'all'
      sinon.stub(rbacService, 'getPolicyByUser').returns({})
      let result = await bomItemService.BomItems.getItemEditAble(bomID, userID, assign)

      expect(result).to.deep.equal(false)
    })

    it('item list function, test getItemEditAble function: true, res have to be false', async () => {
      let bomID = 2, userID = '10700001', assign = '10700001'
      sinon.stub(rbacService, 'getPolicyByUser').returns({ Edit: { allow: ['me_bom_projects'], deny: [] } })
      sinon.stub(bomItemModel, 'bomItemsDesignee').returns(0)

      let result = await bomItemService.BomItems.getItemEditAble(bomID, userID, assign)
      expect(result).to.deep.equal(false)
    })

    it('item list function, test getItemEditAble function, assign == user, res have to be true', async () => {
      let bomID = 2, userID = '10700001', assign = '10700001'
      sinon.stub(rbacService, 'getPolicyByUser').returns({})
      sinon.stub(bomItemModel, 'bomItemsDesignee').returns(1)

      let result = await bomItemService.BomItems.getItemEditAble(bomID, userID, assign)
      expect(result).to.deep.equal(false)
    })
    /*
    it('bom items service get item list function, test getItemEditAble function return editAble = true', async () => {
      sinon.stub(bomItemModel, 'checkBomProjectExist').returns(true)
      sinon.stub(bomItemModel, 'bomRDMEPermission').returns(true)
      sinon.stub(rbacService, 'getPolicyByUser').returns({ Edit: { allow: ['me_bom_projects'], deny: [] } })
      sinon.stub(bomItemModel, 'getUploadFileRecord').returns(true)
      sinon.stub(bomItemModel, 'getBomTable').returns({
        rows: [],
        rowCount: 0,
      })
      sinon.stub(bomItemService.BomItems, 'getItemEditAble').returns(true)
      sinon.stub(bomItemModel, 'bomPNameAndDesc').returns([{
        project_name: 'test',
        sku_desc: 'test',
      }])

      let bomID = 2, userID = '10700001', assign = 'all'
      let result = await bomItemService.getBomItem(bomID, userID, assign)
      expect(result.editAble).to.equal(true)
    })*/

    afterEach(() => {
      // Restore the default sandbox here
      sinon.restore()
    })
  })
  describe('bom items upload bom item function', () => {
    it('uploadBomItemTemp', async () => {
      let mockResult = 'f6aebefa-a9aa-4cf9-9156-66a6eadeb215'
      sinon.stub(bomVersionModel, 'getBomStage').returns([{
        bom_id:122,
        stage_name:'RFQ',
        stage_id:1,
        create_time:'2019-05-15 10:00:00',
        version_id:'f6aebefa-a9aa-4cf9-9156-66a6eadeb215',
        version_name:'0.0',
      }])
      sinon.stub(bomItemModel, 'insertUploadBomItemTemp').returns('f6aebefa-a9aa-4cf9-9156-66a6eadeb215')
      let bomID = 2, userID = '10700001', bomInfo = [{

      }]
      let result = await bomItemService.uploadBomItemTemp(bomInfo, bomID, userID)
      expect(result).to.equal(mockResult)
    })

    it('getUploadFileRecord', async () => {
      let mockResult = true
      sinon.stub(bomItemModel, 'getUploadFileRecord').returns(true)
      let bomID = 2
      let result = await bomItemService.getUploadFileRecord(bomID)
      expect(result).to.equal(mockResult)
    })

    // it('addUploadFileRecord', async () => {
    //   let mockResult = true
    //   sinon.stub(bomVersionModel, 'getBomStage').returns([{
    //     bom_id:122,
    //     stage_name:'RFQ',
    //     stage_id:1,
    //     create_time:'2019-05-15 10:00:00',
    //     version_id:'f6aebefa-a9aa-4cf9-9156-66a6eadeb215',
    //     version_name:'0.0',
    //   }])
    //   sinon.stub(bomItemModel, 'addUploadFileRecord').returns(true)
    //   let bomID = 2, userID = '10700001'
    //   let result = await bomItemService.addUploadFileRecord(bomID, '1', userID)
    //   expect(result).to.equal(mockResult)
    // })

    // it('deleteUploadBomItemTemp', async () => {
    //   let mockResult = true
    //   sinon.stub(bomItemModel, 'deleteUploadBomItemTemp').returns(true)
    //   let id = 'f6aebefa-a9aa-4cf9-9156-66a6eadeb215'
    //   let result = await bomItemService.deleteUploadBomItemTemp(id)
    //   expect(result).to.equal(mockResult)
    // })

    it('getBomItemUploadOwner', async () => {
      let mockResult = {
        uploadItemOwner: [
          { key: 'TEST', value: 'TEST' },
        ],
        bomDesignee: [
          { key: 'f6aebefa-a9aa-4cf9-9156-66a6eadeb215', value: 'Admin' },
        ],
      }

      sinon.stub(bomItemModel, 'getBomItemUploadOwner').returns({
        rows:
          [
            { key: 'TEST', value: 'TEST' }
          ]
      })
      sinon.stub(bomDesigneeModel, 'getMeBomDesigneeData').returns([
        {
          id: 'f6aebefa-a9aa-4cf9-9156-66a6eadeb215',
          seq: 1,
          user_id: '10700001',
          user_name: 'Admin',
          function_team_name: null,
          isfunctionteam: false,
        }
      ])
      let id = 'f6aebefa-a9aa-4cf9-9156-66a6eadeb215', bomid = 2
      let result = await bomItemService.getBomItemUploadOwner(bomid, id)
      expect(result).to.deep.equal(mockResult)
    })
    
    it('deleteUploadBomRecord', async () => {
      let mockResult = true
      sinon.stub(bomItemModel, 'deleteBomItemUploadRecord').returns(true)
      let bomid = '2', stage_id = 1
      let result = await bomItemService.deleteUploadBomRecord(bomid, stage_id)
      expect(result).to.equal(mockResult)
    })

    afterEach(() => {
      // Restore the default sandbox here
      sinon.restore()
    })
  })
  /*
  describe('get bom part items function', () => {
    it('getBomPartItem', async () => {
      let mockResult = [{
        partlist_value:{
          'HousingPlastic': {
            'hpItem': '123',
            'hppartname': '',
            'hppartnumber': '',
            'hpuploadimage': '',
            'hpComponent': 'NB-LCD_COVER',
            'hpProcess': 'NORMAL (咬花)',
            'hpModule': '123',
            'ce': '123',
            'hpmaterial': '',
            'hpPrice': '123',
            'hpmaterialspec1': '',
            'hpmaterial2s': 'PC',
            'hpMaterialColor': '123',
            'hpthickness': '',
            'hppartweightone': '123',
            'hppartweighttwo': '',
            'hppartssizewidth': '',
            'hppartssizelength': '',
            'hppartssizehigh': '',
            'hpToolingPartsWeightSpec1': '123',
            'hpToolingPartsWeightSpec2': '123',
            'hpToolingModuleMode': '熱膠道正灌開放式',
            'hpToolingSizeWidth': '123',
            'hpToolingSizeLength': '123',
            'hpToolingSizeHigh': '123',
            'hpToolingMachineTon': '',
            'hpToolingMachinePrice': '',
            'hpToolingHoleProduct1': '123',
            'hpToolingHoleProduct2': '123',
            'hpToolingCT': '123',
            'hpToolingShrinkRate': '123',
            'hpToolingModuleFactory': '1',
            'hpToolingMoldingManufacturer': '1',
            'hpToolingSource': '1',
            'hpToolingBonded': '保稅',
            'hpToolingTSDate': '1',
            'hpToolingT1Date': '1',
            'hpToolingRemark': '1',
            'cmfPPaintingCheckBox': true,
            'cmfPPaintingType': 'PU painting',
            'cmfPPaintingTypePrimerYield': '1',
            'cmfPPaintingTypeTopcoatYield': '1',
            'cmfPPaintingTypePrimerLoss': '1',
            'cmfPPaintingTypeTopcoatLoss': '1',
            'cmfPPaintingColor': '',
            'cmfPPaintingColorPrice': '1',
            'cmfPPaintingVendor': 'Akzo',
            'cmfPInch': '1',
            'cmfPLengthOutside': '1',
            'cmfPWidthOutside': '1',
            'cmfPLengthInside': '1',
            'cmfPWidthInside': '1',
            'cmfPPrimerQTY': '1',
            'cmfPPrimerThickness': '1',
            'cmfPTopcoatQTY': '1',
            'cmfPTopcoatThickness': '1',
            'cmfPHotMeltCheckBox': true,
            'cmfPHotMeltCount': '1',
            'cmfPEmbedNailCheckBox': true,
            'cmfPEmbedNailCount': '1',
            'cmfPEmbedNailAuto': '人工',
            'cmfPScreenPrintingCheckBox': true,
            'cmfPScreenPrintingCount': '1',
            'cmfPPadPrintingCheckBox': true,
            'cmfPPadPrintingCount': '1',
            'cmfPCNCFeederCheckBox': true,
            'cmfPCNCFeederCount': '1',
            'cmfPEMISputteringCheckBox': true,
            'cmfPEMISputteringCount': '1',
            'cmfPrice': '1',
          },
        },
      }]
      let bomItemId = 'f6aebefa-a9aa-4cf9-9156-66a6eadeb215'
      sinon.stub(bomItemModel, 'getPartListDetail').returns([{
        partlist_value:{
          'HousingPlastic': {
            'hpItem': '123',
            'hppartname': '',
            'hppartnumber': '',
            'hpuploadimage': '',
            'hpComponent': 'NB-LCD_COVER',
            'hpProcess': 'NORMAL (咬花)',
            'hpModule': '123',
            'ce': '123',
            'hpmaterial': '',
            'hpPrice': '123',
            'hpmaterialspec1': '',
            'hpmaterial2s': 'PC',
            'hpMaterialColor': '123',
            'hpthickness': '',
            'hppartweightone': '123',
            'hppartweighttwo': '',
            'hppartssizewidth': '',
            'hppartssizelength': '',
            'hppartssizehigh': '',
            'hpToolingPartsWeightSpec1': '123',
            'hpToolingPartsWeightSpec2': '123',
            'hpToolingModuleMode': '熱膠道正灌開放式',
            'hpToolingSizeWidth': '123',
            'hpToolingSizeLength': '123',
            'hpToolingSizeHigh': '123',
            'hpToolingMachineTon': '',
            'hpToolingMachinePrice': '',
            'hpToolingHoleProduct1': '123',
            'hpToolingHoleProduct2': '123',
            'hpToolingCT': '123',
            'hpToolingShrinkRate': '123',
            'hpToolingModuleFactory': '1',
            'hpToolingMoldingManufacturer': '1',
            'hpToolingSource': '1',
            'hpToolingBonded': '保稅',
            'hpToolingTSDate': '1',
            'hpToolingT1Date': '1',
            'hpToolingRemark': '1',
            'cmfPPaintingCheckBox': true,
            'cmfPPaintingType': 'PU painting',
            'cmfPPaintingTypePrimerYield': '1',
            'cmfPPaintingTypeTopcoatYield': '1',
            'cmfPPaintingTypePrimerLoss': '1',
            'cmfPPaintingTypeTopcoatLoss': '1',
            'cmfPPaintingColor': '',
            'cmfPPaintingColorPrice': '1',
            'cmfPPaintingVendor': 'Akzo',
            'cmfPInch': '1',
            'cmfPLengthOutside': '1',
            'cmfPWidthOutside': '1',
            'cmfPLengthInside': '1',
            'cmfPWidthInside': '1',
            'cmfPPrimerQTY': '1',
            'cmfPPrimerThickness': '1',
            'cmfPTopcoatQTY': '1',
            'cmfPTopcoatThickness': '1',
            'cmfPHotMeltCheckBox': true,
            'cmfPHotMeltCount': '1',
            'cmfPEmbedNailCheckBox': true,
            'cmfPEmbedNailCount': '1',
            'cmfPEmbedNailAuto': '人工',
            'cmfPScreenPrintingCheckBox': true,
            'cmfPScreenPrintingCount': '1',
            'cmfPPadPrintingCheckBox': true,
            'cmfPPadPrintingCount': '1',
            'cmfPCNCFeederCheckBox': true,
            'cmfPCNCFeederCount': '1',
            'cmfPEMISputteringCheckBox': true,
            'cmfPEMISputteringCount': '1',
            'cmfPrice': '1',
          },
        },
      }])

      let result = await bomItemService.getPartListDetail(bomItemId)
      expect(result).to.eql(mockResult)
    })

    // it('update partlist', async () => {
    //   let mockResult = 0
    //   sinon.stub(bomItemModel, 'updateBomItem').returns(true)
    //   sinon.stub(bomItemModel, 'updatePartList').returns(true)
    //   sinon.stub(bomItemModel, 'getPartListById').returns([{ partlist_value: {} }])
    //   let req = {
    //     formate : 'housing-metal',
    //     partlistValue:{},
    //     partlistPrice:{},
    //     totalPrices:0,
    //   }
    //   let bom_item_id = 'f6aebefa-a9aa-4cf9-9156-66a6eadeb215'
    //   let result = await parlistService.updatePartList(bom_item_id, req)
    //   expect(result).to.equal(mockResult)
    // })

    afterEach(() => {
      // Restore the default sandbox here
      sinon.restore()
    })
  })*/
})
