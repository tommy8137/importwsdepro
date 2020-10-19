import * as R from 'ramda';
import CommonUtils from '~~utils/CommonUtils';
import { round } from '~~utils/Math';
import _isNil from 'lodash/isNil';
import _isEqual from 'lodash/isEqual';
import {
  EEBOM_NEXTSTAGE_INITIAL_FILTERINFO,
  EEBOM_NEXTSTAGE_CATEGORY_APPROVER_OPTIONS_LIST,
  EEBOM_NEXTSTAGE_CATEGORY_OPTIONS_LIST,
  EEBOM_NEXTSTAGE_STATUS_OPTIONS_LIST,
  EEBOM_NEXTSTAGE_STATUS_APPROVER_OPTIONS_LIST,
  EEBOM_NEXTSTAGE_FILTER_DISPLAY_CONFIG
} from '~~features/BomManagement/EEBomDetail/EEBomNextStage/EEBomNextStageConst';

import _includes from 'lodash/includes';

/**
 * filter過後的TableData
 * @param {*} originalTableData
 * @param {*} twoLevelFilterInfo
 */
function getTableDataWithFilterCondition(originalTableData, twoLevelFilterInfo) {
  let updatedTableData;
  const { level1SelectedOption, level2SelectedOption } = twoLevelFilterInfo;
  if (level1SelectedOption !== null) {
    // 如果沒有level2SelectedOption，就只要filterlevel1SelectedOption就好
    if (level2SelectedOption === null) {
      updatedTableData = originalTableData.filter(item => item.type1 === level1SelectedOption.value);
    } else {
      updatedTableData = originalTableData.filter(item =>
        item.type1 === level1SelectedOption.value && item.type2 === level2SelectedOption.value);
    }
  } else {
    // 如果level1SelectedOption為null，level2SelectedOption一定也是null
    updatedTableData = originalTableData;
  }
  return updatedTableData;
}


/**
 * 比較tableData和server的originalTableData，看有修改幾筆
 */
// function getModifiedItems(tableData, originalTableData) {
//   const modifiedItems = tableData.filter(item => {
//     const comparedItem = R.find(R.propEq('id', item.id))(originalTableData);
//     return R.not(R.equals(item, comparedItem));
//   });
//   return modifiedItems;
// }


/*
計算有幾個錯誤
itemsValidateError的格式如下
{
  x1: {
    errors: {
      name: [],
      email: ['not email']
    },
    id: 'x1'
  },
  x2: {
    errors: {
      name: [],
      email: []
    },
    id: 'x2'
  },
}

*/
// function getErrorCounts(itemsValidateError) {
//   if (!itemsValidateError) {
//     return 0;
//   }
//   let errorCount = R.pipe(
//     // 取出errors的value { id: [], email: ['not email']}
//     R.map(R.view(R.lensProp('errors'))), //   R.map(R.path([errors])),
//     // 把error的message list 取出來
//     R.map(x => Object.values(x)),
//     // 把陣列攤平
//     R.flatten,
//     // 計算錯誤的個數
//     R.length
//   )(Object.values(itemsValidateError));
//   return errorCount;
// }

/**
 * 檢查value是否有在selected裡面
 * @param {} selected 目前選擇的option, 有可能是string或者是array
 * @param {*} value 要驗證的value
 */
function checkIncludes(selected, value) {
  return R.is(Array, selected) ? R.contains(value, selected) : R.equals(selected, value);
}


/**
 * 負責過濾checked狀態 是否符合下拉所選擇的狀態
 * @param {*} item 傳進來的row
 * @param {*} selected 下拉選擇的值, 有可能是array 或 string
 */
function checkStatus(selected = [], item) {
  // member是否被check
  if (checkIncludes(selected, 'checked') && item.is_personal_checked === true) {
    return true;
  }
  // member是否被uncheck
  if (checkIncludes(selected, 'unchecked') && item.is_personal_checked === false) {
    return true;
  }
  // member是否被submit, 在personal跟approver是一樣的意思
  if ((checkIncludes(selected, 'submitted') || checkIncludes(selected, 'mbr_submitted')) && item.is_personal_submitted === true) {
    return true;
  }
  // reject狀態只有一種, 所以member跟approver一樣
  if (checkIncludes(selected, 'rejected') && item.is_reject === true) {
    return true;
  }
  // 是否被approve, leader按了check之後按下save
  if (checkIncludes(selected, 'approved') && item.leader_checked_status === 'approve') {
    return true;
  }
  // personal沒有被submit
  if (checkIncludes(selected, 'mbr_not_submit') && item.is_personal_submitted === false) {
    return true;
  }
  return false;
}


/**
 * @param {*} values
 * 傳進來的值會是 {label: abc, value: abc} 或 [{label: abc, value: abc}],
 * 把它轉換成單純的 'abc' 或 ['abc']
 */
function getSelectedValue(values) {
  if (R.is(Array, values)) {
    return values.map(obj => obj.value);
  }
  return R.is(Object, values) ? values.value : values;
}

/**
 * 拿到filter的下拉選項, 拿到某個key的裡面value的組合, 例如type1就會拿到['ASIC', 'CPU'..], 最後再轉乘react-select的格式 {label: '', value: ''}
 * 原本的function:  CommonUtils.convertToSelectorOptions
 * @param {*} keyName 要過濾出來的key
 * @param {*} options 整個data
 * @param {*} condition filter的條件, 用 R.where去做搜尋, 傳入object { type1:  () => {} }
 */
