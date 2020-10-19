import React, { useState, useRef, useEffect } from 'react';
import { store } from '~~store';
import styled from 'styled-components';
import Modal from '~~elements/Modal';
import { connect } from 'react-redux';
import Button from '~~elements/Button';
import LeaveAlert from './LeaveAlert';

const ImportFileModal = styled(Modal.Modal)`

/* Alert Modal */
.alert{
    width: 100%;
    height: 100%;
  }
`;

function ImportFile(props) {
  // console.log('import file props >>>', props);
  const [leaveAlert, toggleCancel] = useState(false);
  const {
    isOpen,
    config,
    step,
  } = props;

  const {
    component: FormComponent,
    componentProps,
    modal,
    modalHeader,
    modalFooter,
  } = config[step];

  return (
    <ImportFileModal isOpen={isOpen} {...modal}>
      {/* modal 標題 */}
      <Modal.ModalHeader {...modalHeader}>
        <div>{modalHeader.title}</div>
      </Modal.ModalHeader>

      {/* modal 內容 */}
      <Modal.ModalBody>
        <FormComponent {...componentProps} />
      </Modal.ModalBody>

      {/* modal 按鈕 */}
      <Modal.ModalFooter>
        <Button
          color="white"
          onClick={() => toggleCancel(true)}
        >
            Cancel
        </Button>
        <Button
          color="black"
          {...modalFooter}
        >
          {modalFooter.rightBtnText}
        </Button>
      </Modal.ModalFooter>
      <LeaveAlert
        isOpen={leaveAlert}
        toggleAlert={toggleCancel}
        onSure={() => props.onSureLeave()}
      />
    </ImportFileModal>
  );
}

export default ImportFile;
