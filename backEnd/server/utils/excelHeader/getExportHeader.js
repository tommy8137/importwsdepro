const fixMath = require('../../helpers/math/math.js')
const _ = require('lodash')

class headers {
  static getCMPDataHeader() {
    let header = [
      ['1', 'ASIC', 'DP', ''],
      ['2', 'ASIC', 'HDMI', ''],
      ['3', 'ASIC', 'PCIE', ''],
      ['4', 'ASIC', 'SATA', ''],
      ['5', 'ASIC', 'USB 2.0-480Mbs', ''],
      ['6', 'ASIC', 'USB 3.0-5.0Gbs', ''],
      ['7', 'ASIC', 'USB 3.1-10Gbs', ''],
      ['8', 'Capacitor', '', ''],
      ['9', 'Discrete', '', ''],
      ['10', 'EEPROM', '', ''],
      ['11', 'EMI', 'Common Mode', ''],
      ['12', 'EMI', 'BEAD', ''],
      ['13', 'EMI', '', ''],
      ['14', 'Fuse/Polyswitch', '', ''],
      ['15', 'Logic', '', ''],
      ['16', 'MLCC', 'SMD', ''],
      ['17', 'MOSFET', '', ''],
      ['18', 'NOR Flash', '', ''],
      ['19', 'NOR Flash', 'Data Flash', ''],
      ['20', 'Power IC', '', ''],
      ['21', 'RES', 'RES-SMD', 'NTW'],
      ['22', 'RES', 'Thermistor', ''],
      ['23', 'Sensor', '', ''],
      ['24', 'Xformer', '', ''],
      ['25', 'XTAL', '', '']]
    return header
  }

