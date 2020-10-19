import * as Excel from 'exceljs/dist/exceljs.min.js';
import _get from 'lodash/get';
import _slice from 'lodash/slice';

/**
 * 讀檔取得裡面的formula
 * @param {xlsx} file 檔案
 */
async function getFormulas(file, sheetName, callback) {
  const reader = new FileReader();
  reader.onloadend = (event) => {
    const arrayBuffer = reader.result;
    let workbook = new Excel.Workbook();
    // 讀檔
    workbook.xlsx.load(arrayBuffer).then((response) => {
      const formulaList = [];
      // 讀出指定sheet的每一個row
      response.worksheets
        .filter(sheet => sheet.name === sheetName)[0]
        .eachRow((row, rowNumber) => {
          const rowdata = row.values[3];
          const formula = _get(rowdata, 'formula', '');
          const rowIndex = rowNumber - 10; // part category 2 以上都不算
          if (formula) {
            formulaList.push({ formula, rowIndex });
          }
        });
      callback(formulaList);
    });
  };
  reader.readAsArrayBuffer(file);
}

export default {
  getFormulas,
};
