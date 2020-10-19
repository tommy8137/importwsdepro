/* eslint-disable no-magic-numbers */
let squel = require('squel').useFlavour('postgres')
const { systemDB } = require('../../helpers/database')
const _ = require('lodash')

class Database {
  static async getAll() {
    const headerSQL = Header.getAll()
    const header = await systemDB.Query(headerSQL)
    const dataSQL = Data.getAll()
    const data = await systemDB.Query(dataSQL)
    const result = {}
    const uniqTableType = _.uniqBy(header.rows, 'tabletype')
    const numberLength = 5

    _.forEach(uniqTableType, (value) => {
      if (!result.hasOwnProperty(value.tabletype)) {
        result[value.tabletype] = {}
      }

      const headerFilter = _.filter(header.rows, (f) => { return f.tabletype === value.tabletype })
      const res = _.map(headerFilter, (v) => {
        try {
          let detailFilter = _.map(_.filter(data.rows, (f) => { return f.tabletype === value.tabletype && f.tablename === v.tablename }), (item) => { return JSON.parse(item.data) })
          detailFilter = _.map(detailFilter, (f) => {
            _.forEach(f, (v, k) => {
              if (typeof v === 'number' && v.toString().length > numberLength) {
                f[k] = v.toFixed(numberLength)
              }
            })
            return f
          })
          const headerObj = {}
          headerObj.key = v.headerkey
          headerObj.name = v.headername
          headerObj.typeof = v.headertypeof
          if (!result[value.tabletype].hasOwnProperty(v.tablename)) {
            const headerData = []
            headerData.push(headerObj)
            result[value.tabletype][v.tablename] = { 'header': headerData, 'data': detailFilter }
          } else {
            result[value.tabletype][v.tablename].header.push(headerObj)
          }
          return result
        } catch (ex) {
          return {}
        }
      })
      return res
    })

    return result
  }
  static async updateTable(type, name, user) {
    const tableSQL = Table.getByID(type, name)
    const tableResult = await systemDB.Query(tableSQL)
    // check if table exist
    if (tableResult.rowCount === 1) {
      // update table
      let table = new Table(tableResult.rows[0])
      table.versionnumber += 1
      table.updateby = user
      table.updatetime = new Date().toISOString()
      const result = await systemDB.Query(Table.update(table))
      if (result.rowCount === 1) return true
      else return false
    }
    return false
  }
  static async getTable(query) {
    const tableSQL = Table.getAll(query)
    const table = await systemDB.Query(tableSQL)
    return table.rows
  }
  static async getType(query) {
    const sSQL = Table.getType(query)
    const data = await systemDB.Query(sSQL)
    return data.rows
  }
  static async getHeader() {
    const headerSQL = Header.getAll()
    const header = await systemDB.Query(headerSQL)
    return header.rows
  }

  static async write(data) {
    // console.log(data)
    Object.keys(data).forEach( type => {
      // console.log(type)
      Object.keys(data[type]).forEach( name => {
        // console.log('=>', name)
        const { header: rowHeader, data: rowData } = data[type][name]
        // console.log(rowHeader)
        rowHeader.forEach(async h => {
          let header = new Header({
            tabletype: type,
            tablename: name,
            headerkey: h.key,
            headername: h.name,
            headertypeof: h.typeof,
          })
          await systemDB.Query(Header.insert(header))
          // console.log(header)
        })
        // console.log(rowData)
        rowData.forEach(async r => {
          let data = new Data({
            tabletype: type,
            tablename: name,
            data: JSON.stringify(r),
          })
          await systemDB.Query(Data.insert(data))
          // console.log(data)
        })
      })
    })
    return null
  }

  static async delete(tabletype, tablename){
    return await systemDB.Query(Data.delete(tabletype, tablename)).then(() => {return true}).catch(() => {return false})
  }

