const { expect } = require('chai')
const sinon = require('sinon')
const fs = require('fs')
const costgenService = require('../../../../server/service/cleanSheet/costgen.js')
const { DatabaseModel } = require('../../../../server/model/cleanSheet/database.js')
const path = require('path')
const moment = require('moment')

describe('CleanSheet', () => {
  describe('Costgen service getData function', () => {
    it('getData without condition', async () => {
      let mockResult = {
        'Pipe': {
          'pipeTypeTable': {
            'header': [
              {
                'key': 'pipeType',
                'name': 'pipe形式',
                'typeof': 'string',
              },
            ],
            'data': [
              {
                'pipeType': 'Powder(結燒管)',
              },
              {
                'pipeType': 'Groove(溝槽管)',
              },
              {
                'pipeType': 'Complex(複合管)',
              },
              {
                'pipeType': 'VC(均熱管)',
              },
            ],
          },
        },
      }

      sinon.stub(DatabaseModel, 'getAll').returns({
        'Pipe': {
          'pipeTypeTable': {
            'header': [
              {
                'key': 'pipeType',
                'name': 'pipe形式',
                'typeof': 'string',
              },
            ],
            'data': [
              {
                'pipeType': 'Powder(結燒管)',
              },
              {
                'pipeType': 'Groove(溝槽管)',
              },
              {
                'pipeType': 'Complex(複合管)',
              },
              {
                'pipeType': 'VC(均熱管)',
              },
            ],
          },
        },
      })
      let result = await costgenService.getData({})
      expect(result).to.have.property('Pipe')
      expect(result.Pipe.pipeTypeTable.header).to.be.a('array')
      expect(result.Pipe.pipeTypeTable.data).to.be.a('array')
      expect(result).to.deep.equal(mockResult)
      DatabaseModel.getAll.restore()
    })

    it('getData with condition', async () => {
      let mockResult = {
        'Pipe': {
          'pipeTypeTable': {
            'header': [
              {
                'key': 'pipeType',
                'name': 'pipe形式',
                'typeof': 'string',
              },
            ],
            'data': [
              {
                'pipeType': 'Powder(結燒管)',
              },
              {
                'pipeType': 'Groove(溝槽管)',
              },
              {
                'pipeType': 'Complex(複合管)',
              },
              {
                'pipeType': 'VC(均熱管)',
              },
            ],
          },
        },
      }

      sinon.stub(DatabaseModel, 'getAll').returns({
        'Pipe': {
          'pipeTypeTable': {
            'header': [
              {
                'key': 'pipeType',
                'name': 'pipe形式',
                'typeof': 'string',
              },
            ],
            'data': [
              {
                'pipeType': 'Powder(結燒管)',
              },
              {
                'pipeType': 'Groove(溝槽管)',
              },
              {
                'pipeType': 'Complex(複合管)',
              },
              {
                'pipeType': 'VC(均熱管)',
              },
            ],
          },
        },
      })
      let result = await costgenService.getData({ 'type': 'Pipe', 'name': 'pipeTypeTable' })
      expect(result).to.have.property('Pipe')
      expect(result.Pipe.pipeTypeTable.header).to.be.a('array')
      expect(result.Pipe.pipeTypeTable.data).to.be.a('array')
      expect(result).to.deep.equal(mockResult)
      DatabaseModel.getAll.restore()
    })
    afterEach(() => {
      // Restore the default sandbox here
      sinon.restore()
    })
  })

  describe('Costgen service getTables function', () => {
    it('getTables ', async () => {
      let mockResult = {
        list:
                    [{
                      tableType: 'Fan',
                      tables: [{
                        'tableName': 'bearingAndSleeveTable',
                        'updateBy': null,
                        'updateDate': '2018/12/11 07:40:45',
                        'version': 'V1',
                      }],
                    },
                    {
                      tableType: 'Fin',
                      tables: [{
                        'tableName': 'densityTable',
                        'updateBy': null,
                        'updateDate': '2018/12/11 07:40:45',
                        'version': 'V1',
                      }],
                    }],

      }
      sinon.stub(DatabaseModel, 'getTable').returns([
        {
          tabletype: 'Fan',
          tablename: 'bearingAndSleeveTable',
          versionnumber: 1,
          updateby: null,
          updatetime: '2018-12-11 07:40:45',
        },
        {
          tabletype: 'Fin',
          tablename: 'densityTable',
          versionnumber: 1,
          updateby: null,
          updatetime: '2018-12-11 07:40:45',
        },
      ])
      let result = await costgenService.getTables({})
      expect(result).to.deep.equal(mockResult)
      DatabaseModel.getTable.restore()
    })
  })

  describe('Costgen service getTypes function', () => {
    it('getTypes ', async () => {
      let mockResult = {
        'list': [
          'Pipe',
          'Screw',
          'Fin',
          'Sponge',
          'ThermalBlock',
          'Grease',
          'Fan',
          'ThermalPad',
          'ThermalPlate',
        ],
      }

      sinon.stub(DatabaseModel, 'getType').returns([
        { tabletype: 'Pipe' },
        { tabletype: 'Screw' },
        { tabletype: 'Fin' },
        { tabletype: 'Sponge' },
        { tabletype: 'ThermalBlock' },
        { tabletype: 'Grease' },
        { tabletype: 'Fan' },
        { tabletype: 'ThermalPad' },
        { tabletype: 'ThermalPlate' },
      ])

      let result = await costgenService.getTypes({})
      expect(result).to.have.property('list')
      expect(result.list).to.be.a('array')
      expect(result).to.deep.equal(mockResult)
    })
    afterEach(() => {
      // Restore the default sandbox here
      sinon.restore()
    })
  })

  describe('Costgen service addHeaderAndData function', () => {
    it('addHeaderAndData with header and data', async () => {
      let mockResult = {
        'Res': true,
        'Msg': '',
      }
      sinon.stub(DatabaseModel, 'insertOrUpdateData').returns(true)
      let result = await costgenService.addHeaderAndData({
        'header': [
          { 'key': 'outerDiameter', 'name': '外徑', 'typeof': 'string' },
          { 'key': 'flatteningThickness', 'name': '打扁', 'typeof': 'string' },
          { 'key': 'math', 'name': '數學', 'typeof': 'number' },
          { 'key': 'cost', 'name': 'cost', 'typeof': 'number' },
        ],
        'data': [
          { 'outerDiameter': 'D4_', 'flatteningThickness': '2.0mm', 'math': 2, 'cost': 0 },
          { 'outerDiameter': 'D4_', 'flatteningThickness': '1.8mm', 'math': 1.8, 'cost': 0.15 },
          { 'outerDiameter': 'D4_', 'flatteningThickness': '1.6mm', 'math': 1.6, 'cost': 0.2 },
          { 'outerDiameter': 'D4_', 'flatteningThickness': '1.4mm', 'math': 1.4, 'cost': 0.25 },
        ],
      }, { 'type': 'Pipe', 'name': 'bearingAndSleeveTable' })
      expect(result).to.deep.equal(mockResult)
      DatabaseModel.insertOrUpdateData.restore()
    })
    it('addHeaderAndData without header', async () => {
      let mockResult = {
        'Res': false,
        'Msg': 'Missing Header data',
      }
      sinon.stub(DatabaseModel, 'insertOrUpdateData').returns({ 'Res': false, 'Msg': 'Missing Header data' })
      let result = await costgenService.addHeaderAndData({
        'data': [
          { 'outerDiameter': 'D4_', 'flatteningThickness': '2.0mm', 'math': 2, 'cost': 0 },
          { 'outerDiameter': 'D4_', 'flatteningThickness': '1.8mm', 'math': 1.8, 'cost': 0.15 },
          { 'outerDiameter': 'D4_', 'flatteningThickness': '1.6mm', 'math': 1.6, 'cost': 0.2 },
          { 'outerDiameter': 'D4_', 'flatteningThickness': '1.4mm', 'math': 1.4, 'cost': 0.25 },
        ],
      }, { 'type': 'Pipe', 'name': 'bearingAndSleeveTable' })
      expect(result).to.deep.equal(mockResult)
      DatabaseModel.insertOrUpdateData.restore()
    })
    it('addHeaderAndData without data', async () => {
      let mockResult = {
        'Res': false,
        'Msg': 'Missing Data data',
      }
      sinon.stub(DatabaseModel, 'insertOrUpdateData').returns({ 'Res': false, 'Msg': 'Missing Data data' })
      let result = await costgenService.addHeaderAndData({
        'header': [
          { 'key': 'outerDiameter', 'name': '外徑', 'typeof': 'string' },
          { 'key': 'flatteningThickness', 'name': '打扁', 'typeof': 'string' },
          { 'key': 'math', 'name': '數學', 'typeof': 'number' },
          { 'key': 'cost', 'name': 'cost', 'typeof': 'number' },
        ],
      }, { 'type': 'Pipe', 'name': 'bearingAndSleeveTable' })
      expect(result).to.deep.equal(mockResult)
      DatabaseModel.insertOrUpdateData.restore()
    })
    it('addHeaderAndData insert fail', async () => {
      let mockResult = {
        'Res': false,
        'Msg': 'Insert fail',
      }
      sinon.stub(DatabaseModel, 'insertOrUpdateData').returns(false)
      let result = await costgenService.addHeaderAndData({
        'header': [
          { 'key': 'outerDiameter', 'name': '外徑', 'typeof': 'string' },
          { 'key': 'flatteningThickness', 'name': '打扁', 'typeof': 'string' },
          { 'key': 'math', 'name': '數學', 'typeof': 'number' },
          { 'key': 'cost', 'name': 'cost', 'typeof': 'number' },
        ],
        'data': [
          { 'outerDiameter': 'D4_', 'flatteningThickness': '2.0mm', 'math': 2, 'cost': 0 },
          { 'outerDiameter': 'D4_', 'flatteningThickness': '1.8mm', 'math': 1.8, 'cost': 0.15 },
          { 'outerDiameter': 'D4_', 'flatteningThickness': '1.6mm', 'math': 1.6, 'cost': 0.2 },
          { 'outerDiameter': 'D4_', 'flatteningThickness': '1.4mm', 'math': 1.4, 'cost': 0.25 },
        ],
      }, { 'type': 'Pipe', 'name': 'bearingAndSleeveTable' })
      expect(result).to.deep.equal(mockResult)
    })
    it('addHeaderAndData wrong header fail', async () => {
      let mockResult = {
        'Res': false,
        'Msg': 'Wrong Header',
      }
      sinon.stub(DatabaseModel, 'insertOrUpdateData').returns(true)
      let result = await costgenService.addHeaderAndData({
        'header': [
          { 'key': 'outerDiameter', 'name': '外徑', 'typeof': 'string' },
          { 'key': 'flatteningThickness', 'name': '打扁', 'typeof': 'string' },
          { 'key': 'math', 'name': '數學', 'typeof': 'number' },
          { 'key': 'cost', 'name': 'cost', 'typeof': 'number' },
        ],
        'data': [
          { 'TEST': 'D4_', 'flatteningThickness': '2.0mm', 'math': 2, 'cost': 0 },
          { 'TEST': 'D4_', 'flatteningThickness': '1.8mm', 'math': 1.8, 'cost': 0.15 },
          { 'TEST': 'D4_', 'flatteningThickness': '1.6mm', 'math': 1.6, 'cost': 0.2 },
          { 'TEST': 'D4_', 'flatteningThickness': '1.4mm', 'math': 1.4, 'cost': 0.25 },
        ],
      }, { 'type': 'Pipe', 'name': 'bearingAndSleeveTable' })
      expect(result).to.deep.equal(mockResult)
    })
    it('addHeaderAndData insert wrong type', async () => {
      let mockResult = {
        'Res': false,
        'Msg': 'Value type is wrong in row [1,2,3,4]',
      }
      sinon.stub(DatabaseModel, 'insertOrUpdateData').returns(false)
      let result = await costgenService.addHeaderAndData({
        'header': [
          { 'key': 'outerDiameter', 'name': '外徑', 'typeof': 'string' },
          { 'key': 'flatteningThickness', 'name': '打扁', 'typeof': 'string' },
          { 'key': 'math', 'name': '數學', 'typeof': 'number' },
          { 'key': 'cost', 'name': 'cost', 'typeof': 'number' },
        ],
        'data': [
          { 'outerDiameter': 'D4_', 'flatteningThickness': '2.0mm', 'math': 2, 'cost': '0' },
          { 'outerDiameter': 'D4_', 'flatteningThickness': '1.8mm', 'math': 1.8, 'cost': '0.15' },
          { 'outerDiameter': 'D4_', 'flatteningThickness': '1.6mm', 'math': 1.6, 'cost': '0.2' },
          { 'outerDiameter': 'D4_', 'flatteningThickness': '1.4mm', 'math': 1.4, 'cost': '0.25' },
        ],
      }, { 'type': 'Pipe', 'name': 'bearingAndSleeveTable' })
      expect(result).to.deep.equal(mockResult)
    })
    afterEach(() => {
      // Restore the default sandbox here
      sinon.restore()
    })
  })

  describe('Costgen service private function', () => {
    it('getCellNumber funtion test', async () => {
      let result = await costgenService.getCellNumber(28)
      expect(result).to.be.a('array')
    })
    it('createFileName funtion test', async () => {
      let result = await costgenService.createFileName(10)
      expect(result).to.have.lengthOf(10)
    })
  })

  describe('Costgen service uploadBaseData function', () => {
    let filePath = path.resolve(__dirname, './Fan_fanTypeTable_20181119.xlsx')
    let fileInfo = {
      path: filePath,
      name: 'Fan_fanTypeTable_20181119.xlsx',
    }
    beforeEach('Setup mockFs', () => {
     
    })
    it('should mock upload file', async() => {
      let mockResult = { Res: true, Msg: '' }
      sinon.stub(DatabaseModel, 'getAll').returns({
        'Pipe': {
          'fanTypeTable': {
            'header': [
              {
                'key': 'fanType',
                'name': '風扇類型',
                'typeof': 'string',
              },
            ],
            'data': [
              {
                'fanType': 'Axial(軸流扇)',
              },
              {
                'fanType': 'Cross Flow Fan(橫流扇)',
              },
              {
                'fanType': 'Blower(離心扇)',
              },
            ],
          },
        },
      })
      sinon.stub(DatabaseModel, 'delete').returns(true)
      sinon.stub(DatabaseModel, 'insertDetailData').returns(true)
      sinon.stub(DatabaseModel, 'updateTable').returns(true)
      let result = await costgenService.uploadBaseData(fileInfo, { type: 'Pipe', name: 'fanTypeTable', user: '10700001' })
      expect(result).to.deep.equal(mockResult)
    })
    afterEach(() => {
      // Restore the default sandbox here
      sinon.restore()
    })
  })

  describe('Costgen service exportData function', () => {
    it('exportData ', async () => {
      const resultFileDate = moment(new Date()).format('YYYYMMDD')
      let fileName = `../../../../server/utils/excel/Pipe_pipeTypeTable_${resultFileDate}.xlsx`
      let filePath = path.resolve(__dirname, fileName)
      sinon.stub(DatabaseModel, 'getAll').returns({
        'Pipe': {
          'pipeTypeTable': {
            'header': [
              {
                'key': 'pipeType',
                'name': 'pipe形式',
                'typeof': 'string',
              },
            ],
            'data': [
              {
                'pipeType': 'Powder(結燒管)',
              },
              {
                'pipeType': 'Groove(溝槽管)',
              },
              {
                'pipeType': 'Complex(複合管)',
              },
              {
                'pipeType': 'VC(均熱管)',
              },
            ],
          },
        },
      })
      let result = await costgenService.getData({ 'type': 'Pipe', 'name': 'pipeTypeTable' })
      await costgenService.exportTableData('Pipe', 'pipeTypeTable', result).then((res) => {}).catch((err) => {})
      fs.exists(filePath, (isExist) =>{
        expect(isExist).to.be.true
      })
    })
    afterEach(() => {
      // Restore the default sandbox here
      sinon.restore()
    })
  })

  describe('Costgen service getResult function', () => {
    it('getResult ', async () => {
      const resultFileDate = moment(new Date()).format('YYYYMMDD')
      let fileName = `../../../../server/utils/excel/Cost_Result_${resultFileDate}.xlsx`
      let filePath = path.resolve(__dirname, fileName)
      let req = {
        'Fin': [
          { 'name': 'Fin 1', 'unitprice': 0.3748, 'usage': 1, 'data': {} },
        ],
        'Fan': [
          { 'name': 'Block', 'unitprice': 3.6000, 'usage': 1, 'data': {} },
        ],
      }
      await costgenService.getResult(req).then((res) => {}).catch((err) => {})
      fs.exists(filePath, (isExist) =>{
        expect(isExist).to.be.true
      })
    })
  })
})