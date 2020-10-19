const { expect } = require('chai')
const sinon = require('sinon')
const logoutService = require('../../../../server/service/admin/logout.js')
const loginModel = require('../../../../server/model/admin/login.js')


describe('logout', () => {
  describe('test login function', async () => {
    sinon.stub(loginModel, 'deleteToken').returns(true)
    let result = await logoutService.logout('10700001', '')
    expect(result).equals(true)
  })
})