  static async insertDetailData(inserData, tabletype, tablename){
    let res = await Promise.all(
      _.map(inserData, async (v, k) => {
        let data = new Data({
          tabletype: tabletype,
          tablename: tablename,
          data: JSON.stringify(v),
        })

        let insertRes = await systemDB.Query(Data.insert(data)).then(() => { return true }).catch(() => {
          return false
        })
        if (!insertRes) {
          return `fail insert in row ${k + 1}`
        }else{
          return ''
        }
      })
    )
    return res
  }

  static async insertOrUpdateData(tabletype, tablename, user, data) {
    // let isExist = false
    let res = []
    
    // Delete header before insert
    res.push(Header.delete(tabletype, tablename))
    let tableRes = await systemDB.Query(Table.getAll({ type: tabletype, name:tablename }))

    await Promise.all(
      _.forEach(data.header, async (item) => {
        let headerData = new Header({
          tabletype: tabletype,
          tablename: tablename,
          headerkey: item.key,
          headername: item.name,
          headertypeof: item.typeof,
        })
        // let headerRes = await systemDB.Query(Header.select(headerData)).then((v) => { return v }).catch((err) => { return false })
        // if (headerRes.rowCount && headerRes.rowCount > 0) {
        //   this.isExist = true
        // }
        // insert header sql string
        res.push( Header.insert(headerData))
      })
    )
 
    if(tableRes.rowCount && tableRes.rowCount <= 0){
      // insert version sql string
      let tableData = new Table({
        tabletype : tabletype,
        tablename : tablename,
        versionnumber : 1,
        updateby : user,
        updatetime : new Date().toISOString(),
      })
      res.push(Table.insert(tableData))
    }

    // Delete detail data sql string
    res.push(Data.delete(tabletype, tablename))

    // Filter duplicate data
    let filterDupData = _.map(
      _.uniq(
        _.map(data.data, (obj) => {
          return JSON.stringify(obj)
        })
      ), (obj) => {
        return JSON.parse(obj)
      }
    )
   
    // Insert detail data sql string
    _.forEach(filterDupData, async (v, k) => {
      let data = new Data({
        tabletype: tabletype,
        tablename: tablename,
        data: JSON.stringify(v),
      })

      res.push(Data.insert(data))
    })
    const result = await systemDB.transactions(res).then((v) => {
      return true
    }).catch(() => {
      return false
    })
    return result
  }
}

class Table {
  constructor(data) {
    this.tabletype = data.hasOwnProperty('tabletype') ? data.tabletype : null
    this.tablename = data.hasOwnProperty('tablename') ? data.tablename : null
    this.versionnumber = data.hasOwnProperty('versionnumber') ? data.versionnumber : null
    this.updateby = data.hasOwnProperty('updateby') ? data.updateby : null
    this.updatetime = data.hasOwnProperty('updatetime') ? data.updatetime : null
  }
  static getAll(query) {
    let sql = squel.select()
      .field('t.tabletype', 'tabletype')
      .field('t.tablename', 'tablename')
      .field('t.versionnumber', 'versionnumber')
      .field('coalesce(u.name_a, t.updateby)', 'updateby')
      .field('t.updatetime', 'updatetime')
      .from('costgen_database_table', 't')
      .left_join('wiprocurement.user', 'u', 't.updateby = u.emplid')
    if (query.type) sql.where('tabletype = ?', query.type)
    let colMapping = { tableName:'tablename', updateBy:'updateby', updateDate:'updatetime', version:'versionnumber' }
    let order = query.orderBy && query.orderBy.indexOf('-') === 0 ? false : true
    let field = query.orderBy ? query.orderBy.replace(/[-+]/g, '').trim() : null
    let column = typeof colMapping[field] == 'undefined' ? 'tablename' : colMapping[field]
    sql.order(column, order)
    return sql.toString()
  }
  static getType() {
    let sql = squel.select().from('costgen_database_table').field('tabletype').distinct()
    return sql.toString()
  }
  static getByID(tabletype, tablename) {
    return squel.select().from('costgen_database_table').where('tabletype = ?', tabletype).where('tablename = ?', tablename).toParam()
  }
  static insert(data) {
    let sql = squel.insert()
      .into('costgen_database_table')
      .set('tabletype', data.tabletype)
      .set('tablename', data.tablename)
      .set('versionnumber', data.versionnumber)
      .set('updateby', data.updateby)
      .set('updatetime', data.updatetime)
    return sql.toString()
  }
  static update(data) {
    let sql = squel.update()
      .table('costgen_database_table')
      .set('versionnumber', data.versionnumber)
      .set('updateby', data.updateby)
      .set('updatetime', data.updatetime)
      .where('tabletype = ?', data.tabletype).where('tablename = ?', data.tablename)
    return sql.toString()
  }
}
class Header {
  constructor(data) {
    this.tabletype = data.hasOwnProperty('tabletype') ? data.tabletype : null
    this.tablename = data.hasOwnProperty('tablename') ? data.tablename : null
    this.headerkey = data.hasOwnProperty('headerkey') ? data.headerkey : null
    this.headername = data.hasOwnProperty('headername') ? data.headername : null
    this.headertypeof = data.hasOwnProperty('headertypeof') ? data.headertypeof : null
  }
  static getAll() {
    return squel.select().from('costgen_database_header').toString()
  }
  static getByID(tabletype, tablename, headerkey) {
    return squel.select().from('costgen_database_header').where('tabletype = ?', tabletype).where('tablename = ?', tablename).where('headerkey = ?', headerkey).toParam()
  }
  static insert(data) {
    let sql = squel.insert()
      .into('costgen_database_header')
      .set('tabletype', data.tabletype)
      .set('tablename', data.tablename)
      .set('headerkey', data.headerkey)
      .set('headername', data.headername)
      .set('headertypeof', data.headertypeof)
    return sql.toString()
  }

