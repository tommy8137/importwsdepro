const { systemDB } = require('../../helpers/database')
const { orderByString } = require('../../helpers/query/orderBy.js')

const replaceMeProjecQuerytStr = (str, key, keyword) =>{
  if(key == 'sourcercost' || key == 'systemcost') {
    str = str.replace(`UPPER(t.${key}) LIKE UPPER('%${keyword}%')`, `to_char(t.${key},'999D99S') LIKE '%${keyword}%'`)
  } else if(key == 'stagename') {
    str = str.replace(`UPPER(t.${key}) LIKE UPPER('%${keyword}%')`, `UPPER(k.${key}) LIKE '%${keyword}%'`)
  }else if (key == 'none' || keyword == 'none') {
    str = str.replace(`where UPPER(t.${key}) LIKE UPPER('%${keyword}%')`, '')
  }
  return str
}
class Me {

  static async getMeprojectList(items, offset, orderBy, key, keyword) {
    const orderByStr = orderByString(orderBy)
    let queryStr = `select t.projectname ,t.projectcode,t.product,t.productspec,t.bgkey,t.profitcenter,t.submitby,t.stage,t.confirmby,t.filedate,t.currency,t.sourcercost,t.systemcost,k.stagename\
      from (select a.projectname ,a.projectcode,a.product,a.productspec,a.bgkey,a.profitcenter,b.submitby,b.stage,b.confirmby,c.filedate,e.currency,sum(f.sourcercost) as sourcercost,sum(g.costprice) as systemcost\
      from wiprocurement.c_projects a \
       left join wiprocurement.c_versions as b on a.versionid= b.uuid\
       left join wiprocurement.c_files as c on b.uuid = c.versionid\
       left join wiprocurement.c_file_costbom as d on c.versionid = d.versionid\
       left join wiprocurement.c_parts as e on d.partid=e.partid\
       left join wiprocurement.c_part_cleansheets as f on e.partid=f.partid\
       left join wiprocurement.c_cleansheet_cost as g on f.cleansheetid = g.cleansheetid\
       group by a.projectname ,a.projectcode,a.product,a.productspec,a.bgkey,a.profitcenter,b.submitby,b.stage,b.confirmby,c.filedate,e.currency)t LEFT JOIN wiprocurement.product_profitcenter_to_stage k\
      on t.profitcenter =k.profitcenter\
      and  t.product =k.product\
      and  t.stage  = k.stage \
      where UPPER(t.${key}) LIKE UPPER('%${keyword}%')\
      order by ${orderByStr} limit ${items} offset ${offset}`
    queryStr =  replaceMeProjecQuerytStr(queryStr, key, keyword)
    const result = await systemDB.Query(queryStr)
    return result.rows
  }
  static async getMeprojectAmount(key, keyword) {
    let queryStr = `select count(1) as total\
      from (select a.projectname ,a.projectcode,a.product,a.productspec,a.bgkey,a.profitcenter,b.submitby,b.stage,b.confirmby,c.filedate,e.currency,sum(f.sourcercost) as sourcercost,sum(g.costprice) as systemcost\
      from wiprocurement.c_projects a \
       left join wiprocurement.c_versions as b on a.versionid= b.uuid\
       left join wiprocurement.c_files as c on b.uuid = c.versionid\
       left join wiprocurement.c_file_costbom as d on c.versionid = d.versionid\
       left join wiprocurement.c_parts as e on d.partid=e.partid\
       left join wiprocurement.c_part_cleansheets as f on e.partid=f.partid\
       left join wiprocurement.c_cleansheet_cost as g on f.cleansheetid = g.cleansheetid\
       group by a.projectname ,a.projectcode,a.product,a.productspec,a.bgkey,a.profitcenter,b.submitby,b.stage,b.confirmby,c.filedate,e.currency)t LEFT JOIN wiprocurement.product_profitcenter_to_stage k\
      on t.profitcenter =k.profitcenter\
      and  t.product =k.product\
      and  t.stage  = k.stage \
      where UPPER(t.${key}) LIKE UPPER('%${keyword}%')`
    queryStr =  replaceMeProjecQuerytStr(queryStr, key, keyword)
    const res = await systemDB.Query(queryStr)
    return res.rowCount == 1 ? res.rows[0].total : 0
  }
  static async getMeprojectInfo(projectCode) {
    let queryStr = `select  projectname ,projectcode,product,productspec,bgkey,profitcenter,versionid,createby from wiprocurement.c_projects where projectcode = '${projectCode}' `
    const res = await systemDB.Query(queryStr)
    return res.rows[0]
  }
  static async getVersionInfo(projectInfo) {
    let queryStr = `select b.submitby,b.stage,b.confirmby,b.versionnumber,b.submittime,c.stagename  from  wiprocurement.c_versions b\
    left join wiprocurement.product_profitcenter_to_stage c \
    on b.stage  = c.stage\
    where b.uuid = '${projectInfo.versionid}'\
    and  c.profitcenter ='${projectInfo.profitcenter}'\
    and  c.product ='${projectInfo.product}'\
    order by b.stage `
    const res = await systemDB.Query(queryStr)
    return res.rows
  }
  static async getDashBoardInfo(projectName) {
    const res = await systemDB.Query(`select * from wiprocurement.all_pmprjtbl_for_dashboard where projectname = '${projectName}'`)
    return res.rows[0]
  }
}
module.exports = Me
