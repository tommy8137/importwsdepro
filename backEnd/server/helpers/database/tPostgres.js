const pg = require('pg')
const { pgConfig } = require('../../../config.js')
const { systemDB } = require('../../helpers/database')

class tPostgre {
  constructor() {
    return new Promise(async (resolve, reject) => {
      try {
        // this.pool = new pg.Pool({
        //   user: pgConfig.pgName,
        //   host: pgConfig.pgIp,
        //   database: pgConfig.pgDb,
        //   password: pgConfig.pgPw,
        //   port: pgConfig.pgPort,
        //   idleTimeoutMillis: pgConfig.idleTimeoutMillis,
        // })
        let info = new Error('WARNING : The transaction is over 1 minute.This will happen when job need more then 1 minute or trasaction not release.')
        this.interval = setInterval(() => {
          console.log(info.stack)
        }, 60000)
        this.pool = systemDB.pool
        pg.defaults.parseInt8 = true
        this.client = await this.pool.connect()
        await this.client.query(`SET search_path TO '${pgConfig.pgSchema}'`)
        await this.client.query('BEGIN')
      } catch (ex) {
        if(this.client){
          this.client.release()
          clearInterval(this.interval)
        }
        reject(ex)
      }
      resolve(this)
    })
  }

  async query(sql, params){
    return new Promise(async (resolve, reject) =>{
      try{
        let res = await this.client.query(sql, params)
        resolve(res.rows)
      } catch (ex) {
        await this.rollback()
        reject(ex)
      }
    })
  }

  async queryWithoutRollback(sql, params){
    return new Promise(async (resolve, reject) =>{
      try{
        let res = await this.client.query(sql, params)
        resolve(res.rows)
      } catch (ex) {
        reject(ex)
      }
    })
  }

  async commit(){
    return new Promise(async (resolve, reject) =>{
      try{
        let res = await this.client.query('COMMIT')
        resolve(res)
      } catch (ex) {
        reject(ex)
      }finally {
        this.client.release()
        clearInterval(this.interval)
      }
    })
  }

  async rollback(){
    return new Promise(async (resolve, reject) =>{
      try{
        let res = await this.client.query('ROLLBACK')
        resolve(res)
      } catch (ex) {
        reject(ex)
      }finally {
        this.client.release()
        clearInterval(this.interval)
      }
    })
  }

}
module.exports = tPostgre
