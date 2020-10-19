const { signToken, deleteToken, insertTokenExpireForTestUse } = require('../../server/helpers/authHelper')
let username = 'TEST'
let userID = '1234567'

class Generate {
  getToken(){
    return this.genRes
  }
  async generate(){
    let object = {
      isMe:true,
      isCe:false,
      isEe:false,
      isAdmin: false,
      isSourcer: true,
      isRd: false,
      isPm: false,
      isMeTmFm: false,
      isAccount: false,
      isContactWindow: false,
      loginTime: Date.now(),
    }
    let { access_token } = signToken(username, userID, object)
    this.genRes = access_token
    await insertTokenExpireForTestUse(userID, access_token)
    return access_token
  }
}

// let gen = new Generate()
// gen.generate().then((res) => {
//   console.log('genrante token is finished \r\n', gen.getToken())
//   process.exit(0)
// })
