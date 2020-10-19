import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Modal from '~~elements/Modal';
import _get from 'lodash/get';

import Button from '~~elements/Button';
import Check from './Check';

const StyledModal = styled(Modal.Modal)`
  .modal-body {
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
`;
function ExportModal(props) {
  const [exportType, setExportType] = useState('');

  const { isOpen, onClickExport, onCancelExport, eeEnabled, meEnabled } = props;
  const optionList = [{
    option: 'EE',
    disabled: !eeEnabled,
  }, {
    option: 'ME',
    disabled: !meEnabled,
  }, {
    option: 'Others',
    disabled: true,
  }];

  const handleClickCancel = (e) => {
    onCancelExport();
    setExportType('');
  };

  return (
    <StyledModal
      isOpen={isOpen}
      widthType="small"
      moreSpace
    >
      <Modal.ModalHeader>
          Select Part to Export
      </Modal.ModalHeader>
      <Modal.ModalBody>
        {optionList.map((opt, index) => (
          <Check
            key={index}
            isChecked={exportType === opt.option}
            onChange={e => setExportType(opt.option)}
            value={opt.option}
            isDisabled={opt.disabled}
          >
            {opt.option}
          </Check>))}
      </Modal.ModalBody>
      <Modal.ModalFooter>
        <Button color="white" onClick={handleClickCancel}>Cancel</Button>
        <Button color="black" onClick={() => onClickExport(exportType)} disabled={!exportType}>Export</Button>
      </Modal.ModalFooter>
    </StyledModal>
  );
}


export default ExportModal;
