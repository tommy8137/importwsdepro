import _slice from 'lodash/slice';
import _last from 'lodash/last';
import _find from 'lodash/find';
import _get from 'lodash/get';
import _sortBy from 'lodash/sortBy';
import _isNil from 'lodash/isNil';

/**
 * 是否為第一次轉出Setting
 */
let IS_FIRST_TIME = false;

// 將array 轉成有階層的array
function stratificationArray(data, formulaList) {
  const { usefulData, addressData } = toObjectArray(data, formulaList);
  // console.log('addressData', addressData);
  const childList = getChildList(usefulData);
  let parentList = getParentList(usefulData);
  childList.forEach(childRow => {
    const parentIndex = getParentIndexByChild(childRow, parentList);
    parentList.forEach(parent => {
      if (parent.rowIndex === parentIndex) {
        parent.contents.push(childRow);
      }
    });
  });

  // 把公式欄位mapping成xlsxKey
  const result = replaceFormula(JSON.stringify(parentList), addressData);

  return JSON.parse(result);
}


function replaceFormula(stringData, addressData) {
  let result = stringData;
  const addressList = _sortBy(stringData.match(/C\d+/g), str => -Number(str.replace('C', '')));
  // console.log('addressList', addressList);
  addressList.forEach((address) => {
    const reg = new RegExp(address, 'g');
    const replacedStr = addressData[address] || `FIXME: 欄位<${address.replace('C', 'C_')}>`;
    result = result.replace(reg, replacedStr);
  });

  return result;
}

/**
 * 抓出Jimmy版本的byKey
 * @param {*} setting Jimmy的setting檔
 * @param {*} resource 轉出來要給quotation的setting檔
 */
function findDataKey(setting, resource, isDraft) {
  // 如果Jimmy的setting裡有找到mapper或groupIdPath的話也拿進來
  IS_FIRST_TIME = isDraft;
  const { partlist, cleansheet, quotation } = setting;
  const allKeyList = IS_FIRST_TIME ? [...partlist, ...cleansheet] : [...quotation]; // NOTE: 第一次轉setting用這行
  const result = resource.map(row => {
    if (!row.contents.length) { // quotation的第一層
      return findKeyFromList(allKeyList, row);
    }
    return { // quotation的第二層
      ...findKeyFromList(allKeyList, row),
      contents: row.contents.map(subrow => findKeyFromList(allKeyList, subrow, row.label))
    };
  });

  return result;
}

/**
 * 針對quotation的1組setting去Jimmy版的所有setting找
 * @param {*} allKeyList Jimmy版本的所有設定
 * @param {*} targetRow quotation的一個設定
 * @param {*} parentLabel 如果是quotation子階，要傳入quotation母階的名字
 */
function findKeyFromList(allKeyList, targetRow, parentLabel = '') {
  let result = targetRow;
  allKeyList.forEach(settingRow => {
    // quotation的第1層 vs jimmy的第1層
    result = mappingKey(settingRow, targetRow);
    if (!!parentLabel && settingRow.contents.length > 0 && removeSymbol(settingRow.label) === removeSymbol(parentLabel)) {
      // quotation的第2層 vs jimmy的第2層
      settingRow.contents.forEach(subRow => {
        result = mappingKey(subRow, targetRow);
      });
    }
  });

  return result;
}

/**
 * 把Jimmy的setting的byKey、groupIdPath、mapper撈回來
 * @param {*} settingRow 一個jimmy setting的row
 * @param {*} targetRow 一個quotation的row
 */
function mappingKey(settingRow, targetRow) {
  let result = targetRow;
  const { label, byKey, style, groupIdPath, mapper,
    existKey, parentKey, parent, description, rowHeight,
    forceHidden,  } = settingRow;
  if (removeSymbol(label) === removeSymbol(targetRow.label) && !(targetRow.type === 'formula' && IS_FIRST_TIME)) {
    if (existKey) {
      result.existKey = existKey;
    }
    if (parentKey) {
      result.parentKey = parentKey;
    }
    if (parent) {
      result.parent = parent;
    }
    if (byKey) {
      result.byKey = byKey;
    }
    if (rowHeight) {
      result.rowHeight = rowHeight;
    }
    if (forceHidden !== undefined) {
      result.forceHidden = forceHidden;
    }
    if (_get(style, 'numberFormat', null)) {
      result.style = {
        ...targetRow.style,
        // numberFormat: style.numberFormat,
      };
    }
    if (groupIdPath) {
      result.groupIdPath = groupIdPath;
    }
    if (mapper) {
      result.mapper = mapper;
    }
    if (_get(description, ['type'], null)) {
      result.description = description;
    }
  }

  return result;
}

