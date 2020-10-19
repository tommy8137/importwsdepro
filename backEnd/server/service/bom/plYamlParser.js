/* eslint-disable no-magic-numbers */
const path = require('path')
const { yml2json, checkFileExist } = require('../../helpers/utils')
const log4js = require('../../utils/logger/logger')
const log = log4js.getLogger('bom.plYamlParser')
const { Yml2JsonComposer } = require('../../utils/dataFrame/utils')
const DFROOTPATH = path.join(path.resolve(__dirname), '..', '..', '..', 'part-list-layout')
const tv = require('traverse')
const plRouter = require('./plRouter')
const ut = require('util')
const START_KEY_CHARS = ['$', '?']

const inspect = (data, deep = 10) => {
  return ut.inspect(data, null, deep)
}
class PartListYml2JsonComposer extends Yml2JsonComposer {
  constructor(rootPath = DFROOTPATH) {
    super(rootPath)
    this.valueSets = []
    this.fullLayout = {}
    this.pathValues = []
    this.alreadyExistPath = []
    this.getIndex = 0
  }
  updateValue(fullLayout){
    let tvFull = tv(fullLayout)
    this.pathValues.forEach((pair)=>{
      if (tvFull.has(pair.tpath)) {
        let newObj = {}
        let matchKey = pair.tpath.slice(-1).pop()
        let tpathLength = pair.tpath.length
        let parentPath = pair.tpath.slice(0, tpathLength - 1)
        let parentObj = tvFull.get(parentPath)
        let parentKeys = Object.keys(parentObj)
        parentKeys.forEach((k) => {
          if (k === matchKey && pair.byKey && parentKeys.length === 1) {
            newObj = pair.value[pair.byKey]
          } else if(k === matchKey){
            newObj = { ...newObj, ...pair.value }
          } else {
            newObj[k] = parentObj[k]
          }
        })
        tvFull.set(parentPath, newObj)
      }
    })
    this.fullLayout = fullLayout
  }

  /* updateValue(fullLayout){
    this.pathValues.forEach((pair)=>{
      fullLayout = tv(fullLayout).map(function(){
        // let matchKey = pair.path.slice(-1).pop()
        let matchKey = pair.tpath.slice(-1).pop()
        if ( this.key === matchKey && this.path.join() == pair.tpath.join() ) {
          let newObj = {}
          Object.keys(this.parent.node).forEach((k)=>{
            if (k === matchKey && pair.byKey && Object.keys(this.parent.node).length === 1) {
              newObj = pair.value[pair.byKey]
            } else if(k === matchKey){
              newObj = { ...newObj, ...pair.value }
            } else {
              newObj[k] = this.parent.node[k]
            }
          })
          this.parent.node = newObj
        }
      })
    })
    this.fullLayout = fullLayout
  } */

  _updateValue(fullLayout){
    if (this.pathValues.length <= 0 ){
      this.fullLayout = fullLayout
      return
    }
    let self = this
    fullLayout = tv(fullLayout).map(function(){
      let matchKey = self.pathValues[self.getIndex].tpath.slice(-1)[0]
      if(this.key === matchKey && this.path.join() == self.pathValues[self.getIndex].tpath.join()){
        let newObj = {}
        Object.keys(this.parent.node).forEach((k)=>{
          if(k === matchKey){
            newObj = { ...newObj, ...self.pathValues[self.getIndex].value }
          } else {
            newObj[k] = this.parent.node[k]
          }
        })
        this.parent.node =  newObj
      }
    })

    self.getIndex += 1
    self.fullLayout = fullLayout
    if (self.getIndex < self.pathValues.length) {
      self.updateValue(fullLayout)
    }
  }
  async getInternalValue() {
    this.pathValues = await Promise.all(this.valueSets.map(async ({ func, paras, tpath, byKey })=>{
      log.info(`get inside value from ${func} with parameters: ${paras}`)
      if (!plRouter.hasOwnProperty(func)){
        log.error(`${func} is not a valied func, it should be in ${Object.keys(plRouter).join(',')}`)
        throw Error('NO_MATCHED_FUNC')
      }
      let value = await plRouter[func](paras)

      log.info(`from ${func} get value ${inspect(value)} and set to the path: ${tpath}`)
      return { tpath, value, byKey }
    }))
  }
  applyReplacement(protoLayout) {
    let needToNext = false
    let self = this
    let fullLayout = tv(protoLayout).map(function (){
      let obj = {}
      let hasParent = false
      if (typeof (this.key) === 'string' && this.key.startsWith('$')) {
        needToNext = true
        hasParent = true
        let fileName = this.key.slice(1)
        let point2slash = path.join(...fileName.split('.'))
        let tmpPool = self.getTemplate(`${point2slash}.yaml`)
        this.node.map(function (tmp) {
          let tmpKey = tmp
          if (typeof (tmp) === 'string' && tmp.startsWith('^')) {
            tmpKey = tmp.slice(1)
          }
          if (!tmpPool.hasOwnProperty(tmpKey)) {
            log.error(`${tmpKey} is not in ${Object.keys(tmpPool)} of ${fileName}.yaml`)
            throw Error('FORMAT_ERROR')
          }
          if (typeof (tmp) === 'string' && tmp.startsWith('^')) {
            obj = { ...obj, [tmpKey]: tmpPool[tmpKey] }
          } else {
            obj = { ...obj, ...tmpPool[tmp] }
          }
        })
      } else if (typeof (this.key) === 'string'
                 && this.key.startsWith('?')
                 && !self.alreadyExistPath.includes(this.path.join())) {

        let func = this.key.slice(1, )
        let tpath = this.path
        let paras = []
        let byKey = ''
        if (Array.isArray(this.node) || !this.node) {
          paras = this.node
        } else {
          paras = this.node.params || []
          byKey = this.node.byKey
        }
        self.valueSets.push({ func, tpath, paras, byKey })
        self.alreadyExistPath.push(tpath.join())
      }
      let newObj = {}
      if (hasParent) {
        newObj = { ...this.parent.node }
      }
      newObj = { ...newObj, [this.key]:obj }
      let orderObj = {}
      Object.keys(newObj).forEach((k)=>{
        let firstChar = k.slice(0, 1)
        if(START_KEY_CHARS.includes(firstChar) && k == this.key){
          orderObj = { ...orderObj, ...newObj[k] }
        } else {
          orderObj[k] = newObj[k]
        }
      })
      if (hasParent) {
        this.parent.node = orderObj
      }
    })
    if (needToNext) {
      fullLayout = this.applyReplacement(fullLayout)
    }
    self.fullLayout = fullLayout
    return fullLayout
  }
  async getJsonByYamlPath(yamlPath){
    let fullYmlPath = path.join(this.rootPath, yamlPath)
    log.info(`data frame file path: ${fullYmlPath}`)
    checkFileExist(fullYmlPath)
    let protoLayout = yml2json(fullYmlPath)
    this.applyReplacement(protoLayout)
    await this.getInternalValue()
    this.updateValue({ ...this.fullLayout })
    return this.fullLayout
  }
}

module.exports = {
  PartListYml2JsonComposer,
  inspect,
}

