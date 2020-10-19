/* eslint-disable no-unsafe-finally */
import { useState, useEffect } from 'react';
import { store, history } from '~~store';
import * as LoadingActions from '~~redux/Loading/LoadingActions';
import * as NotificationSystemActions from '~~hoc/NotificationSystem/NotificationSystemActions';
import { dispatchNotification, dispatchLoading, downloadFile } from '~~utils/CommonUtils';
import { getMessageByErrorCode } from '~~utils/ErrorCodeUtils';

/**
 * useAxios
 * @param {any} defaultResponse 預設從 api 回傳的格式
 * @param {boolean} useDefaultConfig 要不要使用預設的 baseurl 跟 auth token
 */

function useAxios(resource, defaultResponse, successMsg, errorMsg) {
  const [exportObj, setExportObj] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState(defaultResponse);
  const [error, setError] = useState(null);

  useEffect(() => {
    setExportObj({ isLoading, response, error });
  }, [isLoading, JSON.stringify(response), error]);

  async function exec(...arg) {
    let res = false;
    setError(null);
    setIsLoading(true);
    dispatchLoading(true);
    try {
      const { data } = await resource(...arg);
      res = data;
      setResponse(data);
      if (successMsg) {
        dispatchNotification(successMsg);
      }
    } catch (e) {
      console.log('e >>>>', e);
      if (errorMsg) {
        const errText = dispatchNotification({
          ...errorMsg,
          error: e
        });
        setError(errText);
      }
    }
    setIsLoading(false);
    dispatchLoading(false);
    return res;
  }

  return ({
    isLoading,
    response,
    error,
    exec,
  });
}

export default useAxios;
