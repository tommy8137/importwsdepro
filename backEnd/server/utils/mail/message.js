const { mailConfig } = require('../../../config.js')
const REPLACE_MAIL_CONTENT_REG = /\$\{\w*\}/gi
const REMOVE_VARIABLE_SYMBOL_REG = /[\\$|\\{|\\}]/gi
class MailMessage {
  static _replactMailContentVariable(mailContent, replaceReg, removeSymbolReg, replaceObj) {
    return mailContent.replace(replaceReg, (variableName) => {
      const noSymbolVariableName = variableName.replace(removeSymbolReg, '')
      if(Object.prototype.hasOwnProperty.call(replaceObj, noSymbolVariableName)){
        return replaceObj[noSymbolVariableName]
      }
      return variableName
    })
  }
  /**
   * get nodemailer email MsgTemplte
   * @param {String} recevierName
   * @returns {Object}
   */
  static _getMsgTemplte(recevierMemberList){
    return  {
      from: mailConfig.sender,
      to: recevierMemberList.join(','),
      subject: '',
      text: '',
    }
  }
  static CEToSourcerMsg(bomProjectInfo, sourcerMemberList, bomProjectUrl){
    const msg = this._getMsgTemplte(sourcerMemberList)
    msg.subject = this._replactMailContentVariable(mailConfig.message.ceToSourcer.subject, REPLACE_MAIL_CONTENT_REG, REMOVE_VARIABLE_SYMBOL_REG, bomProjectInfo)
    msg.html = `${mailConfig.message.ceToSourcer.content}${mailConfig.message.common.content}`
    msg.html = this._replactMailContentVariable(msg.html, REPLACE_MAIL_CONTENT_REG, REMOVE_VARIABLE_SYMBOL_REG, {
      ...bomProjectInfo,
      bomProjectUrl: bomProjectUrl,
    })
    return msg
  }

  static sourcerToCEMsg(bomProjectInfo, ceMemberList, bomProjectUrl){
    const msg = this._getMsgTemplte(ceMemberList)
    msg.subject = this._replactMailContentVariable(mailConfig.message.sourcerToCE.subject, REPLACE_MAIL_CONTENT_REG, REMOVE_VARIABLE_SYMBOL_REG, bomProjectInfo)
    msg.html = `${mailConfig.message.sourcerToCE.content}${mailConfig.message.common.content}`
    msg.html = this._replactMailContentVariable(msg.html, REPLACE_MAIL_CONTENT_REG, REMOVE_VARIABLE_SYMBOL_REG, {
      ...bomProjectInfo,
      bomProjectUrl: bomProjectUrl,
    })
    return msg
  }
}
module.exports = MailMessage
