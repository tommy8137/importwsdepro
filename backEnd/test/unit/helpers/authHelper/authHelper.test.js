const { expect } = require('chai')
const { jwtVerify, signToken, checkTokenExpire } = require('../../../../server/helpers/authHelper')
const loginModel = require('../../../../server/model/admin/login.js')
const sinon = require('sinon')
const moment = require('moment')

let Authorization

describe('Helpers', () => {
  describe('authHelper', () => {

    it('test function signToken', (done) => {
      Authorization = signToken('Test User ME', '10302037', false, false, false, true)

      expect(Authorization).to.be.a('object')
      expect(Authorization.access_token).to.be.a('string')
      done()
    })

    it('test function jwtVerify', (done) => {
      let user = jwtVerify(Authorization.access_token)

      expect(user).to.be.a('object')
      expect(user.username).equal('Test User ME')
      done()
    })

    it('check token expire time', (done) =>{
      let user = jwtVerify(Authorization.access_token)
      sinon.stub(loginModel, 'getTokeExpireTime').returns({ token:Authorization.access_token, expire_time: moment(Date().now).add(2, 'hours').format('YYYY-MM-DD HH:mm:ss') })
      sinon.stub(loginModel, 'deleteToken').returns(true)
      checkTokenExpire(user.userID, Authorization.access_token).then((res) =>{
        expect(res).equal(true)
        done()
      })
    })
    afterEach(() => {
      // Restore the default sandbox here
      sinon.restore()
    })
  })
})
