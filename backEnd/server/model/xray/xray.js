const { systemDB } = require('../../helpers/database')
let squel = require('squel').useFlavour('postgres')
const co = require('co')
const _ = require('lodash')
const { throwApiError, errorCode } = require('../../helpers/errorCode/apiErrorHelper.js')

class Xray {
  static async getProductTypeByRole(role) {
    let sql = squel.select()
      .field('product_type')
      .from('xray_dropdown')
      .distinct()
      .where('eeme = UPPER(?)', role)
      .order('product_type')

    const result = await systemDB.Query(sql.toParam())
    return result.rows
  }

  static async getTypeI(role, productType = []) {
    let sql = squel.select()
      .field('type1')
      .from('xray_dropdown')
      .distinct()
      // .where('eeme = UPPER(?) and product_type = ?', role, productType)
      .where('eeme = UPPER(?)', role)
      .order('type1')

    if (!_.isEmpty(productType)) {
      sql.where('product_type IN ?', productType)
    }

    const result = await systemDB.Query(sql.toParam())
    return result.rows
  }

  // type1 category me:1, ee:2, eeme:3
  static async getType1ByUser(userID, roleCategory) {
    let sql = squel.select()
      .field('type1')
      .from('perm_user_type1_meee', 'userPerm')
      .join('perm_type1_meee', 'type1Perm', `type1Perm.id = userPerm.type1_id and (type1Perm.category = ${roleCategory} or type1Perm.category = 3)`)
      .where('userPerm.emplid = ?', userID)

    const result = await systemDB.Query(sql.toParam())
    return result.rows
  }

  static async getTypeII(role, type1, productType = []) {
    let sql = squel.select()
      .field('type2')
      .from('xray_dropdown')
      .distinct()
      // .where('eeme = UPPER(?) and product_type = ? and type1 = ?', role, productType, type1)
      .where('eeme = UPPER(?)', role)
      .where('type1 = ? ', type1)
      .order('type2')

    if (!_.isEmpty(productType)) {
      sql.where('product_type IN ?', productType)
    }

    const result = await systemDB.Query(sql.toParam())
    return result.rows
  }

  static async getSourcer(role, type1, type2, productType = []) {
    let sql = squel.select()
      .field('eine.ekgrp', 'scode')
      .field('hr.name_a', 'sourcer')
      .from('epur_itemtype', 'item')
      .join('epur_type1', 'type1', 'type1.type1id = item.type1id')
      .join('epur_type2', 'type2', 'type2.type2id = item.type2id')
      .join('eina', 'eina', ' eina.bmatn = item.item')
      .join('eine', 'eine', ' eine.infnr = eina.infnr')
      .join('epur_sourcerdef', 'sourcer', 'sourcer.scode = eine.ekgrp')
      .join('marc', 'marc', 'item.item = marc.matnr')
      .join('mara', 'mara', 'marc.matnr = mara.matnr')
      .join('v_businessorg_bo', 'finance', 'marc.PRCTR = finance.profit_center_key')
      .left_join('ps_ee_prcrmnt_vw_a', 'hr', 'sourcer.eno = hr.emplid')
      .distinct()
      // .where('type1.type1name = ? and type2.type2name = ? and finance.product_type_desc = ? and mara.zzeeme = ? ', type1, type2, productType, role)
      .where('type1.type1name = ? and type2.type2name = ? and mara.zzeeme = ? ', type1, type2, role)

    if (!_.isEmpty(productType)) {
      sql.where('finance.product_type_desc IN ?', productType)
    }

    const result = await systemDB.Query(sql.toParam())
    return result.rows
  }

