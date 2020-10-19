
const { systemDB } = require('../../helpers/database')
let squel = require('squel').useFlavour('postgres')

class Monitor {
  static async info(){
    let sql = squel.select()
      .field('version()')
    const result = await systemDB.testQ(sql.toParam())
    return result.rows
  }


}
module.exports = Monitor
