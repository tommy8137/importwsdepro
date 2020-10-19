const spendingModel = require('../../model/spending/spending.js')
const reportModel = require('../../model/spending/report.js')
const moment = require('moment')
const _ = require('lodash')
const  delDir = require('../../helpers/clean/deleteDir.js')
const fixMath = require('../../helpers/math/math.js')
const Xlsxpopulate = require('xlsx-populate')
const path = require('path')
const { ignoreVcode } = require('../../../config')
const fs = require('fs')
const csv = require('fast-csv')
const archiver = require('archiver')
const async = require('async')
const { throwApiError, errorCode } = require('../../helpers/errorCode/apiErrorHelper.js')

class Report {
  constructor() {
    this.genRawDataExcel = this.genRawDataExcel.bind(this)
  }

  static async genRawDataExcel(info) {
    console.log('----------start gen rawdata' + moment().format('h:mm:ss a'))
    // init folder path
    const rawFolder = `Spending_raw_${new Date().getTime().toString()}`
    const rawPath = path.resolve(__dirname, `../../utils/excel/${rawFolder}`)
    if (!fs.existsSync(rawPath)) fs.mkdirSync(rawPath)
    // 必須將檔案用async queue一個個進行寫入, 避免同時寫入造成heap out of memory
    let queue = async.queue(function(task, callback) {
      callback()
    }, 1)
    let  twentyOneDate = null, elevenDays = null, time = null
    let from = moment(info.dateFrom)
    let to = moment(info.dateTo)
    for(let i = from; i.isBefore(to); i.add(1, 'months')) {
      console.log(moment(i).format('YYYY-MM-DD'), moment(i).endOf('month').format('YYYY-MM-DD'))
      let exchangeRates = null
      let  rawDatas  =  null
      let  result = null
      elevenDays = i.format('YYYY-MM-11')
      twentyOneDate = i.format('YYYY-MM-21')
      global.gc()
      let paths = []
      for(let j = 0 ; j < 3 ; j++) {
        if(j == 0) {
          time = `${moment(i).format('YYYYMM')}---1`
          info.dateFrom = moment(i).startOf('month').format('YYYY-MM-DD')
          info.dateTo = moment(i).format('YYYY-MM-10')
        } else if(j == 1 && moment().format('YYYY-MM-DD') >= elevenDays) {
          time = `${moment(i).format('YYYYMM')}---2`
          info.dateFrom = elevenDays
          info.dateTo = moment(i).format('YYYY-MM-20')
        } else if ( j == 2 && moment().format('YYYY-MM-DD') >= twentyOneDate ) {
          time = `${moment(i).format('YYYYMM')}---3`
          info.dateFrom = twentyOneDate
          info.dateTo = moment(i).endOf('month').format('YYYY-MM-DD')
        } else continue
        try{
          rawDatas = await genRawData(info)
        } catch (e) {
          console.log('raw data err::', e)
          continue
        }
        rawDatas = _.orderBy(rawDatas, ['gr_date'], ['asc'])
        result = convertRawData(rawDatas)
        rawDatas  =  null
        global.gc()
        let spendingFileDate = moment(new Date()).format('YYYYMMDD')
        let filePath = rawPath + `/Spending_raw_${spendingFileDate}-${time}.csv`
        paths.push(filePath)
        queue.push(await generateExcel(result, rawPath, time))
      }

      for (let h = 0; h < paths.length; h++) {
        await this.MergeCsv([paths[h]], paths[0].replace('---1', ''), h > 0, 'site', 'plant')
      }

    }
    console.log('----------end gen rawdata' + moment().format('h:mm:ss a'))
    let zip = await archiveFiles(rawPath)
    console.log('----------end zip' + moment().format('h:mm:ss a'))
    await delDir(rawPath)
    return zip
  }

  static async MergeCsv(csvFilePaths, outputFilePath, isGenerate, header1, header2) {
    // console.log('csvFilePaths', csvFilePaths, 'outputFilePath', outputFilePath)
    const promises = csvFilePaths.map((path, index) => {
      return new Promise((resolve, reject) => {
        let fileStream = fs.createReadStream(path, { encoding: 'utf-8' })
        let writeOpt = {}
        let readOpt = {}
        readOpt.ignoreEmpty = true
        if (!isGenerate) {
          writeOpt.headers = true
          writeOpt.encoding = 'utf8'
          writeOpt.quote = '"'
          writeOpt.escape = '"'
          readOpt.header = true
        }else {
          writeOpt.headers = false
          writeOpt.encoding = 'utf8'
          writeOpt.quote = '"'
          writeOpt.escape = '"'
          // writeOpt.includeEndRowDelimiter = true
          readOpt.header = false
        }
        // console.log('writeOpt', writeOpt)
        let csvStream = csv.format(writeOpt)
        let writableStream = fs.createWriteStream(outputFilePath, { flags: 'a' })
        if (!isGenerate) writableStream.write('\ufeff')
        csvStream.pipe(writableStream)
        if(isGenerate) {
          //換行
          csvStream.write([])
        }
        csv.fromStream(fileStream, readOpt)
          .on('data', function (data) {
            if(writeOpt.headers) {
              csvStream.write(data)
            } else if(!writeOpt.header && data[0] != header1 && data[1] != header2) {
              csvStream.write(data)
            }
          })
          .on('end', function () {
            csvStream.end()

          })
          .on('error', (err) => {
            reject(new Error(err))
          })

        writableStream.on('finish', function () {
          csvStream = null
          fileStream = null
          writableStream = null
          global.gc()
          resolve(path)
        })
      })
    })
    return Promise.all(promises)
      .then((results) => {
        console.log('MergeCsv ', results)
        fs.unlink(results[0], function(){
          console.log(`delete ${results[0]}`)
        })
      })
      .catch((err) =>{
        console.log('MergeCsv ', err)
      })
  }

  static async genSummaryExcel(info) {
    console.log('----------start gen rawdata ' + moment().format('h:mm:ss a'))
    let ntdExchangeRates = await spendingModel.getCurrencys('USD', 'NTD', moment(info.dateTo).format('YYYYMMDD'))
    if (ntdExchangeRates.length == 0) throwApiError('USD to NTD exchange rate not found', errorCode.exchangeRateNotFound)
    let usdExchangeRates = await spendingModel.getCurrencys('all', 'USD', moment(info.dateTo).format('YYYYMMDD'))
    if (ntdExchangeRates.length == 0) throwApiError('all to USD exchange rate not found', errorCode.exchangeRateNotFound)
    let result = await reportModel.genSummary(info)
    let monthInfo =  _.uniq(_.map(result, 'month'))
    monthInfo = monthInfo.sort()
    let months = []
    for(let i = 0; i < monthInfo.length;i++) {
      months.push(moment(monthInfo[i]).format('YYMM'))
      delete monthInfo[i]
    }
    let allAmount = await genAllAmount(result, months, ntdExchangeRates, usdExchangeRates)
    let summary = await genSummary(result, months, ntdExchangeRates, usdExchangeRates)
    // let supplierInfo = await reportModel.genSupplier(info)
    let supplierInfo = processNtAmtAndMonth(result, ntdExchangeRates, usdExchangeRates)
    result = null
    global.gc()
    supplierInfo = _.groupBy(supplierInfo, 'odmoem')
    let supplierOem = genSupplier(supplierInfo['OEM'], months)
    let supplierOdm = genSupplier(supplierInfo['ODM'], months)
    let summaryRawInfos = await reportModel.getSummaryRawData(info)
    let rawData = genReportRawData(summaryRawInfos, ntdExchangeRates, usdExchangeRates)
    console.log('----------start gen excel ' + moment().format('h:mm:ss a'))
    let excel = await generateSummary(summary, supplierOdm, supplierOem, allAmount, rawData)
    console.log('----------end gen excel ' + moment().format('h:mm:ss a'))
    return excel
  }
}

