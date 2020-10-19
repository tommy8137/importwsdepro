import React, { useState, useEffect } from 'react';
import Modal from '~~elements/Modal';
import Button from '~~elements/Button';
import Resource from '~~apis/resource';
import { dispatchNotification, dispatchLoading } from '~~utils/CommonUtils';
import HistoryList from './HistoryList';


const BomItemHistoryModal = props => {
  const {
    isOpen = false,
    toggleOpen = () => { },
    bomId = '',
    sourceItemId = '',
  } = props;

  const [historyData, setHistoryData] = useState([]);

  useEffect(() => {
    if (isOpen) {
      getBomItemHistory();
    } else {
      setHistoryData([]);
    }
  }, [sourceItemId, isOpen]);

  async function getBomItemHistory() {
    dispatchLoading(true);
    try {
      if (bomId && sourceItemId) {
        const res = await Resource.BomDetailResource.getBomItemHistory(bomId, sourceItemId);
        const newHistoryData = res?.data || [];
        setHistoryData(newHistoryData);
      }
    } catch (error) {
      console.log('error >>>>', error);
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
      </Modal.ModalHeader>
      <Modal.ModalBody>
        <HistoryList data={historyData} />
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
