const log4js = require('log4js')
log4js.configure({
  appenders: {
    out: {
      type: 'stdout',
    },
    wiprocurement_file_log: {
      type: 'file', filename: 'logs/wiprocurement.log',
      maxLogSize: 10485760,
      numBackups: 7,
      compress: true,
    },
  },
  categories: {
    default: { appenders: ['out', 'wiprocurement_file_log'], level: 'debug' },
  },
  disableClustering: true,
})
module.exports = log4js
