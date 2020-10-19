const { systemDB } = require('../../helpers/database')
let squel = require('squel').useFlavour('postgres')
const _ = require('lodash')
const moment = require('moment')

const log4js = require('../../utils/logger/logger')
const logger = log4js.getLogger('xrayAnalysis')
let pallelNum = 500

class Xray {
  static async getItembySpec(supplyTypeKey, type1, type2, spec, role, sourcer, mrp){

    let sql = squel.select().distinct()
      // .field('eine.ekgrp', 'scode')
      .field('item.item', '"partNumber"')
      // .field('mara.MAKTX', '"partDesc"')
      // .field('ZZBSAR', 'supply')
      // .field('marc.WERKS', 'plant')
      .from('epur_itemtype', 'item')
      .join('epur_itemspec', 'spec', 'spec.item = item.item')
      .join('epur_type1', 'type1', 'type1.type1id = item.type1id')
      .join('epur_type2', 'type2', 'type2.type2id = item.type2id')
      .join('marc', 'marc', 'item.item = marc.matnr')
      .join('mara', 'mara', 'marc.matnr = mara.matnr')
      .where('type1.type1name = ? and type2.type2name = ?', type1, type2)
      .where('mara.zzeeme = ? and (ZZBSAR in ? or ZZBSAR is null)', role, supplyTypeKey)

    if (sourcer.length > 0) {
      sql.join('eina', 'eina', 'eina.bmatn = item.item')
        .join('eine', 'eine', 'eine.infnr = eina.infnr')
        .where('eine.ekgrp in ? ', sourcer)
    }

    if (Object.keys(spec).length > 0) {
      Object.keys(spec).forEach((k) => {

        let num = k.split('spec')[1]
        // sql.field(`spec${Number(num)}`, `spec${num}` )
        if (spec[k].length > 0) {
          let specLower = []
          _.forEach(spec[k], (specItem) => {
            if (specItem != null) specLower.push(specItem.toLowerCase())
          })

          if(specLower.length > 0) {
            sql.where(`LOWER(spec${Number(num)}) in ?`, _.uniq(specLower))
          }
          logger.debug(`spec${Number(num)}: ${spec[k]}`)
        }
      })
    }
    const result = await systemDB.Query(sql.toParam())
    return result.rows
  }

  static async forPromiseAll(elements) {

    let result = []
    await Promise.all(elements.map(async elm => {
      let res = await systemDB.Query(elm)
      result.push(...res.rows)
    }))
    return result
  }

  // static async getMinPartnumberByPurchaseOrg(partNums, purchaseOrg, exp = false) {
  //   let dateTo = moment(new Date()).format('YYYY-MM-DD')

  //   let sql = squel.select()
  //     .distinct('a018_konp.matnr')
  //     .field('eina.BMATN', '"partNumber"')
  //     .field('a018_konp.ekorg', 'purchaseorg')
  //     .field('a018_konp.matnr', 'matnr')
  //     // .field('eina.lifnr', 'vendor_code')
  //     .field('vgroup.vgName', '"vendorName"')
  //     .field('eina.mfrnr', 'manufacturer')
  //     .field('eina.mfrpn', '"vendorPN"')
  //     .field('cast(a018_konp.KBETR::NUMERIC/a018_konp.KPEIN*a018_konp.KUMZA/a018_konp.KUMNE as Float)', 'price')
  //     .field('a018_konp.konwa', 'currency')
  //     .field('to_char(a018_konp.datab, \'YYYY-MM-DD\')', 'datab')
  //     .field('to_char(a018_konp.datbi, \'YYYY-MM-DD\')', 'datbi')
  //     // .field('a018_konp.knumh', 'knumh')
  //     .from('wiprocurement.eina', 'eina')
  //     .left_join('wiprocurement.a018_konp', 'a018_konp', 'eina.MATNR = a018_konp.MATNR and eina.lifnr=a018_konp.lifnr')
  //     .left_join('wiprocurement.epur_vgroup', 'vgroup', 'a018_konp.LIFNR = vgroup.vcode')
  //     .where('eina.BMATN in ?', partNums)
  //     // .where('MFRNR is not null and MFRNR != \'\' AND LOEKZ is null')
  //     // .where('eina.BMATN = ?', '001.00603.0001')
  //     // .where('a018_konp.datbi = ?', '2099-12-31')
  //     // .where('a018_konp.datab <= Current_date')
  //     // .order('purchaseorg')
  //     .order('a018_konp.matnr')
  //     .order('knumh', false)

