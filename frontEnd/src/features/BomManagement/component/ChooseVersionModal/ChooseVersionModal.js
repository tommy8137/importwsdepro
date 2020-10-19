import React, { useState, useEffect } from 'react';
import Modal from '~~elements/Modal';
import VersionList from './VersionList';
import CopyList from './CopyList';


const EMDM_VERSION_MODAL_STEPS = {
  STEP1: {
    key: 'step1',
    modalTitle: 'Choose eMDM Version'
  },
  STEP2: {
    key: 'step2',
    modalTitle: 'Select Version to Copy'
  }
};

const ChooseVersionModal = props => {
  const [selectedBomId, setSelectedBomId] = useState('');
  const [step, setStep] = useState(EMDM_VERSION_MODAL_STEPS.STEP1);
  const {
    isOpen,
    versionList = [],
    columns = [],
    // actions
    onClickCancel = () => { },
    onClickChoose = () => { },
    onClickNextVersion = () => { },
  } = props;


  useEffect(() => {
    if (!isOpen) {
      setStep(EMDM_VERSION_MODAL_STEPS.STEP1);
    }
  }, [isOpen]);


  // 進入bom detail
  function handleClickRow(record) {
    onClickChoose(record);
  }

  // 按下next version 的時候會進入copy list頁面
  async function goToCopyList(bomId) {
    setSelectedBomId(bomId);
    setStep(EMDM_VERSION_MODAL_STEPS.STEP2);
  }

  function handleClickNextVersion(record) {
    const { id: bomId, cost_version: costVersion } = record;
    // 0.0 才可以copy version
    const isVersionZero = costVersion === '0.0';

    if (isVersionZero) {
      goToCopyList(bomId);
    } else {
      // 一般流程
      onClickNextVersion(bomId);
    }
  }

  function handleBackVersionList() {
    setStep(EMDM_VERSION_MODAL_STEPS.STEP1);
  }

  function handleClickCopy(copyCostBomID) {
    onClickNextVersion(selectedBomId, copyCostBomID);
  }

  const { modalTitle = '' } = step;

  return (
    <Modal.Modal
      isOpen={isOpen}
      widthType="large"
    >
      <Modal.ModalHeader>
        {modalTitle}
      </Modal.ModalHeader>
      {
        step.key === EMDM_VERSION_MODAL_STEPS.STEP1.key &&
        <VersionList
          dataSource={versionList}
          columns={columns}
          onClickRow={handleClickRow}
          onClickCancel={onClickCancel}
          onClickNextVersion={handleClickNextVersion}
        />
      }
      {
        step.key === EMDM_VERSION_MODAL_STEPS.STEP2.key &&
        <CopyList
          onClickCancel={handleBackVersionList}
          onClickCopy={handleClickCopy}
          selectedBomId={selectedBomId}
          onClickNextVersion={onClickNextVersion}
        />
      }
    </Modal.Modal>);
};

export default ChooseVersionModal;
