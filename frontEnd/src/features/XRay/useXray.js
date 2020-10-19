import React, { useState, useEffect } from 'react';
import * as R from 'ramda';
import { store, history } from '~~store';
import _get from 'lodash/get';
import _set from 'lodash/set';
import _has from 'lodash/has';
import _head from 'lodash/head';
import _find from 'lodash/find';
import FileSaver from 'file-saver';
import { toggleLoadingStatus } from '~~redux/Loading/LoadingActions';
import { pushNotification } from '~~hoc/NotificationSystem/NotificationSystemActions';
import { getMessageByErrorCode } from '~~utils/ErrorCodeUtils';

function useFile(props) {
  const [errorMsg, setErrorMsg] = useState('');
  const [percentage, setPercentage] = useState(0);
  const {
    defaultFileName = 'test.xlsx',
    onUploadSucess = () => { },
    onUploadError = () => { },
    onDownloadSuccess = () => { },
    onDownloadError = () => { },
  } = props;

  const dispatchLoading = (status) => store.dispatch(toggleLoadingStatus(status));

  const dispatchNotification = error => {
    const errorCode = _get(error, ['response', 'data', 'code'], '');
    const message = getMessageByErrorCode(errorCode, '修改資料有誤，請稍後再試');
    setErrorMsg(message);
    store.dispatch(
      pushNotification({
        message,
        level: 'error'
      })
    );
  };


  function onUploadProgress(progress) {
    const { loaded, total } = progress;
    setPercentage(Math.ceil((loaded / total) * 100));
  }
  /**
   * 處理檔案上傳
   * @param {*} resource 要call的api resource
   */
  async function handleUploadFile(resource, ...arg) {
    dispatchLoading(true);
    try {
      const res = await resource(...arg, onUploadProgress);
      onUploadSucess(res);
    } catch (error) {
      console.log('handleUploadFile error >>>>', error);
      dispatchNotification(error);
      onUploadError(error);
    }
    dispatchLoading(false);
  }

  /**
   * 處理檔案下載
   * @param {*} resource 要call的api resource
   * @param {*} defaultFileName 檔名預設值
   */
  async function handleDownloadFile(resource, ...arg) {
    dispatchLoading(true);
    try {
      const res = await resource(...arg);
      const type = _get(res, ['headers', 'content-type'], '');
      const disposition = _get(res, ['headers', 'content-disposition'], '');
      const regexResult = /attachment; filename="(.*)"$/g.exec(disposition);
      const filename = !!regexResult && regexResult.length > 0 ? regexResult[1] : defaultFileName;
      FileSaver.saveAs(
        new Blob([res.data], { type }),
        filename
      );
      onDownloadSuccess(res);
    } catch (error) {
      console.log('handleDownloadFile error >>>>', error);
      dispatchNotification(error);
      onDownloadError(error);
    }
    dispatchLoading(false);
  }

  return {
    handleUploadFile,
    handleDownloadFile,
  };
}

export default useFile;
