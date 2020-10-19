import React from 'react';
import Modal from '~~elements/Modal';
import Button from '~~elements/Button';
import Icon, { IconName } from '~~elements/Icon';
import styled from 'styled-components';
import Resource from '~~apis/resource';
import { dispatchNotification, dispatchLoading, downloadFile } from '~~utils/CommonUtils';
import HistoryList from './HistoryList';

const DownloadIcon = styled(Icon)`
  position: absolute;
  right: 0;
  top: 50%;
  transform: translate(0, -50%);
`;


const BomItemHistoryModal = props => {
  const {
    isOpen = false,
    toggleOpen = () => { },
    data = [],
    bomId = '',
  } = props;


  async function handleDownload() {
    dispatchLoading(true);
    try {
      if (bomId) {
        const res = await Resource.BomManagementResource.downloadEmdmEditHistory(bomId);
        downloadFile(res);
      }
    } catch (error) {
      dispatchNotification({ error });
    }
    dispatchLoading(false);
  }


  return (
    <Modal.Modal
      isOpen={isOpen}
      widthType="large"
    >
      <Modal.ModalHeader>
        Edit History
        <DownloadIcon
          size="3rem"
          icon={IconName.BtnDownload}
          onClick={handleDownload}
        />
      </Modal.ModalHeader>
      <Modal.ModalBody>
        <HistoryList data={data} />
      </Modal.ModalBody>
      <Modal.ModalFooter>
        <Button
          color="white"
          onClick={e => toggleOpen(false)}
        >
          Close
        </Button>
      </Modal.ModalFooter>
    </Modal.Modal>
  );
};

export default BomItemHistoryModal;
