import traverse from 'traverse';
import safeEval from 'safe-exec-eval';
import _fpSet from 'lodash/fp/set';
import _fpGet from 'lodash/fp/get';
import _get from 'lodash/get';
import _hasIn from 'lodash/hasIn';
import _uniqBy from 'lodash/uniqBy';
import _pick from 'lodash/pick';
import _isNil from 'lodash/isNil';
import _toString from 'lodash/toString';
import uuidv4 from 'uuid/v4';
import CommonUtils from '~~utils/CommonUtils';

export function getPriceData(formData, layout) {
  const treeGroup = traverse(layout).reduce(function r(acc, item) {
    if (this.isLeaf || !item.key || !item.group) return acc;
    return { ...acc, [item.key]: item };
  }, {});
  return traverse(formData).reduce(function r(acc, item) {
    if (!this.isLeaf || !this.key || this.key === 'uuid') return acc;
    const isArrayNode = this.parent && Array.isArray(this.parent.node) && typeof item !== 'object';
    let nowPath = this.path;
    if (isArrayNode) {
      nowPath = this.parent.path;
    }
    const groupPath = nowPath.reduce((groupPathConfig, path, index) => {
      const fieldConfig = treeGroup[path];
      if (!fieldConfig) return groupPathConfig;
      const uuid = fieldConfig.multiple ? _fpGet(nowPath.slice(0, index + 2))(formData).uuid : null;
      const layoutKey = (fieldConfig.multiple && fieldConfig.multipleItems) ? _fpGet(nowPath.slice(0, index + 2))(formData).layoutKey : null;
      if (uuid) {
        if (layoutKey) {
          const field = fieldConfig.multipleItems.find(d => d.item === layoutKey);
          const tempPath = field.group ? `${field.group}-${uuid}` : `${treeGroup[path].group}-${uuid}`;
          return {
            pathArr: groupPathConfig.pathArr.concat(tempPath),
            parentUUID: uuid,
          };
        }
        const tempPath = groupPathConfig.parentUUID ? `${treeGroup[path].group}-${groupPathConfig.parentUUID}-${uuid}` : `${treeGroup[path].group}-${uuid}`;
        return {
          pathArr: groupPathConfig.pathArr.concat(tempPath),
          parentUUID: uuid,
        };
      }
      const tempPath = groupPathConfig.parentUUID ? `${treeGroup[path].group}-${groupPathConfig.parentUUID}` : treeGroup[path].group;
      return {
        ...groupPathConfig,
        pathArr: groupPathConfig.pathArr.concat(tempPath),
      };
    }, { pathArr: [], parentUUID: null });
    if (isArrayNode) {
      return _fpSet(groupPath.pathArr.concat(this.parent.key), this.parent.node)(acc);
    }
    // if (this.key.endsWith('Switch')) {
    //   return _fpSet(groupPath.pathArr.concat(this.key.split('Switch')[0]), item)(acc);
    // }
    return _fpSet(groupPath.pathArr.concat(this.key), item)(acc);
  }, {});
}

/**
 * @deprecated switchable 屬性不在使用
 */
export function transToSwitchPaths(paths) {
  return [...paths.slice(0, paths.length - 1), `${paths[paths.length - 1]}Switch`];
}

/**
 * 找出value在 layout 的路徑
 * @param {*} layout partlist layout
 * @param {*} paths 目前找到的路徑(遞迴使用)
 */
function getValuePath(layout, paths = []) {
  const parentKeys = paths.reduce((acc, path, index, arrays) => {
    const keys = arrays.slice(0, arrays.length - index);
    const item = _fpGet(keys)(layout);
    if (!item || !item.key) return acc;

    // 判斷是否為 multiple 的 key, 是就不能放0, 不是的話先放0在放 key
    if (item.multiple && item.minGroupCount > 0 && index !== 0) return acc.concat(0, item.key);
    return acc.concat(item.key);
  }, []);
  return parentKeys.reverse();
}

/**
 * 將 layout 轉成 formData
 * @param {*} layout 要轉換成 formData 的 partlist layout
 * @param {*} needSetUUID 是否預設產生 UUID
 */
export function getInitFormData(layout, needSetUUID = false, formData = {}, partItemInfo = {}) {
  return traverse(layout).reduce(function r(acc, item) {
    // this.parent.key === 'layout' 表示為下拉多選群組，所以初始化資料時，不用把他的小孩資料放入
    if (this.isLeaf || !item.key || (this.parent && this.parent.key === 'layout') || (this.parent && this.parent.minGroupCount === 0)) return acc;
    const paths = getValuePath(layout, this.path);
    const value = _fpGet(paths)(formData);
    let defaultValue = item.default;
    try {
      if (item.defaultCalc) {
        const defaultValues = _get(item, ['defaultValues'], []);
        // eslint-disable-next-line no-eval
        defaultValue = eval(item.defaultCalc)(item.default, partItemInfo, defaultValues);
      }
    } catch (e) { console.log(e); }

    return _fpSet(
      paths,
      item.multiple
        ? [...((item.multipleItems) ? [] : [...(item.minGroupCount > 0 ? Array.from(new Array(item.minGroupCount)).map(() => ({ uuid: uuidv4() })) : [])])]
        : value || defaultValue
    )(acc);
  }, needSetUUID ? { uuid: uuidv4() } : {});
}

