const { systemDB } = require('../../helpers/database')
const { pgConfig } = require('../../../config.js')
const log4js = require('../logger/logger')
const logger = log4js.getLogger('BomItemService-dbHelper')

function filterKeys(params) {
  this.params = params
}

filterKeys.prototype.exclude = function (keys) {
  for (let i = 0; i < keys.length; i++) {
    let key = keys[i]
    delete this.params[key]
  }
  return this.params
}

module.exports = {
  filterKeys,
  atomic: function (func) {
    async function wrapper(...args) {
      let client = await systemDB.pool.connect()
      await client.query(`SET search_path TO '${pgConfig.pgSchema}'`)
      args.unshift(client)
      try {
        await client.query('BEGIN')
        logger.debug('--- BEGIN ---')
        let res = await func.apply(this, args)
        await client.query('COMMIT')
        logger.debug('--- COMMIT ---')
        await client.release()
        return res
      } catch (err) {
        logger.warn('--- ROLLBACK ---', err)
        await client.query('ROLLBACK')
        await client.release()
        if (err instanceof Error) {
          throw err
        }
        throw new Error(err.toString())
      } finally {
        logger.warn('--- TRANSACTION END ---')
      }
    }
    return wrapper
  },
}
