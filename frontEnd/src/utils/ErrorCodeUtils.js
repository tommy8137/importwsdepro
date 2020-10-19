import _get from 'lodash/get';
import data from '~~apis/ErrorCodes.json';

/**
 * 由後端給的特殊error code轉成錯誤訊息
 */
export function getMessageByErrorCode(code, defaultMsg = 'Unexpected Error.') {
  return _get(data, code, defaultMsg);
}

export default {
  getMessageByErrorCode,
};

