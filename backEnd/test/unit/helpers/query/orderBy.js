const { expect } = require('chai')
const { orderByString } = require('../../../../server/helpers/query/orderBy.js')

describe('query', () => {
  describe('test order By string', () => {
    it('use admin account to login', async () => {
      let str = 'pop,-col'
      let result = orderByString(str)
      expect(result).to.equal('pop ASC,col DESC')
    })
  })
})
