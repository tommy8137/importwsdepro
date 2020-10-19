const { expect } = require('chai')
const { sqlInjection } = require('../../../server/middlewares/sqlInjection.js')

describe('sqlInjection', () => {
  describe('test sqlInjection', () => {
    it('test body is not sql injection', async () => {
      let ctx = { origin:{ header:'xxx' }, params:{ parameter:'rs' }, request:{ body:{ dateTo:'2018-02-02', type1:['Antenna', 'Cable', 'EMC', 'Electro-Mechanical'], query:{ name:'wistron' } } } }
      let result = sqlInjection(ctx)
      // expect(result).to.equal('pop ASC,col DESC')
    })
    it('test sql injection', async () => {
      let ctx = { origin:{ header:'xxx' }, params:{ parameter:'rs' }, request:{ body:{ dateTo:'=02', type1:['Antenna', 'Cable', 'EMC', 'Electro-Mechanical'], query:{ name:'wistron' } } } }
      try{
        sqlInjection(ctx)
      }catch(e) {
        expect(e).to.exist
      }

    })
  })
})