  // spec title
  static async getSpecTitleByRole(role, type1, type2, productType = []) {

    let title_table = 'view_epur_spec_title'
    if (role == 'ME') title_table = 'me_spec_title'

    let sql = squel.select().distinct()
    if(role != 'ME') {
      sql.field('spec_t1')
    }
    sql.field('spec_t2').field('spec_t3').field('spec_t4').field('spec_t5')
      .field('spec_t6').field('spec_t7').field('spec_t8').field('spec_t9').field('spec_t10')
      .field('spec_t11').field('spec_t12').field('spec_t13').field('spec_t14').field('spec_t15')
      .field('spec_t16').field('spec_t17').field('spec_t18').field('spec_t19').field('spec_t20')
      .field('spec_t21').field('spec_t22').field('spec_t23').field('spec_t24').field('spec_t25')
      .field('spec_t26').field('spec_t27').field('spec_t28').field('spec_t29').field('spec_t30')
      // .from('epur_itemtype', 'item')
      .from(title_table, 'specTitle')
      .join('xray_dropdown', 'xray_dropdown', 'xray_dropdown.type1 = specTitle.type1name and xray_dropdown.type2 = specTitle.type2name')
      .where('specTitle.type1name = ? and specTitle.type2name = ?  and xray_dropdown.eeme = ? ', type1, type2, role)

    if (role == 'ME' && !_.isEmpty(productType)) {
      sql.where('specTitle.spec1 IN ?', productType)
    }

    const result = await systemDB.Query(sql.toParam())
    return result.rows
  }

  static async getSpecItemForEE(productType, type1, type2, sourcer) {

    let sql = squel.select().distinct()
      .field('spec1', 'spec01').field('spec2', 'spec02').field('spec3', 'spec03').field('spec4', 'spec04').field('spec5', 'spec05')
      .field('spec6', 'spec06').field('spec7', 'spec07').field('spec8', 'spec08').field('spec9', 'spec09').field('spec10')
      .field('spec11').field('spec12').field('spec13').field('spec14').field('spec15')
      .field('spec16').field('spec17').field('spec18').field('spec19').field('spec20')
      .field('spec21').field('spec22').field('spec23').field('spec24').field('spec25')
      .field('spec26').field('spec27').field('spec28').field('spec29').field('spec30')
      .from('epur_itemtype', 'item')
      .join('epur_itemspec', 'spec', 'spec.item = item.item')
      .join('epur_type1', 'type1', 'type1.type1id = item.type1id')
      .join('epur_type2', 'type2', 'type2.type2id = item.type2id')
      .join('marc', 'marc', 'item.item = marc.matnr')
      .join('mara', 'mara', 'marc.matnr = mara.matnr')
      .join('v_businessorg_bo', 'finance', 'marc.PRCTR = finance.profit_center_key')
      // .where('type1.type1name = ? and type2.type2name = ? and finance.product_type_desc = ? and mara.zzeeme = ? ', type1, type2, productType, 'EE')
      .where('LOWER(type1.type1name) = LOWER(?) and LOWER(type2.type2name) = LOWER(?) and finance.product_type_desc IN ? and mara.zzeeme = ? ', type1, type2, productType, 'EE')

    if (sourcer.length > 0) {
      sql.join('eina', 'eina', ' eina.bmatn = item.item')
        .join('eine', 'eine', ' eine.infnr = eina.infnr')
        .where('eine.ekgrp in ? ', sourcer)
    }

    const result = await systemDB.Query(sql.toParam())
    return result.rows
  }

  static async getSpecItemForME(type1, type2, sourcer, specN, spec, productType = []) {

    let sql = squel.select().distinct()
      .field(`spec${specN}`)
      .from('epur_itemtype', 'item')
      .join('epur_itemspec', 'spec', 'spec.item = item.item')
      .join('epur_type1', 'type1', 'type1.type1id = item.type1id')
      .join('epur_type2', 'type2', 'type2.type2id = item.type2id')
      .join('marc', 'marc', 'item.item = marc.matnr')
      .join('mara', 'mara', 'marc.matnr = mara.matnr')
      .join('v_businessorg_bo', 'finance', 'marc.PRCTR = finance.profit_center_key')
      .where('LOWER(type1.type1name) = LOWER(?) and LOWER(type2.type2name) = LOWER(?) and mara.zzeeme = ? and spec.spec1 is not null', type1, type2, 'ME')

    if (sourcer.length > 0) {
      sql.join('eina', 'eina', ' eina.bmatn = item.item')
        .join('eine', 'eine', ' eine.infnr = eina.infnr')
        .where('eine.ekgrp in ? ', sourcer)
    }

    if (specN > 1) {
      for (let i = specN - 1; i >= 1; i--) {
        let key = i < 10 ? `spec0${i}` : `spec${i}`
        sql.where(`spec${i} in ? and spec${specN} is not null`, spec[key])
      }
    }

    if (!_.isEmpty(productType)) {
      sql.where('finance.product_type_desc IN ?', productType)
    }
    const result = await systemDB.Query(sql.toParam())
    return result.rows
  }

