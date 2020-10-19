const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const koabody = require('koa-body')
const koaLogger = require('koa-logger')
const router = require('koa-router')
const serve = require('koa-static')
const mount = require('koa-mount')
const app = new Koa()
const apiRouter = require('./server/router/index')
const { getPartlistConfig } = require('./server/model/bom/bomPartList')
const { port, httpTimeout, pgConfig } = require('./config.js')
const cors = require('koa-cors')
const helmet = require('koa-helmet')
const compress = require('koa-compress')
const https = require('https')
const fs =  require('fs')
const constants = require('crypto')
// const { koa2timeout } = require('./server/helpers/koa2timeout')
const env  = process.env.NODE_ENV
const moment = require('moment')
const ocsp = require('ocsp')
const EventEmitter = require( 'events' )
EventEmitter.defaultMaxListeners = 50

let keyData
let certData

// if (typeof env !== 'undefined') {
//   if (env.includes('SIT')) {
//     app.use(cors({ origin: '*', expose: 'Content-Disposition' }))
//     keyData = fs.readFileSync('./ssl/WiProcurementServer-key.pem')
//     certData = fs.readFileSync('./ssl/WiProcurementServer-cert.pem')
//   }else {
//     keyData = fs.readFileSync('./ssl/WiProcurementServer-key.pem')
//     certData = fs.readFileSync('./ssl/WiProcurementServer-cert.pem')
//   }
// }
// if (typeof env == 'undefined') {
//   app.use(cors({ origin: '*', expose: 'Content-Disposition' }))
//   keyData = fs.readFileSync('./ssl/DevWiProcurementServer-key.pem')
//   certData = fs.readFileSync('./ssl/DevWiProcurementServer-cert.pem')
// }

if (typeof env !== 'undefined') {
  if (env.includes('dev')) {
    console.log('-------------------> dev')
    app.use(cors({ origin: '*', expose: 'Content-Disposition' }))
    keyData = fs.readFileSync('./ssl/DevWiProcurementServer-key.pem')
    certData = fs.readFileSync('./ssl/DevWiProcurementServer-cert.pem')
  }
  if (env.includes('sit')) {
    console.log('-------------------> sit')
    app.use(cors({ origin: '*', expose: 'Content-Disposition' }))
    keyData = fs.readFileSync('./ssl/WiProcurementServer-key.pem')
    certData = fs.readFileSync('./ssl/WiProcurementServer-cert.pem')
  }
  if (env.includes('qas')) {
    console.log('-------------------> qas')
    app.use(cors({ expose: 'Content-Disposition' }))
    keyData = fs.readFileSync('./ssl/WiProcurementServer-key.pem')
    certData = fs.readFileSync('./ssl/WiProcurementServer-cert.pem')
  }
  if (env.includes('prd')) {
    console.log('-------------------> prd')
    app.use(cors({ expose: 'Content-Disposition' }))
    keyData = fs.readFileSync('./ssl/WiProcurementServer-key.pem')
    certData = fs.readFileSync('./ssl/WiProcurementServer-cert.pem')
  }
  if (env.includes('aws-dev')) {
    console.log('-------------------> dev')
    app.use(cors({ origin: '*', expose: 'Content-Disposition' }))
    keyData = fs.readFileSync('./ssl/DevWiProcurementServer-key.pem')
    certData = fs.readFileSync('./ssl/DevWiProcurementServer-cert.pem')
  }
}
if (typeof env == 'undefined') {
  console.log('-------------------> undefined')
  app.use(cors({ origin: '*', expose: 'Content-Disposition' }))
  keyData = fs.readFileSync('./ssl/DevWiProcurementServer-key.pem')
  certData = fs.readFileSync('./ssl/DevWiProcurementServer-cert.pem')
}



const sslOptions = {
  key: keyData,
  cert: certData,
  passphrase: 'WiWKH',
  ciphers: [
    'ECDHE-RSA-AES256-SHA384',
    'DHE-RSA-AES256-SHA384',
    'ECDHE-RSA-AES256-SHA256',
    'DHE-RSA-AES256-SHA256',
    'ECDHE-RSA-AES128-SHA256',
    'DHE-RSA-AES128-SHA256',
    'HIGH',
    '!aNULL',
    '!eNULL',
    '!EXPORT',
    '!DES',
    '!RC4',
    '!MD5',
    '!PSK',
    '!SRP',
    '!CAMELLIA',
  ].join(':'),
  honorCipherOrder: true,
  secureOptions: constants.SSL_OP_NO_TLSv1 || constants.SSL_OP_NO_TLSv1_1,
}
app.use(helmet({
  frameguard: { action: 'deny' },
  noCache: true,
  xssFilter: { setOnOldIE: true },
}))

app.use(compress({ threshold: 2048 })) // 大於 2MB 的資料就壓縮

app.use(koaLogger((str, args) => { console.log(moment().tz('Asia/Taipei').format('YYYY/MM/DD HH:mm:SSS') + str) }))
app.use(koabody({
  multipart: true,
  formidable: {
    maxFileSize: 200 * 1024 * 1024,
  },
  formLimit: '500mb',
  jsonLimit: '500mb',
  textLimit: '500mb',
  enableTypes: ['json', 'form', 'text'],
}))


app.use(bodyParser())
// app.use(koa2timeout)
const appRouter = new router()
appRouter.use(apiRouter.routes())
app.use(appRouter.routes())


console.log('>> available API list: \n', apiRouter.stack.map(i =>  ` ${i.stack[0].name == 'isJWTAuthenticated' ? '*' : ' '} [${i.methods}] ${i.path}` ))
console.log('DB IP:', pgConfig.pgIp)
app.use(mount('/apidoc', serve('./apidoc'))) // mount for api document
app.use(mount('/', serve('./static'))) // mount for front-end pages
let server = https.createServer(sslOptions, app.callback()).listen(port, '0.0.0.0', async() => {
  // await pcbService.importPCBAdder(false, false)
  // console.log('end import pcb adder')
  // await pcbService.importBasePrice(false)
  // console.log('end import pcb price')
  console.log(`>> the server is start at port ${port}`)
})
server.timeout = httpTimeout * 1000  // modify default http timeout

// //Add ocsp
// let cache = new ocsp.Cache()
// server.on('OCSPRequest', function (cert, issuer, cb) {
//   ocsp.getOCSPURI(cert, function (err, uri) {
//     if (err)
//       return cb(err)
//     let req = ocsp.request.generate(cert, issuer)
//     let options = {
//       url: uri,
//       ocsp: req.data
//     }
//     if (cache.cache.hasOwnProperty(req.id)) {
//       return cb(null, cache.cache[req.id].response)
//     } else {
//       cache.request(req.id, options, function (err, response) {
//         if (err) {
//           /* ignore err */
//           cb()
//           return
//         }
//         cb(null, response)
//       })
//     }
//   })
// })

// app.listen(port)
// console.log(`>> the server is start at port ${port}`)


// debug 用
/* process.logSpendTime = function (startTime, tag = '') {
  let spend = process.hrtime(startTime)
  console.log(tag, 'spend:', spend[0], 's', spend[1] / 1e6, 'ms')
} */