async function genSummary(result, months, exchangeRates, usdExchangeRates) {
  let type = await genType(result, months, exchangeRates, usdExchangeRates)
  let genOdmOemProductInfo = processNtAmtAndMonth(result, exchangeRates, usdExchangeRates)
  let productDatas = _.groupBy(genOdmOemProductInfo, 'odmoem')
  let oemProduct = genOdmOemProduct('OEM', productDatas, months)
  let odmProduct = genOdmOemProduct('ODM', productDatas, months)

  // let genOdmOemProfitInfo = await reportModel.genOdmOemProfitCenter(info)
  let genOdmOemProfitInfo = processNtAmtAndMonth(result, exchangeRates, usdExchangeRates)

  let profitCenterDatas = _.groupBy(genOdmOemProfitInfo, 'odmoem')

  let oemProfitCenter = await genProfitCenter(profitCenterDatas['OEM'], months, 'OEM')
  let odmProfitCenter = await genProfitCenter(profitCenterDatas['ODM'], months, 'ODM')

  // let genSiteInfo = await reportModel.genSite(info)
  let genSiteInfo = processNtAmtAndMonth(result, exchangeRates, usdExchangeRates)
  let site = genSite(genSiteInfo, months)

  // let genBusinessTypeInfo = await reportModel.genBusinessType(info)
  let genBusinessTypeInfo = processNtAmtAndMonth(result, exchangeRates, usdExchangeRates)
  genBusinessTypeInfo = _.groupBy(genBusinessTypeInfo, 'odmoem')
  let oemBusinessType = genBusinessType(genBusinessTypeInfo, months, 'OEM')
  let odmBusinessType = genBusinessType(genBusinessTypeInfo, months, 'ODM')

  // let commodityInfo = await reportModel.genCommodity(info)
  let commodityInfo = processNtAmtAndMonth(result, exchangeRates, usdExchangeRates)
  let commodity = genCommodity(commodityInfo, months)

  return {
    'By Type':type,
    'By Product(ODM)':odmProduct,
    'By Product(OEM)':oemProduct,
    'By Profit Center(ODM)':odmProfitCenter,
    'By Profit Center(OEM)':oemProfitCenter,
    'By Site':site,
    'By Business Type(ODM)':odmBusinessType,
    'By Business Type(OEM)':oemBusinessType,
    'By Commodity':commodity,
  }
}
function genSupplier( odmOemInfos, months) {
  let typeInfos = _.groupBy(odmOemInfos, 'type1')
  let typeKeys = Object.keys(typeInfos)

  let title = ['Supplier']
  title.push(...months, 'Amt. (NTD)', '%')
  let totalIndex = title.length - 2
  let percentIndex = title.length - 1
  let response = {}
  let total = 0
  typeKeys.forEach((typeKey) => {
    response[typeKey] = []
    response[typeKey].push(title)
    let typeKeyResult = []
    let supplierInfos = _.groupBy(typeInfos[typeKey], 'vendor_base')
    let supplierKeys = Object.keys(supplierInfos)
    let summary = Array(title.length).fill(0)
    summary[0] = 'Total Amt.'
    supplierKeys.forEach((supplierKey) => {
      let infos = supplierInfos[supplierKey]
      let supplierSummary = Array(title.length).fill(0)
      supplierSummary[0] = supplierKey
      infos.map((info) => {
        let index = title.indexOf(info.month)
        supplierSummary = caculateAccount(index, totalIndex, info, supplierSummary)
        summary = caculateAccount(index, totalIndex, info, summary)
      })
      typeKeyResult.push(supplierSummary)
    })

    let percent = []
    _.map(typeKeyResult, (data, idx) =>{
      percent.push(fixMath.fixedPoint(fixMath.fixedPoint(data[totalIndex] / summary[totalIndex], 2) * 100, 0))
    })
    percent = fixMath.fixPercent(percent, 100)

    typeKeyResult.forEach((result, idx) => {
      result[percentIndex] = percent[idx] ? percent[idx] : 0
      summary[percentIndex] += result[percentIndex]
      result[percentIndex]  += '%'
    })
    summary[percentIndex] += '%'
    typeKeyResult.push(summary)
    response[typeKey].push(...typeKeyResult)
    total += summary[totalIndex]
  })
  response['total'] = [[total]]
  return response
}
function genCommodity(datas, months) {
  let groupByType = _.groupBy(datas, 'type1')
  let typeKeys = Object.keys(groupByType)
  let title = ['Type']
  title.push(...months, 'Total', '%')
  let totalIndex = title.length - 2
  let percentIndex = title.length - 1
  let response = {}
  typeKeys.forEach((typeKey) => {
    response[typeKey] = []
    let infos = groupByType[typeKey]
    response[typeKey].push(title)
    let groupOdmoems = _.groupBy(infos, 'odmoem')
    let oems = groupOdmoems['OEM']
    let odms = groupOdmoems['ODM']
    let summary = Array(title.length).fill(0)
    summary[0] = '總計'
    let odmSummary = Array(title.length).fill(0)
    odmSummary[0] = 'ODM'
    let oemSummary = Array(title.length).fill(0)
    oemSummary[0] = 'OEM'
    if(typeof oems == 'undefined') oems = []
    if(typeof odms == 'undefined') odms = []
    oems.forEach((oem) => {
      let index = title.indexOf(oem.month)
      oemSummary = caculateAccount(index, totalIndex, oem, oemSummary)
      summary = caculateAccount(index, totalIndex, oem, summary)
    })
    odms.forEach((odm) => {
      let index = title.indexOf(odm.month)
      odmSummary = caculateAccount(index, totalIndex, odm, odmSummary)
      summary = caculateAccount(index, totalIndex, odm, summary)
    })

    let percent = []
    percent.push(fixMath.fixedPoint(fixMath.fixedPoint(odmSummary[totalIndex] / summary[totalIndex], 2) * 100, 0))
    percent.push(fixMath.fixedPoint(fixMath.fixedPoint(oemSummary[totalIndex] / summary[totalIndex], 2) * 100, 0))
    percent = fixMath.fixPercent(percent, 100)

    odmSummary[percentIndex] =  percent[0] ? percent[0] : 0
    oemSummary[percentIndex] =   percent[1] ? percent[1] : 0
    summary[percentIndex] = odmSummary[percentIndex] + oemSummary[percentIndex]
    odmSummary[percentIndex] += '%'
    oemSummary[percentIndex] += '%'
    summary[percentIndex] += '%'
    response[typeKey].push(odmSummary, oemSummary, summary)
  })
  return response
}
function genBusinessType(datas, months, oemodmType) {
  let businessInfo = datas[oemodmType]
  let title = [`kind-${oemodmType}`]
  title.push(...months, 'Total', 'percent')
  let productInfos = _.groupBy(businessInfo, 'product_name')
  let productKeys = Object.keys(productInfos)
  let response = {}
  productKeys.forEach((productKey) => {
    response[productKey] = [title]
    let summary = Array(title.length + 1).fill(0)
    summary[0] = productKey
    summary[1] = '總計'
    let typeInfos = _.groupBy(productInfos[productKey], 'type1')
    let typeKeys = Object.keys(typeInfos)
    let typeResult = []
    let percentIndex = summary.length - 1
    let totalIndex = summary.length - 2
    typeKeys.forEach((typeKey) => {
      let tmp = Array(title.length + 1).fill(0)
      tmp[0] = productKey
      tmp[1] = typeKey
      let typeKeyDetails = typeInfos[typeKey]
      typeKeyDetails.map((info) => {
        let index = title.indexOf(info.month) + 1
        tmp = caculateAccount(index, totalIndex, info, tmp)
        summary = caculateAccount(index, totalIndex, info, summary)
      })
      typeResult.push(tmp)
    })

    let percent = []
    _.map(typeResult, (data, idx) =>{
      percent.push(fixMath.fixedPoint(fixMath.fixedPoint(data[totalIndex] / summary[totalIndex], 2) * 100, 0))
    })
    percent = fixMath.fixPercent(percent, 100)
    // sum
    typeResult.forEach((data, idx) => {
      data[percentIndex] = percent[idx] ? percent[idx] : 0
      summary[percentIndex] += data[percentIndex]
      data[percentIndex] += '%'
    })
    summary[percentIndex] += '%'
    response[productKey].push(...typeResult, summary)
  })
  return response
}
function caculateAccount(index, totalIndex, obj, output) {
  output[index] += obj.NT_Amt
  output[totalIndex] += obj.NT_Amt
  return output
}
function genSite(datas, months) {
  let groupByResult = _.groupBy(datas, 'site')
  let siteKeys = Object.keys(groupByResult)
  let title = ['Site']
  title.push(...months, 'Total', '%')
  const totalIndex = title.length - 2
  const percentIndex = title.length - 1
  let response = []
  response.push(title)
  siteKeys.forEach((key) => {
    groupByResult[key] = _.groupBy(groupByResult[key], 'odmoem')
  })
  siteKeys.forEach((key) => {
    let odms = groupByResult[key].ODM
    let oems = groupByResult[key].OEM
    let odmSummary = Array(title.length + 1).fill(0)
    odmSummary[0] = key
    odmSummary[1] = 'ODM'
    let oemSummary = Array(title.length + 1).fill(0)
    oemSummary[0] = key
    oemSummary[1] = 'OEM'
    let summary =  Array(title.length).fill(0)
    summary[0] = '總計'
    let oemodmtotalIndex = oemSummary.length - 2
    let oemodmPercentIndex = oemSummary.length - 1
    if(typeof odms == 'undefined') odms = []
    if(typeof oems == 'undefined') oems = []
    oems.forEach((oem) => {
      let index = title.indexOf(oem.month) + 1
      oemSummary = caculateAccount(index, oemodmtotalIndex, oem, oemSummary)
      summary = caculateAccount(index - 1, totalIndex, oem, summary)
    })

    odms.forEach((odm) => {
      let index = title.indexOf(odm.month) + 1
      odmSummary = caculateAccount(index, oemodmtotalIndex, odm, odmSummary)
      summary = caculateAccount(index - 1, totalIndex, odm, summary)
    })

    let percent = []
    percent.push(fixMath.fixedPoint(fixMath.fixedPoint(oemSummary[oemodmtotalIndex] / summary[totalIndex], 2) * 100, 0))
    percent.push(fixMath.fixedPoint(fixMath.fixedPoint(odmSummary[oemodmtotalIndex] / summary[totalIndex], 2) * 100, 0))
    percent = fixMath.fixPercent(percent, 100)

    oemSummary[oemodmPercentIndex] = percent[0] ? percent[0] : 0
    odmSummary[oemodmPercentIndex] = percent[1] ? percent[1] : 0
    summary[percentIndex] =  oemSummary[oemodmPercentIndex] + odmSummary[oemodmPercentIndex]
    oemSummary[oemodmPercentIndex] += '%'
    odmSummary[oemodmPercentIndex] += '%'
    summary[percentIndex] += '%'
    response.push(odmSummary, oemSummary, summary)
  })
  return response
}
async function genProfitCenter(datas, months, odmoemType) {
  let response = []
  let title = ['BU']
  title.push(...months, 'Total', '%')
  const totalIndex = title.length - 2
  const percentIndex = title.length - 1
  response.push(title)
  let summary = Array(title.length).fill(0)
  summary[0] = '總計'
  let groupByProfitResult = _.groupBy(datas, 'profit_center')
  let profitCenterKeys = Object.keys(groupByProfitResult)
  await Promise.all( profitCenterKeys.map(async(key) => {
    let info = groupByProfitResult[key]
    let tmp = Array(title.length).fill(0)
    let productName = await reportModel.getProductName(key)
    let isTypeEquals = false
    info.map((x) => {
      if(x.odmoem == odmoemType) {
        tmp[0] = key + '_' + productName
        let index = title.indexOf(x.month)
        tmp = caculateAccount(index, totalIndex, x, tmp)
        summary = caculateAccount(index, totalIndex, x, summary)
        isTypeEquals = true
      }
    })
    if(isTypeEquals) response.push(tmp)
  }
  )
  )

  let percent = []
  _.map(response, (v, idx) => {
    if(idx > 0){
      percent.push(fixMath.fixedPoint(fixMath.fixedPoint(v[totalIndex] / summary[totalIndex], 2) * 100, 0))
    }
  })
  percent = fixMath.fixPercent(percent, 100)

  for (let i = 1; i < response.length; i++){
    let record = response[i]
    record[percentIndex] =  percent[i - 1] ? percent[i - 1] : 0
    summary[percentIndex] += record[percentIndex]
    if(isNaN(summary[percentIndex])) {
      summary[percentIndex] = 0
    }
    if(isNaN(record[percentIndex])) record[percentIndex] = 0
    record[percentIndex] += '%'
  }

  summary[percentIndex] += '%'
  response.push(summary)
  return response
}