  // v1
  static async getSCode(userID) {
    let sql = squel.select().field('Sourcer.scode').field('PS.name_a', 'sourcer').field('PS.deptid').field('Sourcer.groupname')
      .from('epur_sourcerdef', 'Sourcer').join('ps_ee_prcrmnt_vw_a', 'PS', 'Sourcer.eno = PS.emplid')
    if(userID){
      sql.where('PS.emplid = ? ', userID)
    }
    // let query = `SELECT Sourcer.scode, PS.name_a AS sourcer,PS.deptid, Sourcer.groupname
    //   FROM wiprocurement.epur_sourcerdef as Sourcer
    //   INNER JOIN wiprocurement.ps_ee_prcrmnt_vw_a AS PS on Sourcer.eno = PS.emplid`

    // query = userID != null ? query + ` WHERE PS.emplid = '${userID}';` : query + ';'
    const result = await systemDB.Query(sql.toParam())
    return result.rows
  }

  static async getSubordinateSCode(userID) {
    const result = await systemDB.Query(`WITH RECURSIVE result AS (
      --找出 [主管] 為 某人的資料當作 依據
      SELECT emplid, name_a, deptid
      FROM wiprocurement.ps_ee_prcrmnt_vw_a
      WHERE supervisor_id = '${userID}'

      UNION ALL
       --之後以 上面查出的結果 為依據遞迴查詢
      SELECT e.emplid, e.name_a, e.deptid
      FROM wiprocurement.ps_ee_prcrmnt_vw_a e
      INNER JOIN result ON result.emplid = e.supervisor_id
     )
     SELECT scode, name_a as sourcer, deptid, Sourcer.groupname
     FROM result
     INNER JOIN  wiprocurement.epur_sourcerdef AS Sourcer on Sourcer.eno = result.emplid
    `)
    return result.rows
  }

  static async getProxy(userID) {

    let sql = squel.select().distinct()
      .field('Proxy.scode').field('PS.name_a', 'sourcer').field('PS.deptid').field('Sourcer.groupname')
      .from('epur_sourcerproxy', 'Proxy')
      .join('epur_sourcerdef', 'Sourcer', 'Sourcer.scode = Proxy.scode')
      .join('ps_ee_prcrmnt_vw_a', 'PS', 'Sourcer.eno = PS.emplid')
      .where('eno_proxy = ?', userID)

    // const result = await systemDB.Query(
    //   `SELECT Proxy.scode, PS.name_a AS sourcer, PS.deptid, Sourcer.groupname
    //   FROM wiprocurement.epur_sourcerproxy as Proxy
    //   INNER JOIN wiprocurement.epur_sourcerdef AS Sourcer on Sourcer.scode = Proxy.scode
    //   INNER JOIN wiprocurement.ps_ee_prcrmnt_vw_a AS PS on Sourcer.eno = PS.emplid
    //   where eno_proxy ='${userID}';`
    // )
    const result = await systemDB.Query(sql.toParam())
    return result.rows
  }

  // static async getTypeIAndTypeII(scode) {
  //   let sql = squel.select().distinct()
  //     .field('ZZCONTYP1', 'type1').field('ZZCONTYP2', 'type2').field('Itemspec.scode')
  //     .from('wiprocurement.mara', 'Mara')
  //     .join(squel.select().field('item').field('scode').from('wiprocurement.epur_itemspec').where('scode IN ?', scode), 'Itemspec', 'Itemspec.item = Mara.matnr')
  //     .where('Mara.ZZCONTYP1 is not null AND Mara.ZZCONTYP2 is not null')
  //   // const result = await systemDB.Query(`
  //   // select distinct ZZCONTYP1 as type1, ZZCONTYP2 as type2, scode
  //   // from wiprocurement.mara as Mara
  //   // inner Join (
  //   // 	select item, scode
  //   //     from wiprocurement.epur_itemspec
  //   //     WHERE scode IN (${scode})
  //   // ) as Itemspec on Itemspec.item = Mara.matnr
  //   // where ZZCONTYP1 is not null and ZZCONTYP2 is not null`)
  //   const result = await systemDB.Query(sql.toParam())
  //   return result.rows

