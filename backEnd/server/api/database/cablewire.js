const cablewireService = require('../../service/database/cablewire.js')
const { throwApiError, errorCode } = require('../../helpers/errorCode/apiErrorHelper.js')
const log4js = require('../../utils/logger/logger')
const logger = log4js.getLogger('Database Cable Wire')

class CableWire {
  // -- Cable Wire Parameters --
  async getCableWireParameter(ctx) {
    try {
      let result = await cablewireService.fetchCableWireParameter()

      ctx.body = result
      ctx.status = 200
    } catch (err) {
      logger.warn('error request for Database Cable Wire getCableWireParameter function', err)
      throwApiError(err.message, err.status)
    }
  }

  // -- Cable Wire Material Price --
  async getCableWireMaterialPrice(ctx) {
    try {

      const result = await cablewireService.fetchCableWireMaterialPrice()
      ctx.body = result
      ctx.status = 200

    } catch (err) {
      logger.warn('error request for Database Cable Wire getCableWireMaterialPrice function', err)
      throwApiError(err.message, err.status)
    }
  }

  // -- Cable Wire Connector Price --
  async getCableWireConnectorPrice(ctx) {
    try {

      const result = await cablewireService.fetchCableWireConnectorPrice()
      ctx.body = result
      ctx.status = 200

    } catch (err) {
      logger.warn('error request for Database Cable Wire getCableWireConnectorPrice function', err)
      throwApiError(err.message, err.status)
    }
  }

  async putCableWireConnectorPrice(ctx) {
    try {

      let { nextId, items } = ctx.request.body
      let result = await cablewireService.modifyCableWireConnectorPrice(nextId, items)

      ctx.body = result
      ctx.status = 200
    } catch (err) {
      logger.warn('error request for Database Diecut putCableWireConnectorPrice function', err)
      throwApiError(err.message, errorCode.updateFailed)
    }
  }
}

module.exports = CableWire
