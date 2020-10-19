import React, { useState, useEffect, } from 'react';
import { connect } from 'react-redux';
import ImportFileModal from '~~features/BomManagement/BomDetail/components/ImportFile';
import Config from './ImportMaterialPriceConfig';

function ImportMaterialPrice(props) {
  const {
    isOpen,
    uploadInfo,
    onSureLeave,
    refresh,
  } = props;
  const [step, setStep] = useState(1);
  const [file, setFile] = useState(null);
  const [readFileData, setReadFileData] = useState({});

  useEffect(() => {
    setStep(1);
    setFile(null);
  }, [isOpen]);

  const config = Config({
    state: {
      uploadInfo,
      step,
      file,
      setReadFileData,
      readFileData,
    },
    action: {
      setStep,
      setFile,
      onSureLeave,
      refresh
    },
  });

  return (
    <ImportFileModal
      step={`step${step}`}
      config={config}
      isOpen={isOpen}
      onSureLeave={onSureLeave}
      refresh={refresh}
    />
  );
}

export default connect(
  (state) => ({
    step: state.dataBase.step,
    uploadInfo: state.dataBase.uploadInfo,
  })
)(ImportMaterialPrice);