const getOptionsWithCondition = (keyName, options, condition = {}) => {
  const keyLens = R.lensProp(keyName);
  const pred = n => R.where(condition, n);
  return R.pipe(
    R.filter(pred),
    R.sortBy(R.prop(keyName)),
    R.map(R.view(keyLens)),
    R.uniq,
    // 轉成react-select的格式, {label: '', value: ''}
    R.map(x => ({
      // 在eebom的type1有可能是null, UI上要顯示empty的選項
      label: (x === '<NULL>' || x == null) ? 'Empty' : x,
      value: x
    })),
  )(options);
};

/**
 * 統一處理eebom filter的下拉選項
 * @param {*} tableData 原始的table data
 * @param {*} twoLevelFilterInfo  篩選條件 {}
 * @param {*} isApprover  下拉的status有分approver跟member
 */
const getTableDataFilterInfo = ({ tableData = [], filterInfo = {}, isApprover = false }) => {
  const { level1SelectedOption = [], level2SelectedOption = [], level3SelectedOption = [] } = filterInfo;

  const lv1Value = getSelectedValue(level1SelectedOption);
  const lv2Value = getSelectedValue(level2SelectedOption);
  const lv3Value = getSelectedValue(level3SelectedOption);

  const filterInfoDisplayConfig = R.path([lv1Value], EEBOM_NEXTSTAGE_FILTER_DISPLAY_CONFIG);

  // level1下拉的值都是固定的, 有分member 跟 approver
  const level1OptionsList = isApprover ?
    EEBOM_NEXTSTAGE_CATEGORY_APPROVER_OPTIONS_LIST : EEBOM_NEXTSTAGE_CATEGORY_OPTIONS_LIST;

  switch (lv1Value) {
    case 'category':
      return {
        ...filterInfo,
        ...filterInfoDisplayConfig,
        level1OptionsList,
        level2OptionsList: getOptionsWithCondition('type1', tableData),
        level3OptionsList: getOptionsWithCondition('type2', tableData,
          { type1: (val) => checkIncludes(lv2Value, val) }
        ),
      };
    case 'pic':
      return {
        ...filterInfo,
        ...filterInfoDisplayConfig,
        level1OptionsList,
        level2OptionsList: getOptionsWithCondition('pic', tableData),
        level3OptionsList: []
      };
    case 'status':
      return {
        ...filterInfo,
        ...filterInfoDisplayConfig,
        level1OptionsList,
        // status 狀態是寫死的, 有分成member跟approver
        level2OptionsList:
          isApprover ? EEBOM_NEXTSTAGE_STATUS_APPROVER_OPTIONS_LIST : EEBOM_NEXTSTAGE_STATUS_OPTIONS_LIST,
        level3OptionsList: []
      };
    default:
      return {
        ...filterInfo,
        level1OptionsList,
        level2OptionsList: [],
        level3OptionsList: [],
      };
  }
};

/**
 * 統一處理filter過後的TableData
 * 根據filterInfo篩選出tabedata, 只要有call api取得新列表就會進來這裡
 * @param {*} tableData
 * @param {*} filterInfo
 */
function getTableDataWithFilterInfo({ tableData = [], filterInfo = {}, showPriceDiff = false, showEXPSpa = false }) {
  const {
    level1SelectedOption = [],
    level2SelectedOption = [],
    level3SelectedOption = []
  } = filterInfo;

  const lv1Value = getSelectedValue(level1SelectedOption);
  const lv2Value = getSelectedValue(level2SelectedOption);
  const lv3Value = getSelectedValue(level3SelectedOption);

  // 取得filter過後的table data
  const filtedTableData =
    tableData.filter(item => {
      let result = true;
      switch (lv1Value) {
        case 'category':
          // level3可以不選, 只填level2
          result = checkIncludes(lv2Value, item.type1) && (lv3Value ? checkIncludes(lv3Value, item.type2) : true);
          break;
        case 'pic':
          result = checkIncludes(lv2Value, item.pic);
          break;
        case 'status':
          result = checkStatus(lv2Value, item);
          break;
        default:
          break;
      }

      if (result && showPriceDiff) {
        // 假如有開啟 showEXPSpa 需要拿exp_spa來判斷
        const spaValue = showEXPSpa ? item.exp_spa : item.spa;
        // 開啟"show SPA Diff"時，只需要顯示不一樣的欄位。
        // spa跟alt其中一個跟last price不ㄧ樣，就show出來
        result = checkIsDiff(item.current_price, spaValue) || checkIsDiff(item.current_price, item.alt_lowest_price);
      }
      return result;
    });

  return filtedTableData;
}

/**
 * 比較兩個欄位數字是否一樣
 * _isNil Checks if value is null or undefined.
 * @param val1 有可能是string 所以會再轉一層number
 * @param val2
 */
function checkIsDiff(val1, val2) {
  // 如果兩個其中一個是null或undefined, 就不加入比較
  if (_isNil(val1) || _isNil(val2)) { return false; }
  const num1 = round(val1, 5, val1);
  const num2 = round(val2, 5, val2);
  return !_isEqual(num1, num2);
}

export default {
  getTableDataWithFilterCondition,
  getTableDataFilterInfo,
  getTableDataWithFilterInfo,
  checkIsDiff
  // getModifiedItems,
  // getErrorCounts
};
