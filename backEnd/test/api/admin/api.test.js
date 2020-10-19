// const { test } = require('../../../config.json')
const { expect } = require('chai')
const supertest = require('supertest')
const helper = require('../api-test-helper')
const api = supertest(helper.testHost)
const Authorization = helper.genToken()

// const username = test.username
// const password = test.password

console.log(`try to login to ${helper.testHost}`)
// before((done) => {
//   api.post('admin/login') // 登入測試
//     .set('Accept', 'application/json')
//     .send({
//       'username': username,
//       'password': password,
//     })
//     .expect(200)
//     .end((err, res) => {
//       Authorization = res.body.access_token // 登入成功取得 JWT
//       console.log('auth', Authorization)
//       done()
//     })
// })

describe('Admin', () => {
  after(async () =>  {
    await helper.deleteAuthToken(Authorization)
  })
  describe('Login', async () => {
    await helper.insertToken(Authorization)
    // it('Body check', (done) => {
    //   api.post('admin/login')
    //     .set('Accept', 'application/json')
    //     .send({
    //       'username': username,
    //       'password': password,
    //     })
    //     .expect(200)
    //     .end((err, res) => {
    //       if (err) {
    //         done(err)
    //       }
    //       // Body validation
    //       expect(res.body).to.have.property('username')
    //       expect(res.body.username).to.be.a('string')
    //       expect(res.body).to.have.property('access_token')
    //       expect(res.body.access_token).to.be.a('string')
    //       expect(res.body).to.have.property('token_type')
    //       expect(res.body.token_type).to.be.a('string')
    //       expect(res.body).to.have.property('expires_in')
    //       expect(res.body.expires_in).to.be.a('string')
    //       expect(res.body).to.have.property('isAdmin')
    //       expect(res.body.isAdmin).to.be.a('boolean')
    //       done()
    //     })
    // })
  })
/*
  describe('api GET /admin/users', () => {
    it('should return 200, get users list', (done) => {
      api.get('admin/users?items=10&&pages=1&&orderBy=-name_a&&isCW=0')
        .set('Authorization', `Bearer ${Authorization}`)
        .expect(200)
        .end((err, res) => {
          if (err) {
            done(err)
          }
          // Body validation
          expect(res.body).to.have.property('userInfo')
          expect(res.body.userInfo).to.have.property('numberOfUser')
          expect(res.body.userInfo).to.have.property('userList')
          expect(res.body.userInfo.userList).to.be.a('array')
          done()
        })
    })

    it('should return a 401 response without Authorization ', (done) => {
      api.get('admin/users?items=10&&pages=1&&orderBy=-name_a&&isCW=0')
        .expect(401, done)
    })
  })
*/
  describe('api GET / admin/contactwindowlist', () => {
    it('should return 200, get contact window list', (done) => {
      api.get('admin/contactwindowlist')
        .set('Authorization', `Bearer ${Authorization}`)
        .expect(200)
        .end((err, res) => {
          if(err) {
            done(err)
          }
          //  Body validation
          expect(res.body).to.have.property('contactWindow')
          expect(res.body.contactWindow).to.be.a('array')
          expect(res.body.contactWindow[0]).to.have.property('name')
          expect(res.body.contactWindow[0].name).to.be.a('string')
          expect(res.body.contactWindow[0]).to.have.property('type')
          expect(res.body.contactWindow[0].type).to.be.a('string')
          expect(res.body.contactWindow[0]).to.have.property('list')
          expect(res.body.contactWindow[0].list).to.be.a('array')
          done()
        })
    })

    it('should return a 401 response without Authorization', (done) => {
      api.get('admin/contactwindowlist')
        .expect(401, done)
    })
  })

  describe('api POST /admin/user', () => {
    it('should return 200, create user', (done) => {
      let projects = {
        'emplid':'19901147',
        'name':'joe_cy_chen',
        'phone':296,
        'email':'joe_cy_chen@wistron.com',
        'isMe':false,
        'isCe':true,
        'isEe':true,
        'isRd':false,
        'isSourcer':false,
        'isMeTmFm':false,
        'isPm':false,
        'isAccount':false,
        'isContactWindow':false,
      }
      api.post('admin/user')
        .set('Authorization', `Bearer ${Authorization}`)
        .send(projects)
        .expect(200)
        .end((err, res) => {
          if (err) {
            done(err)
          }
          expect(res.status).is.equal(200)
          // Body validation
          done()
        })
    })
    it('should return a 401 response without Authorization ', (done) => {
      api.post('admin/user')
        .expect(401, done)
    })
  })

  describe('api PUT /admin/user/:id', () => {
    it('should return 200, update user permission', (done) => {
      api.put('admin/user/19901147')
        .set('Authorization', `Bearer ${Authorization}`)
        .send({
          'isCe':false,
          'isRd':true,
          'isSourcer':false,
          'isPm':false,
          'isAccount':false,
          'isMe':false,
          'isEe':false,
          'isMeTmFm':true,
          'isContactWindow':true,
        })
        .expect(200)
        .end((err, res) => {
          if (err) {
            done(err)
          }
          expect(res.status).is.equal(200)
          // Body validation
          done()
        })
    })

    it('should return a 401 response without Authorization ', (done) => {
      api.put('admin/user/19901147')
        .expect(401, done)
    })
  })
  /*
  describe('api GET /admin/user/:id', () => {
    it('should return 200, get user information', (done) => {
      api.get('admin/user/19901147')
        .set('Authorization', `Bearer ${Authorization}`)
        .expect(200)
        .end((err, res) => {
          if (err) {
            done(err)
          }
          expect(res.body).to.have.property('userInfo')
          expect(res.body.userInfo).to.have.property('emplid')
          expect(res.body.userInfo).to.have.property('name_a')
          expect(res.body.userInfo).to.have.property('email_address')
          expect(res.body.userInfo).to.have.property('phone')
          expect(res.body.userInfo).to.have.property('is_me')
          expect(res.body.userInfo).to.have.property('is_ce')
          expect(res.body.userInfo).to.have.property('is_ee')
          expect(res.body.userInfo).to.have.property('is_superuser')
          // Body validation
          done()
        })
    })

    it('should return a 401 response without Authorization ', (done) => {
      api.get('admin/user/19901147')
        .expect(401, done)
    })
  })*/
  describe('api DELETE /admin/user/:id', () => {
    it('should return 200, delete user', (done) => {
      api.delete('admin/user/19901147')
        .set('Authorization', `Bearer ${Authorization}`)
        .expect(200)
        .end((err, res) => {
          if (err) {
            done(err)
          }
          // Body validation
          done()
        })
    })

    it('should return a 401 response without Authorization ', (done) => {
      api.delete('admin/user/19901147')
        .expect(401, done)
    })
  })

  describe('api POST /admin/search/user', () => {
    it('should return 200, search user', (done) => {
      let info = {
        'name': 'ian k',
        'phone': null,
        'emplid': null,
        'email': null,
      }
      api.post('admin/search/user')
        .set('Authorization', `Bearer ${Authorization}`)
        .send(info)
        .expect(200)
        .end((err, res) => {
          if (err) {
            done(err)
          }
          expect(res.body).to.have.property('userList')
          expect(res.body.userList).to.be.a('array')
          // Body validation
          done()
        })
    })
    it('should return a 401 response without Authorization ', (done) => {
      api.post('admin/search/user')
        .expect(401, done)
    })
  })
/*
  describe('api GET /admin/permission', () => {
    it('should return 200, search user', (done) => {
      let info = {
        'name': 'ian k',
        'phone': null,
        'emplid': null,
        'email': null,
      }
      api.get(`admin/permission/${Authorization}`)
        .set('Authorization', `Bearer ${Authorization}`)
        .expect(200)
        .end((err, res) => {
          if (err) {
            done(err)
          }
          expect(res.body).to.have.property('userID')
          expect(res.body).to.have.property('isAdmin')
          expect(res.body).to.have.property('isCe')
          expect(res.body).to.have.property('isMe')
          expect(res.body).to.have.property('isEe')
          expect(res.body).to.have.property('isSourcer')
          expect(res.body).to.have.property('isRd')
          // Body validation
          done()
        })
    })
    it('should return a 401 response without Authorization ', (done) => {
      api.post('admin/search/user')
        .expect(401, done)
    })
  })*/
})
