const fs = require('fs')
const path = require('path')
const util = require('util')

const writefile = util.promisify(fs.writeFile)
const { bomRoute } = require('../../config')
const REPLACE_EXCEL_LONGITUDINAM_COORDINATES_LIST = ['metadata', 'transferPartlistInfo', 'verifyInfo']
const LONGITUDINAM_COORDINATES_KEY = 'excelValueLongitudinalCoordinates'
async function generatorVerifyRule(){
  const configKeyList = Object.keys(bomRoute)
  await Promise.all(configKeyList.map((configKey)=>{
    const config = bomRoute[configKey]
    for(const replaceKey of REPLACE_EXCEL_LONGITUDINAM_COORDINATES_LIST){
      const dataList = config[replaceKey]
      const dataKeyList = Object.keys(dataList)
      dataKeyList.forEach((objKey) =>{
        const targetObj = dataList[objKey]
        if(targetObj.hasOwnProperty(LONGITUDINAM_COORDINATES_KEY)){
          dataList[objKey] = targetObj[LONGITUDINAM_COORDINATES_KEY]
        }
      })
    }
    return writefile(`./verifyRule/${configKey}.json`, JSON.stringify(config, null, 2))
  }))
}

module.exports = (async function(){
  await generatorVerifyRule()
  console.log(`generatorVerifyRule OK`);
  
})()