import _get from 'lodash/get';
import _isObject from 'lodash/isObject';
import _isArray from 'lodash/isArray';
import _has from 'lodash/has';
import traverse from 'traverse';
import * as R from 'ramda';
import { comma } from '~~utils/Math';

// 三種日期
const types = ['last', 'current', 'next'];

const typesReadOnly = ['last', 'current'];

/**
 * 給group key，自動回傳children應該要有的3種價錢的欄位設定
 * @param {string} groupName 最上面的group
 * @param {*} subTypes [{ key, name }] => key、欄位名稱
 */
function gen3TypeTemplate(group, subTypes = null) {
  // 沒有子項目
  if (!subTypes) {
    return types.map(item => ({
      title: `@${item}@`,
      dataIndex: `${group}.${item}`,
      key: `${group}.${item}`,
      editable: !typesReadOnly.includes(item),
    }));
  }

  // 有子項目
  return types.map(item => ({
    title: `@${item}@`,
    dataIndex: `${group}.${item}`,
    key: `${group}.${item}`,
    children: subTypes.map(t => ({
      title: t.name,
      dataIndex: `${group}.${item}.${t.key}`,
      key: `${group}.${item}.${t.key}`,
      editable: !typesReadOnly.includes(item),
    }))
  }));
}

/**
* 將原本column setting裡有 $[xxx] 的字 取代成應該顯示的字
* @param {object} config
* @param {array} columns
*/
function mapping3TypeToDate(config, columns) {
  let strData = JSON.stringify(columns);
  Object.keys(config).forEach(keyName => {
    strData = strData.replace(new RegExp(`@${keyName}@`, 'g'), config[keyName]);
  });

  const result = (editMode, render = null) => JSON.parse(strData, (key, value) => {
    const canEdit = _isObject(value)
      && !_isArray(value)
      && !_get(value, 'children', false)
      && _get(value, 'editable', false);
    if (editMode && canEdit) {
      const renderFunction = (val, row, index) => (render ? render(val, row, index, value.key) : val);
      return {
        ...value,
        render: renderFunction,
      };
    } else if (canEdit) {
      return {
        ...value,
        render: (val, row, index) => comma(val, 8, val),
      };
    }
    return value;
  });

  return (editMode, render) => result(editMode, render);
}


/**
 * 比較兩個字串轉大寫之後是否有相同的字串
 * @param {*} str1 string 1
 * @param {*} str2 string 2
 */
function compareStr(str1, str2) {
  return String(str1).toUpperCase().includes(String(str2).toUpperCase());
}

/**
 * 取得sort的條件式
 * @param {*} order 排序方式
 * @param {*} sortInfo { dataIndex: 'name', sortOrder: descend || ascend } dataIndex: 可傳入path
 */
function getSortCondition(sortInfo) {
  const { sortOrder, dataIndex: sortKey } = sortInfo;
  switch (sortOrder) {
    case 'descend':
      return R.descend((val) => _get(val, sortKey));
    case 'ascend':
      return R.ascend((val) => _get(val, sortKey));
    default:
      return () => { };
  }
}


/**
 * 取得filter條件式
 * @param {*} obj rowItem
 * @param {*} filterInfo { keyword: '', dataIndex: '' 或 ['item', 'id'....] }
 */
function getfilterCondition(obj, filterInfo) {
  const { keyword = '', dataIndex: filterKey = '' } = filterInfo;
  if (keyword.length && filterKey.length) {
    if (R.is(Array, filterKey)) {
      // 多欄位查詢：如果是傳一個array近來，可以用多個key進來比對，用 OR 來比對(其中一個欄位的有符合就可以)
      const hasValue = filterKey.some(key => {
        const keyVal = _get(obj, key);
        return keyVal ? compareStr(keyVal, keyword) : false;
      });
      return hasValue;
    } else if (R.is(String, filterKey)) {
      // 單欄位查詢
      const keyVal = _get(obj, filterKey);
      return keyVal ? compareStr(keyVal, keyword) : false;
    }
  }
  return true;
}

/**
 * 丟進來tableData , sort跟filter後，丟回去
 * @param {*} tableData 原始丟進來的tableData
 * @param {*} sortInfo 排序的設定 { dataIndex = 'id', sortOrder = 'ascend/descend' }
 * @param {*} filterInfo keyword設定, 之後可擴充其他設定 { keyword = '', dataIndex = 'name' || ['id', name] }
 */