  //   if(purchaseOrg) {
  //     sql.where('a018_konp.ekorg = ?', purchaseOrg)
  //   }

  //   if(!exp) {
  //     sql.where('datbi >= ?', dateTo)
  //   }

  //   let res = await systemDB.Query(sql.toString())
  //   return res.rows
  // }

  static async getMinPartnumberBySlice(partNumbers, exp = false) {
    let dateTo = moment(new Date()).format('YYYY-MM-DD')
    let sql = squel.select()
      .field('currency')
      .field('partnumber', '"partNumber"')
      .field('manufacturer')
      .field('price')
      .field('spa.matnr')
      .field('unit')
      .field('vendor_pn', '"vendorPN"')
      .field('vendor_name', '"vendorName"')
      .field('to_char(datbi, \'YYYY-MM-DD\')', 'datbi')
      .field('to_char(datab, \'YYYY-MM-DD\')', 'datab')
      // .field('marc.ZZBSAR', 'supply')
      // .field('marc.WERKS', 'plant')
      .from('xray_analysis_price', 'spa')
      // .join('marc', 'marc', 'spa.partnumber = marc.matnr')
      .where('partnumber in ?', partNumbers)
      // .where('(ZZBSAR in ? or ZZBSAR is null)', supply)

    // exp = true 過期時間也列入比較, false 日期拿去做條件
    if(!exp) {
      sql.where('datbi >= ?', dateTo)
    }

    let res = await systemDB.Query(sql.toString())
    return res.rows
  }

  static async getMinPartnumber(partNumbers, date, supply, exp = false) {
    logger.debug(`similar partNumber length: ${partNumbers.length}`)

    if (partNumbers.length > 0) {
      let idx = 0
      let req = []

      while (idx < partNumbers.length) {
        let elms
        if ((idx + pallelNum) < partNumbers.length) {
          elms = partNumbers.slice(idx, (idx + pallelNum))
        } else {
          elms = partNumbers.slice(idx)
        }

        logger.debug('get item from', idx, 'to', (idx + pallelNum))

        // 將所有的料號 最新的有效日期與 價格撈出來
        let sql = squel.select()
          .field('spec1', 'spec01').field('spec2', 'spec02').field('spec3', 'spec03').field('spec4', 'spec04').field('spec5', 'spec05')
          .field('spec6', 'spec06').field('spec7', 'spec07').field('spec8', 'spec08').field('spec9', 'spec09').field('spec10')
          .field('spec11').field('spec12').field('spec13').field('spec14').field('spec15')
          .field('spec16').field('spec17').field('spec18').field('spec19').field('spec20')
          .field('spec21').field('spec22').field('spec23').field('spec24').field('spec25')
          .field('spec26').field('spec27').field('spec28').field('spec29').field('spec30')
          .field('currency')
          .field('partnumber', '"partNumber"')
          .field('manufacturer')
          .field('price')
          .field('spa.matnr')
          .field('unit')
          .field('vendor_pn', '"vendorPN"')
          .field('vendor_name', '"vendorName"')
          .field('to_char(datbi, \'YYYY-MM-DD\')', 'datbi')
          .field('to_char(datab, \'YYYY-MM-DD\')', 'datab')
          .field('mara.MAKTX', '"partDesc"')
          .field('marc.ZZBSAR', 'supply')
          .field('marc.WERKS', 'plant')
          .from('xray_analysis_price', 'spa')
          .join('epur_itemtype', 'item', 'item.item = spa.partnumber')
          .join('epur_itemspec', 'spec', 'spec.item = item.item')
          .join('marc', 'marc', 'item.item = marc.matnr')
          .join('mara', 'mara', 'marc.matnr = mara.matnr')
          .where('partnumber in ? and (ZZBSAR in ? or ZZBSAR is null)', elms, supply)

        // exp = true 過期時間也列入比較, false 日期拿去做條件
        if(!exp) {
          sql.where('datbi >= ?', date)
        }

        req.push(sql.toString())

        idx += pallelNum
      }

      return await this.forPromiseAll(req)

    } else {
      logger.warn('cant found MPN part number', partNumbers)
      return []
    }
  }

