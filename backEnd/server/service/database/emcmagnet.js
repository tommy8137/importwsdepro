const _ = require('lodash')
const moment = require('moment')
const emcmagnetModel = require('../../model/database/emcmagnet.js')
const commonModel = require('../../model/database/common.js').Common
const databaseUtils = require('../../utils/database/databaseUtils.js')
const tsystemDB = require('../../helpers/database/tPostgres.js')
const log4js = require('../../utils/logger/logger')
const logger = log4js.getLogger('database EMC Magnet Service')
const VOLUME_DESCRIPTION = '(成品尺寸L*成品尺寸W*成品尺寸H)'

class EmcMagnet {
}
module.exports = {
  EmcMagnet,
  // -- Emc Magnet Parameters --
  fetchEmcMagnetParameter: async () => {
    let results = await emcmagnetModel.fetchEmcMagnetParameter()

    let dateFormat = databaseUtils.getDateFormat(results, 'activate_date', 'activation_date_id')
    let type_label = {
      'emc_magnet_material': '材料',
      'emc_magnet_secondary_processing': '加工',
      'emc_magnet_management_and_profit': '管銷利潤',
      'emc_magnet_shipping_check': '運包檢',
    }

    let emcMagnetParameter = databaseUtils.collateParameter(type_label, results)

    return {
      date: dateFormat,
      emcMagnetParameter,
    }
  },

  // -- Emc Magnet Material Price --
  fetchEmcMagnetMaterialPrice: async () => {
    let results = await commonModel.fetchSingleTableParameterValues('magnet_material', ['id', 'material_name', 'disable_time'], 'id', 'emc_magnet')
    let dateFormat = databaseUtils.getDateFormat(results, 'activate_date', 'activate_date_id')

    let result = databaseUtils.formatSigleTablePriceData(results, 'id', {
      'material_name': 'item',
    })

    return {
      date: dateFormat,
      materialPrice: result,
    }
  },

  // -- 裁切邊料耗損率 --
  fetchCutLossRate: async () => {
    let results = await commonModel.fetchSingleTableParameterValues('magnet_cut_loss_rate', ['id', 'cut_size_begin', 'cut_size_end', 'disable_time'], 'id', 'emc_magnet')
    const formatItem = results.map(info =>{
      if(info.cut_size_begin === 0){
        info.item = `${VOLUME_DESCRIPTION} < ${info.cut_size_end}`
      } else if(info.cut_size_end === 0){
        info.item = `${info.cut_size_begin} < ${VOLUME_DESCRIPTION}`
      } else {
        info.item = `${info.cut_size_begin} <= ${VOLUME_DESCRIPTION} <= ${info.cut_size_end}`
      }
      info.value *= 100
      return info
    })
    return {
      date: databaseUtils.getDateFormat(results, 'activate_date', 'activate_date_id'),
      cutLossRate: databaseUtils.formatSigleTablePriceData(formatItem, 'id', {
        'id': 'id',
        'item': 'item',
      }),
    }
  },
  modifyCutLossRate: async (nextId, items) =>{
    try {
      let client = await new tsystemDB()
      let results = await commonModel.modifyPrice(client, nextId, items.map((info)=>{
        info.next /= 100
        return info
      })
      , 'id')
      await client.commit()
    } catch (err) {
      logger.debug('Update table fail, modifyCutLossRate function', err)
      throw err
    }
  },

  // -- (充磁費+人工費) 價目表 --
  fetchManPowerPrice: async () => {
    let results = await commonModel.fetchSingleTableParameterValues('magnet_manpower', ['id', 'area_size_begin', 'area_size_end', 'disable_time'], 'id', 'emc_magnet')
    const formatItem = results.map(info =>{
      if(info.area_size_begin === 0){
        info.item = `${VOLUME_DESCRIPTION} < ${info.area_size_end}`
      } else if(info.area_size_end === 0){
        info.item = `${info.area_size_begin} < ${VOLUME_DESCRIPTION}`
      } else {
        info.item = `${info.area_size_begin} <= ${VOLUME_DESCRIPTION} <= ${info.area_size_end}`
      }
      return info
    })
    return {
      date: databaseUtils.getDateFormat(results, 'activate_date', 'activate_date_id'),
      manPowerPrice: databaseUtils.formatSigleTablePriceData(formatItem, 'id', {
        'id': 'id',
        'item': 'item',
      }),
    }
  },
}
