const ffcService = require('../../service/database/ffc.js')
const ffcDtService = require('../../service/database/ffcDt.js')
const { throwApiError, errorCode } = require('../../helpers/errorCode/apiErrorHelper.js')
const log4js = require('../../utils/logger/logger')
const logger = log4js.getLogger('Database Cable FFC')

class CableFFC {
  // -- Cable FFC Parameters --
  async getFfcParameter(ctx) {
    try {
      let { productTypeId } = ctx.request.query
      let result = null
      
      if (productTypeId && parseInt(productTypeId, 10) === 1) {
        result = await ffcService.fetchFfcParameter()// NB
      } else {
        result = await ffcDtService.fetchFfcParameter(productTypeId)// DT AIO
      }
      ctx.body = result
      ctx.status = 200
    } catch (err) {
      logger.warn('error request for Database Cable FFC getFfcParameter function', err)
      throwApiError(err.message, err.status)
    }
  }
  // -- Cable FFC Connector 清單 --
  async getFfcConnector(ctx) {
    try {
      let result = await ffcService.fetchFfcConnector()
      ctx.body = result
      ctx.status = 200
    } catch (err) {
      logger.warn('error request for Database Cable FFC getConnector function', err)
      throwApiError(err.message, err.status)
    }
  }
  // -- Cable FFC Connector 價目表 --
  async getFfcConnectorPrice(ctx) {
    try {
      let result = await ffcService.fetchFfcConnectorPrice()
      ctx.body = result
      ctx.status = 200
    } catch (err) {
      logger.warn('error request for Database Cable FFC getConnector function', err)
      throwApiError(err.message, err.status)
    }
  }
  async putFfcConnectorPrice(ctx) {
    try {
      let { nextId, items } = ctx.request.body
      let result = await ffcService.modifyFfcConnectorPrice(nextId, items)
      ctx.body = result
      ctx.status = 200
    } catch (err) {
      logger.warn('error request for Database Cable FFC putFfcConnectorPrice function', err)
      throwApiError(err.message, err.status)
    }
  }
  // -- Cable FFC DT Connector --
  async getFfcDtConnector(ctx) {
    try {
      let { productTypeId } = ctx.request.query
      let result = await ffcDtService.fetchFfcConnector(productTypeId)
      ctx.body = result
      ctx.status = 200
    } catch (err) {
      logger.warn('error request for Database Cable FFC getFfcDtParameter function', err)
      throwApiError(err.message, err.status)
    }
  }

  // -- Cable FFC DT Material --
  async getFfcDtMaterial(ctx) {
    try {
      let { productTypeId } = ctx.request.query
      let result = await ffcDtService.fetchFfcMaterial(productTypeId)
      ctx.body = result
      ctx.status = 200
    } catch (err) {
      logger.warn('error request for Database Cable FFC getFfcDtMaterial function', err)
      throwApiError(err.message, err.status)
    }
  }

  // -- Cable FFC DT Accessories --
  async getFfcDtAccessories(ctx) {
    try {
      let { productTypeId } = ctx.request.query
      let result = await ffcDtService.fetchFfcAccessories(productTypeId)
      ctx.body = result
      ctx.status = 200
    } catch (err) {
      logger.warn('error request for Database Cable FFC getFfcDtAccessories function', err)
      throwApiError(err.message, err.status)
    }
  }

  // -- Cable FFC DT Accessories --
  async getFfcDtReinforcementBoard(ctx) {
    try {
      let { productTypeId } = ctx.request.query
      let result = await ffcDtService.fetchFfcReinforcementBoard(productTypeId)
      ctx.body = result
      ctx.status = 200
    } catch (err) {
      logger.warn('error request for Database Cable FFC getFfcDtReinforcementBoard function', err)
      throwApiError(err.message, err.status)
    }
  }
  // -- Cable FFC DT modify price --
  async putFfcDtPrice(ctx) {
    try {
      let { path } = ctx.request
      let splitPath = path.split('/')
      let finalPath = splitPath[splitPath.length - 1]
      let { nextId, items } = ctx.request.body
      if (!nextId || !items || !items.length) {
        throwApiError('Invaild input', errorCode.BAD_REQUEST)
      }
      let result = await ffcDtService.putFfcDtPrice({ finalPath, nextId, items })
      ctx.body = result
      ctx.status = 200
    } catch (err) {
      logger.warn('error request for Database Cable FFC putFfcConnectorPrice function', err)
      throwApiError(err.message, err.status)
    }
  }
}

module.exports = CableFFC