  static async getManufacturer(partNumbers) {
    // const result = await systemDB.Query(`
    //   SELECT distinct MFRNR as manufacturer, matnr, bmatn as "partNumber"
    //   FROM wiprocurement.eina
    //   WHERE bmatn = ANY(VALUES ${partNumbers}) and MFRNR is not null and LOEKZ is null;
    // `)
    // let sql = squel.select()
    //   .field('MFRNR', 'manufacturer')
    //   .field('matnr')
    //   .field('bmatn', '"partNumber"')
    //   .distinct()
    //   .from('wiprocurement.eina')
    //   .where('bmatn = ?', squel.rstr(`ANY(VALUES ${partNumbers})`))
    //   .where('MFRNR is not null')
    //   .where('LOEKZ is null')
    let sql = squel.select()
      .distinct()
      .field('MFRNR', 'manufacturer')
      .field('matnr')
      .field('bmatn', '"partNumber"')
      .field('mfrpn', '"vendorPN"')
      .from('eina')
      .where('bmatn in ? AND MFRNR is not null and MFRNR != \'\' AND LOEKZ is null', partNumbers)

    const result = await systemDB.Query(sql.toParam())
    return result.rows
  }

  static async getVendor(matnr) {
    // const result = await systemDB.Query(`
    // SELECT distinct A018.matnr, "vendorName"
    // FROM wiprocurement.a018_konp AS A018
    // inner join (
    //     SELECT name1 as "vendorName", LIFNR
    //       FROM wiprocurement.lfa1 as LFA1
    //     ) as l1 on A018.LIFNR = l1.LIFNR
    // where matnr = ANY(VALUES ${matnr}) and loevm_ko is null;
    // `)
    // let sql = squel.select()
    //   .field('A018.matnr')
    //   .field('vendorName', '"vendorName"')
    //   .distinct()
    //   .from('wiprocurement.a018_konp', 'A018')
    //   .join(
    //     squel.select().field('name1', 'vendorName')
    //       .field('LIFNR')
    //       .from('wiprocurement.lfa1', 'LFA1'),
    //     'l1',
    //     'A018.LIFNR = l1.LIFNR'
    //   )
    //   .where('matnr = ?', squel.rstr(`ANY(VALUES ${matnr})`))
    //   .where('loevm_ko is null')
    // console.log(sql.toParam())

    let sql = squel.select()
      .distinct()
      .field('A018.matnr')
      .field('vgroup.vgName', '"vendorName"')
      // .field('A018.LIFNR', '"vendorCode"')
      .from('a018_konp', 'A018')
      .join('epur_vgroup', 'vgroup', 'A018.LIFNR = vgroup.vcode')
      .where('matnr in ? AND loevm_ko is null', matnr)

    const result = await systemDB.Query(sql.toParam())
    return result.rows
  }

