const path = require('path')

const { yml2jsonAsync, checkFileExist } = require('../../helpers/utils')
const { PartListYml2JsonComposer, inspect } = require('./plYamlParser')
const plRouter = require('./plRouter')
const log4js = require('../../utils/logger/logger')
const log = log4js.getLogger('bom.plYamlParser')
const DFROOTPATH = path.join(path.resolve(__dirname), '..', '..', '..', 'part-list-layout')
const NO_CACHE_FUNC = { 
  getProjectParameter: 1,
  // ----Metal---
  getMaterial: 1,
  getMetalMaterialDropDownList: 1,
  // ----Plastic---
  getHousingPlasticMaterialWithSpec: 1,
  getHousingPlasticDoubleInjection: 1,
  getPlasticMaterialDropDownList: 1,
  // ----Turning---
  getTurningMaterial: 1,
  getNutTypeValues: 1,
  getScrewNylok: 1,
  getScrewMaterialSpec: 1,
  getStandoffMaterialSpec: 1,
  // ---Diecut---
  getDiecutMaterial: 1,
  // ---Rubber---
  getRubberMaterial: 1,
  getRubberMaterialWithSpec: 1,
  getRubberMaterialDropDownList: 1,
  getRubberMaterialSpecDensity: 1,
  // ---Thremal Module---
  getThermalmylarAdhesiveMaterial: 1,
  getThermalmylarMaterial: 1,
  getThermalSpongeMaterial: 1,
  getFanBladeMaterial: 1,
  getClipMaterial: 1,
  getFinMaterialDensity: 1,
  getFinMaterialThickness: 1,
  getThermalBlockMaterialDensity: 1,
  getThermalBlockMaterialThickness: 1,
  getThermalPlateMaterialDensity: 1,
  getThermalPlateMaterialThickness:1,
}

class PartListYml2JsonComposerBindThis extends PartListYml2JsonComposer {
  constructor(rootPath, thisArg = null) {
    let yamlRootPath = rootPath ? rootPath : DFROOTPATH
    super(yamlRootPath)
    this.optionThis = thisArg
  }
  async getInternalValue() {
    this.pathValues = await Promise.all(this.valueSets.map(async ({ func, paras, tpath, byKey })=>{
      log.info(`get inside value from ${func} with parameters: ${paras}`)
      if (!plRouter.hasOwnProperty(func)){
        log.error(`${func} is not a valied func, it should be in ${Object.keys(plRouter).join(',')}`)
        throw Error('NO_MATCHED_FUNC')
      }
      let value = null
      if(this.optionThis){
        const fun = plRouter[func].bind(this.optionThis)
        value = await fun(paras)
      } else {
        value = await plRouter[func](paras)
      }
      log.info(`from ${func} get value ${inspect(value)} and set to the path: ${tpath}`)
      return { tpath, value, byKey }
    }))
  }
  async getInternalValueWithCache(cache = null) {
    this.pathValues = await Promise.all(this.valueSets.map(async ({ func, paras, tpath, byKey })=>{
      log.info(`get inside value from ${func} with parameters: ${paras}`)
      if (!plRouter.hasOwnProperty(func)){
        log.error(`${func} is not a valied func, it should be in ${Object.keys(plRouter).join(',')}`)
        throw Error('NO_MATCHED_FUNC')
      }
      let value = null
      let queryFunc = null
      if(this.optionThis){
        queryFunc = plRouter[func].bind(this.optionThis)
      } else {
        queryFunc = plRouter[func]
      }
      if (cache && !NO_CACHE_FUNC.hasOwnProperty(func)) {
        let cacheKey = `${this.optionThis.productTypeId}_${func}_${paras?paras.toString():''}`
        value = await cache.getCacheAsync(cacheKey, queryFunc, paras)
      } else {
        value = await queryFunc(paras)
      }
      // log.info(`from ${func} get value ${inspect(value)} and set to the path: ${tpath}`)
      return { tpath, value, byKey }
    }))
  }
  async getJsonByYamlPathWithCache(yamlPath, cache = null){
    let fullYmlPath = path.join(this.rootPath, yamlPath)
    log.info(`data frame file path: ${fullYmlPath}`)
    checkFileExist(fullYmlPath)
    let protoLayout = await yml2jsonAsync(fullYmlPath)
    this.applyReplacement(protoLayout)
    await this.getInternalValueWithCache(cache)
    this.updateValue({ ...this.fullLayout })
    return this.fullLayout
  }
}
module.exports = PartListYml2JsonComposerBindThis
