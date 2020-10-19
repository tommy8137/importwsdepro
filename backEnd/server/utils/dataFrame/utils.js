const { yml2json, checkFileExist } = require('../../helpers/utils')
const log4js = require('../../utils/logger/logger')
const tv = require('traverse')
const log = log4js.getLogger('dtaFrame.utils')
const { DFROOTPATH } = require('./const')
const path = require('path')
const ut = require('util')

const inspect = (data, deep=10) => {
  return ut.inspect(data, null, deep)
}

const getFrameInfoFromYamlPath = (fullYmlPath, rootPath = DFROOTPATH) => {
  let composer = new Yml2JsonComposer(rootPath)
  return composer.getJsonByYamlPath(fullYmlPath)
}

const getHeaderByApplyingTemplate = (extraJsonArray, fullYmlPath, rootPath = DFROOTPATH ) => {
  let templateJson = getFrameInfoFromYamlPath(fullYmlPath, rootPath)
  let extraJson = {}
  extraJsonArray.forEach((obj)=>{
    let tmpObj = {}
    if (templateJson.hasOwnProperty(obj.templateKey)){
      tmpObj = { ...templateJson[obj.templateKey]}
    }
    if (!obj.hasOwnProperty('key')){
      log.warn(`[WARN] no key attribute in ${ut.inspect(obj)}`)
      return
    }
    if (obj.hasOwnProperty('extra') && typeof(obj.extra)==='object') {
      tmpObj = {...tmpObj, ...obj.extra}  
    }
    extraJson[obj.key] = tmpObj
  })
  return extraJson 
}

const overwriteOrConcatJsonWithInsert = (originJson, extraJson, insertInto=-1) => {
  Object.keys(extraJson).forEach((extKey)=>{
    if (originJson.hasOwnProperty(extKey)) {
      let newObj = {...originJson[extKey], ...extraJson[extKey]}
      originJson[extKey] = newObj
      delete extraJson[extKey]
    }
  })
  let resultJson = {}
  let insertAlready = false
  Object.keys(originJson).forEach((key, index)=>{
    if (index === insertInto) {
      resultJson = {...resultJson, ...extraJson}
      insertAlready = true
    }
    resultJson[key] = originJson[key] 
  })
  if (insertAlready == false) {
    resultJson = {...resultJson, ...extraJson}
  }
  return resultJson
}

const overwriteOrConcatJson = (originJson, extraJson) => {
  Object.keys(extraJson).forEach((extKey)=>{
    if (originJson.hasOwnProperty(extKey)) {
      let newObj = {...originJson[extKey], ...extraJson[extKey]}
      originJson[extKey] = newObj
    } else {
      originJson = {...originJson, [extKey]: extraJson[extKey]}
    }
  })
  return originJson
}

class Yml2JsonComposer {
  constructor(rootPath) {
    this.rootPath = rootPath
  }

  getTemplate(fileName = 'Template.yaml') {
    let tmpPath = path.join(this.rootPath, fileName)
    checkFileExist(tmpPath)
    return yml2json(tmpPath)
  }

  applyReplacement(protoLayout) {
    let needToNext = false
    let self = this
    let fullLayout = tv(protoLayout).map(function (item) {
      if (typeof (this.key) === 'string' && this.key.startsWith('$')) {
        needToNext = true
        let fileName = this.key.slice(1)
        let point2slash = path.join(...fileName.split('.'))
        let tmpPool = self.getTemplate(`${point2slash}.yaml`)
        let obj = {}
        let parentTmp = { ...this.parent.node }
        this.node.map(function (tmp) {
          let tmpKey = tmp
          if (typeof (tmp) === 'string' && tmp.startsWith('^')) {
            tmpKey = tmp.slice(1)
          }
          if (!tmpPool.hasOwnProperty(tmpKey)) {
            log.error(`${tmpKey} is not in ${Object.keys(tmpPool)} of ${fileName}.yaml`);
            throw Error('FORMAT_ERROR')
          }
          if (typeof (tmp) === 'string' && tmp.startsWith('^')) {
            obj = { ...obj, [tmpKey]: tmpPool[tmpKey] }
          } else {
            obj = { ...obj, ...tmpPool[tmp] }
          }
        })
        let newObj = {...this.parent.node, [this.key]:obj}
        let orderObj = {}
        Object.keys(newObj).forEach((k)=>{
          if(k.startsWith('$')&& k == this.key){
            orderObj = {...orderObj, ...newObj[k]}
          } else {
            orderObj[k] = newObj[k]
          }
        })
        this.parent.node = orderObj
      }
    })
    if (needToNext) {
      fullLayout = this.applyReplacement(fullLayout)
    }
    return fullLayout
  }
  
  getJsonByYamlPath(yamlPath){
    let fullYmlPath = path.join(this.rootPath, yamlPath)
    log.info(`data frame file path: ${fullYmlPath}`)
    checkFileExist(fullYmlPath)
    let main = yml2json(fullYmlPath)
    let info = this.applyReplacement(main)
    return info 
  }  

}

module.exports = {
  inspect,
  overwriteOrConcatJson,
  overwriteOrConcatJsonWithInsert,
  getHeaderByApplyingTemplate,
  getFrameInfoFromYamlPath,
  Yml2JsonComposer,
}
