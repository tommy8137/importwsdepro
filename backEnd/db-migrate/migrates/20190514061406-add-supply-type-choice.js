'use strict'

let dbm
let type
let seed
const fs = require('fs')
const path = require('path')

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
  const filePath = path.join(path.resolve('../') + '/db-migrate/migration_sql/20190514061406-add-supply-type-choice.sql')
  fs.readFile(filePath, { encoding: 'utf-8' }, function(err, data){
    if (err) return console.log(err)
    db.runSql(data, function(err) {
      if (err) return console.log(err)
      callback()
    })
  })
}

exports.down = function(db, callback) {
  const filePath = path.join(path.resolve('../') + '/db-migrate/rollback_sql/20190514061406-add-supply-type-choice.sql')
  fs.readFile(filePath, { encoding: 'utf-8' }, function(err, data){
    if (err) return console.log(err)
    db.runSql(data, function(err) {
      if (err) return console.log(err)
      callback()
    })
  })
}

exports._meta = {
  'version': 1,
}
