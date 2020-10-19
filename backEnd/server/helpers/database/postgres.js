const pg = require('pg')
const moment = require('moment')
const types = require('pg').types
types.setTypeParser(1114, (val) => {
  return val === null ? null : moment.utc(val).format() // mark 掉 時間會全部變 Date物件 而不是String
})
// pg.types.setTypeParser(1114, str => moment.utc(str).format())

let connCounter = 0
const Postgres = (dbconfig) => {
  const pool = new pg.Pool({
    user: dbconfig.pgName,
    host: dbconfig.pgIp,
    database: dbconfig.pgDb,
    password: dbconfig.pgPw,
    port: dbconfig.pgPort,
    idleTimeoutMillis: dbconfig.idleTimeoutMillis,
    max: 10,
    application_name: `wiepro-server-${process.pid}`,
  })

  pool.on('error', function (err) {
    console.log('Database error!', err)
  })

  pool.on('acquire', function (cli) {
    // console.log('pg pool acquire,',counter++)
  })

  pool.on('connect', function (cli) {
    connCounter++
    console.log(`after connect, ${connCounter} client in pg pool`)
  })

  pool.on('remove', function (cli) {
    connCounter--
    console.log(`after remove, ${connCounter}client in pg pool`)
  })



  return {
    pool,
    Query: (sql, params) => {
      try {
        return new Promise((resolve, reject) => {
          pg.defaults.parseInt8 = true
          pool.connect(function (err, client, done) {
            if (err) {
              console.log(`database connection error`, err)
              reject({ message: 'could not connect to postgres', code: 404 })
            }
            if (client == null || typeof client.query != 'function') {
              throw new Error('property query null')
            } else {
              client.query(`SET search_path TO '${dbconfig.pgSchema}'`).then(res => {
                return client.query(sql, params)
              }).then(res => {
                done()
                resolve(res)
              }).catch(e => {
                console.error(sql)
                console.error(e.stack)
                done()
                reject({ message: 'error running query', code: 400 })
              })
            }
          })

        })
      } catch (e) {
        console.log(`error === ${e}`)
      }
    },
    batchInsert: async (sql, params) => {
      pg.defaults.parseInt8 = true
      const client = await pool.connect()
      try {
        if (client == null || typeof client.query != 'function') {
          throw new Error('property query null')
        } else {
          await client.query(`SET search_path TO '${dbconfig.pgSchema}'`)
          await client.query('BEGIN')
          for (let i = 0; i < params.length; i++) {
            await client.query(sql, params[i])
          }
          const result = await client.query('COMMIT')
          await client.release()
          return result
        }

      } catch (err) {
        await client.query('ROLLBACK')
        console.log(`error === ${err}`)
      }
    },
    transactions: async (querys) => {
      const client = await pool.connect()
      try {
        await client.query(`SET search_path TO '${dbconfig.pgSchema}'`)
        await client.query('BEGIN')
        for (let i = 0; i < querys.length; i++) {
          await client.query(querys[i]).catch(err => {
            throw new Error(err)
          })
        }
        await client.query('COMMIT')
      } catch (e) {
        await client.query('ROLLBACK')
        throw e
      } finally {
        client.release()
      }
    },
    tx: async callback => {
      const client = await pool.connect()
      try {
        await client.query('BEGIN')
        await client.query(`SET search_path TO '${dbconfig.pgSchema}'`)
        try {
          await callback(client)
          client.query('COMMIT')
        } catch (e) {
          client.query('ROLLBACK')
        }
      } finally {
        client.release()
      }
    },
    testQ: async (sql, params) => {
      pg.defaults.parseInt8 = true
      const client = await pool.connect()
      if (client == null || typeof client.query != 'function') {
        throw new Error('property query null')
      } else {
        await client.query('BEGIN')
        await client.query(`SET search_path TO '${dbconfig.pgSchema}'`)
        await client.query('BEGIN')
        let result = await client.query(sql, params)
        await client.query('COMMIT')
        await client.release()
        return result
      }

    },
  }
}

module.exports = Postgres