function genOdmOemProduct(type, datas, months) {
  let groupByProduct = _.groupBy(datas[type], 'product_name')
  let title = ['Product']
  title.push(...months, 'Total', '%')
  let totalIndex = title.length - 2
  let percentIndex = title.length - 1
  let productKeys = Object.keys(groupByProduct)
  let response = []
  response.push(title)
  let summary = Array(title.length).fill(0)
  summary[0] = '總計'
  productKeys.forEach((key) => {
    let tmp = Array(title.length).fill(0)
    tmp[0] = key
    let info = groupByProduct[key]
    info.map((x) => {
      let index = title.indexOf(x.month)
      tmp = caculateAccount(index, totalIndex, x, tmp)
      summary = caculateAccount(index, totalIndex, x, summary)
    })
    response.push(tmp)
  })

  let percent = []
  _.map(response, (v, idx) => {
    if(idx > 0){
      percent.push(fixMath.fixedPoint(fixMath.fixedPoint(v[totalIndex] / summary[totalIndex], 2) * 100, 0))
    }
  })

  percent = fixMath.fixPercent(percent, 100)
  // i=1 ,beacause first is title
  for(let i = 1; i < response.length; i++){
    let record = response[i]
    record[percentIndex] = percent[i - 1] ? percent[i - 1] : 0
    summary[percentIndex] += record[percentIndex]
    record[percentIndex] += '%'
  }
  summary[percentIndex] += '%'
  response.push(summary)
  return response
}
async function genType(result, months, ntdExchangeRates, currencyToUsdExchangeRates){
  let typeInfo = _.cloneDeep(result)
  let usdExchangeRates = null
  let findCurrenecy = false
  typeInfo.map((x) => {
    if ( x.currency == 'USD') {
      usdExchangeRates = 1
    } else {
      for(let j = 0 ; j < currencyToUsdExchangeRates.length ;j++ ) {
        if(currencyToUsdExchangeRates[j].from_currency == x.currency ) {
          usdExchangeRates = currencyToUsdExchangeRates[j].exange_rate
          findCurrenecy = true
          break
        }
      }
      if(!findCurrenecy) {
        throwApiError(`${x.currency} to USD exchange rate not found`, errorCode.exchangeRateNotFound)
      }
    }
    x.exrate_nt = getNtdExchangeRate(ntdExchangeRates, x.month)
    x.month = moment(x.month).format('YYMM')
    x.NT_Amt = fixMath.fixedPoint(fixMath.fixedPoint(usdExchangeRates * x.usd_amount, 6) * x.exrate_nt, 0)
  })
  let datas = _.groupBy(typeInfo, 'odmoem')
  let title = ['Type']
  title.push(...months, 'Total', '%')
  let totalIndex = title.length - 2
  let percentIndex = title.length - 1
  let oems = datas['OEM']
  let odms = datas['ODM']
  let oemSummary = Array(title.length).fill(0)
  oemSummary[0] = 'OEM'
  let odmSummary = Array(title.length).fill(0)
  odmSummary[0] = 'ODM'
  let summary = Array(title.length).fill(0)
  summary[0] = '總計'
  if(typeof oems == 'undefined') oems = []
  if(typeof odms == 'undefined') odms = []
  oems.forEach((oem) => {
    let index = title.indexOf(oem.month)
    oemSummary = caculateAccount(index, totalIndex, oem, oemSummary)
    summary = caculateAccount(index, totalIndex, oem, summary)
  })

  odms.forEach((odm) => {
    let index = title.indexOf(odm.month)
    odmSummary = caculateAccount(index, totalIndex, odm, odmSummary)
    summary = caculateAccount(index, totalIndex, odm, summary)
  })

  let percent = []
  percent.push(fixMath.fixedPoint(fixMath.fixedPoint(oemSummary[totalIndex] / summary[totalIndex], 2) * 100, 0))
  percent.push(fixMath.fixedPoint(fixMath.fixedPoint(odmSummary[totalIndex] / summary[totalIndex], 2) * 100, 0))
  percent = fixMath.fixPercent(percent, 100)
  oemSummary[percentIndex] =  percent[0] ? percent[0] : 0
  odmSummary[percentIndex] =  percent[1] ? percent[1] : 0
  summary[percentIndex] =  oemSummary[percentIndex] + odmSummary[percentIndex]
  oemSummary[percentIndex] += '%'
  odmSummary[percentIndex] += '%'
  summary[percentIndex] += '%'
  return [
    title,
    odmSummary,
    oemSummary,
    summary,
  ]
}


