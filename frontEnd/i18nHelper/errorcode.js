const fs = require('fs');
const colors = require('colors/safe');
const excelToJson = require('convert-excel-to-json');
const _remove = require('lodash/remove');
const _get = require('lodash/get');

/**
 * 產出檔案放置位址
 */
const FILE_OUTPUT_PATH = '../src/apis/ErrorCodes.json';

/**
 * 讀取Excel資料
 */
const data = excelToJson({
  sourceFile: '錯誤代碼.xlsx'
});

/**
 * 錯誤訊息的mapping資料整理
 */
let errors = {};

Object.keys(data).forEach((sheetName) => {
  const sheet = data[sheetName];
  _remove(sheet, (n, i) => (i === 0));
  sheet.forEach((row, i) => {
    const code = row['B'];
    const msg = row['E'] || row['C'];
    // 重複者錯誤訊息
    if (_get(errors, code, false)) {
      console.log(colors.red.bold(`=> [${sheetName}] row[${i}] error code 重複，將覆蓋`), colors.blue(`-> ${code}`));
    }

    // 沒有呈現文字
    if (!row['E']) {
      console.log(colors.red.bold(`=> [${sheetName}] row[${i}] 缺顯示文字，將以「代碼說明」欄位取代`), colors.blue(`-> ${row['C']}`));
    }

    errors = {
      ...errors,
      [code]: msg,
    };
  });
});


console.log(colors.yellow.bold('====== 產出結果 ======'));
console.log(colors.blue(errors));


/**
 * 輸出檔案到專案資料夾
 */
fs.writeFileSync(FILE_OUTPUT_PATH, JSON.stringify(errors, {}, 2));
console.log(colors.yellow.bold('資料寫入完成'));
