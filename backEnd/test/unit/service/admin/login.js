const { expect } = require('chai')
const sinon = require('sinon')
const loginService = require('../../../../server/service/admin/login.js')
const loginModel = require('../../../../server/model/admin/login.js')
const moment = require('moment')
describe('login', () => {
  describe('test login function', () => {
    it('use admin account to login', async () => {
      sinon.stub(loginModel, 'getLoginInfo').returns({
        emplid: '10700001',
        name_a: 'ADMIN',
        email_address: null,
        phone: null,
        supervisor_id: null,
        is_me: true,
        is_ce: true,
        is_ee: true,
        is_superuser: true,
        insdate: null,
        login_time: '2019-01-22T05:36:07.920Z',
        login_fail_count: 0,
        deptid: null })
      sinon.stub(loginModel, 'getUserInfo').returns(
        { emplid: '10511111',
          deptid: 'MH0E10',
          name_a: 'swpc',
          email_address_a: 'swpc@wistron.com',
          supervisor_id: '10312034',
          phone_a: '296' })
      sinon.stub(loginModel, 'initUser').returns([])
      sinon.stub(loginModel, 'login').returns([])
      sinon.stub(loginModel, 'updateLoginInfo').returns([])
      sinon.stub(loginModel, 'insertToken').returns(true)
      sinon.stub(loginModel, 'deleteTokeByTime').returns(true)
      let result = await loginService.login('10700001', 'Wieprocure', false)
      expect(result).to.be.a('object')
      expect(result.username).to.equal('ADMIN')
    })

    it('admin login error', async () => {
      sinon.stub(loginModel, 'getLoginInfo').returns({
        emplid: '10700001',
        name_a: 'ADMIN',
        email_address: null,
        phone: null,
        supervisor_id: null,
        is_me: true,
        is_ce: true,
        is_ee: true,
        is_superuser: true,
        insdate: null,
        login_time: '2019-01-22T05:36:07.920Z',
        login_fail_count: 0,
        deptid: null })
      sinon.stub(loginModel, 'initUser').returns([])
      sinon.stub(loginModel, 'login').returns([])
      sinon.stub(loginModel, 'updateLoginInfo').returns([])
      try {
        let result = await loginService.login('10700001', 'xxx', false)
      } catch(e) {
        expect(e).to.exist
      }
    })

    it('login three times error', async () => {
      sinon.stub(loginModel, 'getLoginInfo').returns({
        emplid: '10700001',
        name_a: 'ADMIN',
        email_address: null,
        phone: null,
        supervisor_id: null,
        is_me: true,
        is_ce: true,
        is_ee: true,
        is_superuser: true,
        insdate: null,
        login_time: moment.utc(),
        login_fail_count: 6,
        deptid: null })

      try {
        await loginService.login('10700001', 'xxx', false)
      } catch(e) {
        expect(e).to.exist
      }
    })

    /*
    it('test MH0E10 login', async () => {
      sinon.stub(loginModel, 'getLoginInfo').returns(false)
      sinon.stub(loginModel, 'getUserInfo').returns(
        { emplid: '10511111',
          deptid: 'MH0E10',
          name_a: 'swpc',
          email_address_a: 'swpc@wistron.com',
          supervisor_id: '10312034',
          phone_a: '296' })
      sinon.stub(loginModel, 'initUser').returns([])
      sinon.stub(loginModel, 'login').returns([])
      sinon.stub(loginModel, 'updateLoginInfo').returns([])
      sinon.stub(loginModel, 'insertToken').returns(true)
      sinon.stub(loginModel, 'deleteTokeByTime').returns(true)
      let result = await loginService.login('10511111', 'Wieprocure', false)
      expect(result).to.be.a('object')
      expect(result.username).to.equal('swpc')
    })
    it('test MH0E20 login', async () => {
      sinon.stub(loginModel, 'getLoginInfo').returns(false)
      sinon.stub(loginModel, 'getUserInfo').returns(
        { emplid: '10511111',
          deptid: 'MH0E20',
          name_a: 'swpc',
          email_address_a: 'swpc@wistron.com',
          supervisor_id: '10312034',
          phone_a: '296' })
      sinon.stub(loginModel, 'initUser').returns([])
      sinon.stub(loginModel, 'login').returns([])
      sinon.stub(loginModel, 'updateLoginInfo').returns([])
      sinon.stub(loginModel, 'insertToken').returns(true)
      sinon.stub(loginModel, 'deleteTokeByTime').returns(true)
      let result = await loginService.login('10511111', 'Wieprocure', false)
      expect(result).to.be.a('object')
      expect(result.username).to.equal('swpc')
    })
    it('test MH0E30 login', async () => {
      sinon.stub(loginModel, 'getLoginInfo').returns(false)
      sinon.stub(loginModel, 'getUserInfo').returns(
        { emplid: '10511111',
          deptid: 'MH0E30',
          name_a: 'swpc',
          email_address_a: 'swpc@wistron.com',
          supervisor_id: '10312034',
          phone_a: '296' })
      sinon.stub(loginModel, 'initUser').returns([])
      sinon.stub(loginModel, 'login').returns([])
      sinon.stub(loginModel, 'updateLoginInfo').returns([])
      sinon.stub(loginModel, 'insertToken').returns(true)
      sinon.stub(loginModel, 'deleteTokeByTime').returns(true)
      let result = await loginService.login('10511111', 'Wieprocure', false)
      expect(result).to.be.a('object')
      expect(result.username).to.equal('swpc')
    })*/
    it('test AUTH FAILED', async () => {
      sinon.stub(loginModel, 'getLoginInfo').returns(false)
      sinon.stub(loginModel, 'getUserInfo').returns(
        { emplid: '10511111',
          deptid: 'mkk123',
          name_a: 'swpc',
          email_address_a: 'swpc@wistron.com',
          supervisor_id: '10312034',
          phone_a: '296' })
      sinon.stub(loginModel, 'initUser').returns([])
      sinon.stub(loginModel, 'login').returns([])
      sinon.stub(loginModel, 'updateLoginInfo').returns([])
      sinon.stub(loginModel, 'insertToken').returns(true)
      sinon.stub(loginModel, 'deleteTokeByTime').returns(true)
      let result
      try {
        result = await loginService.login('10511111', 'Wieprocure', false)
      }catch(e) {
        expect(e).to.exist
      }
    })
  })

  afterEach(() => {
    // Restore the default sandbox here
    sinon.restore()
  })
})