  static async getUnitPrice(matnr, date, exp = false) {
    // const result = await systemDB.Query(`
    //   SELECT distinct on (matnr) KONWA as currency, KBETR::numeric as price, KPEIN as unit, matnr
    //   FROM wiprocurement.a018_konp
    //   WHERE matnr = ANY(VALUES ${matnr}) and ('${date}' >= datab and '${date}' <= datbi) and LOEVM_KO is null
    //   ORDER BY matnr, datab DESC;
    // `)
    // let sql = squel.select()
    //   .distinct('matnr')
    //   .field('KONWA', 'currency')
    //   .field('KBETR::numeric', 'price')
    //   .field('KPEIN', 'unit')
    //   .field('matnr')
    //   .from('wiprocurement.a018_konp')
    //   .where('matnr = ?', squel.rstr(`ANY(VALUES ${matnr})`))
    //   .where('? >= datab', date)
    //   .where('? <= datbi', date)
    //   .where('loevm_ko is null')
    //   .order('matnr')
    //   .order('datab', false)
    // console.log('squel', sql.toParam())

    // 正確的找法
    let sql = squel.select()
      .distinct('matnr')
      .field('KONWA', 'currency')
      .field('cast( KBETR as numeric)', 'price')
      .field('KPEIN', 'unit')
      .field('matnr')
      .field('datab')
      .field('to_char(datbi, \'YYYY-MM-DD\')', 'datbi')
      .from('a018_konp')
      .where('matnr in ? and LOEVM_KO is null', matnr)
      .order('matnr')
      .order('knumh', false)
      .order('datab', false)

    // exp = true 過期時間也列入比較, false 日期拿去做條件
    if(!exp) {
      sql.where('datbi >= ?', date)
    }

    const result = await systemDB.Query(sql.toParam())
    return result.rows

    // let pallelNum = 10
    // let idx = 0
    // let result = []
    // while(idx < matnr.length) {
    //   let selectedElms
    //   if((idx + pallelNum) < matnr.length) {
    //     selectedElms = matnr.slice(idx, (idx + pallelNum))
    //   } else {
    //     selectedElms = matnr.slice(idx)
    //   }

    //   let resPromise = await Promise.all(selectedElms.map(async elm => {
    //     let sql = squel.select()
    //       .field('knumh')
    //       .field(`to_char(datbi, 'YYYY-MM-DD')`, 'datbi')
    //       .from('a018_konp')
    //       .where('matnr = ? AND (datab <= ? AND datbi >= ?) and LOEVM_KO is null', elm, date, date)
    //       .order('knumh', false)
    //       .order('datbi')

    //     let res = await systemDB.Query(sql.toParam())
    //     if (res.rowCount > 0) {
    //       console.log(res.rows)
    //       let dateLatest = _.chain(res.rows)
    //         .map(v => v.datbi)
    //         .uniq()
    //         .value()
    //       // ['2099-12-31']
    //       // ['2019-03-31']
    //       // ['2019-03-31', '2099-12-31']
    //       // ['2019-02-28', '2019-03-31', '2019-04-30']
    //       let groupK = _.groupBy(res.rows, 'knumh')
    //       let keys = Object.keys(groupK)

    //       dateLatest = (groupK[_.sortedUniq(keys)[0]])
    //       let knumbLatest, latestRes, dateByknumh
    //       if (dateLatest.length > 0) {

    //         if (dateLatest.length == 1 && dateLatest[0].datbi == '2099-12-31') {
    //           // console.log('只有2099-12-31')
    //           latestRes = dateLatest
    //         } else if (dateLatest.length > 1 && _.find(dateLatest, v => v.datbi == '2099-12-31')) {
    //           // console.log('有 2099-12-31 and 其他的 日期')
    //           latestRes = _.chain(dateLatest)
    //             .map((r) => {
    //               if (r.datbi != '2099-12-31')
    //                 return r
    //             })
    //             .filter(x => !!x)
    //             .orderBy(['knumh', 'datbi'], ['desc', 'desc'])
    //             .value()

    //         } else if (dateLatest.length >= 1 && !_.find(dateLatest, v => v.datbi == '2099-12-31')) {
    //           // console.log('其他的 日期 and 沒有 2099-12-31')
    //           latestRes = dateLatest
    //         } else {
    //           logger.error('Error: ', dateLatest.length, dateLatest)
    //         }

    //         knumbLatest = latestRes[0].knumh
    //         dateByknumh = latestRes[0].datbi
    //       }

    //       let sql_price = squel.select()
    //         .field('matnr')
    //         .field('datab')
    //         .field('cast( KBETR as numeric)', 'price')
    //         .field('kpein', 'unit')
    //         .field('konwa', 'currency')
    //         .field('knumh')
    //         .from('a018_konp')
    //         .where('datbi = ? and matnr = ? and knumh = ? and (datab <= ? and datbi >= ?) and LOEVM_KO is null ',
    //           dateByknumh, elm, knumbLatest, date, date)

    //       let res_price = await systemDB.Query(sql_price.toParam())
    //       if (res_price.rowCount > 0) {
    //         if (res_price.rows.length > 1) {
    //           logger.error('Error: ', res_price.rows)
    //         }
    //         return res_price.rows[0]
    //       } else {
    //         logger.error('Error: ', dateByknumh, elm, knumbLatest, date)
    //       }
    //     }
    //   }))

    //   resPromise.map(r => {
    //     if(!_.isEmpty(r)) {
    //       result.push(r)
    //     }
    //   })
    //   idx += pallelNum
    // }

    // return result

    /*
    select matnr, datab, cast( KBETR as numeric) as price, konwa as currency , kpein
    from wiprocurement.a018_konp
    where datbi =
    (
        select datbi
        from wiprocurement.a018_konp
        where  matnr = 'MPN00059315' and knumh = '0169634913'
        order by datbi asc
        limit 1
    ) and matnr = 'MPN00059315' and knumh = '0169634913'
    AND (datab <= '2019-03-23' AND datbi >= '2019-03-23')
    */

  }

