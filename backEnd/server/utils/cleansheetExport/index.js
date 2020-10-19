const bomItemInfo = require('./bomItemInfo')
/* NB / Default */
const hosuingMetalSetting = require('./nb_default/hosuingMetalSetting')
const hosuingPlasticSetting = require('./nb_default/hosuingPlasticSetting')
const thermalModuleSetting = require('./nb_default/thermalModuleSetting')
const thermalFanSetting = require('./nb_default/thermalFanSetting')
const thermalPadSetting = require('./nb_default/thermalPadSetting')
const cableFFCSetting = require('./nb_default/cableFFCSetting')
const cableFPCSetting = require('./nb_default/cableFPCSetting')
const cableWireSetting = require('./nb_default/cableWireSetting')
const dieCutSetting = require('./nb_default/dieCutSetting')
const emcMagnetSetting = require('./nb_default/emcMagnetSetting')
const thermalGraphiteSetting = require('./nb_default/thermalGraphiteSetting')
const meothersRubberSetting = require('./nb_default/meothersRubberSetting')
const meothersNutSetting = require('./nb_default/meothersNutSetting')
const meothersStandoffSetting = require('./nb_default/meothersStandoffSetting')
const meothersScrewSetting = require('./nb_default/meothersScrewSetting')

/* DT */
const hosuingMetalSettingDt = require('./dt/hosuingMetalSetting')
const hosuingPlasticSettingDt = require('./dt/hosuingPlasticSetting')
// const cableFFCSettingDt = require('./dt/cableFFCSetting.js.bak')

/* AIO */
const hosuingMetalSettingAio = require('./aio/hosuingMetalSetting')
const hosuingPlasticSettingAio = require('./aio/hosuingPlasticSetting')
// const cableFFCSettingAio = require('./aio/cableFFCSetting')

const defaultSetting = {
  'housing-metal': hosuingMetalSetting,
  'housing-plastic': hosuingPlasticSetting,
  'thermal-module': thermalModuleSetting,
  'thermal-fan': thermalFanSetting,
  'thermal-pad': thermalPadSetting,
  'cable-ffc': cableFFCSetting,
  'cable-fpc': cableFPCSetting,
  'cable-wire': cableWireSetting,
  'die-cut': dieCutSetting,
  'emc-magnet': emcMagnetSetting,
  'thermal-graphite': thermalGraphiteSetting,
  'meothers-rubber': meothersRubberSetting,
  'meothers-nut': meothersNutSetting,
  'meothers-standoff': meothersStandoffSetting,
  'meothers-screw': meothersScrewSetting,
}

module.exports = {
  bomItemInfo,
  default: defaultSetting,
  NB: defaultSetting,
  DT: {
    ...defaultSetting,
    'housing-metal': hosuingMetalSettingDt,
    'housing-plastic': hosuingPlasticSettingDt,
    // 'cable-ffc': cableFFCSettingDt,
  },
  AIO: {
    ...defaultSetting,
    'housing-metal': hosuingMetalSettingAio,
    'housing-plastic': hosuingPlasticSettingAio,
    // 'cable-ffc': cableFFCSettingAio,
  },
  VoIP: { // VoIP 暫時先用 DT 的 partlist 2020/05/08
    ...defaultSetting,
    'housing-metal': hosuingMetalSettingDt,
    'housing-plastic': hosuingPlasticSettingDt,
  },
  Server: { // Server 暫時先用 DT 的 partlist 2020/05/08
    ...defaultSetting,
    'housing-metal': hosuingMetalSettingDt,
    'housing-plastic': hosuingPlasticSettingDt,
  },
}
