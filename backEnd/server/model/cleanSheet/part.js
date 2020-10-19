let squel = require('squel').useFlavour('postgres')
const uuidv4 = require('uuid/v4')

class Part {
  constructor(data) {
    let partid = uuidv4()
    this.partid = data.hasOwnProperty('partid') ? data.partid : partid
    this.partlevel = data.hasOwnProperty('partlevel') ? data.partlevel : null
    this.partnumber = data.hasOwnProperty('partnumber') ? data.partnumber : null
    this.partname = data.hasOwnProperty('partname') ? data.partname : null
    this.uuid = data.hasOwnProperty('uuid') ? data.uuid : partid
  }
  static getAll() {
    return squel.select().from('c_parts').toString()
  }
  static getByID(uuid) {
    return squel.select().from('c_parts').where('uuid = ?', uuid).toParam()
  }
  static insert(data) {
    let sql = squel.insert()
      .into('c_parts')
      .set('partid', data.partid)
      .set('partlevel', data.partlevel)
      .set('partnumber', data.partnumber)
      .set('partname', data.partname)
    if (data.uuid) sql.set('uuid', data.uuid)
    return sql.toString()
  }
}
class PartCleansheet {
  constructor(data) {
    this.partid = data.hasOwnProperty('partid') ? data.partid : null
    this.type = data.hasOwnProperty('type') ? data.type : null
    this.vendor = data.hasOwnProperty('vendor') ? data.vendor : null
    this.parttype = data.hasOwnProperty('parttype') ? data.parttype : null
    this.sourcercost = data.hasOwnProperty('sourcercost') ? data.sourcercost : null
    this.cleansheetid = data.hasOwnProperty('cleansheetid') ? data.cleansheetid : uuidv4()
    this.uuid = data.hasOwnProperty('uuid') ? data.uuid : uuidv4()
  }
  static insert(data) {
    let sql = squel.insert()
      .into('c_part_cleansheets')
      .set('partid', data.partid)
      .set('type', data.type)
      .set('vendor', data.vendor)
      .set('parttype', data.parttype)
      .set('sourcercost', data.sourcercost)
      .set('cleansheetid', data.cleansheetid)
    if (data.uuid) sql.set('uuid', data.uuid)
    return sql.toString()
  }
}
class CleansheetCost {
  constructor(data) {
    this.cleansheetid = data.hasOwnProperty('cleansheetid') ? data.cleansheetid : null
    this.costname = data.hasOwnProperty('costname') ? data.costname : null
    this.costdata = data.hasOwnProperty('costdata') ? data.costdata : null
    this.costprice = data.hasOwnProperty('costprice') ? data.costprice : null
    this.uuid = data.hasOwnProperty('uuid') ? data.uuid : uuidv4()
  }
  static insert(data) {
    let sql = squel.insert()
      .into('c_cleansheet_cost')
      .set('cleansheetid', data.cleansheetid)
      .set('costname', data.costname)
      .set('costdata', data.costdata)
      .set('costprice', data.costprice)
    if (data.uuid) sql.set('uuid', data.uuid)
    return sql.toString()
  }
}
module.exports = { Part, PartCleansheet, CleansheetCost }