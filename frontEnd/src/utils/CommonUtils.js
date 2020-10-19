import * as R from 'ramda';
import { store, history } from '~~store';
import utf8 from 'crypto-js/enc-utf8';
import AES from 'crypto-js/aes';
import _get from 'lodash/get';
import _cloneDeep from 'lodash/cloneDeep';
import FileSaver from 'file-saver';
import AppConfig from '~~config';
import { toggleLoadingStatus } from '~~redux/Loading/LoadingActions';
import { pushNotification } from '~~hoc/NotificationSystem/NotificationSystemActions';
import { getMessageByErrorCode } from '~~utils/ErrorCodeUtils';

export function getHostUrl() {
  const { origin, protocol, hostname, port } = window.location;
  let path = origin;
  if (!origin) {
    path = `${protocol}//${hostname}${(port ? `:${port}` : '')}`;
  }
  return path;
}


const randomBetween = (max, min) => Math.floor(Math.random() * (max - min + 1)) + min;


// fakeApiHelper
// responseType: success | fail | random | inOrder
let count = 1;
const fakeApiHelper = (interval = 1000, responseType = 'success', successResponse, ErrorResponse = 'SOMETHING_WRONG') => {
  return new Promise((resolve, reject) => {
    // 一次成功，一次失敗
    if (responseType === 'inOrder') {
      if (count % 2 === 1) {
        const axiosFormat = { data: successResponse };
        setTimeout(() => resolve(axiosFormat), interval);
      } else {
        const axiosFormat = { data: ErrorResponse };
        setTimeout(() => reject(axiosFormat), interval);
      }
      count += 1;
    }

    // 隨機的回傳成功或失敗
    if (responseType === 'random') {
      const random = randomBetween(1, 100);
      if (random % 2 === 1) {
        const axiosFormat = { data: successResponse };
        setTimeout(() => resolve(axiosFormat), interval);
      } else {
        const axiosFormat = { data: ErrorResponse };
        setTimeout(() => reject(axiosFormat), interval);
      }
      count += 1;
    }

    if (responseType === 'success') {
      const axiosFormat = { data: successResponse };
      setTimeout(() => resolve(axiosFormat), interval);
    }
    if (responseType === 'fail') {
      const axiosFormat = { data: ErrorResponse };
      setTimeout(() => reject(axiosFormat), interval);
    }
  });
};

// 傳給後端排序的格式

// 整理orderBy的格式組合
// 前面加個'-'表示desc
const genOrderByFormat = (sortInfoList) => {
  return sortInfoList.reduce((prev, curr) => {
    if (curr.sortOrder === 'desc' || curr.sortOrder === 'descend') {
      return [
        ...prev,
        `-${curr.dataIndex}`
      ];
    }
    return [
      ...prev,
      curr.dataIndex
    ];
  }, []).join(',');
};


const getTemplateActionTypes = (prefix, actionsName) => {
  const base = `${prefix}${actionsName}`;
  const success = `${base}_SUCCESS`;
  const failed = `${base}_FAILED`;
  return {
    template: {
      [base]: base,
      [success]: success,
      [failed]: failed,
    },
    base,
    success,
    failed,
    BASE: base,
    SUCCESS: success,
    FAILED: failed,
  };
};


/**
 * 比較兩個array內的值是否一樣
 * @param {*} arr1
 * @param {*} arr2
 */
function isSameArray(arr1, arr2) {
  /* eslint no-restricted-syntax: off */
  /* eslint guard-for-in: off */
  if (arr1.length !== arr2.length) {
    return false;
  }
  let frequencyCounter1 = {};
  let frequencyCounter2 = {};
  // 把arr1每個值的數量做成frequencyCounter1
  for (let val of arr1) {
    frequencyCounter1[val] = (frequencyCounter1[val] || 0) + 1;
  }
  // 把arr2每個值的數量做成frequencyCounter2
  for (let val of arr2) {
    frequencyCounter2[val] = (frequencyCounter2[val] || 0) + 1;
  }

  for (let key in frequencyCounter1) {
    // 如果key的平方有在frequencyCounter2，就通過
    if (!(key in frequencyCounter2)) {
      return false;
    }
    // 如果數量不一樣就不通過
    if (frequencyCounter1[key] !== frequencyCounter2[key]) {
      return false;
    }
  }
  return true;
}


/**
 * 組出react-select要的select格式
 * @param {*} keyName
 * @param {*} options
 * ex: [{ name: 'abc'},  { name: 'def'}]   ----> [{ label: 'abc', value: 'abc' },  { label: 'def', value: 'def' }]
 */
const convertToSelectorOptions = (keyName, options) => {
  const keyLens = R.lensProp(keyName);
  return R.pipe(
    // 照字母排序
    R.sortBy(R.prop(keyName)),
    R.map(R.view(keyLens)), //   R.map(R.path([keyName])),
    R.uniq,
    R.map(x => ({ label: x || 'null', value: x })),
  )(options);
};


