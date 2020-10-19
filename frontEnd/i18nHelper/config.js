/** ********************
 * 1. 每個不同google spreadsheet「檔案」的key都不同，更換專案時要記得修改
 * 2. google spreadsheet 的 index 是從 1 開始 !!!
 ******************** */

module.exports = {
  url: 'https://spreadsheets.google.com/feeds/cells/{key}/{index}/public/values?alt=json',
  key: '1VvLpTAsl2QFxHbFwDrVVg32Rk2reOxAbTSJEpS3jaYM',
  sheetIndexList: [1, 2, 3, 4, 5], // 需要轉檔的sheet index
  i18n: {
    keyIndex: 2, // i18n Key 的 column index
    skipIndex: 6, // 是否跳過該列的判別欄位
    startRowIndex: 2, // 詞彙表可用資料開始列
    locales: [ // 各語系文字 的 column index
      { name: 'en-US', index: 3 },
      { name: 'zh-TW', index: 4 },
      { name: 'zh-CN', index: 5 },
    ],
    outputPath: '../src/locales',
  },
  errorlog: false,
};
