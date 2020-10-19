let squel = require('squel').useFlavour('postgres')
const uuidv4 = require('uuid/v4')

class File {
  constructor(data) {
    let fileid = uuidv4()
    this.versionid = data.hasOwnProperty('versionid') ? data.versionid : null
    this.fileid = data.hasOwnProperty('fileid') ? data.fileid : fileid
    this.filetype = data.hasOwnProperty('filetype') ? data.filetype : null
    this.fileversion = data.hasOwnProperty('fileversion') ? data.fileversion : null
    this.filedate = data.hasOwnProperty('filedate') ? data.filedate : null
    this.uuid = data.hasOwnProperty('uuid') ? data.uuid : fileid
  }
  static getAll() {
    return squel.select().from('c_files').toString()
  }
  static getByID(uuid) {
    return squel.select().from('c_files').where('uuid = ?', uuid).toParam()
  }
  static insert(data) {
    let sql = squel.insert()
      .into('c_files')
      .set('versionid', data.versionid)
      .set('fileid', data.fileid)
      .set('filetype', data.filetype)
      .set('fileversion', data.fileversion)
      .set('filedate', data.filedate)
    if (data.uuid) sql.set('uuid', data.uuid)
    return sql.toString()
  }
}

class FileCostbom {
  constructor(data) {
    this.versionid = data.hasOwnProperty('versionid') ? data.versionid : null
    this.fileid = data.hasOwnProperty('fileid') ? data.fileid : null
    this.partid = data.hasOwnProperty('partid') ? data.partid : null
    this.uuid = data.hasOwnProperty('uuid') ? data.uuid : uuidv4()
  }
  static insert(data) {
    let sql = squel.insert()
      .into('c_file_costbom')
      .set('versionid', data.versionid)
      .set('fileid', data.fileid)
      .set('partid', data.partid)
      .set('parts_ctgy_1', data.parts_ctgy_1)
      .set('parts_ctgy_2', data.parts_ctgy_2)
    if (data.uuid) sql.set('uuid', data.uuid)
    return sql.toString()
  }

}
module.exports = { File, FileCostbom }