/**
 * 用keys找出formData的數值
 * @param {*} formData  formData obj
 * @param {*} keys 要找的value的keys
 * @param {*} formDataPaths 要從哪個路徑找上來
 */
export function getValuesByKeys(formData, keys = [], formDataPaths = []) {
  const paths = ['', ...formDataPaths];
  if (!keys.length) {
    return {};
  }
  const result = paths.reduce((findedObj, path, idx) => {
    // 從最裡面找 -> 最外面，假如已經找到的話就跳過
    const nowPath = paths.slice(0, paths.length - idx).filter(obj => obj !== '');
    const nowPathObject = nowPath.length <= 0 ? formData : _get(formData, nowPath, false);
    const findedValues = traverse(nowPathObject).reduce(function r(ac, val) {
      if (val !== undefined && this.key && keys.includes(this.key)) {
        const isNotFound = findedObj[this.key] === undefined;
        if (isNotFound) {
          return {
            ...ac,
            [this.key]: val
          };
        }
      }
      return ac;
    }, {});
    return { ...findedObj, ...findedValues };
  }, {});
  return result;
}


export function getPCBInitFormData(layout, spec) {
  return traverse(layout).reduce(function r(acc, item) {
    if (this.isLeaf || !item.key) return acc;
    const paths = getValuePath(layout, this.path);
    const valueInSpec = spec[item.key];
    return _fpSet(paths, valueInSpec || item.default)(acc);
  }, {});
}


export function errorValidate(props) {
  const {
    fieldKey,
    constrains = [],
    fieldConfig = {},
    options = [], partItemInfo, fieldValue, dependsValues = {} } = props;

  const selectorValues = _get(fieldConfig, ['selectorConfig']);
  const decimalConstrain = _get(fieldConfig, ['decimal'], null);
  const fieldType = _get(fieldConfig, ['fieldType'], '');
  const dataType = _get(fieldConfig, ['dataType'], '');

  const constrainsError = constrains.reduce((errorMsg, item) => {
    if (errorMsg) return errorMsg;
    const { params = [], function: func = '' } = item;
    const values = _pick(dependsValues, params) || {};
    const isInvalid = safeEval(func)(fieldValue, { ...partItemInfo, ...values });
    if (isInvalid) {
      return item.message;
    }
    return errorMsg;
  }, '');

  // Decimal error message for inputFloat
  const needDecimalVerify =  fieldType === 'input' && dataType === 'float' && (decimalConstrain != null);
  const decimalError = needDecimalVerify ? validFloatMsg(fieldValue, decimalConstrain) : null;
  if (decimalError) {
    return decimalError;
  }

  // 如果是下拉, 才需要顯示 資料庫無此項目
  let notInDatabaseError = '';
  const needNoDataList = ['selector', 'fetch', 'fetch-hidden'];


  const needNoData = needNoDataList.some(k => fieldType === k);

  if (selectorValues && needNoData && Array.isArray(options) && !_isNil(fieldValue)) {
    const findedOption = !!options.find(opt => !_isNil(opt.value) && _toString(opt.value) === _toString(fieldValue));
    notInDatabaseError = !findedOption ? '資料庫無此項目' : '';
  }
  const errorMessage =  constrainsError || notInDatabaseError;
  return errorMessage;
}

