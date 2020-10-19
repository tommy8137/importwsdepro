import React, { Component } from 'react';
import styled from 'styled-components';
import Modal from '~~elements/Modal';
import _get from 'lodash/get';
import Button from '~~elements/Button';
import { Tabs, Tab, TabsContainer } from '~~elements/Tabs';
import Step1Form from './Step1Form';

const EditBomModal = styled(Modal.Modal)`
  .modal-content{
    min-height: 43rem
  }
  .form-box {
    visibility: visible;
    opacity: 1;
    position: relative;
    left: 0px;
    transition: .3s ease all;
  }
  .hide {
    position: absolute;
    top: 0;
    left: -100%;
    opacity: 0;
    visibility: hidden;
    transition: .3s ease all;
  }
`;


function ReadOnlyModal(props) {
  const {
    isOpen,
    onClickCancel = () => { }
  } = props;

  function handleClickCancel() {
    onClickCancel();
  }

  return (
    <EditBomModal isOpen={isOpen}>
      <Modal.ModalHeader>
        BOM Information
      </Modal.ModalHeader>
      <TabsContainer>
        <Tabs>
          <Tab>BOM Information</Tab>
        </Tabs>
      </TabsContainer>
      <Modal.ModalBody>
        {/* 表單內容 */}
        <div className="form-box">
          <Step1Form
            viewMode={true}
            bindSubmitForm={() => { }}
            onSubmitForm={() => { }}
          />
        </div>
      </Modal.ModalBody>
      <Modal.ModalFooter>
        <Button color="white" onClick={handleClickCancel}>
          Close
        </Button>
      </Modal.ModalFooter>
    </EditBomModal>
  );
}

export default ReadOnlyModal;

