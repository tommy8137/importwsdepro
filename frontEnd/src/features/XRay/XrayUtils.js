
import * as R from 'ramda';
import _get from 'lodash/get';


// ramda的map沒有回傳index,  addIndex 參考 http://ramdajs.com/0.21.0/docs/#addIndex
const mapIndexed = R.addIndex(R.map);

/**
 * 把 ceSpecGroup 預設組合帶入specGroup
 * @param {*} specGroup 目前這個specGroup
 * @param {*} ceSpecGroup 傳入ceSpecGroup: [true, true, true, false....]
 */
export function getCeSpecGroup(specGroup = [], ceSpecGroup = []) {
  // map specGroup裡面所有的spec01, spce02..., 如果 ceSpecGroup[n] 是 true 的話就把全部都全選
  const specKeys = Object.keys(specGroup);
  const newSpecGroup = specKeys.reduce((prev, sKey, index) => {
    const needSelectAll = _get(ceSpecGroup, index, false);
    const specList = _get(specGroup, sKey, []);
    const newSpecList = specList.map(s => {
      return {
        ...s,
        value: needSelectAll
      };
    });
    return {
      ...prev,
      [sKey]: newSpecList
    };
  }, {});
  return newSpecGroup;
}

/**
 * 當使用partnumber, 按下放大鏡搜尋時，會先預設把 "這顆料自己的 Spec 項目" 勾起來
 * isHighlight 跟 value 都是 true 時勾起來
 * @param {} specGroup api得到的specGroup
 */
export function getIsHighlightSpecGroup(specGroup = []) {
  const specKeys = Object.keys(specGroup);
  const newSpecGroup = specKeys.reduce((prev, sKey) => {
    const specList = _get(specGroup, sKey, []);
    const newSpecList = specList.map(s => {
      const hasHighLight = Object.prototype.hasOwnProperty.call(s, 'isHighlight');
      const needChecked = hasHighLight ?
        (_get(s, 'isHighlight', false) === true && _get(s, 'value', false) === true) :
        _get(s, 'value', false) === true;
      return {
        ...s,
        value: needChecked
      };
    });
    return {
      ...prev,
      [sKey]: newSpecList
    };
  }, {});
  return newSpecGroup;
}

/**
 * 把 specGroup 的 value 都改成 false
 * @param {*} specGroup 目前這個specGroup
 */
export function getEmptySpecGroup(specGroup) {
  return R.map(value => {
    return value.map(item => ({ ...item, value: false }));
  }, specGroup);
}


/**
 * 把 specGroup 的 value 都改成 false
 * @param {*} specGroup 目前這個specGroup
 */
export function getSelectAllSpecGroup(specGroup) {
  return R.map(value => {
    return value.map(item => ({ ...item, value: true }));
  }, specGroup);
}


/**
 * 由於ME需要依序選擇spec, 選完一個才會call api取得下一個spec的值，如果當他往回選spec的時候後面的內容要清空
 * @param {*} specItem 目前頁面上的specItem
 * @param {*} specN 目前設定到第幾個specN
 */
export function getMeSpecItem(specItem, specN) {
  const { specGroup } = specItem;

  return {
    ...specItem,
    specGroup: mapIndexed((value, index) => {
      return index + 1 > specN ? [] : value;
    }, specGroup)
  };
}


/**
 * 取得目前specGroup選到最後的那個spec是哪一個
 * @param {*} specGroup 目前頁面上的specGroup
 */
export function getMeSpecN(specGroup) {
  let specN = 0;
  mapIndexed((value, index) => {
    if (value.length > 0) {
      specN = index;
    }
  }, specGroup);
  return specN + 1;
}

/**
 * @param {*} specItem 目前的specGroup
 * @param {*} key specN的key name   spec01
 * @param {*} spec  specN的spec組合 ['a', 'b', 'c' ...]
 */
export function setSpecGroupSpecN(specItem, key, spec = []) {
  const { specGroup } = specItem;
  // 把 ['a', 'b', 'c' ...] 轉成可以用的 [item_name :'a', value:false ...]
  const specN = R.keys(specGroup).indexOf(key) + 1;
  const specOptions = spec.map(s => ({ item_name: s, value: false }));
  const newSpecGroup = R.set(R.lensProp(key), specOptions, specGroup);

  return {
    ...specItem,
    specGroup: mapIndexed((value, index) => {
      return index + 1 > specN ? [] : value;
    }, newSpecGroup)
  };
}


export default function () { }