function removeSymbol(str) {
  return str.replace(/[&/\\#,+()$~%.'":*?<>{}_ ]/g, '');
}

// 把原本excel裡只有值的array變成以Jimmy的schema為主的array
function toObjectArray(data, formulaList) {
  const addressData = {};
  const usefulData = removeItemInfo(data)
    .map((row, rowIndex) =>
      row
        .filter((c, i) => i < 2) // 只抓到B欄 (欄位名稱)
        .map((cell, cellIndex) => {
          const fixCellIndex = (cellIndex === 0 && !row[1]) ? 1 : cellIndex; // 修正大項的key會對錯
          const xlsxKey = `CI${fixCellIndex}RI${rowIndex}`;
          // addressData[`C${rowIndex + 10}`] = cell || row[cellIndex - 1]; // 正確的是下面那條
          addressData[`C${rowIndex + 10}`] = xlsxKey;
          return ({
            xlsxKey,
            rowIndex,
            cellIndex,
            label: cell,
            ...getExtends(row, rowIndex, cellIndex, formulaList),
            contents: [],
          // parentKey: '',
          // groupIdPath: '', // Group才會有，子階不一定會有
          // byKey: '', // 子階塞值用
          // mapper: null, // 設定特殊對應值
          });
        }));

  return { usefulData, addressData };
}

// 拿style、判斷公式欄位
function getExtends(row, rowIndex, cellIndex, formulaList) {
  let result = {};

  // 公式的formula
  const cellFormula = _find(formulaList, { rowIndex });
  const isLastLevel = cellIndex === 1 || compareSingleLevel(row);
  if (cellFormula && isLastLevel) {
    result.type = 'formula';
    result.description = `=${_get(cellFormula, 'formula', '')}`;
  }

  // 公式的文字
  const isTextField = cellIndex === 1 && row[1] === '公式';
  if (isTextField) {
    result.type = 'value';
    [, , result.description] = row;
  }
  // 其他
  result.style = {
    color: compareSingleLevel(row) && cellFormula ? '0000FF' : null,
    border: {
      topBorderStyle: compareSingleLevel(row) ? 'thick' : 'thin',
      bottomBorderStyle: compareSingleLevel(row) ? 'thick' : 'thin',
    },
    numberFormat: comparePercentage(row) ? '0.0%' : compareNumberFormat(row),
  };
  // 不是公式也不是固定值的 要找key
  if (!cellFormula && !isTextField && isLastLevel) {
    result.byKey = 'FIXME:缺key';
  }
  return result;
}

/**
 * Part category 2 以上都不看
 * @param {*} data
 */
function removeItemInfo(data) {
  return _slice(data, 8);
}

/**
 * 拿到所有是母階的list
 * @param {*} data
 */
function getParentList(data) {
  const parentList = data
    .filter(row => !!row[0].label)
    .map(row => row[0]);

  return parentList;
}

/**
 * 拿到所有是子階的list
 * @param {*} data
 */
function getChildList(data) {
  const childList = data
    .filter(row => !!row[1].label)
    .map(row => row[1]);

  return childList;
}

/**
 * 回傳一個子階的parent是誰 (rowIndex)
 * @param {*} childRow
 * @param {*} parentList
 */
function getParentIndexByChild(childRow, parentList) {
  // FIXME: 寫法有點危險
  // 用rowIndex判斷母階是誰: 從parentList過濾出所有rowIndex比child的rowIndex小的，取最後一個
  return _last(parentList.filter((parentRow) => parentRow.rowIndex <= childRow.rowIndex)).rowIndex;
}

// 判斷是只有一層的 (ex: A. 沖壓費、B. 成型費...etc)
// 這邊進來的是最原始的資料 ["A. 沖壓費", "", "0.1234" ...]
function compareSingleLevel(row) {
  return (!!row[0] && !row[1]);
}

// 判斷欄位是要用percentage的格式呈現
function comparePercentage(row) {
  return !!row[1] && (row[1].indexOf('(%)') >= 0);
}

function compareNumberFormat(row) {
  if (!_isNil(row[3])) row[3] = row[3].toString().indexOf('%') >= 0 ? row[3].toString().replace('_', '') : row[3];
  return _isNil(row[3]) ? '#,##0.00000' : row[3].toString();
}

export default {
  stratificationArray,
  findDataKey,
  toObjectArray,
};

