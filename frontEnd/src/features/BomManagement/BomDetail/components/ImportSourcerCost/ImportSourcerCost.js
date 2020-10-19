import React, { useState, useEffect, } from 'react';
import { connect } from 'react-redux';
import _get from 'lodash/get';
import * as BomDetailActions from '~~features/BomManagement/BomDetail/BomDetailActions';
import useResource from '~~hooks/useResource';
import BomDetailResource from '~~apis/resource/BomDetailResource';
import ImportFileModal from '../ImportFile';
import Config from './ImportSourcerCostConfig';

const CURRENCY_OPTIONS = [{ label: 'USD', value: 'USD' }, { label: 'RMB', value: 'RMB' }];
const DEFAULT_CURRENCY_OPTION = _get(CURRENCY_OPTIONS, 0);

function ImportSourcerCost(props) {
  const {
    isOpen,
    bomID,
    uploadInfo,
    onSureLeave,
    getBomDetail: refresh,
  } = props;

  const [selectedCurrency, setSelectedCurrency] = useState(DEFAULT_CURRENCY_OPTION);
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
      bomID,
      selectedCurrency,
      setSelectedCurrency,
      currencyOptions: CURRENCY_OPTIONS,
      setReadFileData,
      readFileData,
    },
    action: {
      setStep,
      setFile,
      onSureLeave,
      refresh,
    },
  });

  return (
    <ImportFileModal
      step={`step${step}`}
      config={config}
      isOpen={isOpen}
      onSureLeave={onSureLeave}
    />
  );
}

export default connect(
  (state) => ({
    step: state.bomDetail.step,
    uploadInfo: state.bomDetail.uploadInfo,
    bomID: state.bomDetail.bomID,
  }),
  {
    getBomDetail: BomDetailActions.getBomDetail,
  }
)(ImportSourcerCost);