function convertObjToArr(datas, isNeedKey) {
  let keys =  Object.keys(datas[0])
  let result = []
  if(isNeedKey) result.push(keys)
  datas.map((data) => {
    let tmp = []
    keys.map((key) => {
      tmp.push(data[`${key}`])
    })
    result.push(tmp)
  })
  return result
}

async function genAllAmount(result, months, ntdExchangeRates, currencyToUsdExchangeRates) {
  let datas = _.cloneDeep(result)
  let amountInfo = []
  let summary = {}
  let findCurrenecy = false
  months.map((month) => {
    summary[`'${month}'`] = 0
  })
  summary['\'total\''] = 0
  let usdExchangeRates = null
  datas.map((x) => {
    if ( x.currency == 'USD') {
      usdExchangeRates = 1
    } else {
      for(let j = 0 ; j < currencyToUsdExchangeRates.length ;j++ ) {
        if(currencyToUsdExchangeRates[j].from_currency == x.currency ) {
          usdExchangeRates = currencyToUsdExchangeRates[j].exange_rate
          findCurrenecy = true
          break
        }
      }
      if(!findCurrenecy) {
        throwApiError(`${x.currency} to USD exchange rate not found`, errorCode.exchangeRateNotFound)
      }
    }

    x.exrate_nt = getNtdExchangeRate(ntdExchangeRates, x.month)
    x.month = moment(x.month).format('YYMM')
    x.NT_Amt = fixMath.fixedPoint(fixMath.fixedPoint(x.usd_amount * usdExchangeRates, 6) * x.exrate_nt, 0)
    let template  = {}
    template['\'Vendor\''] = x.short_name
    template['\'Brand\''] = x.brand
    template['\'Plant\''] = x.plant
    template['\'Site\''] = x.site
    template['\'Type\''] = x.odmoem
    template['\'Comm\''] = x.type1
    template['\'Comm2\''] = x.type2
    let index = _.findIndex(amountInfo, template)
    if(index == -1) {
      let tmp = {}
      tmp['\'Vendor\''] = x.short_name
      tmp['\'Brand\''] = x.brand
      tmp['\'Plant\''] = x.plant
      tmp['\'Site\''] = x.site
      tmp['\'Type\''] = x.odmoem
      tmp['\'Comm\''] = x.type1
      tmp['\'Comm2\''] = x.type2
      months.map((month) => {
        tmp[`'${month}'`] = 0
      })
      tmp['\'total\''] = x.NT_Amt
      tmp[`'${x.month}'`] += x.NT_Amt
      amountInfo.push(tmp)
      summary[`'${x.month}'`] += x.NT_Amt
      summary['\'total\''] +=  x.NT_Amt
    } else {
      let tmp  = amountInfo[index]
      tmp[`'${x.month}'`] += x.NT_Amt
      tmp['\'total\''] += x.NT_Amt
      summary[`'${x.month}'`] += x.NT_Amt
      summary['\'total\''] +=  x.NT_Amt
      amountInfo[index] = tmp
    }
  })
  amountInfo = _.sortBy(amountInfo, 'vendor')
  let arrOfAmountInfo = convertObjToArr(amountInfo, true)
  if(arrOfAmountInfo.length > 0) {
    let headers = arrOfAmountInfo[0]
    headers[headers.length - 1] = '總計'
    arrOfAmountInfo[0] = headers
  }
  let arrOfSummary = convertObjToArr([summary], true)
  return [
    ...arrOfAmountInfo,
    ...arrOfSummary,
  ]
}
function genReportRawData(datas, exchangeRates, currencyToUsdExchangeRates) {
  let keys = ['Vendor Code', 'Vendor Group', 'Vendor Base', 'Brand', 'Plant', 'Site', 'type1', 'type2', 'supply type', 'odmoem', 'Month', 'Profit Center', 'product', 'BU2_Description', 'GR_Qty', '合計(NTD)']
  let rawDataArr = []
  rawDataArr.push(keys)
  let usdExchangeRates = null
  let findCurrenecy = false
  datas.map((data) => {
    let exrate_nt = 0
    if ( data.currency == 'USD') {
      usdExchangeRates = 1
    } else {
      for(let j = 0 ; j < currencyToUsdExchangeRates.length ;j++ ) {
        if(currencyToUsdExchangeRates[j].from_currency == data.currency ) {
          usdExchangeRates = currencyToUsdExchangeRates[j].exange_rate
          findCurrenecy = true
          break
        }
      }
      if(!findCurrenecy) {
        throwApiError(`${data.currency} to USD exchange rate not found`, errorCode.exchangeRateNotFound)
      }
    }
    exrate_nt = getNtdExchangeRate(exchangeRates, data.month)
    let tmp = []
    data.NT_Amt = fixMath.fixedPoint(fixMath.fixedPoint(data.usdamount * usdExchangeRates, 6) * exrate_nt, 0)
    tmp.push(data.vendorcode, data.vendor_group, data.vendor_base, data.brand, data.plant, data.site, data.type1, data.type2, data.supply_type, data.odmoem, data.month, data.profit_center, data.product_name, data.bu2_description, data.gr_qty, data.NT_Amt)
    rawDataArr.push(tmp)
  })
  return rawDataArr
}
function convertRawData(data) {
  let keys = Object.keys(data[0])
  let rawDataArr = []
  let tmp = []
  rawDataArr.push(keys)
  for (let i = 0 ; i < data.length; i++) {
    tmp = []
    tmp.push(data[i].site)
    tmp.push(data[i].plant)
    tmp.push(data[i].vendor)
    tmp.push(data[i].vendor_group)
    tmp.push(data[i].short_name)
    tmp.push(data[i].vendor_name)
    tmp.push(data[i].material)
    tmp.push(data[i].meterial_description)
    tmp.push(data[i].currency)
    tmp.push(data[i].po_price)
    tmp.push(data[i].gr_qty)
    tmp.push(data[i].gr_date)
    tmp.push(data[i].month)
    tmp.push(data[i].buyer)
    tmp.push(data[i].buyer_name)
    tmp.push(data[i].sourcer)
    tmp.push(data[i].sourcer_name)
    tmp.push(data[i].po_no)
    tmp.push(data[i].profit_center)
    tmp.push(data[i].brand)
    tmp.push(data[i].exrate)
    tmp.push(data[i].exrate_nt)
    tmp.push(data[i].usd_amount)
    tmp.push(data[i].NT_Amt)
    tmp.push(data[i].vendor_base)
    tmp.push(data[i].product)
    tmp.push(data[i].Customer)
    tmp.push(data[i].type1)
    tmp.push(data[i].type2)
    tmp.push(data[i].odmoem)
    tmp.push(data[i].supply_type)
    rawDataArr.push(tmp)
  }
  keys = null
  tmp = null
  global.gc()
  return  rawDataArr
}
async function genRawData(info) {
  let { type2 } = info
  let typetwo = []
  if (type2) {
    for (let i = 0; i < type2.length; i++) {
      if (type2[i] != null) {
        typetwo.push(type2[i])
      }
    }
  }

  info.type2 = typetwo
  let datas = await reportModel.getSpendingBase(info)
  if(datas.length == 0 ) throw 'data not found'
  let ntdExchangeRates = await spendingModel.getCurrencys('USD', 'NTD', moment(info.dateTo).format('YYYYMMDD'))
  if (ntdExchangeRates.length == 0) throwApiError('USD to NTD exchange rate not found', errorCode.exchangeRateNotFound)
  let currencyToUsdExchangeRates = await spendingModel.getCurrencys('all', 'USD', moment(info.dateTo).format('YYYYMMDD'))
  if (currencyToUsdExchangeRates.length == 0) throwApiError('USD to NTD exchange rate not found', errorCode.exchangeRateNotFound)
  let result = []
  let tmp = {}
  let findCurrenecy = false
  let usdExchangeRates
  for (let i = 0 ;i < datas.length ; i++) {
    if(ignoreVcode.indexOf(datas[i].vendorcode) > -1 || datas[i].vendorcode.includes('Cs') || datas[i].brand == 'wistron') {
      continue
    }
    datas[i].vendorGroup = datas[i].vendor_group || 'null'
    datas[i].shortName = datas[i].short_name || 'null'
    datas[i].vendorName = datas[i].vendor_name || 'null'
    datas[i].vendorBase = datas[i].vendor_base || 'null'
    datas[i].po_price = _.round(parseFloat(datas[i].po_price), 2)
    let tmpDate = datas[i].date
    let recordDay = moment(datas[i].date).format('YYYYMMDD')
    datas[i].date =  moment(datas[i].date).format('YYYY/MM/DD')
    datas[i].month =  moment(tmpDate).format('YYMM')
    datas[i].buyerName = datas[i].sourcername
    datas[i].sourcerName = datas[i].buyername
    datas[i].exrate = 1
    for(let j = 0 ;j < ntdExchangeRates.length;j++) {
      if (ntdExchangeRates[j].date <= recordDay) {
        datas[i].exrate_nt = ntdExchangeRates[j].exange_rate
        break
      }
    }
    if ( datas[i].currency == 'USD') {
      usdExchangeRates = 1
    } else {
      for(let j = 0 ; j < currencyToUsdExchangeRates.length ;j++ ) {
        if(currencyToUsdExchangeRates[j].from_currency == datas[i].currency ) {
          usdExchangeRates = currencyToUsdExchangeRates[j].exange_rate
          findCurrenecy = true
          break
        }
      }
      if(!findCurrenecy) {
        throwApiError(`${datas[i].currency} to USD exchange rate not found`, errorCode.exchangeRateNotFound)
      }
    }
    datas[i].usdAmount = fixMath.fixedPoint( datas[i].usd_amount * usdExchangeRates, 6)
    datas[i].ntAmount = fixMath.fixedPoint(datas[i].usdAmount * parseFloat(datas[i].exrate_nt), 0)
    datas[i].product = datas[i].product_name
    datas[i].customer = datas[i].bu2_description
    datas[i].ODMOEM = datas[i].odmoem
    tmp  = {
      site: datas[i].site,
      plant: datas[i].plant,
      vendor: ` ${datas[i].vendorcode}`,
      vendor_group: datas[i].vendorGroup,
      short_name: datas[i].shortName,
      vendor_name: datas[i].vendorName,
      material: datas[i].materialnumber,
      meterial_description: datas[i].material_desc,
      currency: datas[i].currency,
      po_price: datas[i].po_price,
      gr_qty: parseInt(datas[i].quantity),
      gr_date: datas[i].date,
      month: datas[i].month,
      buyer: datas[i].buyer,
      buyer_name: datas[i].buyerName,
      sourcer:datas[i].sourcer,
      sourcer_name: datas[i].sourcerName,
      po_no: datas[i].po_no,
      profit_center: datas[i].profit_center,
      brand: datas[i].brand,
      exrate: datas[i].exrate,
      exrate_nt: datas[i].exrate_nt,
      usd_amount: datas[i].usdAmount,
      NT_Amt: datas[i].ntAmount,
      vendor_base: datas[i].vendorBase,
      product: datas[i].product,
      Customer: datas[i].customer,
      type1: datas[i].type1,
      type2: datas[i].type2,
      odmoem: datas[i].ODMOEM,
      supply_type: datas[i].supply_type,
    }
    delete datas[i]
    result.push(tmp)
  }

  datas = null
  ntdExchangeRates = null
  currencyToUsdExchangeRates = null
  tmp = null
  typetwo = null
  global.gc()
  return result
}
async function generateExcel(data, givenPath, time) {

  // const initSpendingPath = path.resolve(__dirname, '../../utils/excel')
  const initSpendingPath = !givenPath ? path.resolve(__dirname, '../../utils/excel') : givenPath
  const spendingFileDate = moment(new Date()).format('YYYYMMDD')
  const filePath = initSpendingPath + `/Spending_raw_${spendingFileDate}-${time}.csv`
  data[0][0] = '\ufeff' + data[0][0]
  console.log(filePath, ':', data.length)
  return new Promise(function (resolve) {
    let ws = fs.createWriteStream(filePath)
    const conf = { headers: true, quote: '"', escape: '"', encoding: 'utf8', includeEndRowDelimiter:true }
    csv.writeToStream(ws, data, conf)
    ws.on('finish', function (err) {
      data = null
      global.gc()
      resolve(ws, err)
    })
  })
}


