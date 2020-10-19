let squel = require('squel').useFlavour('postgres')
const uuidv4 = require('uuid/v4')
class Project {
  constructor(data) {
    this.projectcode = data.hasOwnProperty('projectcode') ? data.projectcode : null
    this.projectname = data.hasOwnProperty('projectname') ? data.projectname : null
    this.product = data.hasOwnProperty('product') ? data.product : null
    this.bgkey = data.hasOwnProperty('bgkey') ? data.bgkey : null
    this.productspec = data.hasOwnProperty('productspec') ? data.productspec : null
    this.createby = data.hasOwnProperty('createby') ? data.createby : null
    this.createtime = data.hasOwnProperty('createtime') ? data.createtime : new Date()
    this.versionid = data.hasOwnProperty('versionid') ? data.versionid : null
    this.profitcenter = data.hasOwnProperty('profitcenter') ? data.profitcenter : null
    this.site = data.hasOwnProperty('site') ? data.site : null
    this.uuid = data.hasOwnProperty('uuid') ? data.uuid : uuidv4()
  }
  static getAll() {
    return squel.select().from('c_projects').toString()
  }
  static getByID(uuid) {
    return squel.select().from('c_projects').where('uuid = ?', uuid).toParam()
  }
  static insert(data) {
    let sql = squel.insert()
      .into('c_projects')
      .set('projectcode', data.projectcode)
      .set('projectname', data.projectname)
      .set('product', data.product)
      .set('bgkey', data.bgkey)
      .set('productspec', data.productspec)
      .set('createby', data.createby)
      .set('createtime', squel.rstr('NOW()'))
      .set('profitcenter', data.profitcenter)
      .set('versionid', data.versionid)
      .set('site', data.site)
    if (data.uuid) sql.set('uuid', data.uuid)
    return sql.toString()
  }
  static update(data) {
    let sql = squel.update()
      .table('c_projects')
    if (data.hasOwnProperty('projectcode')) sql.set('projectcode', data.projectcode)
    if (data.hasOwnProperty('projectname')) sql.set('projectname', data.projectname)
    if (data.hasOwnProperty('product')) sql.set('product', data.product)
    if (data.hasOwnProperty('bgkey')) sql.set('bgkey', data.bgkey)
    if (data.hasOwnProperty('productspec')) sql.set('productspec', data.productspec)
    // if (data.hasOwnProperty('createby')) sql.set('createby', data.createby)
    // if (data.hasOwnProperty('createtime')) sql.set('createtime', data.createtime)
    if (data.hasOwnProperty('versionid')) sql.set('versionid', data.versionid)
    if (data.hasOwnProperty('profitcenter')) sql.set('profitcenter', data.profitcenter)
    if (data.hasOwnProperty('site')) sql.set('site', data.site)
    return sql.toString()
  }
}
module.exports = Project
