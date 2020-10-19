const nodemailer = require('nodemailer')
const { mailConfig : { authInfo, sender, enable, smtpAuthHost } } = require('../../../config.js')
const connectInfo = {
  host: authInfo.host,
  port: authInfo.port,
  logger: false,
  debug: false, // include SMTP traffic in the logs
}


if(Object.prototype.hasOwnProperty.call(smtpAuthHost, authInfo.host)){
  connectInfo.auth = {
    user: authInfo.smtp_user,
    pass: authInfo.smtp_password,
  }
}
const transporter = nodemailer.createTransport(connectInfo, {
  from: sender,
})

async function sendmail(message) {
  if(enable){
    await transporter.sendMail(message)
  }
}
module.exports = {
  sendmail,
}