async function archiveFiles(filesPath) {
  const initSpendingPath = path.resolve(__dirname, '../../utils/excel')
  const rootPath = path.resolve(__dirname, '../../')
  return new Promise(function (resolve) {
    // create a file to stream archive data to.
    const spendingFileDate = moment(new Date()).format('YYYYMMDD')
    const fpath = initSpendingPath + `/Spending_raw_${spendingFileDate}.zip`
    let output = fs.createWriteStream(fpath)
    let archive = archiver('zip', {
      zlib: { level: 9 }, // Sets the compression level.
    })
    output.on('close', function() {
      console.log(archive.pointer() + ' total bytes')
      console.log('archiver has been finalized and the output file descriptor has closed.')
      resolve(fpath.replace(rootPath, ''))
    })
    // pipe archive data to the file
    archive.pipe(output)
    // append a file 增加單檔
    // archive.file(file.path, { name: file.path.replace(initSpendingPath + '/', '') })


    // append files from a sub-directory, putting its contents at the root of archive 壓縮整個目錄
    archive.directory(filesPath, false)

    archive.finalize()

    // good practice to catch warnings (ie stat failures and other non-blocking errors)
    archive.on('warning', function(err) {
      if (err.code === 'ENOENT') {
        // log warning
      } else {
        // throw error
        throw err
      }
    })

    // good practice to catch this error explicitly
    archive.on('error', function(err) {
      throw err
    })

  })
}