  // }

  static async checkSpecGroup(owner, specGroupName, role) {
    let sql = squel.select()
      .field('g_id')
      .from('specgroup')
      .where('g_owner = ? AND g_name = ? and role = ?', owner, specGroupName, role)

    // const result = await systemDB.Query(`
    //   SELECT g_id
    //   FROM wiprocurement.specgroup
    //   WHERE g_name = '${specGroupName}' and g_owner = '${owner}';`)

    const result = await systemDB.Query(sql.toParam())
    return result.rowCount == 0
  }

  static async checkOtherSpecGroupName(owner, specGroupName, gid, role) {
    let sql = squel.select()
      .field('g_id')
      .from('specgroup')
      .where('g_owner = ? AND g_id != ? AND g_name = ? and role = ?', owner, gid, specGroupName, role)

    // const result = await systemDB.Query(`
    //   SELECT g_id
    //   FROM wiprocurement.specgroup
    //   WHERE g_owner = '${owner}' and g_id != '${gid}' and g_name = '${specGroupName}';`)
    const result = await systemDB.Query(sql.toParam())
    return result.rowCount == 0
  }

  static async postSpecGroup(client, owner, role, specGroupName, type1, type2, productType = null) {

    let sql = squel.insert()
      .into('specgroup')
      .set('g_name', specGroupName)
      .set('g_owner', owner)
      .set('role', role)
      .set('type1', type1)
      .set('type2', type2)

    if (productType) {
      sql.set('product_type', productType)
    }

    try {
      sql.returning('g_id')
      let result = await client.query(sql.toParam())

      return result.length > 0 ? result[0] : {}

      // let result = await systemDB.Query(sql.toString() + ' RETURNING g_id')

      // let resultSQL = squel.select()
      //   .field('g_id')
      //   .from('specgroup')
      //   .where('g_name = ? AND g_owner = ? ', specGroupName, owner)

      // let result = await systemDB.Query(resultSQL.toParam())

      // return result.rowCount == 1 ? result.rows[0] : null
    } catch (err) {
      throwApiError('add group error', errorCode.ERRORFORMAT)
      return false
    }

    // let result = await co(systemDB.Query(sql)).then(()=> {
    //   return co(systemDB.Query(resultSQL.toParam())
    // `
    //   SELECT g_id
    //   FROM wiprocurement.specgroup
    //   WHERE g_name = '${spec.specGroupName}' and g_owner = '${owner}';
    // `)
    //   )
    // })

    // return result.rowCount == 1 ? result.rows[0] : null
  }

  static async postSpecGroupSourcer(client, values) {

    let sql = squel.insert()
      .into('specgroup_sourcer')
      .setFieldsRows(values)

    // const result = await systemDB.Query(sql.toString())
    try {
      let result = await client.query(sql.toString())
      return result
    } catch (err) {
      console.log('postSpecGroupSourcer', err)
      throw err
    }
  }

  static async postSpecGroupSpec(client, insertValue) {

    let sql = squel.insert()
      .into('specgroup_spec')
      .setFieldsRows(insertValue)

    // const result = await systemDB.Query(sql.toString())
    try{
      let result = await client.query(sql.toString())
      return result
    } catch (err) {
      console.log('postSpecGroupSpec', err)
      throw err
    }
  }

