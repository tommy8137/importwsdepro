const { expect } = require('chai')
const { useSemicolonForArr, useParenthesesForArr, formatDate } = require('../../../../server/helpers/query/processString.js')

describe('process String', () => {
  describe('test  useSemicolonForArr', () => {
    it('test', async () => {
      let str = ['s10', 's12', 's13']
      let result = useSemicolonForArr(str)
      expect(result).to.exist
    })
  })

  describe('test  useParenthesesForArr', () => {
    it('test useParenthesesForArr', async () => {
      let str = ['s10', 's12', 's13']
      let result = useParenthesesForArr(str)
      expect(result[0]).to.contains('(')
    })
  })

  describe('test  formatDate', () => {
    it('test formatDate', async () => {
      let result = formatDate('2019-01-29T06:31:12.916Z')
      expect(result).to.equals('20190129')
    })
  })
})
