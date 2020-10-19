import { store } from '~~store';
import Step1 from '~~features/BomManagement/BomDetail/components/ImportFile/Step1';
import Step2 from '~~features/BomManagement/BomDetail/components/ImportFile/Step2';
import Step3 from '~~features/BomManagement/BomDetail/components/ImportFile/Step3';

const Config = ({
  state: { uploadInfo }, // redux props
  action, // redux actions
  ...props, // others
}) => ({
  step1: {
    component: Step1,
    componentProps: {
      uploadFile: uploadInfo.uploadFile,
      updateImportFile: (file) => store.dispatch(action.updateImportFile(file)),
    },
    modal: {
      moreSpace: true,
      widthType: 'small'
    },
    modalHeader: {
      title: 'Import Bom File',
      hasBack: false,
    },
    modalFooter: {
      rightBtnText: 'Next',
      disabled: !uploadInfo.uploadFile,
      color: 'black',
      onClick: () => store.dispatch(action.uploadFile(uploadInfo.uploadFile)),
    },
  },
  // ===================================================
  step2: {
    component: Step2,
    componentProps: {
      failRows: uploadInfo.failRows,
      passCount: uploadInfo.passCount,
      failCount: uploadInfo.failCount,
    },
    modal: {
      moreSpace: false,
      widthType: 'middle',
    },
    modalHeader: {
      title: 'Read Data',
      hasBack: true,
      onClickBack: () => {
        store.dispatch(action.deleteTemp());
      },
    },
    modalFooter: {
      rightBtnText: 'Next',
      color: 'black',
      disabled: (!uploadInfo.uploadFile || uploadInfo.failCount),
      onClick: () => {
        if (!uploadInfo.designeeOptions.length) {
          store.dispatch(action.getMappingInfo());
        } else {
          store.dispatch(action.updateStep(1));
        }
      },
    },
  },
  // ===================================================
  step3: {
    component: Step3,
    componentProps: {
      nameMatchingRef: props.nameMatchingRef,
      uploadItemOwner: uploadInfo.uploadItemOwner,
      designeeOptions: uploadInfo.designeeOptions,
      confirmBomItem: (data) => store.dispatch(action.confirmBomItem(data)),
    },
    modal: {
      moreSpace: false,
      widthType: 'small'
    },
    modalHeader: {
      title: 'Name Matching',
      hasBack: true,
      onClickBack: () => {
        store.dispatch(action.updateStep(-1));
      },
    },
    modalFooter: {
      rightBtnText: 'Finish',
      color: 'black',
      onClick: () => props.nameMatchingRef.current.handleSubmit(),
    },
  },
  // ===================================================
});

export default Config;