  // v1
  static async getSpecItems(scode, type1, type2) {

    let sql = squel.select().distinct()
      .field('spec1').field('spec2').field('spec3').field('spec4').field('spec5')
      .field('spec6').field('spec7').field('spec8').field('spec9').field('spec10')
      .field('spec11').field('spec12').field('spec13').field('spec14').field('spec15')
      .field('spec16').field('spec17').field('spec18').field('spec19').field('spec20')
      .field('spec21').field('spec22').field('spec23').field('spec24').field('spec25')
      .field('spec26').field('spec27').field('spec28').field('spec29').field('spec30')
      .from('epur_itemspec', 'Itemspec')
      .join('mara', 'Mara', 'Itemspec.item = Mara.matnr')
      .where('scode IN ? AND Mara.ZZCONTYP1 = ? AND Mara.ZZCONTYP2 = ?', scode, type1, type2)

    // const result = await systemDB.Query(`
    //   SELECT distinct spec1, spec2, spec3, spec4, spec5, spec6, spec7, spec8, spec9, spec10,
    //   spec11, spec12, spec13, spec14, spec15, spec16, spec17, spec18, spec19, spec20,
    //   spec21, spec22, spec23, spec24, spec25, spec26, spec27, spec28, spec29, spec30
    //   FROM wiprocurement.epur_itemspec as Itemspec
    //   INNER JOIN wiprocurement.mara as Mara on Itemspec.item = Mara.matnr
    //   WHERE scode in ('${scode}') and Mara.ZZCONTYP1 = '${type1}' and Mara.ZZCONTYP2 = '${type2}';
    // `)
    const result = await systemDB.Query(sql.toParam())
    return result.rows
  }

  static async getSourcerID(userName) {
    let sql = squel.select()
      .field('emplid', '"sID"')
      .from('ps_ee_prcrmnt_vw_a')
      .where('name_a = ? ', userName)

    // const result = await systemDB.Query(`
    //   SELECT emplid as "sID"
    //   FROM wiprocurement.ps_ee_prcrmnt_vw_a
    //   WHERE name_a = '${userName}';
    // `)
    const result = await systemDB.Query(sql.toParam())
    return result.rows
  }

  static async deleteGroupSpec(client, groupId) {
    // let sql = squel.select()
    //   .field('g_id')
    //   .from('specgroup')
    //   .where('g_id = ?', groupId)

    // let result = await client.query(sql.toString())

    // if (result.length > 0) {
    //   try {
    //     let spec = squel.delete()
    //       .from('specgroup_spec')
    //       .where('g_id = ?', groupId)
    //     await client.query(spec.toString())

    //     let sourcer = squel.delete()
    //       .from('specgroup_sourcer')
    //       .where('g_id = ?', groupId)
    //     await client.query(sourcer.toString())

    //     let group = squel.delete()
    //       .from('specgroup')
    //       .where('g_id = ?', groupId)
    //     await client.query(group.toString())

    //     return true
    //   } catch(err) {
    //     throw err
    //   }
    // } else {
    //   throwApiError('The Group Name not found.', errorCode.NOT_FOUND)
    // }
    let sql = `
    with del as (
      select specGroup.g_id
      from wiprocurement.specgroup as specGroup
      left join wiprocurement.specgroup_sourcer as Sourcer on specGroup.g_id=Sourcer.g_id
      left JOIN wiprocurement.specgroup_spec as Spec ON Spec.g_id = specGroup.g_id
      where specGroup.g_id = '${groupId}'
    ),
    del_t1 as (
        delete from wiprocurement.specgroup
        where g_id in (select g_id from del)
    ),
    del_t2 as (
        delete from wiprocurement.specgroup_sourcer
        where g_id in (select g_id from del)
    ),
    del_t3 as (
        delete from wiprocurement.specgroup_spec
        where g_id in (select g_id from del)
    )
    select * from wiprocurement.specgroup where g_id = '${groupId}';
  `

    try {
      // const result = await systemDB.Query()
      await client.query(sql)

      return true
    } catch(err) {
      console.log('deleteGroupSpec', err)
      throw err
    }
  }

  static async checkGroupPermission(id, groupId){
    let sql = squel.select()
      .field('g_id')
      .from('specgroup')
      .where('g_owner = ? AND g_id = ?', id, groupId)

    // const result = await systemDB.Query(`
    //   SELECT g_id
    //   FROM wiprocurement.specgroup
    //   WHERE g_owner = '${id}' and g_id = '${groupId}'
    // `)
    const result = await systemDB.Query(sql.toParam())
    return result.rowCount == 1 ? true : false
  }