  static getEEDataItem(detail) {
    let allItem = []
    if(detail.length > 0) {
      allItem = _.map(detail, (item, idx) => {
        let commonParts = item.is_common_parts ? 'Y' : 'N'
        let costDiff = fixMath.transStringToFloat(item.subTotalLastPrice) - fixMath.transStringToFloat(item.totalSuggestionCost)
        let content = [item.type1, item.type2, item.partNumber, item.description,
          item.manufacturer, item.vendor, item.vendorPartNumber, item.supplyType,
          item.PcbStageNo, item.parallelBoard, fixMath.transStringToFloat(item.sourcer_cost), fixMath.transStringToFloat(item.cleanSheetCost),
          fixMath.transStringToFloat(item.lastPrice), item.last_price_currency, fixMath.transStringToFloat(item.last_price_currency_price),
          item.valid_date, fixMath.transStringToFloat(item.spaCost), item.spaOriginCurrency,
          fixMath.transStringToFloat(item.spaOriginPrice), item.spaValidFrom, item.spaPartNumber,
          item.spaManufacturer, item.spaSupplyType, item.alt_lowest_price, item.alt_lowest_partnumber,
          item.alt_manufacturer, item.alt_grouping,
          fixMath.transStringToFloat(item.lpp), item.ceAdj,
          fixMath.transStringToFloat(item.ceCost), fixMath.transStringToFloat(item.suggestionCost), item.remark,
          fixMath.transStringToFloat(item.qty), fixMath.transStringToFloat(item.subTotalLastPrice),
          fixMath.transStringToFloat(item.totalSuggestionCost), item.obs, item.exp, '', '',
          commonParts, item.suggestion_is_common_part, item.suggestion_part_number, costDiff, item.RBopportunity, null]
        return content
      })
    } else {
      allItem = [['']]
    }
    return allItem
  }
  static getSummaryHeaderLeft(template) {
    let summary = [['BOM Management'], [template.customer], [template.project_name], [template.project_code], [template.version],
      [template.bom_create_date], [template.eedm_ver]]
    return summary
  }
  static getSummaryHeaderMiddle(template) {
    let summary = [[template.export_date], [template.total_part_number_count], [template.total_parts_count], [''], [template.total_last_price_sap],
      [template.total_suggestion_cost], ['']]
    return summary
  }
  static getSummaryHeaderRight(template) {
    let summary = [[template.total_opportunity], [template.opp_common_parts],
      [template.opp_sbm], [template.opp_ee], [template.pcb_last_price], ['N/A']]
    return summary
  }
  static getOpportunity(template) {
    let summary = [[template.total_opp_type1], [template.opp_common_parts_type1],
      [template.opp_sbm_type1], [template.opp_ee_type1], [''], ['']]
    return summary
  }
  /**
   * ee bom中將cmp, obs, exp中含有Y的值設為粗體
   * @param {Object} bom excel sheet
   * @param {Array} item 傳進來看cmp obs exp是否含有Y值的資料
   * @param {Number} 回傳加上v 的版本數 要寫入的位置
   * @returns {Boolean} true

   */
  static setEEBomFontBold(bom, item, pos) {
    _.map(item, (i, idx) => {
      if(i[35] == 'Y') {
        bom.cell(`AJ${idx + pos}`).style('bold', true)
      }
      if(i[36] == 'Y') {
        bom.cell(`AK${idx + pos}`).style('bold', true)
      }
      if(i[37] == 'Y') {
        bom.cell(`AL${idx + pos}`).style('bold', true)
      }
      if(i[38] == 'Y') {
        bom.cell(`AM${idx + pos}`).style('bold', true)
      }
      if(i[39] == 'Y') {
        bom.cell(`AN${idx + pos}`).style('bold', true)
      }
      if(i[40] == 'Y') {
        bom.cell(`AO${idx + pos}`).style('bold', true)
      }
    })
    return true
  }
  /**
   * 判斷資料資源數超過15進行設定換行style
   * @param {Object} bom excel sheet
   * @param {Array} 傳進來看字元是否超過15的資料
   * @returns {Boolean} return true
   */
  static wrapTextOrNot(bom, item) {
    if(item.length > 0) {
      for(let i = 1; i <= item.length; i++) {
        let pos = fixMath.numberToEnglish(i)
        _.map(item, (e, idx) => {
          if(e[i - 1] != null && e[i - 1].toString().length > 15) {
            bom.cell(`${pos}${idx + 10}`).style('wrapText', true)
          }
        })
      }
      return true
    }else {
      return false
    }
  }
  /**
   * New return hit-rate data format for using new export module  
   
   * @param {Array} template 傳進來做hit-rate的bom part count and common parts list計算的資料
   * @returns {Array} ex: [ { no: 1,
      type1: 'ASIC',
      type2: 'DP',
      spec01: null,
      bom_part_count: 0,
      common_parts_list: 0,
      hitrate: 'N/A' },
    { no: 2,
      type1: 'ASIC',
      type2: 'HDMI',
      spec01: null,
      bom_part_count: 1,
      common_parts_list: 0,
      hitrate: 0 },]
   */
  static getNewModuleCommonParts(template) {
    let bomPartList = [
      {
        no: 1,
        type1: 'ASIC',
        type2: 'DP',
        spec01: null,
        bom_part_count: 0,
        common_parts_list: 0,
      },
      {
        no: 2,
        type1: 'ASIC',
        type2: 'HDMI',
        spec01: null,
        bom_part_count: 0,
        common_parts_list: 0,
      },
      {
        no: 3,
        type1: 'ASIC',
        type2: 'PCIE',
        spec01: null,
        bom_part_count: 0,
        common_parts_list: 0,
      },
      {
        no: 4,
        type1: 'ASIC',
        type2: 'SATA',
        spec01: null,
        bom_part_count: 0,
        common_parts_list: 0,
      },
      {
        no: 5,
        type1: 'ASIC',
        type2: 'USB 2.0-480Mbs',
        spec01: null,
        bom_part_count: 0,
        common_parts_list: 0,
      },
      {
        no: 6,
        type1: 'ASIC',
        type2: 'USB 3.0-5.0Gbs',
        spec01: null,
        bom_part_count: 0,
        common_parts_list: 0,
      },
      {
        no: 7,
        type1: 'ASIC',
        type2: 'USB 3.1-10Gbs',
        spec01: null,
        bom_part_count: 0,
        common_parts_list: 0,
      },
      {
        no: 8,
        type1: 'Capacitor',
        type2: null,
        spec01: null,
        bom_part_count: 0,
        common_parts_list: 0,
      },
      {
        no: 9,
        type1: 'Discrete',
        type2: null,
        spec01: null,
        bom_part_count: 0,
        common_parts_list: 0,
      },
      {
        no: 10,
        type1: 'EEPROM',
        type2: null,
        spec01: null,
        bom_part_count: 0,
        common_parts_list: 0,
      },
      {
        no: 11,
        type1: 'EMI',
        type2: 'Common Mode',
        spec01: null,
        bom_part_count: 0,
        common_parts_list: 0,
      },
      {
        no: 12,
        type1: 'EMI',
        type2: 'BEAD',
        spec01: null,
        bom_part_count: 0,
        common_parts_list: 0,
      },
      {
        no: 13,
        type1: 'EMI',
        type2: null,
        spec01: null,
        bom_part_count: 0,
        common_parts_list: 0,
      },
      {
        no: 14,
        type1: 'Fuse/Polyswitch',
        type2: null,
        spec01: null,
        bom_part_count: 0,
        common_parts_list: 0,
      },
      {
        no: 15,
        type1: 'Logic',
        type2: null,
        spec01: null,
        bom_part_count: 0,
        common_parts_list: 0,
      },
      {
        no: 16,
        type1: 'MLCC',
        type2: 'SMD',
        spec01: null,
        bom_part_count: 0,
        common_parts_list: 0,
      },
      {
        no: 17,
        type1: 'MOSFET',
        type2: null,
        spec01: null,
        bom_part_count: 0,
        common_parts_list: 0,
      },
      {
        no: 18,
        type1: 'NOR Flash',
        type2: null,
        spec01: null,
        bom_part_count: 0,
        common_parts_list: 0,
      },
      {
        no: 19,
        type1: 'NOR Flash',
        type2: 'Data Flash',
        spec01: null,
        bom_part_count: 0,
        common_parts_list: 0,
      },
      {
        no: 20,
        type1: 'Power IC',
        type2: null,
        spec01: null,
        bom_part_count: 0,
        common_parts_list: 0,
      },
      {
        no: 21,
        type1: 'RES',
        type2: 'RES-SMD',
        spec01: 'NTW',
        bom_part_count: 0,
        common_parts_list: 0,
      },
      {
        no: 22,
        type1: 'RES',
        type2: 'Thermistor',
        spec01: null,
        bom_part_count: 0,
        common_parts_list: 0,
      },
      {
        no: 23,
        type1: 'Sensor',
        type2: null,
        spec01: null,
        bom_part_count: 0,
        common_parts_list: 0,
      },
      {
        no: 24,
        type1: 'Xformer',
        type2: null,
        spec01: null,
        bom_part_count: 0,
        common_parts_list: 0,
      },
      {
        no: 25,
        type1: 'XTAL',
        type2: null,
        spec01: null,
        bom_part_count: 0,
        common_parts_list: 0,
      },
    ]
    
    let bomData = _.chain(template)
      .groupBy(i => i.type1 + '-' + i.type2 + '-' + i.spec01)
      .map((v, k, array) => {
        return {
          type1: v[0].type1,
          type2: v[0].type2,
          spec01: v[0].spec01,
          count: v.length,
        }
      })
      .value()
    let filter = _.filter(template, o => o.is_common_parts == 'Y')
    let filterData = _.chain(filter)
      .groupBy(i => i.type1 + '-' + i.type2 + '-' + i.spec01)
      .map((v, k, array) => {
        return {
          type1: v[0].type1,
          type2: v[0].type2,
          spec01: v[0].spec01,
          count: v.length,
        }
      })
      .value()
    this.getCommonPartsCount(bomData, bomPartList, 'bom_part_count')
    this.getCommonPartsCount(filterData, bomPartList, 'common_parts_list')
    
    bomPartList.forEach(i => {
      i['hitrate'] = fixMath.fixedPoint((i.common_parts_list / i.bom_part_count) * 100, 2)
      if(isNaN(i['hitrate'])) {
        i['hitrate'] = 'N/A'
      }
    })

    return bomPartList
  }
  /**
   * 將傳進來的資料藉由type1,type2分類並加總個數
   * @param {Array} data 傳進來要處理的資料
   * @param {Array} list 要寫入計算好資料的array object
   * @param {String} type array object中所要添加的key
   * @returns {Array} 回傳已經寫入好資料的array object
   */
  static getCommonPartsCount(data, list, type) {
    _.map(data, v => {
      if(v.type1 == 'ASIC' && v.type2 == 'DP') {
        list[0][type] += v.count
      }else if(v.type1 == 'ASIC' && v.type2 == 'HDMI') {
        list[1][type] += v.count
      }else if(v.type1 == 'ASIC' && v.type2 == 'PCIE') {
        list[2][type] += v.count
      }else if(v.type1 == 'ASIC' && v.type2 == 'SATA') {
        list[3][type] += v.count
      }else if(v.type1 == 'ASIC' && v.type2 == 'USB 2.0-480Mbs') {
        list[4][type] += v.count
      }else if(v.type1 == 'ASIC' && v.type2 == 'USB 3.0-5.0Gbs') {
        list[5][type] += v.count
      }else if(v.type1 == 'ASIC' && v.type2 == 'USB 3.1-10Gbs') {
        list[6][type] += v.count
      }else if(v.type1 == 'Capacitor') {
        list[7][type] += v.count
      }else if(v.type1 == 'Discrete') {
        list[8][type] += v.count
      }else if(v.type1 == 'EEPROM') {
        list[9][type] += v.count
      }else if(v.type1 == 'EMI' && v.type2 == 'Common Mode') {
        list[10][type] += v.count
      }else if(v.type1 == 'EMI' && v.type2 == 'Bead') {
        list[11][type] += v.count
      }else if(v.type1 == 'EMI' && v.type2 != 'Common Mode' && v.type2 != 'Bead') {
        list[12][type] += v.count
      }else if(v.type1 == 'Fuse/Polyswitch') {
        list[13][type] += v.count
      }else if(v.type1 == 'Logic') {
        list[14][type] += v.count
      }else if(v.type1 == 'MLCC' && v.type2 == 'SMD') {
        list[15][type] += v.count
      }else if(v.type1 == 'MOSFET') {
        list[16][type] += v.count
      }else if(v.type1 == 'NOR Flash' && v.type2 != 'Data Flash') {
        list[17][type] += v.count
      }else if(v.type1 == 'NOR Flash' && v.type2 == 'Data Flash') {
        list[18][type] += v.count
      }else if(v.type1 == 'Power IC') {
        list[19][type] += v.count
      }else if(v.type1 == 'RES' && v.type2 == 'RES-SMD' && v.spec01 == 'NTW') {
        list[20][type] += v.count
      }else if(v.type1 == 'RES' && v.type2 == 'Thermistor') {
        list[21][type] += v.count
      }else if(v.type1 == 'Sensor') {
        list[22][type] += v.count
      }else if(v.type1 == 'Xformer') {
        list[23][type] += v.count
      }else if(v.type1 == 'XTAL') {
        list[24][type] += v.count
      }
    })
    return list
  }

}
module.exports = headers