  static async getExchangeRate(date, currency) {
    let sql = squel
      .select()
      .distinct('fcurr')
      .field('GDATU', 'date')
      .field('fcurr')
      .field('(UKURS*TFACT/FFACT)', '"exchangeRate"')
      .from('exchange_rate')
      .where('GDATU <= ? AND fcurr in ? AND tcurr = \'USD\'', date, currency)
      .order('fcurr')
      .order('GDATU', false)

    // const result = await systemDB.Query(`
    //   SELECT distinct on (fcurr) GDATU as date, fcurr, (UKURS*TFACT/FFACT) as "exchangeRate"
    //   FROM wiprocurement.exchange_rate
    //   WHERE GDATU <= '${date}' AND fcurr = ANY(VALUES ${currency}) AND tcurr = 'USD'
    //   ORDER BY fcurr, GDATU DESC;
    // `)

    const result = await systemDB.Query(sql.toParam())
    return result.rows
  }

  static async isItemBlock(partNumbers) {
    // const result = await systemDB.Query(`
    //   SELECT partnumber as "partNumber"
    //   FROM wiprocurement.pdmparts
    //   WHERE partnumber = ANY (VALUES ${partnumber}) and lifecyclestate = 'LcsObsoleted';
    // `)
    // let sql = squel.select()
    //   .field('partnumber', '"partNumber"')
    //   .from('wiprocurement.pdmparts')
    //   .where('partnumber = ?', squel.rstr(`ANY (VALUES ${partnumber}) `))
    //   .where('lifecyclestate = ?', 'LcsObsoleted')
    // console.log(sql.toString())

    if (partNumbers.length > 0) {
    //   let idx = 0
    //   let req = []

    //   while (idx < partNumbers.length) {
    //     let elms
    //     if ((idx + pallelNum) < partNumbers.length) {
    //       elms = partNumbers.slice(idx, (idx + pallelNum))
    //     } else {
    //       elms = partNumbers.slice(idx)
    //     }

      let sql = squel
        .select()
        .field('partnumber', '"partNumber"')
        .from('pdmparts')
        .where('partnumber in ? AND lifecyclestate = \'LcsObsoleted\'', partNumbers)

      const result = await systemDB.Query(sql.toParam())
      return result.rows
      //   req.push(sql.toString())

      //   idx += pallelNum
      // }

      // return await this.forPromiseAll(req)

    } else {
      logger.warn('cant found MPN part number', partNumbers)
      return []
    }


  }

  static async getMrpValue(partNumbers, plant) {
    // const result = await systemDB.Query(`
    //   SELECT zmrp_nreq, mat_plant, plant
    //   FROM wiprocurement.mrp_bw
    //   WHERE mat_plant = ANY (VALUES ${partnumber}) and plant = ANY (VALUES ${plant})
    //   ORDER BY zdsdat DESC
    // `)
    // let sql = squel.select()
    //   .field('zmrp_nreq').field('mat_plant').field('plant')
    //   .from('wiprocurement.mrp_bw')
    //   .where('mat_plant = ?', squel.rstr(`ANY(VALUES ${partnumber})`))
    //   .where('plant = ?', squel.rstr(`ANY (VALUES ${plant})`))
    //   .order('zdsdat', false)
    // console.log(sql.toString())

    if (partNumbers.length > 0) {
    //   let idx = 0
    //   let req = []

    //   while (idx < partNumbers.length) {
    //     let elms
    //     if ((idx + pallelNum) < partNumbers.length) {
    //       elms = partNumbers.slice(idx, (idx + pallelNum))
    //     } else {
    //       elms = partNumbers.slice(idx)
    //     }

      let sql = squel
        .select()
        .field('zmrp_nreq')
        .field('mat_plant')
        .field('plant')
        .from('mrp_bw')
        .where('mat_plant in ? AND plant in ? and zmrp_nreq like \'%-\'', partNumbers, plant)
        .order('zdsdat', false)

      const result = await systemDB.Query(sql.toParam())
      return result.rows
      //   req.push(sql.toString())

      //   idx += pallelNum
      // }

      // return await this.forPromiseAll(req)

    } else {
      logger.warn('cant found MPN part number', partNumbers)
      return []
    }

  }

