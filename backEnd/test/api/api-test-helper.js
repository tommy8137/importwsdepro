
const { test: testConfig } = require('../../config.js')
const { port } = require('../../config.js')
const { signToken, insertTokenExpire, deleteToken, insertTokenForTest } = require('../../server/helpers/authHelper')

const checkURL = () => {
  if (testConfig.url == '__TEST_URL__') {
    console.log('>> No valid URL founded, use localhost instead')
    return `https://localhost:${port}/`
  } else {
    return testConfig.url
  }
}
const testHost = checkURL()
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0
const genToken = (username = 'TEST USER', userID = '10403304') => {
  let object = {
    isMe:true,
    isCe:true,
    isEe:true,
    isAdmin: true,
    isSourcer: true,
    isRd: true,
    isPm: true,
    isMeTmFm: true,
    isAccount: true,
    isContactWindow: true,
    loginTime: Date.now(),
  }
  let { access_token } = signToken(username, userID, object)
  return access_token
}
const genEEToken = (username = 'TEST USER', userID = '10503307') => {
  let object = {
    isMe:true,
    isCe:true,
    isEe:true,
    isAdmin: true,
    isSourcer: true,
    isRd: true,
    isPm: true,
    isMeTmFm: true,
    isAccount: true,
    isContactWindow: true,
    loginTime: Date.now(),
  }
  let { access_token } = signToken(username, userID, object)
  return access_token
}
const insertEEToken = async(token, userID = '10503307' ) =>{
  await insertTokenExpire(userID, token)
}
const deleteEEAuthToken = async(token, userID = '10503307') =>{
  await deleteToken(userID, token)
}
const insertToken = async(token, userID = '10403304') =>{
  await insertTokenExpire(userID, token)
}

const insertTokenExpireForTestUse = async(token, userId) => {
  await insertTokenForTest(token, userId)
}

const deleteAuthToken = async(token, userID = '10403304') =>{
  await deleteToken(userID, token)
}


module.exports = { testHost, genToken, insertToken, deleteAuthToken, genEEToken, insertEEToken, deleteEEAuthToken }
