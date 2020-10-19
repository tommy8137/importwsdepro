'use strict'

let dbm
let type
let seed
const fs = require('fs')
const path = require('path')
// const folderPath = path.join(path.resolve('../') + '/db-migrate/migration_sql/')
const folderPath = '../migration_sql/v1/'
/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate
  type = dbm.dataType
  seed = seedLink
}

exports.up = function(db, callback) {
  const folderPath = path.join(path.resolve('../') + '/db-migrate/migration_sql/v1/')
  const sqls = fs.readdirSync(folderPath)
  for(let i = 0 ;i < sqls.length; i++) {
    let filePath = path.join(path.resolve('../') + `/db-migrate/migration_sql/v1/${sqls[i]}`)
    fs.readFile(filePath, { encoding: 'utf-8' }, function(err, data){
      if (err) return console.log(err)
      db.runSql(data, function(err) {
        if (err) return console.log(err)
      })
      callback()

    })
  }
}

exports.down = function(db) {
  return null
}

exports._meta = {
  'version': 1,
}
