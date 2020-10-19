const _ = require('lodash')
const moment = require('moment')
const rubberModel = require('../../model/database/rubber.js')
const commonModel = require('../../model/database/common.js').Common
const databaseUtils = require('../../utils/database/databaseUtils.js')
const tsystemDB = require('../../helpers/database/tPostgres.js')
const { throwApiError, errorCode } = require('../../helpers/errorCode/apiErrorHelper.js')
const log4js = require('../../utils/logger/logger')
const logger = log4js.getLogger('database Rubber Service')

class Rubber {
}
const insertMaterial = async (client, materialSpecId, material, materialValue) => {
  let materialId = await rubberModel.addRubberMaterial(client, materialSpecId, material)

  let formulaType = 'material'
  let scheduleList = await databaseUtils.getInsertScheduleDate(formulaType)
  let sourceTable = 'rubber_material'
  await commonModel.addParameterValue(client, materialId, materialValue, scheduleList, sourceTable)

}
module.exports = {
  Rubber,
  // -- Rubber Parameters --
  fetchRubberParameter: async () => {
    let results = await rubberModel.fetchRubberParameter()
    let dateFormat = databaseUtils.getDateFormat(results, 'activate_date', 'activation_date_id')
    let type_label = {
      'me_others_rubber_material': '材料',
      'me_others_rubber_forming': '成型費',
      'me_others_rubber_second_process': '二次加工',
      'me_others_rubber_management_and_profit': '管銷利潤',
    }
    let rubberParameter = databaseUtils.collateParameter(type_label, results)
    return {
      date: dateFormat,
      rubberParameter: rubberParameter,
    }
  },

  // -- Rubber Material Price --
  fetchMaterialPrice: async () => {
    let results = await rubberModel.fetchMaterialPrice()
    let dateFormat = databaseUtils.getDateFormat(results, 'activate_date', 'activation_date_id')

    let materialPriceList = []
    _.chain(results)
      .groupBy(res => res.materialSpecId)
      .map((data, key) => {
        let material = []

        _.chain(data)
          .groupBy(d => d.materialId)
          .map((materialDatas, k) => {
            let materialData = _.sortBy(_.uniqBy(materialDatas, 'activate_date'), 'activate_date')

            let materialValue = databaseUtils.getValueByDateFormat(materialData, 'value', 'activate_date')
            material.push({
              id: k,
              material: materialData[0].materialName,
              disable: materialData[0].materialDisable ? true : false,
              ...materialValue,
            })
          })
          .value()

        materialPriceList.push({
          id: key,
          materialSpec: data[0].materialSpecName,
          disable: data[0].materialSpecDisable ? true : false,
          remark: data[0].remark,
          density: data[0].density,
          subMaterial: material,
        })
      })
      .value()
    return {
      date: dateFormat,
      materialPriceList: _.sortBy(materialPriceList, 'materialSpec'),
    }
  },
  modifyRubberMaterialSpec: async (materialSpecList) => {
    try {
      let client = await new tsystemDB()
      await commonModel.modifyStringById(client, materialSpecList, 'rubber_material_spec', 'density', 'density')
      await commonModel.modifyStringById(client, materialSpecList, 'rubber_material_spec', 'remark', 'remark')
      await client.commit()
    } catch (err) {
      logger.debug('Update table fail, modifyRubberMaterialSpec function', err)
      throw err
    }
  },
  postRubberMaterialSpec: async (materialSpec, density, remark) => {
    let inoperable = databaseUtils.checkItemInoperable(materialSpec)
    if(inoperable) {
      logger.warn(`material spec: ${materialSpec} 不可被新增/刪除(封存) 項目`)
      throwApiError('F000113', errorCode.BAD_REQUEST)
    }

    let materialSpecExist = await rubberModel.checkRubberMaterialSpec(materialSpec)
    if (materialSpecExist) {
      logger.warn(`duplicate material spec:${materialSpec}`)
      throwApiError('F000112', errorCode.BAD_REQUEST)
    }

    try {
      let client = await new tsystemDB()
      let materialSpecId = await rubberModel.addRubberMaterialSpec(client, materialSpec, density, remark)

      let material = 'Other_Fill_ME_Remark'
      let materialValue = null
      await insertMaterial(client, materialSpecId, material, materialValue)

      await client.commit()
      return {
        materialSpecId: materialSpecId,
      }
    } catch (err) {
      logger.debug('Update table fail, postRubberMaterialSpec function', err)
      throw err
    }
  },
  postRubberMaterial: async (materialSpecId, material, materialValue) => {
    try {
      let inoperable = databaseUtils.checkItemInoperable(material)
      if(inoperable) {
        logger.warn(`material: ${material} 不可被新增/刪除(封存) 項目`)
        throwApiError('F000113', errorCode.BAD_REQUEST)
      }

      let materialExist = await rubberModel.checkRubberMaterial(materialSpecId, material)
      if (materialExist) {
        logger.warn(`duplicate material: ${material}`)
        throwApiError('F000110', errorCode.BAD_REQUEST)
      }

      let client = await new tsystemDB()
      await insertMaterial(client, materialSpecId, material, materialValue)
      await client.commit()

    } catch (err) {
      logger.debug('Update table fail, postRubberMaterial function', err)
      throw err
    }
  },
  // archive Plastic & Rubber 共同維護料的話 "不需要" 將plastic 的料也要一起 archive
  archiveRubberMaterial: async (materialSpecId, materialIdList) => {
    try {
      let client = await new tsystemDB()
      await rubberModel.archiveRubberMaterial(client, materialSpecId, materialIdList)
      await client.commit()
    } catch (err) {
      logger.debug('Update table fail, archiveRubberMaterial function', err)
      throw err
    }
  },
  unblockRubberMaterial: async (materialSpecId, materialIdList) => {
    try {
      let client = await new tsystemDB()
      await rubberModel.unblockRubberMaterial(client, materialSpecId, materialIdList)
      await client.commit()
    } catch (err) {
      logger.debug('Update table fail, unblockRubberMaterial function', err)
      throw err
    }
  },
  // archive Plastic & Rubber 共同維護料的話 "不需要" 將plastic 的料也要一起 archive
  archiveRubberMaterialSpec: async (materialSpecIdList) => {
    try {
      let client = await new tsystemDB()
      await rubberModel.archiveRubberMaterialSpec(client, materialSpecIdList)
      await client.commit()
    } catch (err) {
      logger.debug('Update table fail, archiveRubberMaterialSpec function', err)
      throw err
    }
  },
  unblockRubberMaterialSpec: async (materialSpecIdList) => {
    try {
      let client = await new tsystemDB()
      await rubberModel.unblockRubberMaterialSpec(client, materialSpecIdList)
      await client.commit()
    } catch (err) {
      logger.debug('Update table fail, unblockRubberMaterialSpec function', err)
      throw err
    }
  },
  // -- 機台費用價目表 --
  fetchMachinePrice: async () => {
    let results = await rubberModel.fetchMachinePrice()
    let dateFormat = databaseUtils.getDateFormat(results, 'activate_date', 'activation_date_id')

    // formatMultiItemPriceData
    let result = databaseUtils.formatMultiItemPriceData(
      results,
      'machine_id',
      {
        'machine_id': 'id',
        'ton': 'ton',
      },
      'type_name',
      {
        'product_type_id': 'productTypeId',
      }
    )
    return {
      date: dateFormat,
      machinePrice : result,
    }
  },
  modifyMachinePrice: async (nextId, machinePriceList) => {
    try {
      let client = await new tsystemDB()
      for (let i = 0; i < machinePriceList.length; i++) {
        let machine = machinePriceList[i]

        // modify price
        for(let k = 0 ; k < machine.productTypes.length ; k++) {
          let productType = machine.productTypes[k]

          if (typeof productType.next === 'number') {
            let parameterId = await rubberModel.getMachineParameterId(machine.id, productType.productTypeId)
              .catch((e) => {
                client.rollback()
                return null
              })
            if (!parameterId) {
              parameterId = await rubberModel.newMachinePrice(client, machine.id, productType.productTypeId)
            }

            await commonModel.insertPriceWithSourceName(client, parameterId, nextId, productType.next, 'number', 'rubber_machine_product_type')
          }
        }
      }
      await client.commit()
    } catch (err) {
      logger.debug('Update table fail, modifyMachinePrice function', err)
      throw err
    }
  },

  // -- 成品沖型價目表 --
  fetchStampingPrice: async () => {
    let results = await commonModel.fetchSingleTableMultiParameterValues('me_others_rubber', 'rubber_stamping', ['id', 'stamping_name'], ['unit_price', 'process_time', 'usage_amount'])
    let dateFormat = databaseUtils.getDateFormat(results, 'activate_date', 'activate_date_id')
    return {
      date: dateFormat,
      stampingPrice: databaseUtils.calcMultiPriceDataByDateObject(
        [results],
        [
          ['id'],
        ],
        [
          ['unit_price', 'process_time', 'usage_amount'],
        ],
        [
          {
            'id': 'id',
            'stamping_name': 'item',
            'unit_price': 'unitPrice',
            'process_time': 'cycleTime',
            'usage_amount': 'usageAmount',
          },
        ]
      ),
    }

  },
  modifyStampingPrice: async (nextId, items) => {
    try {
      let client = await new tsystemDB()
      await commonModel.modifySingleTableMultiParameterValue(client, nextId, items, 'rubber_stamping', {
        'unit_price': 'unitPrice',
        'process_time': 'cycleTime',
        'usage_amount': 'usageAmount',
      })
      await client.commit()
    } catch (err) {
      logger.debug('Update table fail, modifyStampingPrice function', err)
      throw err
    }
  },

  // -- 貼背膠價目表 --
  fetchAdhesivePrice: async () => {
    let results = await commonModel.fetchSingleTableMultiParameterValues(
      'me_others_rubber',
      'rubber_adhesive',
      ['id', 'adhesive_name', 'remark', 'disable_time'],
      ['unit_price', 'process_time', 'usage_amount']
    )
    let dateFormat = databaseUtils.getDateFormat(results, 'activate_date', 'activate_date_id')
    return {
      date: dateFormat,
      adhesivePrice: databaseUtils.calcMultiPriceDataByDateObject(
        [results],
        [
          ['id'],
        ],
        [
          ['unit_price', 'process_time', 'usage_amount']
        ],
        [
          {
            'id': 'id',
            'adhesive_name': 'item',
            'unit_price': 'unitPrice',
            'process_time': 'cycleTime',
            'usage_amount': 'usageAmount',
          },
        ]
      ),
    }
  },

  // -- 外觀印刷價目表 --
  fetchPrintingPrice: async () => {
    let results = await commonModel.fetchSingleTableMultiParameterValues('me_others_rubber', 'rubber_printing', ['id', 'printing_name', 'disable_time'], ['unit_price', 'usage_amount'])
    let dateFormat = databaseUtils.getDateFormat(results, 'activate_date', 'activate_date_id')
    return {
      date: dateFormat,
      printingPrice: databaseUtils.calcMultiPriceDataByDateObject(
        [results],
        [
          ['id'],
        ],
        [
          ['unit_price', 'usage_amount']
        ],
        [
          {
            'id': 'id',
            'printing_name': 'item',
            'unit_price': 'unitPrice',
            'usage_amount': 'usageAmount',
          },
        ]
      ),
    }
  },
  modifyAdhesivePrice: async (nextId, items) => {
    try {
      let client = await new tsystemDB()
      await commonModel.modifySingleTableMultiParameterValue(client, nextId, items, 'rubber_adhesive', {
        'unit_price': 'unitPrice',
        'process_time': 'cycleTime',
        'usage_amount': 'usageAmount',
      })
      await client.commit()
    } catch (err) {
      logger.debug('Update table fail, modifyAdhesivePrice function', err)
      throw err
    }
  },
  modifyPrintingPrice: async (nextId, items) => {
    try {
      let client = await new tsystemDB()
      await commonModel.modifySingleTableMultiParameterValue(client, nextId, items, 'rubber_printing', {
        'unit_price': 'unitPrice',
        'usage_amount': 'usageAmount',
      })
      await client.commit()
    } catch (err) {
      logger.debug('Update table fail, modifyPrintingPrice function', err)
      throw err
    }
  },
  // --- Machine Rate / 穴數計算維護表 ---
  fetchMachineRate: async () => {
    let results = await rubberModel.fetchMachineRate()
    let dateFormat = databaseUtils.getDateFormat(results, 'activate_date', 'activation_date_id')
    let machineRate = []

    _.chain(results)
      .groupBy(r => r.id)
      .forEach((machine, key) => {

        let obj = {}
        _.chain(machine)
          .groupBy(priceInfo=> priceInfo['param_id'])
          .forEach((itemList) => {
            let adderPriceData = _.sortBy(_.uniqBy(itemList, 'activate_date'), 'activate_date')
            let adderPriceValue = databaseUtils.getValueByDateFormat(adderPriceData, 'value', 'activate_date')
            obj[itemList[0].param_name] = adderPriceValue

          })
          .value()

        let machineValue = databaseUtils.calcByMultiDateObject(obj)
        machineRate.push({
          id: key,
          disable: machine[0].disable_time ? true : false,
          item : machine[0].ton,
          ...machineValue,
        })

      })
      .value()

    return {
      date: dateFormat,
      machineRate: machineRate,
    }
  },
  modifyMachineRate: async (nextId, items) => {
    let client = await new tsystemDB()
    try {
      let params = await rubberModel.fetchMachineRateParam()

      let modifyItems = []
      _.map(items, (item) => {
        let machineIds = _.filter(params, (param) => param.machine_ton_id == item.id)
        _.forEach(machineIds, (machine) => {
          modifyItems.push({
            parameter_id: machine.related_id,
            next: item[machine.param_name],
          })
        })
      })

      await commonModel.modifyPrice(client, nextId, modifyItems, 'parameter_id')
      await client.commit()
    } catch (err) {
      await client.rollback()
      logger.debug('Update table fail, modifyMachineRate function', err)
      throw err
    }
  },
}

