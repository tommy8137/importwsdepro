const Postgres = require('./postgres')
// const Oracle = require('./oracle')
const { pgConfig, factoryDBConfig} = require('../../../config.js')


const systemDB = Postgres(pgConfig)
// const factoryDB = Oracle(factoryDBConfig)

module.exports = {
  systemDB,
  // factoryDB,
}
