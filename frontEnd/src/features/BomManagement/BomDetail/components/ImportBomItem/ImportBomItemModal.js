import React, { useState, useRef, } from 'react';
import { connect } from 'react-redux';
import * as BomDetailActions from '~~features/BomManagement/BomDetail/BomDetailActions';
import ImportFileModal from '../ImportFile';
import Config from './ImportBomItemConfig';

function ImportBomItemModal(props) {
  const {
    isOpen,
    step,
    uploadInfo,
    onSureLeave,
  } = props;
  const nameMatchingRef = useRef(null);
  const config = Config({
    state: {
      uploadInfo,
    },
    action: BomDetailActions,
    nameMatchingRef,
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
  }),
  {
  }
)(ImportBomItemModal);