  static async getSpecGroup(userID, role, groupID = null) {
    let sql = squel.select()
      .field('specgroup.g_id')
      .field('g_name')
      .field('g_owner')
      .field('type1')
      .field('type2')
      .field('role')
      .field('product_type')
      .field('name_a', 'owner')
      .from('specgroup', 'specgroup')
      .join('wiprocurement.user', 'userlist', 'specgroup.g_owner = userlist.emplid')
      .where('g_owner = ? and specgroup.role = ?', userID, role)

    if (groupID) {
      sql.where('specgroup.g_id = ?', groupID)
    }
    const result = await systemDB.Query(sql.toParam())

    if (result.rowCount > 0) {
      return result.rows
    } else {
      return []
    }
  }

  static async getSpecGroupScode(userID, role, groupID = null) {
    let sql = squel.select()
      .field('specgroup.g_id')
      .field('scode')
      .from('specgroup', 'specgroup')
      .join('specgroup_sourcer', 'sourcer', 'specgroup.g_id = sourcer.g_id')
      .where('g_owner = ? and specgroup.role = ?', userID, role)

    if (groupID) {
      sql.where('specgroup.g_id = ?', groupID)
    }

    const result = await systemDB.Query(sql.toParam())
    return result.rows
  }

  static async getSpecGroupSpec(userID, role, groupID = null) {
    let sql = squel.select()
      .field('specgroup.g_id')
      .field('spec')
      .field('item')
      .from('specgroup', 'specgroup')
      .join('specgroup_spec', 'spec', 'specgroup.g_id = spec.g_id')
      .where('g_owner = ? and specgroup.role = ?', userID, role)

    if (groupID) {
      sql.where('specgroup.g_id = ?', groupID)
    }

    const result = await systemDB.Query(sql.toParam())
    return result.rows
  }

  static async getSpecItemForMEBySpec(type1, type2, sourcer, spec, productType = []) {

    let sql = squel.select().distinct()
      .from('epur_itemtype', 'item')
      .join('epur_itemspec', 'spec', 'spec.item = item.item')
      .join('epur_type1', 'type1', 'type1.type1id = item.type1id')
      .join('epur_type2', 'type2', 'type2.type2id = item.type2id')
      .join('marc', 'marc', 'item.item = marc.matnr')
      .join('mara', 'mara', 'marc.matnr = mara.matnr')
      .join('v_businessorg_bo', 'finance', 'marc.PRCTR = finance.profit_center_key')
      .where('LOWER(type1.type1name) = LOWER(?) and LOWER(type2.type2name) = LOWER(?) and mara.zzeeme = ? ', type1, type2, 'ME')

    if (Object.keys(spec).length > 0) {
      Object.keys(spec).forEach((k, idx) => {

        let num = k.split('spec')[1]
        sql.field(`spec${Number(num)}`, `spec${num}` )
          .where(`spec${Number(num)} is not null`)

        if(idx < (Object.keys(spec).length - 1))
          sql.where(`spec${Number(num)} in ?`, spec[`spec${num}`])
      })
    }

    if (sourcer.length > 0) {
      sql.join('eina', 'eina', ' eina.bmatn = item.item')
        .join('eine', 'eine', ' eine.infnr = eina.infnr')
        .where('eine.ekgrp in ? ', sourcer)
    }

    if (!_.isEmpty(productType)) {
      sql.where('finance.product_type_desc IN ?', productType)
    }

    const result = await systemDB.Query(sql.toParam())
    return result.rows
  }