  static select(data) {
    return squel.select().from('costgen_database_header')
      .where('tabletype = ?', data.tabletype)
      .where('tablename = ?', data.tablename)
      .where('headerkey = ?', data.headerkey)
      // .where('headertypeof = ?', data.headertypeof)
      .toParam()
  }

  static update(data) {
    return squel.update()
      .table('costgen_database_header')
      .set('tabletype = ?',  data.tabletype)
      .set('tablename = ?', data.tablename)
      .set('headerkey = ?', data.headerkey)
      .set('headername = ?', data.headername)
      .set('headertypeof = ?',  data.headertypeof)
      .where('tabletype = ?', data.tabletype)
      .where('tablename = ?', data.tablename)
      .where('headerkey = ?', data.headerkey)
      // .where('headertypeof = ?', data.headertypeof)
      .toParam()
  }

  static delete(tabletype, tablename) {
    return squel.delete()
      .from('costgen_database_header')
      .where('tabletype = ?', tabletype)
      .where('tablename = ?', tablename).toParam()
  }
}
class Data {
  constructor(data) {
    this.tabletype = data.hasOwnProperty('tabletype') ? data.tabletype : null
    this.tablename = data.hasOwnProperty('tablename') ? data.tablename : null
    this.data = data.hasOwnProperty('data') ? data.data : null
  }
  static getAll() {
    return squel.select().from('costgen_database_data').toString()
  }
  static getByID(tabletype, tablename) {
    return squel.select().from('costgen_database_data').where('tabletype = ?', tabletype).where('tablename = ?', tablename).toParam()
  }
  static delByID(tabletype, tablename) {
    return squel.delete().from('costgen_database_data').where('tabletype = ?', tabletype).where('tablename = ?', tablename).toParam()
  }
  static insert(data) {
    let sql = squel.insert()
      .into('costgen_database_data')
      .set('tabletype', data.tabletype)
      .set('tablename', data.tablename)
      .set('data', data.data)
    return sql.toString()
  }

  static delete(tabletype, tablename) {
    return squel.delete()
      .from('costgen_database_data')
      .where('tabletype = ?', tabletype)
      .where('tablename = ?', tablename).toParam()
  }
}

module.exports = { DatabaseModel: Database, HeaderModel: Header, DataModel: Data }