  static async getSpecTitleBySpec(role, type1, type2, spec_t) {
    // const query = `
    // SELECT ${spec_t}
    // FROM wiprocurement.view_epur_spec_title
    // where type1name = '${type1}' and type2name = '${type2}';
    // `
    // let sql = squel.select()
    //   .field(spec_t)
    //   .from('wiprocurement.view_epur_spec_title')
    //   .where('type1name = ?', type1)
    //   .where('type2name = ?', type2)
    // console.log(sql.toString())


    let title_table = 'view_epur_spec_title'
    if (role == 'ME') title_table = 'me_spec_title'

    let sql = squel.select().distinct()
      .field(spec_t)
      .from(title_table, 'specTitle')
      .join('xray_dropdown', 'xray_dropdown', 'xray_dropdown.type1 = specTitle.type1name and xray_dropdown.type2 = specTitle.type2name')
      // .join('v_businessorg_bo', 'finance', 'marc.PRCTR = finance.profit_center_key')
      .where('specTitle.type1name = ? and specTitle.type2name = ?  and xray_dropdown.eeme = ? ', type1, type2, role)

    const result = await systemDB.Query(sql.toParam())
    return result.rows

  }
  static async getCommonPartByPN(pn = []) {

    // let sql = squel.select()
    //   .distinct()
    //   .field('partnumber')
    //   .from('eedm_common_parts')

    // if (pn.length > 0) {
    //   sql.where('partnumber in ?', pn)
    // }

    // const result = await systemDB.Query(sql.toParam())
    // return result.rows
    if (pn.length > 0) {
      let idx = 0
      let req = []

      while (idx < pn.length) {
        let elms
        if ((idx + pallelNum) < pn.length) {
          elms = pn.slice(idx, (idx + pallelNum))
        } else {
          elms = pn.slice(idx)
        }

        let sql = squel.select()
          .distinct()
          .field('partnumber')
          .from('view_common_parts')
          .where('partnumber in ?', elms)

        req.push(sql.toString())

        idx += pallelNum
      }

      return await this.forPromiseAll(req)

    } else {
      logger.warn('cant found MPN part number', pn)
      return []
    }
  }

  static async getPnManufacturer(partNumber) {

    let sql = squel.select()
      .distinct()
      .field('MFRNR', 'manufacturer')
      .from('eina')
      .where('bmatn = ? AND MFRNR is not null and MFRNR != \'\' AND LOEKZ is null', partNumber)

    let res = await systemDB.Query(sql.toString())
    return res.rowCount > 0 ? res.rows[0].manufacturer : null
  }

  static async getCESpecGroupbyMultiType(type1, type2) {
    let sql = squel.select()
      .field('*')
      .from('wiprocurement.eebom_spa_rules')
      .where('UPPER(type1) in ? and UPPER(type2) in ?', type1, type2)

    let res = await systemDB.Query(sql.toParam())
    return res.rowCount > 0 ? res.rows : []
  }

  static async getSpecByPartNumber(partNumber, spec = []) {
    let sql = squel.select()
      .distinct()
      .field('spec.item')
      .from('wiprocurement.epur_itemspec', 'spec')
      .where('spec.item in ?', partNumber)

    if (spec.length > 0) {
      spec.map(s => {
        let num = s.split('spec')[1]
        let key = num < 10 ? `spec${num}` : s
        sql.field(s, key)
      })
    } else {
      sql.distinct()
        .field('spec1', 'spec01').field('spec2', 'spec02').field('spec3', 'spec03').field('spec4', 'spec04').field('spec5', 'spec05')
        .field('spec6', 'spec06').field('spec7', 'spec07').field('spec8', 'spec08').field('spec9', 'spec09').field('spec10')
        .field('spec11').field('spec12').field('spec13').field('spec14').field('spec15')
        .field('spec16').field('spec17').field('spec18').field('spec19').field('spec20')
        .field('spec21').field('spec22').field('spec23').field('spec24').field('spec25')
        .field('spec26').field('spec27').field('spec28').field('spec29').field('spec30')
    }

    const result = await systemDB.Query(sql.toParam())
    if (result.rowCount > 0) {
      return result.rows
    } else {
      return []
    }
  }

}
module.exports = Xray
