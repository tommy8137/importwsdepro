import React from 'react';
import MaterialPriceStep1 from '~~features/Database/components/ImportMaterialPrice/MaterialPriceStep1';
import MaterialPriceStep2 from '~~features/Database/components/ImportMaterialPrice/MaterialPriceStep2';
import useResource from '~~hooks/useResource';
import Resource from '~~apis/resource';
// import DatabaseResource from '~~apis/resource/DatabaseResources';


const Config = ({
  state: {
    uploadInfo,
    file,
    setReadFileData = () => { },
    readFileData = {}
  }, // redux props
  action, // redux actions
}) => {
  const uploadMaterialPriceExcel = useResource(Resource.DatabaseResource.uploadMaterialPrice, '',
    null,
    { message: '上傳失敗，請稍後再試', level: 'error' }
  );
  const putMaterialPrice = useResource(
    Resource.DatabaseResource.putMaterialPrice,
    '',
    { message: '更新成功', level: 'success' },
    { message: '更新失敗，請稍後再試', level: 'error' }
  );
  return ({
    step1: {
      component: MaterialPriceStep1,
      componentProps: {
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
        widthType: 'small'
      },
      modalHeader: {
        title: 'Import File',
        hasBack: false,
      },
      modalFooter: {
        rightBtnText: 'Next',
        disabled: !file,
        color: 'black',
        async onClick() {
          if (file) {
            const data = new FormData();
            data.append('file', file);
            const newReadFileData = await uploadMaterialPriceExcel.exec(data, '', '');
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
      component: MaterialPriceStep2,
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
          const { uploadId: id } = uploadMaterialPriceExcel.response;
          const res = await putMaterialPrice.exec(id);
          if (res) {
            action.onSureLeave();
            action.refresh();
          }
        },
      },
    },
    // ===================================================
  });
};

export default Config;