  static async getPartNumberSpec(role, partNumber) {
    let sql = squel.select().distinct()
      .field('spec1', 'spec01').field('spec2', 'spec02').field('spec3', 'spec03').field('spec4', 'spec04').field('spec5', 'spec05')
      .field('spec6', 'spec06').field('spec7', 'spec07').field('spec8', 'spec08').field('spec9', 'spec09').field('spec10')
      .field('spec11').field('spec12').field('spec13').field('spec14').field('spec15')
      .field('spec16').field('spec17').field('spec18').field('spec19').field('spec20')
      .field('spec21').field('spec22').field('spec23').field('spec24').field('spec25')
      .field('spec26').field('spec27').field('spec28').field('spec29').field('spec30')
      .from('epur_itemtype', 'item')
      .join('epur_itemspec', 'spec', 'spec.item = item.item')
      .join('epur_type1', 'type1', 'type1.type1id = item.type1id')
      .join('epur_type2', 'type2', 'type2.type2id = item.type2id')
      .join('marc', 'marc', 'item.item = marc.matnr')
      .join('mara', 'mara', 'marc.matnr = mara.matnr')
      .join('v_businessorg_bo', 'finance', 'marc.PRCTR = finance.profit_center_key')
      .where('item.item = ? and mara.zzeeme = ? and type1.type1name is not null and type2.type2name is not null', partNumber, role)

    const result = await systemDB.Query(sql.toParam())
    return result.rows
  }

  static async getPartNumberSearchBar(role, partNumber) {
    let sql = squel.select().distinct()
      .field('finance.product_type_desc', '"productType"')
      .field('type1.type1name', 'type1')
      .field('type2.type2name', 'type2')
      .from('epur_itemtype', 'item')
      .join('epur_type1', 'type1', 'type1.type1id = item.type1id')
      .join('epur_type2', 'type2', 'type2.type2id = item.type2id')
      .join('marc', 'marc', 'item.item = marc.matnr')
      .join('mara', 'mara', 'marc.matnr = mara.matnr')
      .join('v_businessorg_bo', 'finance', 'marc.PRCTR = finance.profit_center_key')
      .where('item.item = ? and mara.zzeeme = ? ', partNumber, role)

    const result = await systemDB.Query(sql.toParam())
    if (result.rowCount > 0) {
      return result.rows
    } else {
      throwApiError('Reference partNumber not found', errorCode.NOT_FOUND)
    }
  }

  static async getSpecTitle(type1, type2) {
    let sql = squel.select()
      .field('spec_t1').field('spec_t2').field('spec_t3').field('spec_t4').field('spec_t5')
      .field('spec_t6').field('spec_t7').field('spec_t8').field('spec_t9').field('spec_t10')
      .field('spec_t11').field('spec_t12').field('spec_t13').field('spec_t14').field('spec_t15')
      .field('spec_t16').field('spec_t17').field('spec_t18').field('spec_t19').field('spec_t20')
      .field('spec_t21').field('spec_t22').field('spec_t23').field('spec_t24').field('spec_t25')
      .field('spec_t26').field('spec_t27').field('spec_t28').field('spec_t29').field('spec_t30')
      .from('view_epur_spec_title').where('type1name = ? AND type2name = ?', type1, type2)

    // const query = `
    // SELECT spec_t1, spec_t2, spec_t3, spec_t4, spec_t5, spec_t6, spec_t7, spec_t8, spec_t9, spec_t10,
    //   spec_t11, spec_t12, spec_t13, spec_t14, spec_t15, spec_t16, spec_t17, spec_t18, spec_t19, spec_t20,
    //   spec_t21, spec_t22, spec_t23, spec_t24, spec_t25, spec_t26, spec_t27, spec_t28, spec_t29, spec_t30
    // FROM wiprocurement.view_epur_spec_title
    // where type1name = '${type1}' and type2name = '${type2}';
    // `
    let result = await systemDB.Query(sql.toParam())

    return result.rows
  }

  static async spaSupplyTypeByPN(pn, key) {
    let sql = squel.select()
      .distinct()
      .field('matnr')
      .field('zzbsar', 'supply')
      .from('marc')
      .where('matnr in ? and (ZZBSAR in ? or ZZBSAR is null)', pn, key)

    let res = await systemDB.Query(sql.toParam())
    return res.rowCount > 0 ? res.rows : []
  }

  static async getCESpecGroupbyType(type1, type2) {
    let sql = squel.select()
      .field('*')
      .from('eebom_spa_rules')
      .where('UPPER(type1) = UPPER(?) and UPPER(type2) = UPPER(?)', type1, type2)
    let res = await systemDB.Query(sql.toParam())
    return res.rowCount > 0 ? res.rows[0] : {}
  }
}
module.exports = Xray
