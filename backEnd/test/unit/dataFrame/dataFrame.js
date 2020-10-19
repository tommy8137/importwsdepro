const { expect } = require('chai')
const sinon = require('sinon')
const dfUtils = require('../../../server/utils/dataFrame/utils')
const {Excel} = require('../../../server/utils/dataFrame/excel')
const ut = require('util')
const path = require('path')
const {hitRate, eebomItem, eebomSummary} = require('./data')

describe('data frame', () => {
  describe('utils', () => {
    it('getFrameInfoFromYamlPathWeb', async () => {
      let ymlPath = path.join('example', 'header-eeall','eeallitem-web.yaml')
      let result = dfUtils.getFrameInfoFromYamlPath(ymlPath)
      console.log(ut.inspect(result, null, 10))
    })
    it('getFrameInfoFromYamlPathExcel', async () => {
      let ymlPath = path.join('example', 'header-eeall','eeallitem-excel.yaml')
      let result = dfUtils.getFrameInfoFromYamlPath(ymlPath)
      console.log(ut.inspect(result, null, 10))
    })
    it('overwriteOrConcatJson', async () => {
      let ymlPath = path.join('example', 'header-hitrate-dynamic','web.yaml')
      let orgJson = dfUtils.getFrameInfoFromYamlPath(ymlPath)
      console.log('originJson:', orgJson)
      let extraJson = {
        spec01:{
          label: 'ABCSPEC01'
        },
        hitRate: {gg:'yy'}
      }
      let result = dfUtils.overwriteOrConcatJson(orgJson.headers, extraJson)
      console.log(ut.inspect(result, null, 10))
    })
    it('overwriteOrConcatJsonWithInsert', async () => {
      let ymlPath = path.join('example', 'header-hitrate-dynamic','web.yaml')
      let orgJson = dfUtils.getFrameInfoFromYamlPath(ymlPath)
      console.log('originJson:', orgJson)
      let extraJson = {
        spec01:{
          label: 'ABCSPEC01'
        },
        hitRate: {gg:'yy'}
      }
      let result = dfUtils.overwriteOrConcatJsonWithInsert(orgJson.headers, extraJson, 2)
      console.log(ut.inspect(result, null, 10))
    })
    it('getHeaderByApplyingTemplate', async () => {
      let ymlPath = path.join('example', 'header-hitrate-dynamic','hiterateDynamicTemplate.yaml')
      let extraJsonArray =[{
                         templateKey:'dataStringHD',
                         key: 'spec01',
                         extra:{label:'ABCSPEC01'},
                       }, 
                       {
                         templateKey:'dataIntHD',
                         key: 'gg',
                         extra:{label:'YY'},
                       }]
      let result = dfUtils.getHeaderByApplyingTemplate(extraJsonArray, ymlPath)
      console.log(ut.inspect(result, null, 10))
    })

  })
  describe('excel', () => {
    it('createexcel', async () => {
      // let excelPath = path.join('example', 'example.xlsx')
      let excelPath = path.resolve(__dirname, 'example123.xlsx')
      let excelYmlPath = path.join('example', 'excel-example.yaml')
      let rawData = {
        eebomSummary,
        eebomItem,
        hitRate, 
        hitRateDynamic: hitRate
      }
      let excel = await new Excel(excelPath, excelYmlPath, rawData)
      console.log(`get the excel path: ${await excel.execute()}`)
    })
    it('eebomExport', async() => {
      let excelPath = path.resolve(__dirname, 'eeBom-excel.xlsx')
      let excelYmlPath = path.join('eebom-tmp', 'excel-eebom.yaml')
      let rawData = {}
      let excel = await new Excel(excelPath, excelYmlPath, rawData)
      console.log(`get the excel path: ${await excel.execute()}`)
    })
    it('createExcelWithExtraHeader', async () => {
      let excelPath = path.join('example', 'example.xlsx')
      let excelYmlPath = path.join('example', 'excel-example.yaml')
      let rawData = {
        eebomSummary,
        eebomItem,
        hitRate, 
        hitRateDynamic: hitRate
      }
      let excel = await new Excel(excelPath, excelYmlPath, rawData)
      let tmpYmlPath = path.join('example', 'header-hitrate-dynamic','hiterateDynamicTemplate.yaml')
      let extraJsonArray =[{
                         templateKey:'dataStringHD',
                         key: 'spec01',
                         extra:{label:'ABCSPEC01'},
                       }, 
                       {
                         templateKey:'dataIntHD',
                         key: 'hitRate',
                         extra:{label:'YY'},
                       },
                       {
                         templateKey:'dataIntHD',
                         key: 'TT',
                         extra:{label:'YY'},
                       }]
      let extraHeaders = { hitRateDynamic: {
//          insert: 0,
          header: dfUtils.getHeaderByApplyingTemplate(extraJsonArray, tmpYmlPath)
        }
      }
      console.log(`get extra header ${ut.inspect(extraHeaders, null, 10)}`)
      excel.addExtraHeaders(extraHeaders) 
      console.log(`get the excel path: ${await excel.execute()}`)
    })
  })
})
