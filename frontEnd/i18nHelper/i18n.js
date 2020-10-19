const util = require('util');
const axios = require('axios');
const fs = require('fs');
const _ = require('lodash');
const colors = require('colors/safe');
const config = require('./config');

const urlTemplate = config.url.replace('{key}', config.key);
const { locales } = config.i18n;
const urlList = config.sheetIndexList.map(sid => urlTemplate.replace('{index}', sid));

/**
 * 過濾掉json檔用不到的欄位
 */
function filterData(data) {
  const localeIndexLs = locales.map(d => d.index);

  // 1. row index >= 2 (第一個row一律是標題)
  const cond1 = Number(_.get(data, ['gs$cell', 'row'], -1)) >= config.i18n.startRowIndex;

  // 2. col index in locales[i].index (欄位是語系詞彙)
  const cond2 = _.includes(localeIndexLs, Number(_.get(data, ['gs$cell', 'col'], -1)));

  // 3. col index = keyIndex (欄位是語系key)
  const cond3 = Number(_.get(data, ['gs$cell', 'col'], -1)) === config.i18n.keyIndex;

  // 4. col index = skipIndex (skip欄位)
  const cond4 = Number(_.get(data, ['gs$cell', 'col'], -1)) === config.i18n.skipIndex;
  return (cond1 && (cond2 || cond3 || cond4));
}

/**
 * 將資料整理成 [{ key, locale1, locale2, local3 }]
 * @param {*} datas [{ row, col, $t }]
 */
function arrangeFormat(datas) {
  const getVal = data => _.get(data, '$t');
  const getNum = (data, column) => Number(_.get(data, column, -1));
  // 先照每個row分組
  const cellsbyrow = _.groupBy(datas, data => _.get(data, 'row'));
  // 將內容組成目標格式
  const result = Object.keys(cellsbyrow).map((rowNumber) => {
    const row = cellsbyrow[rowNumber];
    let formated = null;
    try {
      const key = _.remove(row, cell => getNum(cell, 'col') === config.i18n.keyIndex);
      const skip = _.remove(row, cell => getNum(cell, 'col') === config.i18n.skipIndex);
      const isSkip = skip.length > 0 ? getVal(skip[0]).toUpperCase() === 'Y' : false;
      // 有設定key 開始讀後面各語系資料
      if (!isSkip) {
        const localesdata = row.reduce((prev, cell) => ({
          ...prev,
          [locales.filter(l => l.index === getNum(cell, 'col'))[0].name]: getVal(cell)
        }), {});
        formated = ({ key: getVal(key[0]), ...localesdata });
      }
    } catch (error) {
      console.log(colors.red.bgBlack.bold(`資料可能有誤，請檢查: ${JSON.stringify(row.map(d => d['$t']))}`));
      if (config.errorlog) {
        console.log(error);
      }
    }
    return formated;
  });

  return result;
}

/**
 * 去除重複的資料
 * @param {*} datas [{ key, locale1, locale2, locale3 }]
 */
function removeDuplicate(datas) {
  console.log(colors.cyan(`進行key值重複比對，資料筆數： ${datas.length}`));
  const afterUniq = _.uniqBy(datas, 'key');
  const afterLen = afterUniq.length;
  const dataLen = datas.length;
  if (afterLen === dataLen) {
    console.log(colors.green('資料比對完成，沒有資料被清除。'));
  } else {
    console.log(colors.red.bold(`有${Math.abs(dataLen - afterLen)}筆資料被清除`));
    const origindata = [...datas];
    afterUniq.forEach(d => {
      const rm = _.remove(origindata, o => _.isEqual(o, d));
      if (rm.length > 1) {
        console.log(colors.red(`> 完全相同的資料列，已移除，請檢查： ${JSON.stringify(d)}`));
      }
    });
    origindata.forEach(dupdata => console.log(colors.red(`> key值重複，已移除，請檢查： ${JSON.stringify(dupdata)}`)));
  }

  return afterUniq;
}


/**
 * 輸出檔案到專案資料夾
 */
function exportFiles(datas, language) {
  // 如果找不到輸出資料夾，先產生一個
  const { outputPath } = config.i18n;
  if (!fs.existsSync(outputPath)) {
    console.log('建立語系資料夾');
    fs.mkdirSync(outputPath);
  }
  fs.writeFileSync(`${outputPath}/${language}.json`, JSON.stringify(datas, null, 2));
  console.log(colors.white.bold(`[ ${language}.json ] ${Object.keys(datas).length}筆資料寫入完成`));
}

/** ===== 主要程式邏輯 ======================================================== */

function fetchAllData() {
  return urlList.map((url) => {
    return axios.get(url)
      .then((res) => {
        const sheet = _.get(res, ['data', 'feed', 'title', '$t']);
        console.log(colors.yellow.bold(`取得sheet[ ${sheet} ]資料完成`));

        const sheetallcell = _.get(res, ['data', 'feed', 'entry']);
        const usefuldata = arrangeFormat(
          sheetallcell
            .filter(filterData)
            .map(d => d['gs$cell'])
        ).filter(d => d !== null);

        return { sheet, usefuldata };
      })
      .catch((error) => {
        console.log(colors.red.bold(`取不到資料或資料格式不正確:\n${url}`));
        if (config.errorlog) {
          console.log(error);
        }
        // return { sheet: '', usefuldata: [] };
      });
  });
}

function convertToJson(promiselist) {
  Promise.all(promiselist.filter(p => !!p))
    .then((values) => {
      let datas = [];
      values.forEach(value => {
        const { sheet, usefuldata } = value;
        console.log(`---------------[ ${sheet} ]---------------`);
        datas = [...removeDuplicate([...datas, ...usefuldata])];
        console.log(`Sheet[ ${sheet} ]可用資料筆數: ${usefuldata.length}`);
      });

      // 將不同語系分成不同的檔案產出檔案
      locales.forEach((loc) => {
        const glossary = _.mapValues(_.keyBy(datas, 'key'), d => _.get(d, loc.name, '<no glossary data>'));
        exportFiles(glossary, loc.name);
      });
    })
    .catch((error) => {
      console.log(colors.red.bold('產出檔案失敗'));
      if (config.errorlog) {
        console.log(error);
      }
    });
}

/** =====執行主要程式======================================================== */

convertToJson(fetchAllData());