/**
 * 將 url 中 :variabe 取代
 *
 * @param {string} path url
 * @param {string} args 要取代的數值/字串
 * resolvePath('/user/:id', 2) => '/user/2'
 *
 * @returns {String} Mapped Url '/user/2'
 */
function resolvePath(path, args) {
  let replacedArgNum = 0;
  const pathArray = path.split('/').map(p => {
    if (p.charAt(0) === ':') {
      const replacedArg = args[replacedArgNum];
      replacedArgNum += 1;
      return replacedArg;
    }
    return p;
  });
  return pathArray.join('/');
}

/**
 * 將 url 中 :variabe 取出到陣列之中
 *
 * @param {string} url url
 * @param {array} values [ id: 2, name: joe]
 * resolvePath('/user/:id', 2) => '/user/2'
 * @returns {String} [2]'
 */
function resolveParams(url, values) {
  return url
    .split('/')
    .filter(item => item.charAt(0) === ':')
    .map(item => values[item.substring(2, item.length - 1)]);
}

/**
 * 將 url 中 :variabe 取出到陣列之中
 *
 * @param {string} url url
 * @param {array} values [ id: 2, name: joe]
 * resolvePath('/user/:id', 2) => '/user/2'
 * @returns {String} [2]'
 */
function getUrlParams(url) {
  return url
    .split('/')
    .filter(item => item.charAt(0) === ':')
    .map(item => item.substring(2, item.length - 1));
}


/*
url加密
*/
function encriptUrl(string) {
  return AES.encrypt(string, AppConfig.urlSecret).toString();
}

function decriptUrl(string) {
  let originalText = AES.decrypt(string, AppConfig.urlSecret).toString(utf8);
  return JSON.parse(originalText);
}


/*
real: 真的api 設定
fake: 假的api設定
debugInfo: 是否使用假的api debug
*/
function mergeResourceProxy(realObj, fakeObj, debugInfo = null) {
  if (R.isNil(debugInfo)) {
    return realObj;
  }
  const determineRealOrFake = (value, key, obj) => {
    if (debugInfo[key]) {
      // 使用假資料
      return fakeObj[key];
    }
    // 使用真資料
    return value;
  };

  let result = R.mapObjIndexed(determineRealOrFake, realObj);
  return result;
}

/**
 * 匯出txt檔案
 * @param {string} 要寫入的資料 (換行請用\n)
 * @param {string} 檔名
 */
export function exportTxt(data, filename) {
  const element = document.createElement('a');
  const file = new Blob([data], { type: 'text/plain' });
  element.href = URL.createObjectURL(file);
  element.download = `${filename}.txt`;
  document.body.appendChild(element); // Required for this to work in FireFox
  element.click();
}


/**
 * 下載檔案
 * @param {object} api的response
 * @param {string} 預設檔名
 */
export function downloadFile(response, defaultFileName) {
  const type = _get(response, ['headers', 'content-type'], '');
  const disposition = _get(response, ['headers', 'content-disposition'], '');
  const regexResult = /attachment; filename="(.*)"$/g.exec(disposition);
  const filename = !!regexResult && regexResult.length > 0 ? regexResult[1] : defaultFileName;
  FileSaver.saveAs(
    new Blob([response.data], { type }),
    filename
  );
}

/**
 * 把loading的dispath抽出來方便使用
 * @param {} status loading status
 */
export const dispatchLoading = (status) => store.dispatch(toggleLoadingStatus(status));


export const notificationAction = (msgData) => {
  if (!msgData) return '';
  const { message = '發生異常，請稍後再試', level = 'error', error = null } = msgData;
  let errorMsg = message;
  if (error && level === 'error') {
    const errorCode = _get(error, ['response', 'data', 'code'], '') || _get(error, ['response', 'data'], '');
    errorMsg = getMessageByErrorCode(errorCode, message);
    // console.log('errorCode  >>>>', error.response, errorCode, 'errorMsg >>>', errorMsg);
  }
  return pushNotification({
    message: errorMsg,
    level
  });
};
/**
 * 把Notification的dispath抽出來方便使用
 * @param {*} message 錯誤訊息
 * @param {*} level error success
 */
export function dispatchNotification(msgData) {
  const act = notificationAction(msgData);
  store.dispatch(act);
}

/**
 * Insert an item(s) into an array at specific index
 * @param {*} list
 */
export function addToArray(list) {
  const ls = _cloneDeep(list);
  return (idx, ...args) => {
    ls.splice(idx, 0, ...args);
    return ls;
  };
}

export default {
  fakeApiHelper,
  genOrderByFormat,
  getTemplateActionTypes,
  getHostUrl,
  isSameArray,
  convertToSelectorOptions,
  resolvePath,
  resolveParams,
  getUrlParams,
  encriptUrl,
  decriptUrl,
  mergeResourceProxy,
  exportTxt,
  downloadFile,
  dispatchLoading,
  dispatchNotification,
  addToArray,
};