function getFiltedTableData(tableData, sortInfo, filterInfo, showArchive = false) {
  if (!tableData || !Array.isArray(tableData)) { return []; }
  if (!sortInfo && !filterInfo) {
    return tableData;
  }
  const sortCondition = getSortCondition(sortInfo);
  const filterCondition = obj => getfilterCondition(obj, filterInfo);
  const filterDisable = obj => (showArchive ? obj.disable : !obj.disable);

  const result = R.compose(
    R.sort(sortCondition),
    R.filter(filterCondition),
    R.filter(filterDisable)
  )(tableData);

  return result;
}

/**
 * 丟回來所有擁有 vendorId 的 key name
 * example:

{
  "id": "1",
  "name": "2",
  "Akzo": {
    "vendorId": "3",
  },
  "Others": {
    "vendorId": "4",
  }
}
keyName 丟 "vendorId" 會得到 ['Akzo', 'Others']


 * @param {*} object 要查找的object
 * @param {*} keyName 要用什麼key來找
 */
function getObjectKeysByKeyName(object = {}, keyName = '') {
  const result = traverse(object).reduce(function func(prev, curr) {
    if (_has(curr, keyName)) {
      prev.push(this.key);
    }
    return prev;
  }, []);
  // 去除重複
  return R.uniq(result);
}
/**
 * 長高長胖專用
 * @param {} mainTable 原本的tabledata
 * @param {*} dropdownInfo { dataIndex: 'keyName'} 擁有keyName的欄位才會出現在下拉裡面
 */
function getDropdownArray(mainTable, dropdownInfo) {
  // 要找的key名稱
  const dropdownKey = _get(dropdownInfo, 'dataIndex', false);
  // 先拿第一個對照
  const sampleObject = _get(mainTable, '0', null);
  if (dropdownKey && sampleObject) {
    const dropdownArr = getObjectKeysByKeyName(sampleObject, dropdownKey);
    return dropdownArr.sort();
  }
  return [];
}


/**
 * 取得有多個group時的PUT格式, 有改動的item會分別在每條row裡面做一個array
 * input:
    [{
      "id": "1",
      "Module 1": {
        "moduleMetalId": "11",
        "last": null,
        "current": 0,
        "next": 1
      },
      "Module 2": {
        "moduleMetalId": "22",
        "last": null,
        "current": 0,
        "next": 2
      },
    }],
  output:
    [{
      "id": "1",
      "modules": [
        {
          "moduleMetalId": "11",
          "last": 1,
          "current": 1,
          "next": 1
        },
        {
          "moduleMetalId": "22",
          "last": 2,
          "current": 2,
          "next": 2
        },
      ]
    }
  ]
 */
function getDropdownDifference(config) {
  const {
    mainTable = [],
    editable = [],
    dropdownInfo = { dataIndex: '' },
    groupKey = 'modules'
  } = config;

  const differenceList = R.difference(editable, mainTable);
  const dropdownArray = getDropdownArray(mainTable, dropdownInfo);
  const diffenceData = differenceList.map(item => ({
    ...R.omit(dropdownArray, item),
    [groupKey]: dropdownArray.reduce((prev, curr) => {
      const groupItem = _get(item, curr, false);
      if (groupItem) {
        return prev.concat(groupItem);
      }
      return prev;
    }, [])
  }));
  return diffenceData;
}


/**
 * 取得有多個group時的PUT格式, 有改動的項目都會在一個array裡面
 * input:
  [{
    "id": "1",
    "Module 1": {
      "moduleMetalId": "11",
      "last": null,
      "current": 0,
      "next": 1
    },
    "Module 2": {
      "moduleMetalId": "22",
      "last": null,
      "current": 0,
      "next": 2
    },
  }],
  output:
  [
      {
        "moduleMetalId": "11",
        "last": 1,
        "current": 1,
        "next": 1
      },
      {
        "moduleMetalId": "22",
        "last": 2,
        "current": 2,
        "next": 2
      },
  ]
 */

function getSeparateDropdownDifference(config) {
  const {
    mainTable = [],
    editable = [],
    dropdownInfo = { dataIndex: '' },
  } = config;

  const differenceList = R.difference(editable, mainTable);
  const dropdownArray = getDropdownArray(mainTable, dropdownInfo);
  const diffenceData = differenceList.reduce((prev, curr) => {
    dropdownArray.forEach(key => {
      const obj = _get(curr, key, false);
      if (obj) {
        prev.push(obj);
      }
    });
    return prev;
  }, []);
  return diffenceData;
}

function getIsCheckable(item) {
  return !(_get(item, ['materialSpec'], false) === 'Other_Fill_ME_Remark' || _get(item, ['material'], false) === 'Other_Fill_ME_Remark' || _get(item, ['disable'], false));
}

export default {
  gen3TypeTemplate,
  mapping3TypeToDate,
  getFiltedTableData,
  getDropdownArray,
  getDropdownDifference,
  getSeparateDropdownDifference,
  getIsCheckable,
};
