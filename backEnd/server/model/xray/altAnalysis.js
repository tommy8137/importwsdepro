const { systemDB } = require('../../helpers/database')
let squel = require('squel').useFlavour('postgres')
const _ = require('lodash')
const moment = require('moment')

const log4js = require('../../utils/logger/logger')
const logger = log4js.getLogger('ALT model')

const specToSql = async(spec) =>{
  let sql = ''
  Object.keys(spec).forEach((k) => {
    // let num = k.split('spec')[1]
    if (spec[k] != null) {
      sql += `and (si.${spec[k]} ilike sa.${spec[k]} or (si.${spec[k]} is null and sa.${spec[k]} is null)) `
    }
  })
  return sql
}

class Alt {
  static async getAltPartNumbers(partNumber, spec) {
    let specQuery = await specToSql(spec)
    // logger.debug(specQuery)
    let sql = `WITH RECURSIVE t(n) AS (
        SELECT distinct 1, s.itemnum, s.altnum from wiprocurement.sapalt_filter s
        left join wiprocurement.epur_itemtype ti on s.itemnum = ti.item
        left join wiprocurement.epur_itemtype ta on s.altnum = ta.item
        left join wiprocurement.epur_itemspec si on s.itemnum = si.item
        left join wiprocurement.epur_itemspec sa on s.altnum = sa.item
        where  itemnum=\'${partNumber}\'
        and (ti.type1id = ta.type1id or (ti.type1id is null and ta.type1id is null))
        and (ti.type2id = ta.type2id or (ti.type2id is null and ta.type2id is null))
        ${specQuery}
      UNION ALL
        SELECT distinct n+1, r.itemnum, r.altnum from wiprocurement.sapalt_filter r
        inner join t on r.itemnum = t.altnum
        left join wiprocurement.epur_itemtype ti on r.itemnum = ti.item
        left join wiprocurement.epur_itemtype ta on r.altnum = ta.item
        left join wiprocurement.epur_itemspec si on r.itemnum = si.item
        left join wiprocurement.epur_itemspec sa on r.altnum = sa.item
        WHERE n < 10
        and (ti.type1id = ta.type1id or (ti.type1id is null and ta.type1id is null))
        and (ti.type2id = ta.type2id or (ti.type2id is null and ta.type2id is null))
        ${specQuery}
    )
    select distinct altnum from t order by altnum asc;`

    const result = await systemDB.Query(sql)

    return result.rowCount > 0 ? result.rows : []
  }

  static async getSuppyType(supplyTypeKey, partnumbers = []) {
    if (partnumbers.length > 0) {
      let sql = squel.select()
        .distinct()
        .field('matnr', 'partnumber')
        .from('wiprocurement.marc')
        .where('matnr in ?', partnumbers)
        .where('ZZBSAR in ? or ZZBSAR is null', supplyTypeKey)

      let res = await systemDB.Query(sql.toParam())
      return res.rowCount > 0 ? res.rows : []
    } else {
      return []
    }
  }

  static async getAltPrice(partNumbers) {
    logger.debug(`alt partNumber: ${partNumbers}`)
    // let todayDate = moment().format('YYYY-MM-DD')

    if(partNumbers.length > 0) {
      let pallelNum = 200
      let idx = 0
      let result = []
      while (idx < partNumbers.length) {
        let elms
        if ((idx + pallelNum) < partNumbers.length) {
          elms = partNumbers.slice(idx, (idx + pallelNum))
        } else {
          elms = partNumbers.slice(idx)
        }

        let sql = squel.select()
          .field('partnumber', '"partNumber"')
          .field('analysis.matnr')
          .field('price')
          .field('currency')
          .field('to_char(datbi, \'YYYY-MM-DD\')', 'datbi') // for EXP
          .field('to_char(datab, \'YYYY-MM-DD\')', 'datab') // for ValidFrom

          .field('manufacturer')
          // .field('unit')
          .field('vendor_pn', '"vendorPN"')
          .field('vendor_name', '"vendorName"')
          .field('mara.MAKTX', '"partDesc"')
          // .field('marc.ZZBSAR', 'supply')
          // .field('marc.WERKS', 'plant')
          .from('xray_analysis_price', 'analysis')
          // .join('epur_itemtype', 'item', 'item.item = analysis.partnumber')
          // .join('epur_itemspec', 'spec', 'spec.item = item.item')
          // .join('marc', 'marc', 'item.item = marc.matnr')
          .join('mara', 'mara', 'analysis.partnumber = mara.matnr')
          .where('partnumber in ?', elms)
          // .where('(datab <= ? and datbi >= ?)', todayDate, todayDate)

        let resPromise = await systemDB.Query(sql.toString())
        result.push(...resPromise.rows)

        idx += pallelNum
      }

      return result
    } else {
      logger.warn('cant found MPN part number', partNumbers)
      return []
    }
  }

  // static async getAltPriceByPurchaseOrg(partNumbers, purchaseOrg) {
  //   logger.debug(`alt partNumber: ${partNumbers}`)
  //   // let todayDate = moment().format('YYYY-MM-DD')

  //   if(partNumbers.length > 0) {
  //     let pallelNum = 200
  //     let idx = 0
  //     let result = []
  //     while (idx < partNumbers.length) {
  //       let elms = null
  //       if ((idx + pallelNum) < partNumbers.length) {
  //         elms = partNumbers.slice(idx, (idx + pallelNum))
  //       } else {
  //         elms = partNumbers.slice(idx)
  //       }

  //       let sql = squel.select()
  //         .distinct('a018_konp.matnr')
  //         .field('eina.BMATN', '"partNumber"')
  //         .field('mara.MAKTX', '"partDesc"')
  //         .field('a018_konp.ekorg', 'purchaseorg')
  //         .field('a018_konp.matnr', 'matnr')
  //         // .field('eina.lifnr', 'vendor_code')
  //         .field('vgroup.vgName', '"vendorName"')
  //         .field('eina.mfrnr', 'manufacturer')
  //         .field('eina.mfrpn', '"vendorPN"')
  //         .field('cast(a018_konp.KBETR::NUMERIC/a018_konp.KPEIN*a018_konp.KUMZA/a018_konp.KUMNE as Float)', 'price')
  //         .field('a018_konp.konwa', 'currency')
  //         .field('to_char(a018_konp.datab, \'YYYY-MM-DD\')', 'datab')
  //         .field('to_char(a018_konp.datbi, \'YYYY-MM-DD\')', 'datbi')

  //         .from('wiprocurement.eina', 'eina')
  //         .join('mara', 'mara', 'eina.BMATN = mara.matnr')
  //         .left_join('wiprocurement.a018_konp', 'a018_konp', 'eina.MATNR = a018_konp.MATNR and eina.lifnr=a018_konp.lifnr')
  //         .left_join('wiprocurement.epur_vgroup', 'vgroup', 'a018_konp.LIFNR = vgroup.vcode')
  //         .where('eina.BMATN in ?', elms)

  //         .order('a018_konp.matnr')
  //         .order('knumh', false)

  //       if(purchaseOrg) {
  //         sql.where('a018_konp.ekorg = ?', purchaseOrg)
  //       }

  //       let resPromise = await systemDB.Query(sql.toString())
  //       result.push(...resPromise.rows)

  //       idx += pallelNum
  //     }

  //     return result
  //   } else {
  //     logger.warn('cant found MPN part number', partNumbers)
  //     return []
  //   }
  // }

}

module.exports = Alt
