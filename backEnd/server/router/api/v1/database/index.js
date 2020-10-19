const router = require('koa-router')
const commonRouter = require('./common.js')
const metalRouter = require('./metal.js')
const plasticRouter = require('./plastic.js')
const thermalRouter = require('./thermal.js')
const thermalGraphiteRouter = require('./thermalgraphite.js')
const diecutRouter = require('./diecut.js')
const cablewireRouter = require('./cablewire.js')
const ffcRouter = require('./ffc.js')
const fpcRouter = require('./fpc.js')
const emcmagnetRouter = require('./emcmagnet.js')
const rubberRouter = require('./rubber.js')
const turningRouter = require('./turning.js')
const eebomRouter = require('./eebom.js')



const apiRouter = new router()

apiRouter.use('/common', commonRouter.routes())
apiRouter.use('/metal', metalRouter.routes())
apiRouter.use('/plastic', plasticRouter.routes())
apiRouter.use('/thermal', thermalRouter.routes())
apiRouter.use('/diecut', diecutRouter.routes())
apiRouter.use('/cablewire', cablewireRouter.routes())
apiRouter.use('/cableffc', ffcRouter.routes())
apiRouter.use('/cablefpc', fpcRouter.routes())

apiRouter.use('/emcmagnet', emcmagnetRouter.routes())
apiRouter.use('/rubber', rubberRouter.routes())
apiRouter.use('/thermalgraphite', thermalGraphiteRouter.routes())
apiRouter.use('/turning', turningRouter.routes())
apiRouter.use('/eebom', eebomRouter.routes())




module.exports = apiRouter
