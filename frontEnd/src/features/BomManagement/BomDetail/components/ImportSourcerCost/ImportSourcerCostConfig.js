import React, { useState, useEffect } from 'react';
import _get from 'lodash/get';
import { store } from '~~store';
import SourcerStep1 from '~~features/BomManagement/BomDetail/components/ImportSourcerCost/SourcerStep1';
import SourcerStep2 from '~~features/BomManagement/BomDetail/components/ImportSourcerCost/SourcerStep2';
import useResource from '~~hooks/useResource';
import BomDetailResource from '~~apis/resource/BomDetailResource';


const Config = ({
  state: {
    uploadInfo,
    file,
    bomID,
    currencyOptions,
    selectedCurrency,
    setSelectedCurrency,
    setReadFileData = () => { },
    readFileData = {}
  }, // redux props
  action, // redux actions
}) => {
  const uploadSourcerCostExcel = useResource(BomDetailResource.uploadSourcerCost, '',
    null,
    { message: '上傳失敗，請稍後再試', level: 'error' }
  );
  const putSourcerCost = useResource(
    BomDetailResource.putSourcerCost,
    '',
    { message: '更新成功', level: 'success' },
    { message: '更新失敗，請稍後再試', level: 'error' }
  );

  return ({
    step1: {
      component: SourcerStep1,
      componentProps: {
        currencyOptions,
        selectedCurrency,
        setSelectedCurrency,
        uploadFile: file,
        updateImportFile: async (choosenFile) => {
          if (choosenFile) {
            action.setFile(choosenFile);
          } else {
            action.setFile(null);
          }
        },
      },
      modal: {
        // moreSpace: true,
        widthType: 'small'
      },
      modalHeader: {
        title: 'Import BOM File with Sourcer Cost',
        hasBack: false,
      },
      modalFooter: {
        rightBtnText: 'Next',
        disabled: !file,
        color: 'black',
        async onClick() {
          const currency = _get(selectedCurrency, ['value'], '');
          if (file) {
            const data = new FormData();
            data.append('file', file);
            const newReadFileData = await uploadSourcerCostExcel.exec(data, bomID, currency);
            // console.log(newReadFileData);
            if (newReadFileData) {
              setReadFileData(newReadFileData);
              action.setStep(2);
            }
          }
        }
      },
    },
    // ===================================================
    step2: {
      component: SourcerStep2,
      componentProps: {
        failRows: readFileData.failMessage,
        passCount: readFileData.passCount,
        failCount: readFileData.failCount,
      },
      modal: {
        moreSpace: false,
        widthType: 'middle',
      },
      modalHeader: {
        title: 'Read Data',
        hasBack: true,
        onClickBack: () => action.setStep(1),
      },
      modalFooter: {
        rightBtnText: 'Import',
        color: 'black',
        disabled: (!file || readFileData.failCount),
        onClick: async () => {
          const { upload_tmp_id: id } = uploadSourcerCostExcel.response;
          const res = await putSourcerCost.exec(id);
          if (putSourcerCost) {
            action.onSureLeave();
            action.refresh({ bomID });
          }
        },
      },
    },
    // ===================================================
  });
};

export default Config;