// 一次把需要觀察的key value全部都找到
export function getAllDepends(props) {
  const { fieldKey = '', formData = {}, fieldConfig = {}, formDataPaths = [], partItemInfo = {} } = props;

  const {
    url = '',
    selectorConfig = {},
    displayConfig = {},
    constrains = [],
    replaceBy: replaceByDependsKeys = [],
    mapFrom: mapFromDependskeys = []
  } = fieldConfig;

  const { depends = [] } = selectorConfig;
  // 處理下拉 depends =====
  const filterDependsKeys = _get(selectorConfig, ['filter', 'depends'], []);
  const selectorDependsKeys = [...depends, ...filterDependsKeys];

  // disabled depends
  const condition = _get(displayConfig, ['depends', 'condition'], {});
  const conditionDependsKeys = [...Object.keys(condition)];

  // 紅字 depends
  const constrainsDependsKeys = constrains.reduce((prev, cons) => {
    const { params = [] } = cons;
    return [...prev, ...params];
  }, []);

  const urlDependsKeys = CommonUtils.getUrlParams(url) || [];

  // 整理需要用到的所有key
  const allKeys = [
    // fieldKey,
    ...selectorDependsKeys,
    ...conditionDependsKeys,
    ...constrainsDependsKeys,
    ...replaceByDependsKeys,
    ...mapFromDependskeys,
    ...urlDependsKeys
  ];

  const dependsValues = {
    ...getValuesByKeys(formData, allKeys, formDataPaths),
    ...partItemInfo
  };

  const pickValues = (keys) => _pick(dependsValues, [...keys, ...Object.keys(partItemInfo)]);

  const result = {
    fieldKey,
    allKeys,
    selectorValues: pickValues(selectorDependsKeys),
    conditionValues: pickValues(conditionDependsKeys),
    constrainsValues: pickValues(constrainsDependsKeys),
    replaceByValues: pickValues(replaceByDependsKeys),
    mapFromValues: pickValues(mapFromDependskeys),
    urlValues: pickValues(urlDependsKeys),
    allValues: dependsValues
  };

  return result;
}

/**
 * 取得下拉選項的主要邏輯
 * @param {String} key field key
 * @param {Array} values 所有的下拉選項
 * @param {Object} dependValues 用depends去formdata裡面找來, 需要監聽的value
 */
export function getFieldOptions(props) {
  const { fieldKey, selectorConfig = {}, dependsValues = {} } = props;
  const { depends = [], values = [], filter = {}, mappedKey = {} } = selectorConfig;
  const { func = '' } = filter;

  if (!values || !values.length || !Object.keys(dependsValues).length) return [];

  // 如果下拉的key長得跟畫面的key不一樣, 可以用mapKey轉換
  const getTransKey = (k) => (mappedKey[k] || k);

  const transFieldKey = getTransKey(fieldKey);

  const opts = values.filter((opt) => {
    let isPass = false;
    // 1. 檢查這個field的key有沒有opt裡面
    const isKeyInOpt = !!_hasIn(opt, transFieldKey);

    // 2. 檢查 opt 的 disableTime
    const isDisableTimeValid = _hasIn(opt, 'disableTime') ? !opt.disableTime : true;

    // 3. 檢查是否符合 depends 規則(如果有depends的話), depends裡面每一個key的value都要符合條件
    const isDependsValid = depends.length ? depends.every(dependKey => {
      const transDependsKey = getTransKey(dependKey);
      const dependValuesVal = _get(dependsValues, [dependKey], null);
      const optDependsVal = _get(opt, [transDependsKey], null);

      const isEqual = dependValuesVal === optDependsVal;
      if (dependValuesVal === null && optDependsVal === null) return false;
      if (isEqual) return true;
      return false;
    }) : true;

    if (isKeyInOpt && isDependsValid && isDisableTimeValid) {
      isPass = true;
    }
    return isPass;
  });

  // 自定義 下拉的過濾
  const filteredOptions = func ? safeEval(func)(opts, dependsValues) : opts;

  // 製作給Select使用的下拉
  const newOptions = filteredOptions.map(opt => {
    const optVal = _get(opt, [transFieldKey], null);
    const newOpt = {
      label: optVal,
      value: optVal,
      allValue: opt,
    };
    return newOpt;
  });
  // 去除重複
  const uniqOptions = _uniqBy(newOptions, item => item.value);
  return uniqOptions;
}


export function getFieldDisabled(props) {
  const {
    // fieldKey = '', // for debug key
    fieldValue,
    displayConfig = {},
    dependsValues = {}
  } = props;
  const condition = _get(displayConfig, ['depends', 'condition'], {});
  const values = _get(displayConfig, ['depends', 'values'], []);
  const conditionKeys = Object.keys(condition || {});

  if (!conditionKeys.length || !Object.keys(dependsValues).length) return false;

  const dependsIsDisabled =
    conditionKeys.some(key => {
      const con = condition[key];
      const dependVal = dependsValues[key];
      if (!dependVal && fieldValue) {
        return true;
      }
      // 判斷欄位是否 disabled 的邏輯
      // isPass: false 表示 欄位要被 disabled
      let isPass = true;
      if (typeof con === 'boolean' && con) {
        isPass = !!dependVal;
      } else {
        isPass = safeEval(con)(dependVal, dependsValues, values);
      }
      return !isPass;
    });
  return dependsIsDisabled;
}

/**
 * 限制小數位數 若為合法回傳null
 * @param {*} inputValue
 * @param {*} len
 */
export function validFloatMsg(inputValue, len = 8) {
  const regexp = new RegExp(`^\\d+(\\.\\d{1,${len}})?$`, 'g');
  if (inputValue == null || regexp.test(String(inputValue))) {
    return null;
  }
  return `限制輸入小數位數${len}位`;
}