async function generateSummary(summaryData, odmData, oemData, allmountData, rawdata) {
  const initSummaryPath = path.resolve(__dirname, '../../utils/excel')
  const summaryFileDate = moment(new Date()).format('YYYYMMDD')

  if(summaryData != null) {
    await Xlsxpopulate.fromBlankAsync()
      .then(workbook => {
        const summary = workbook.sheet(0).name('Summary-New')
        const ODM = workbook.addSheet('By Supplier(ODM)', 1)
        const OEM = workbook.addSheet('By Supplier(OEM)', 2)
        const allMount = workbook.addSheet('All-Amount', 3)
        const rawData = workbook.addSheet('Raw data', 4)

        // gen summary sheet
        genSummarySheet(summary, summaryData)
        // gen odm sheet
        genODMSheet(ODM, odmData)
        // gen oem sheet
        genOEMSheet(OEM, oemData)
        // gen all-amount sheet
        genAllAmountSheet(allMount, allmountData)
        // gen Raw-data sheet
        genRawDataSheet(rawData, rawdata)
        // gen summary excel
        return workbook.toFileAsync(initSummaryPath + `/Spending_sum_${summaryFileDate}.xlsx`)
      })
  }else {
    return false
  }
}
function bottomBorder(value, tmp, sheet) {
  value[value.length - 1].map(( i, index) => {
    let style = { fontFamily: 'arial', horizontalAlignment:'center', bold: true, fill:'d9d9d9', border: { top: 'double', bottom: 'medium', left: 'thin', right: 'thin' } }
    let reg = /^[\d|\.|]*$/
    let regPercent = /[*%]/
    if(reg.test(i)) style = { fontFamily: 'arial', horizontalAlignment:'center', bold: true, fill:'d9d9d9', border: { top: 'double', bottom: 'medium', left: 'thin', right: 'thin' }, numberFormat: '_-* #,##0_-;-* #,##0_-;_-* "-"??_-;_-@_-' }
    if(regPercent.test(i)) {
      i = Number(i.replace(regPercent, '')) * 0.01
      style = { fontFamily: 'arial', horizontalAlignment:'center', bold: true, fill:'d9d9d9', border: { top: 'double', bottom: 'medium', left: 'thin', right: 'thin' }, numberFormat: '0%' }
    }
    if(index == 0) {
      style.border.left = 'medium'
      sheet.row(tmp + value.length + 1).cell(index + 1).value(i).style(style)
    } else if(index == value[value.length - 1].length - 1) {
      style.border.right = 'medium'
      sheet.row(tmp + value.length + 1).cell(index + 1).value(i).style(style).style({ fill: 'ffd966' })
    } else if(index == value[value.length - 1].length - 2) {
      sheet.row(tmp + value.length + 1).cell(index + 1).value(i).style(style).style({ fill: 'ffd966' })
    } else {
      sheet.row(tmp + value.length + 1).cell(index + 1).value(i).style(style)
    }
  })

}
function dataBorder(value, tmp, sheet, num) {
  let tmpValue = 0
  value.map(( i, id) => {
    i.map(( r, rid) => {
      let style = { border: { top: 'thin', bottom: 'thin', left: 'thin', right: 'thin' }, fontFamily: 'arial', horizontalAlignment: 'center' }
      let reg = /^[\d|\.|]*$/
      let regPercent = /[*%]/
      if(reg.test(r)) style = { border: { top: 'thin', bottom: 'thin', left: 'thin', right: 'thin' }, fontFamily: 'arial', horizontalAlignment: 'center', numberFormat: '_-* #,##0_-;-* #,##0_-;_-* "-"??_-;_-@_-' }
      if(regPercent.test(r)) {
        r = Number(r.replace(regPercent, '')) * 0.01
        style = { border: { top: 'thin', bottom: 'thin', left: 'thin', right: 'thin' }, fontFamily: 'arial', horizontalAlignment: 'center', numberFormat: '0%' }
      }
      if(rid == 0) {
        style.border.left = 'medium'
        sheet.row(tmp + num + tmpValue).cell(rid + 1).value(r).style(style)
      } else if(rid == value[id].length - 1) {
        style.border.right = 'medium'
        sheet.row(tmp + num + tmpValue).cell(rid + 1).value(r).style(style).style({ fill: 'ffff9f' })
      } else if(rid == value[id].length - 2) {
        sheet.row(tmp + num + tmpValue).cell(rid + 1).value(r).style(style).style({ fill: 'ffff9f' })
      } else {
        sheet.row(tmp + num + tmpValue).cell(rid + 1).value(r).style(style)
      }
    })
    tmpValue += 1
  })
}
function processNtAmtAndMonth(result, exchangeRates, currencyToUsdExchangeRates) {
  let info = _.cloneDeep(result)
  let usdExchangeRates = null
  let findCurrenecy = false
  info.map((x) => {
    if ( x.currency == 'USD') {
      usdExchangeRates = 1
    } else {
      for(let j = 0 ; j < currencyToUsdExchangeRates.length ;j++ ) {
        if(currencyToUsdExchangeRates[j].from_currency == x.currency ) {
          usdExchangeRates = currencyToUsdExchangeRates[j].exange_rate
          findCurrenecy = true
          break
        }
      }
      if(!findCurrenecy) {
        throwApiError(`${x.currency} to USD exchange rate not found`, errorCode.exchangeRateNotFound)
      }
    }

    x.exrate_nt = getNtdExchangeRate(exchangeRates, x.month)
    x.month = moment(x.month).format('YYMM')
    x.NT_Amt = fixMath.fixedPoint(fixMath.fixedPoint(usdExchangeRates * x.usd_amount, 6) * x.exrate_nt, 0)
  })
  return  info
}
function genSummarySheet(summary, summaryData) {
  summary.cell('A1').value('Y2018 MH1000 NB Spending Currency:NTD').style({ fontSize:20, bold:true, wrapText: false, fontFamily: 'arial' })
  summary.column('A').width(30).hidden(false)
  summary.column('B').width(15).hidden(false)
  let style = { fill:'f4b084', fontFamily: 'arial', fontColor:'ffffff', horizontalAlignment:'center', bold: true }
  let headerBorder = { border: { top: 'medium', left: 'thin' } }
  let headerBorderFirst = { border: { top: 'medium', left: 'medium' } }
  let headerBorderLast = { border: { top: 'medium', right: 'medium', left: 'thin' } }
  let tmp = 4
  for(let i = 0; i < Object.keys(summaryData).length; i++) {
    const summaryKey = Object.keys(summaryData)[i]
    const summaryValue = summaryData[summaryKey]
    if(Array.isArray(summaryValue)) {
      summary.cell(`A${tmp}`).value(`${i + 1}. ` + summaryKey + ':').style({ bold: true, fontFamily: 'arial' })
      if(summaryValue[0].length < summaryValue[1].length) {
        summary.range(`A${tmp + 1}:B${tmp + 1}`).merged(true)
        summaryValue[0].splice(1, 0, '')
        if(summaryValue[summaryValue.length - 1].length < summaryValue[summaryValue.length - 2].length) {
          summaryValue.forEach((value, index) => {
            if(index % 3 == 0 && index > 0) {
              summaryValue[index].splice(0, 0, '')
            }
          })
        }
      }
      
      switch(summaryKey) {
        case 'By Product(ODM)':
          style.fill = 'cc9900'
          break
        case 'By Product(OEM)':
          style.fill = '336600'
          break
        case 'By Profit Center(ODM)':
          style.fill = '008080'
          break
        case 'By Site':
          style.fill = '9ed561'
          break
        default:
          style.fill = 'f4b084'
          break
      }
      summary.cell(`A${tmp + 1}`).value([summaryValue[0]]).style(style).style(headerBorder)
        .cell(0, 0).style(headerBorderFirst)  // The first cell of header (Top-left)
        .relativeCell(0, summaryValue[0].length - 1).style(headerBorderLast)
        
      summaryValue.shift()
      if(summaryValue.length != 1) {
        bottomBorder(summaryValue, tmp, summary)
        summaryValue.pop()
        dataBorder(summaryValue, tmp, summary, 2)
      } else {
        bottomBorder(summaryValue, tmp, summary)
      }
      tmp += summaryValue.length + 4
    } else {
      summary.cell(`A${tmp + 2}`).value(`${i + 1}. ` + Object.keys(summaryData)[i] + ':').style({ bold: true, fontFamily: 'arial' })
      for(let j = 0 ;j < Object.keys(summaryValue).length; j++) {
        summary.cell(`A${tmp + 3}`).value(Object.keys(summaryValue)[j]).style({ bold: true, fontFamily: 'arial' })
        if(summaryValue[Object.keys(summaryValue)[j]][0].length < summaryValue[Object.keys(summaryValue)[j]][1].length) {
          summary.range(`A${tmp + 4}:B${tmp + 4}`).merged(true)
          summaryValue[Object.keys(summaryValue)[j]][0].splice(1, 0, '')
        }
        summary.cell(`A${tmp + 4}`).value([summaryValue[Object.keys(summaryValue)[j]][0]]).style(style).style(headerBorder)
          .cell(0, 0).style(headerBorderFirst)
          .relativeCell(0, summaryValue[Object.keys(summaryValue)[j]][0].length - 1).style(headerBorderLast)
        summaryValue[Object.keys(summaryValue)[j]].shift()

        if(summaryValue[Object.keys(summaryValue)[j]].length != 1) {
          bottomBorder(summaryValue[Object.keys(summaryValue)[j]], tmp + 3, summary)
          summaryValue[Object.keys(summaryValue)[j]].pop()
          dataBorder(summaryValue[Object.keys(summaryValue)[j]], tmp, summary, 5)
        } else {
          bottomBorder(summaryValue[Object.keys(summaryValue)[j]], tmp + 3, summary)
        }
        tmp += summaryValue[Object.keys(summaryValue)[j]].length + 5
      }
    }
  }

}
function genODMSheet(ODM, odmData) {
  ODM.cell('A1').value([['By Supplier(ODM)']]).style({ fontSize:20, bold:true, fontFamily: 'arial' })
  ODM.cell('A2').value([['Currency:NTD']]).style({ fontFamily: 'arial' })
  ODM.column('A').width(25).hidden(false)
  let odmTmp = 4
  let odmTotalCount = odmData[Object.keys(odmData)[0]][0].length
  for(let i = 0; i < Object.keys(odmData).length; i++) {
    const odmKey = Object.keys(odmData)[i]
    const odmValue = odmData[odmKey]
    if(Array.isArray(odmValue)) {
      ODM.cell(`A${odmTmp}`).value(odmKey).style({ bold: true, fill:'ffc000', fontFamily: 'arial' })
      if(odmKey == 'total') {
        ODM.row(odmTmp).cell(odmTotalCount - 1).value(odmValue).style({ fontFamily: 'arial', bold: true, fontColor: 'ff0000', numberFormat: '_-* #,##0_-;-* #,##0_-;_-* "-"??_-;_-@_-' })
      } else {
        if(odmValue.length != 1) {
          odmValue[0].map(( value, index) => {
            if(value == 'Supplier' || value == 'Amt. (NTD)' || value == '%') {
              ODM.row(odmTmp + 1).cell(index + 1).value(`${value}`).style({ border: 'thin', fontColor: 'ffffff', bold: true, fontFamily: 'arial', fill: '008080' })
            } else {
              ODM.row(odmTmp + 1).cell(index + 1).value(`${value}`).style({ border: 'thin', fontColor: 'ffffff', bold: true, fontFamily: 'arial', fill: '92d050' })
            }
            if(value.length > 8) {
              ODM.column(index + 1).width(15).hidden(false)
            }
          })
          odmValue.shift()
          odmValue.forEach((value, index) => {
            value.map((r, rid) => {
              let reg = /^[\d|\.|]*$/
              let regPercent = /[*%]/
              if(index == odmValue.length - 1) {
                if (reg.test(r)) {
                  style = { fontFamily: 'arial', numberFormat: '_-* #,##0_-;-* #,##0_-;_-* "-"??_-;_-@_-' }
                } else {
                  style = { fontFamily: 'arial' }
                }
                if(regPercent.test(r)) {
                  r = Number(r.replace(regPercent, '')) * 0.01
                  style = { fontFamily: 'arial', numberFormat: '0%' }
                }
                ODM.row(odmTmp + 4).cell(rid + 1).value(r).style(style)
              } else {
                if (reg.test(r)) {
                  style = { border: 'thin', fontFamily: 'arial', numberFormat: '_-* #,##0_-;-* #,##0_-;_-* "-"??_-;_-@_-'  }
                } else {
                  style = { border: 'thin', fontFamily: 'arial' }
                }
                if(regPercent.test(r)) {
                  r = Number(r.replace(regPercent, '')) * 0.01
                  style = { border: 'thin', fontFamily: 'arial', numberFormat: '0%' }
                }
                ODM.row(odmTmp + 2).cell(rid + 1).value(r).style(style)
              }
            })
            odmTmp += 1
          })
        } else {
          ODM.cell(`A${odmTmp + 1}`).value(odmValue).style( { border: 'thin', fontFamily: 'arial', fontColor: 'ffffff', bold: true, fill: '92d050' })
        }
      }
      odmTmp += 4
    } else{
      for(let j = 0 ;j < Object.keys(odmValue).length; j++) {
        ODM.cell(`A${odmTmp + 1}`).value(Object.keys(odmValue)[j]).style({ bold: true, fill:'ffc000', fontFamily: 'arial' })
        if(odmKey == 'total') {
          ODM.row(odmTmp + 1).cell(odmTotalCount - 1).value(odmValue[Object.keys(odmValue)[j]]).style({ fontFamily: 'arial', bold: true, fontColor: 'ff0000', numberFormat: '_-* #,##0_-;-* #,##0_-;_-* "-"??_-;_-@_-' })
        }else {
          if(odmValue[Object.keys(odmValue)[j]].length != 1) {
            odmValue[Object.keys(odmValue)[j]].map((value, index) => {
              if(value == 'Supplier' || value == 'Amt. (NTD)' || value == '%') {
                ODM.row(odmTmp + 2).cell(index + 1).value(`${value}`).style({ border: 'thin', fontColor: 'ffffff', bold: true, fontFamily: 'arial', fill: '008080' })
              } else {
                ODM.row(odmTmp + 2).cell(index + 1).value(`${value}`).style({ border: 'thin', fontColor: 'ffffff', bold: true, fontFamily: 'arial', fill: '92d050' })
              }
            })
            odmValue[Object.keys(odmValue)[j]].shift()
            ODM.cell(`A${odmTmp + 3}`).value(odmValue[Object.keys(odmValue)[j]]).style( { border: 'thin', fontFamily: 'arial' })
          } else {
            ODM.cell(`A${odmTmp + 2}`).value(odmValue[Object.keys(odmValue)[j]]).style( { border: 'thin', fontFamily: 'arial', fontColor: 'ffffff', bold: true, fill: '92d050' })
          }
        }
        odmTmp += odmValue[Object.keys(odmValue)[j]].length + 2
      }
    }
  }

}
function genOEMSheet(OEM, oemData) {
  OEM.cell('A1').value([['By Supplier(OEM)']]).style({ fontSize:20, bold:true, fontFamily: 'arial' })
  OEM.cell('A2').value([['Currency:NTD']]).style({ fontFamily: 'arial' })
  OEM.column('A').width(25).hidden(false)
  let oemTmp = 4
  let oemTotalCount = oemData[Object.keys(oemData)[0]][0].length
  for(let i = 0; i < Object.keys(oemData).length; i++) {
    const oemKey = Object.keys(oemData)[i]
    const oemValue = oemData[oemKey]
    if(Array.isArray(oemValue)) {
      OEM.cell(`A${oemTmp}`).value(oemKey).style({ bold: true, fill:'ffc000', fontFamily: 'arial' })
      if(oemKey == 'total') {
        OEM.row(oemTmp).cell(oemTotalCount - 1).value(oemValue).style({ fontFamily: 'arial', bold: true, fontColor: 'ff0000', numberFormat: '_-* #,##0_-;-* #,##0_-;_-* "-"??_-;_-@_-' })
      }else {
        if(oemValue.length != 1) {
          oemValue[0].map(( value, index) => {
            if(value == 'Supplier' || value == 'Amt. (NTD)' || value == '%') {
              OEM.row(oemTmp + 1).cell(index + 1).value(`${value}`).style({ border: 'thin', fontColor: 'ffffff', bold: true, fontFamily: 'arial', fill: '008080' })
            } else {
              OEM.row(oemTmp + 1).cell(index + 1).value(`${value}`).style({ border: 'thin', fontColor: 'ffffff', bold: true, fontFamily: 'arial', fill: '92d050' })
            }
            if(value.length > 8) {
              OEM.column(index + 1).width(15).hidden(false)
            }
          })
          oemValue.shift()
          oemValue.forEach((value, index) => {
            value.map((r, rid) => {
              let reg = /^[\d|\.|]*$/
              let regPercent = /[*%]/
              if(index == oemValue.length - 1) {
                if (reg.test(r)) {
                  style = { fontFamily: 'arial', numberFormat: '_-* #,##0_-;-* #,##0_-;_-* "-"??_-;_-@_-' }
                } else {
                  style = { fontFamily: 'arial'  }
                }
                if(regPercent.test(r)) {
                  r = Number(r.replace(regPercent, '')) * 0.01
                  style = { fontFamily: 'arial', numberFormat: '0%' }
                }
                OEM.row(oemTmp + 4).cell(rid + 1).value(r).style(style)
              } else {
                if (reg.test(r)) {
                  style = { border: 'thin', fontFamily: 'arial', numberFormat: '_-* #,##0_-;-* #,##0_-;_-* "-"??_-;_-@_-' }
                } else {
                  style = { border: 'thin', fontFamily: 'arial' }
                }
                if(regPercent.test(r)) {
                  r = Number(r.replace(regPercent, '')) * 0.01
                  style = { border: 'thin', fontFamily: 'arial', numberFormat: '0%' }
                }
                OEM.row(oemTmp + 2).cell(rid + 1).value(r).style(style)
              }
            })
            oemTmp += 1
          })
        } else {
          OEM.cell(`A${oemTmp + 1}`).value(oemValue).style( { border: 'thin', fontFamily: 'arial', fontColor: 'ffffff', bold: true, fill: '92d050' })
        }
      }
      oemTmp += 4
    } else{
      for(let j = 0 ;j < Object.keys(oemValue).length; j++) {
        OEM.cell(`A${oemTmp + 1}`).value(Object.keys(oemValue)[j]).style({ bold: true, fill:'ffc000', fontFamily: 'arial' })
        if(Object.keys(oemData)[i] == 'total') {
          OEM.row(oemTmp + 1).cell(oemTotalCount - 1).value(oemValue[Object.keys(oemValue)[j]]).style({ fontFamily: 'arial', bold: true, fontColor: 'ff0000', numberFormat: '_-* #,##0_-;-* #,##0_-;_-* "-"??_-;_-@_-' })
        }else {
          if(oemValue[Object.keys(oemValue)[j]].length != 1) {
            oemValue[Object.keys(oemValue)[j]].map((value, index) => {
              if(value == 'Supplier' || value == 'Amt. (NTD)' || value == '%') {
                OEM.row(oemTmp + 2).cell(index + 1).value(`${value}`).style({ border: 'thin', fontColor: 'ffffff', bold: true, fontFamily: 'arial', fill: '008080' })
              } else {
                OEM.row(oemTmp + 2).cell(index + 1).value(`${value}`).style({ border: 'thin', fontColor: 'ffffff', bold: true, fontFamily: 'arial', fill: '92d050' })
              }
            })
            oemValue[Object.keys(oemValue)[j]].shift()
            OEM.cell(`A${oemTmp + 3}`).value(oemValue[Object.keys(oemValue)[j]]).style( { border: 'thin', fontFamily: 'arial' })
          } else {
            OEM.cell(`A${oemTmp + 2}`).value(oemValue[Object.keys(oemValue)[j]]).style( { border: 'thin', fontFamily: 'arial', fontColor: 'ffffff', bold: true, fill: '92d050' })
          }
        }
        oemTmp += oemValue[Object.keys(oemValue)[j]].length + 2
      }
    }
  }

}
function genAllAmountSheet(allMount, allmountData) {
  let first = allmountData[0]
  let tmpData = []
  for(let i = 0; i < first.length; i++) {
    let test = first[i].replace(/\'/g, '')
    tmpData.push(test)
  }
  tmpData.forEach((i, index) => {
    if(i == 'Vendor' || i == 'Brand' || i == 'Comm') {
      allMount.column(index + 1).width(15).hidden(false)
    } else if(i == 'Comm2') {
      allMount.column(index + 1).width(20).hidden(false)
    } else {
      allMount.column(index + 1).width(10).hidden(false)
    }
    allMount.row(1).cell(index + 1).value(`${i}`).style({ bold: true, fill: '8ea0db', fontFamily: 'calibri' })
  })
  allmountData.shift()
  allmountData.splice(allmountData.length - 2, 1)
  let allTmp = 0
  allmountData.map((i, index) => {
    if(index == allmountData.length - 1) {
      allMount.range(`A${index + 2}:G${index + 2}`).merged(true)
      allMount.cell(`A${index + 2}`).value('total').style({ horizontalAlignment: 'center' })
      allMount.row(index + 2).cell(8).value([i]).style({ numberFormat: '_-* #,##0_-;-* #,##0_-;_-* "-"??_-;_-@_-' })
    } else {
      i.map((j, index, arr) => {
        allMount.row(allTmp + 2).cell(index + 1).value(j)
      })
    }
    allTmp += 1
  })
}
function genRawDataSheet(rawData, rawdata) {
  const headers = []
  const rowdata = []
  const title = rawdata[0]
  headers.push(title)
  headers[0].map((i, index) => {
    if(i == 'Profit Center' || i == 'product' || i == 'BU2_Description') {
      rawData.row(1).cell(index + 1).value(i).style({ bold:true, fill:'ffff00', fontFamily: 'arial' })
    } else {
      rawData.row(1).cell(index + 1).value(i).style({ bold:true, fill:'9ed561', fontFamily: 'arial' })
    }
    if(i.length > 5 || i == 'type1' || i == 'type2') {
      rawData.column(index + 1).width(20).hidden(false)
    } else {
      rawData.column(index + 1).width(10).hidden(false)
    }
  })
  for(let i = 1; i < rawdata.length; i++) {
    let data = rawdata[i]
    rowdata.push(data)
  }
  let dataTmp = 2
  rowdata.forEach((i, index) => {
    i.map((r, rid) => {
      if(rid <= 8 ) {
        rawData.row(dataTmp).cell(rid + 1).value(r)
      } else if(rid >= 9) {
        rawData.row(dataTmp).cell(rid + 1).value(r)
      }
    })
    dataTmp += 1
  })
}

function getNtdExchangeRate(exchangeRates, month) {
  let exrate_nt = null
  let formatMonth = moment(month).format('YYYYMM01')
  for(let j = 0 ;j < exchangeRates.length; j++) {
    if (exchangeRates[j].date <= formatMonth) {
      exrate_nt = exchangeRates[j].exange_rate
      break
    }
  }
  return exrate_nt
}
module.exports = Report
