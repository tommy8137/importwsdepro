
const configs = {
  pgConfig: {
    provider: 'postgres',
    pgIp: process.env.POSTGRES_IP || '192.168.101.160',
    pgPort: process.env.POSTGRES_PORT || 5432,
    pgDb: process.env.POSTGRES_DB || 'docker',
    pgName: process.env.POSTGRES_USER || 'swpc-user',
    pgPw: process.env.POSTGRES_PASSWORD || 'eprocurement',
    pgSchema: process.env.POSTGRES_SCHEMA || 'wiprocurement',
    idleTimeoutMillis: 180000,
  },
  lppConfig: {
    lppIp: process.env.LPP_IP || 'localhost',
    lppPort: process.env.LPP_PORT ||  '8004',
  },
  dbSyncConfig: {
    dbsyncIp: process.env.DBSYNC_IP || 'localhost',
    dbsyncPort: process.env.DBSYNC_PORT ||  '3009',
  },
  emdmServerConfig:{
    emdmServerIp: process.env.EMDM_SERVER_IP || '192.168.100.105',
    emdmServerPort: process.env.EMDM_SERVER_PORT || '443',
    emdmServerProtocol: process.env.EMDM_SERVER_PROTOCOL || 'https',
    emdmImageAuthorization: process.env.EMDM_IMAGE_AUTHORIZATION || 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJXaWVNRE0iLCJpc3MiOiJXSVNUUk9OIENPUlBPUkFUSU9OIiwiZW1wbElkIjoiRVBST0NVX1VTRVIiLCJqdGkiOiI4MjhkNjQzMC0zMzFiLTQ1YzYtYjEwYy1kNjIzMDBmYmJmN2QifQ.9fySsADavCMd56Wz_r7yqZan9_Ce6K5P-X5Fv9B3pM0',
    enableEmdmImage: (process.env.ENABLE_EMDM_IMAGE || 'false').trim().toLowerCase() === 'true',
  },
  env:process.env.NODE_ENV  || 'prd',
  eproDomain: process.env.EPRO_DOMAIN || '127.0.0.1:3000',
  port: process.env.PORT || 3000,
  wistronAD: process.env.WISTRON_AD ||  'hqnhudc1.whq.wistron', // '10.37.31.16',
  ADConfig: {
    WHC: 'hqnhudc1.whq.wistron', // '10.37.31.16',
    WIH: 'ihnhudc1.wih.wistron', // '10.37.31.17',
    WKS: 'ksnhudc1.wkscn.wistron', // '10.37.31.18',
    WCD: 'ksnhudc1.wkscn.wistron', // '10.37.31.18',
    WCQ: 'ksnhudc1.wkscn.wistron', // '10.37.31.18',
    WTZ: 'ksnhudc1.wkscn.wistron', // '10.37.31.18',
    WZS: 'zsnhudc1.wzs.wistron', // '10.37.31.19',
    WMS: 'mxnhudc1.wmx.wistron', // '10.37.31.20',
    WCZ: 'cznhudc1.wcz.wistron', // '10.37.31.21',
    WPH: 'phnhudc1.wph.wistron', // '10.37.31.22',
  },
  expiresTime: '86399',
  tokenSecret: process.env.TOKEN_SECRET || 'WiEProcurement token secret',
  loginFailedLockTimes:3,
  loginFailedMinutes:5,
  httpTimeout: 1800,
  imageLimit: 1024 * 1024,
  supplyType: {
    '1': 'B',
    '3': 'C',
    '11': 'A',
    '15': 'S',
    '13': 'AV',
    '14': 'W',
  },
  bomSupplyType: ['S', 'AV', 'W'],
  // xraySupplyType: ['A', 'S', 'AV', 'W'],
  odmOemType:{
    '1': 'OEM',
    '3': 'OEM',
    '11': 'OEM',
    '15': 'ODM',
    '13': 'OEM',
    '14': 'ODM',
  },
  bomFilterType:{
    'ME':{
      'Customer':'customer',
      'Product':'product_type',
      'Stage':'stage_id',
      'Project Manager':'project_leader',
    },
    'EMDM': {
      'Customer':'customer',
      'Product':'product_type',
      'Stage':'stage_id',
    },
    'EE':{
      'Product type':'product_type',
      'SKU':'sku',
    },
    'CE':{
      'Customer':'customer',
      'Product':'product_type',
      'Status':'status',
    },
    'OTHER':{
      'Customer':'customer',
      'Product':'product_type',
      'Status':'status',
    },
  },
  ignoreVcode:['960286', '92029', '111111', '207360', '623866', '209322', '604347', '200706', '19568', '205197', '603524', '622792', '210604', '622003'],
  test: {
    'username': '__AD_USERNAME__',
    'password': '__AD_PASSWORD__',
    'url': '__TEST_URL__',
  },
  adminPW:'Wieprocure',
  tokenExpiresConfig:{
    hour:2,
    minutes:0,
    seconds:0,
  },
  xraySupplyType: {
    // '1': 'B',
    // '3': 'C',
    '11': 'A',
    '15': 'S',
    '13': 'AV',
    '14': 'W',
  },
  /* suggestionCosType:[
    { 'type': 'spa_cost', 'column': 'spa_cost' },
    { 'type': 'last_price', 'column': 'last_price' },
    { 'type': 'inquiry_cost', 'column': 'inquiry_cost' }, // inquiry Cost
    { 'type': 'clean_sheet_cost', 'column': 'system_cost' }, // cleanSheetCost(up)
    { 'type': 'ce_cost_assembly', 'column': 'cleanSheetCost' }, // CE COST組立價
    { 'type': 'sourcer_cost', 'column': 'sourcer_cost' }, // sourcer_cost
  ], */
  suggestionCostType:{
    path:{ // 各類型 cost 在 bomItem 中的路徑
      'last_price': 'last_price.unitPrice',
      'clean_sheet_cost': 'system_cost', // cleanSheetCost(up)
      'sourcer_cost': ['sourcer_cost_up', 'source_cost'], // sourcer_cost
      'inquiry_cost': 'inquiry_cost_up', // inquiry Cost
      'spa_cost': 'spa_cost',
      'ce_cost_assembly': 'system_cost',
    },
    floatPointMap: {
      'last_price':       'lastPrice',
      'clean_sheet_cost': 'cleanSheetCost',
      'sourcer_cost':     'sourcerCostUP',
      'inquiry_cost':     'inquiryCostUP',
      'spa_cost':         'SPACost',
      'ce_cost_assembly': 'ceCostUP',
      'auto_lowest_cost': 'default',
    },
    lowestCostOrder:[ // 由上而下 代表自動最低價優先順序 例： last_price 與 clean_sheet_cost 皆為 1元 則優先選 last_price
      'last_price',
      'clean_sheet_cost',
      'sourcer_cost',
      'inquiry_cost',
      'spa_cost',
      'ce_cost_assembly',
    ],
    optionsAvailable:[ // ceCost 實際可選的項目
      'last_price',
      'clean_sheet_cost',
      'sourcer_cost',
      'inquiry_cost',
      'spa_cost',
      'ce_cost_assembly',
      'auto_lowest_cost',
    ],
    defaultType: 'auto_lowest_cost',
  },
  dashboardFilterType:{
    'EE':['B', 'C', 'A', 'AV', 'W', 'S', 'Empty'],
    'ME':['ODM', 'OEM', 'TBD'],
  },
  pcbRule:{
    'boardType':{
      'big': 0,
      'small': 1,
    },
  },
  meLastPriceSite:{
    'WCQ':['PWCQ', 'PWCD', 'PWZS', 'PWKS'],
    'WCD':['PWCQ', 'PWCD', 'PWZS', 'PWKS'],
    'WZS':['PWCQ', 'PWCD', 'PWZS', 'PWKS'],
    'WKS':['PWCQ', 'PWCD', 'PWZS', 'PWKS'],
    'WIH':['PWIH', 'PWHQ'],
    'WHQ':['PWIH', 'PWHQ'],
  },
  decimalModuleConfig:{
    'enableAutoUpdate': false, // 是否啟用自動更新
    'syncSeconds': 300, // 自動更新間隔(秒)
    'defaultDecimal': 5, // 無法讀取database時的預設值
  },
  mailConfig: {
    authInfo:{
      host: process.env.MAIL_HOST || '127.0.0.1',
      port: process.env.MAIL_PORT || 1025,
      smtp_user: process.env.MAIL_SMTP_USER || 'project.1',
      smtp_password: process.env.MAIL_SMTP_PASSWORD || 'secret.1',
    },
    sender: process.env.MAIL_SENDER || 'WiEprocurement@devpack.cc',
    enable: (process.env.ENABLE_MAIL || 'false').trim().toLowerCase() === 'true',
    smtpAuthHost:{
      'email-smtp.us-east-1.amazonaws.com':true,
      '127.0.0.1':true,
      localhost: true,
    },
    message:{
      common:{
        content:'<a href=${bomProjectUrl}>頁面連結</a><br><br>Project Code : ${projectCode}<br>Project Name : ${projectName}<br>Customer : ${customer}<br>Product Type : ${productType}<br>eMDM Version : ${emdmVersion}<br>Cost Version : ${costVersion}<br><br><br>本信件為系統自動寄出，請勿直接回覆<br>This message is sent by the eProcurement system. DO NOT reply to this email directly.',
      },
      sourcerToCE:{
        subject:'【eProcurement】The offer of ${projectName}(${projectCode}) is completed.',
        content:'<b>Dear CE Partners,</b><br><br>${projectName}(${projectCode})專案已由Sourcer提供報價至系統<br>請至 e-Procurement 系統進行後續編輯<br><br>',
      },
      ceToSourcer:{
        subject:'【eProcurement】A revised version of ${projectName}(${projectCode}) is created.',
        content:'<b>Dear SBM Partners,</b><br><br>${projectName}(${projectCode})因報價需求, CE已進版至${costVersion}<br>請至 e-Procurement 系統協助填寫/上傳Sourcer Cost<br><br>',
      },
    },
  },

}
module.exports = configs
