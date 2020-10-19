const { expect } = require('chai')
const sinon = require('sinon')
const userService = require('../../../../server/service/admin/user.js')
const userModel = require('../../../../server/model/admin/user.js')
//describe('user', () => {
  //describe('test getUserByKeyword', () => {
    /*
    it('to get admin information', async () => {
      sinon.stub(userModel, 'getUserInfo').returns(
        { emplid: '10700001',
          name_a: 'ADMIN',
          email_address: null,
          phone: null,
          is_me: true,
          is_ce: true,
          is_ee: true,
          is_superuser: true })
      sinon.stub(userModel, 'getUserByKeyword').returns(
        [{ emplid: '10700001',
          name_a: 'ADMIN',
          email_address: null,
          phone: null,
          is_me: true,
          is_ce: true,
          is_ee: true,
          is_superuser: true }]
      )
      sinon.stub(userModel, 'getUserByKeywordNumber').returns(1)
      const info = {
        isRd: 'false',
        isSourcer: 'false',
        isMe: 'false',
        isEe: 'false',
        isMeTmFm: 'false',
        isPm: 'false',
        isAccount: 'false',
      }
      let result = await userService.getUserByKeyword(1, 10, 'name_a', 'admin', 0, info)
      expect(result.userInfo).to.be.a('object')
      expect(result.userInfo.userList).to.be.eql([{ emplid: '10700001',
        name_a: 'ADMIN',
        email_address: null,
        phone: null,
        is_me: true,
        is_ce: true,
        is_ee: true,
        is_superuser: true }])
      expect(result.userInfo.userList).to.be.a('array')
    })*/
    /*
    it('test keyword is ee', async () => {
      sinon.stub(userModel, 'getUserInfo').returns(
        { emplid: '10700001',
          name_a: 'ADMIN',
          email_address: null,
          phone: null,
          is_me: true,
          is_ce: true,
          is_ee: true,
          is_superuser: true })
      sinon.stub(userModel, 'getUserByKeyword').returns(
        [{ emplid: '10700001',
          name_a: 'ADMIN',
          email_address: null,
          phone: null,
          is_me: true,
          is_ce: true,
          is_ee: true,
          is_superuser: true }]
      )
      sinon.stub(userModel, 'getUserByKeywordNumber').returns(1)
      const info = {
        isRd: 'false',
        isSourcer: 'false',
        isMe: 'false',
        isEe: 'false',
        isMeTmFm: 'false',
        isPm: 'false',
        isAccount: 'false',
      }
      let result = await userService.getUserByKeyword(1, 10, 'name_a', 'ee', 0, info)
      expect(result.userInfo).to.be.a('object')
      expect(result.userInfo.userList).to.be.eql([{ emplid: '10700001',
        name_a: 'ADMIN',
        email_address: null,
        phone: null,
        is_me: true,
        is_ce: true,
        is_ee: true,
        is_superuser: true }])
      expect(result.userInfo.userList).to.be.a('array')
    })

    it('test keyword is me', async () => {
      sinon.stub(userModel, 'getUserInfo').returns(
        { emplid: '10700001',
          name_a: 'ADMIN',
          email_address: null,
          phone: null,
          is_me: true,
          is_ce: true,
          is_ee: true,
          is_superuser: true })
      sinon.stub(userModel, 'getUserByKeyword').returns(
        [{ emplid: '10700001',
          name_a: 'ADMIN',
          email_address: null,
          phone: null,
          is_me: true,
          is_ce: true,
          is_ee: true,
          is_superuser: true }]
      )
      sinon.stub(userModel, 'getUserByKeywordNumber').returns(1)
      const info = {
        isRd: 'false',
        isSourcer: 'false',
        isMe: 'false',
        isEe: 'false',
        isMeTmFm: 'false',
        isPm: 'false',
        isAccount: 'false',
      }
      let result = await userService.getUserByKeyword(1, 10, 'name_a', 'me', 0, info)
      expect(result.userInfo).to.be.a('object')
      expect(result.userInfo.userList).to.be.eql([{ emplid: '10700001',
        name_a: 'ADMIN',
        email_address: null,
        phone: null,
        is_me: true,
        is_ce: true,
        is_ee: true,
        is_superuser: true }])
      expect(result.userInfo.userList).to.be.a('array')
    })
    it('test keyword is ce', async () => {
      sinon.stub(userModel, 'getUserInfo').returns(
        { emplid: '10700001',
          name_a: 'ADMIN',
          email_address: null,
          phone: null,
          is_me: true,
          is_ce: true,
          is_ee: true,
          is_superuser: true })
      sinon.stub(userModel, 'getUserByKeyword').returns(
        [{ emplid: '10700001',
          name_a: 'ADMIN',
          email_address: null,
          phone: null,
          is_me: true,
          is_ce: true,
          is_ee: true,
          is_superuser: true }]
      )
      sinon.stub(userModel, 'getUserByKeywordNumber').returns(1)
      const info = {
        isRd: 'false',
        isSourcer: 'false',
        isMe: 'false',
        isEe: 'false',
        isMeTmFm: 'false',
        isPm: 'false',
        isAccount: 'false',
      }
      let result = await userService.getUserByKeyword(1, 10, 'name_a', 'ce', 0, info)
      expect(result.userInfo).to.be.a('object')
      expect(result.userInfo.userList).to.be.eql([{ emplid: '10700001',
        name_a: 'ADMIN',
        email_address: null,
        phone: null,
        is_me: true,
        is_ce: true,
        is_ee: true,
        is_superuser: true }])
      expect(result.userInfo.userList).to.be.a('array')
    })
  })*/
  /*
  describe('test getContactWindowList', () => {
    it('to get contact window information', async () => {
      sinon.stub(userModel, 'getContactWindowList').returns(
        [{ emplid: '10611079',
          name_a: 'TOMMY TSAI',
          email_address: null,
          phone: null,
          is_me: true,
          is_ce: false,
          is_ee: false,
          is_superuser: false,
          is_sourcer: false,
          is_rd: true,
          is_pm: false,
          is_me_tm_fm: false,
          is_account: false,
          is_contact_window: true }]
      )
      const info = {
        isRd: 'false',
        isSourcer: 'false',
        isMe: 'false',
        isEe: 'false',
        isMeTmFm: 'false',
        isPm: 'false',
        isAccount: 'false',
      }
      let result = await userService.getContactWindowList()
      expect(result.contactWindow).to.be.a('array')
      expect(result.contactWindow[0].name).to.be.eql('RD')
      expect(result.contactWindow[0].list).to.be.a('array')
      expect(result.contactWindow[0].list).to.be.eql([{
        emplid: '10611079',
        name_a: 'TOMMY TSAI',
        email_address: null,
        phone: null,
        is_me: true,
        is_ce: false,
        is_ee: false,
        is_superuser: false,
        is_sourcer: false,
        is_rd: true,
        is_pm: false,
        is_me_tm_fm: false,
        is_account: false,
        is_contact_window: true,
      }])
    })
  })
  */
  /*
  describe('test getUserInfo', () => {
    it('test getUserInfo', async () => {
      sinon.stub(userModel, 'getUserInfo').returns(
        { emplid: '10700001',
          name_a: 'ADMIN',
          email_address: null,
          phone: null,
          is_me: true,
          is_ce: true,
          is_ee: true,
          is_superuser: true })
      let result = await userService.getUserInfo('10700001')
      expect(result).to.be.a('object')
      expect(result).to.be.eql({ userInfo:
        { emplid: '10700001',
          name_a: 'ADMIN',
          email_address: null,
          phone: null,
          is_me: true,
          is_ce: true,
          is_ee: true,
          is_superuser: true } })
    })
  })
  */
 /*
  describe('CRUD user', () => {
    it('create user', async () => {
      let userInfo = {
        'emplid':'10755558',
        'name':'swpc_swpc',
        'phone':24445,
        'email':'swpc_swpc@wistron.com',
        'isMe':false,
        'isCe':true,
        'isEe':false,
      }
      sinon.stub(userModel, 'createUser').returns('create success')
      let result = await userService.createUser(userInfo)
      expect(result).to.equal('create success')
    })
    it('search user', async () => {
      sinon.stub(userModel, 'searchUser').returns(1)
      let result = await userService.searchUser({ name: null, phone: null, emplid: '10755558', email: null })
      expect(result).to.be.a('object')
    })
    it('test getUserInfo', async () => {
      let info =   { emplid: '10755558',
        name_a: 'swpc_swpc',
        email_address: 'swpc_swpc@wistron.com',
        phone: '24445',
        is_me: false,
        is_ce: true,
        is_ee: false,
        is_superuser: false }
      sinon.stub(userModel, 'getUserInfo').returns(info)
      let result = await userService.getUserInfo('10755558')
      expect(result).to.be.a('object')
      expect(result).to.be.eql({ userInfo:
        { emplid: '10755558',
          name_a: 'swpc_swpc',
          email_address: 'swpc_swpc@wistron.com',
          phone: '24445',
          is_me: false,
          is_ce: true,
          is_ee: false,
          is_superuser: false } })
    })
    it('update user', async () => {
      sinon.stub(userModel, 'updateUser').returns('update success')
      let result = await userService.updateUser(true, '10755558')
      expect(result).to.equal('update success')
    })

    it('delete user', async () => {
      sinon.stub(userModel, 'deleteUser').returns('delete success')
      let result = await userService.deleteUser('10755558')
      expect(result).to.equal('delete success')
    })
  })*/
  /*afterEach(() => {
    // Restore the default sandbox here
    sinon.restore()
  })*/
//})
