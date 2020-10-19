const squel = require('squel').useFlavour('postgres')
const { systemDB } = require('../helpers/database')
const _ = require('lodash')

module.exports = async function schemaFilter(tableName, data) {
  let sql = squel.select().field('*').from('information_schema.columns').where('table_schema = ?', 'wiprocurement').where('table_name = ?', tableName)
  let result = await systemDB.Query(sql.toParam())
  const columnNames = result.rows.map(item => item.column_name)
  if(_.isArray(data)){
    return data.map(d => _.pick(d, columnNames))
  }else{
    return _.pick(data, columnNames)
  }
}
