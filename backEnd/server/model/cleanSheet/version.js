let squel = require('squel').useFlavour('postgres')
const uuidv4 = require('uuid/v4')

class Version {
  constructor(data) {
    this.stage = data.hasOwnProperty('stage') ? data.stage : null
    this.versionnumber = data.hasOwnProperty('versionnumber') ? data.versionnumber : null
    this.createtime = data.hasOwnProperty('createtime') ? data.createtime : new Date().toISOString()
    this.submitby = data.hasOwnProperty('submitby') ? data.submitby : null
    this.submittime = data.hasOwnProperty('submittime') ? data.submittime : null
    this.confirmby = data.hasOwnProperty('confirmby') ? data.confirmby : null
    this.confirmtime = data.hasOwnProperty('confirmtime') ? data.confirmtime : null
    this.confirmstatus = data.hasOwnProperty('confirmstatus') ? data.confirmstatus : null
    this.uuid = data.hasOwnProperty('uuid') ? data.uuid : uuidv4()
  }
  static getAll() {
    return squel.select().from('c_versions').toString()
  }
  static getByID(uuid) {
    return squel.select().from('c_versions').where('uuid = ?', uuid).toParam()
  }
  static insert(data) {
    let sql = squel.insert()
      .into('c_versions')
      .set('stage', data.stage)
      .set('versionnumber', data.versionnumber)
      .set('createtime', data.createtime)
      .set('submitby', data.submitby)
      .set('submittime', data.submittime)
      .set('confirmby', data.confirmby)
      .set('confirmtime', data.confirmtime)
      .set('confirmstatus', data.confirmstatus)
    if (data.uuid) sql.set('uuid', data.uuid)
    return sql.toString()
  }
  
}
module.exports = Version
