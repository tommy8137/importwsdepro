import React, { useState, useEffect } from 'react';
import Table from '~~elements/Table';
import Modal from '~~elements/Modal';
import Button from '~~elements/Button';
import BomHistoryModal from '~~features/BomManagement/component/EditHistory/BomHistoryModal';
import versionListSetting from './VersionListSetting';

const ChooseVersionModal = props => {
  const {
    dataSource = [],
    // actions
    onClickRow = () => { },
    onClickCancel = () => { },
    onClickNextVersion = () => { },
    onClickCopy = () => { },
    onClickHistory = () => { },
  } = props;

  const [isOpen, setIsOpen] = useState(false);
  const [historyData, setHistoryData] = useState([]);
  const [selectedBomId, setSelectedBomId] = useState('');

  useEffect(() => {
    if (!isOpen) {
      setHistoryData([]);
      setSelectedBomId('');
    }
  }, [isOpen]);

  const columns = versionListSetting({
    ...props,
    onOpenHistoryModal: handleOpenHistoryModal,
    onClickNextVersion,
    onClickCopy,
    onClickHistory,
  });

  function handleOpenHistoryModal(val, record) {
    const bomId = record?.id || '';
    setHistoryData(val);
    setSelectedBomId(bomId);
    setIsOpen(true);
  }

  /**
   * click version row
   * @param {*} event click event
   * @param {*} record version data
   */
  function handleClickRow(event, record) {
    event.stopPropagation();
    onClickRow(record);
  }

  return (
    <React.Fragment>
      <Modal.ModalBody>
        <Table
          scroll={{ y: 360 }}
          headerColor="blue"
          onRow={(record) => {
            return {
              onClick: event => handleClickRow(event, record)
            };
          }}
          columns={columns}
          dataSource={dataSource}
          pagination={false}
        />
      </Modal.ModalBody>
      <Modal.ModalFooter>
        <Button color="white" onClick={onClickCancel}>Close</Button>
      </Modal.ModalFooter>

      <BomHistoryModal
        isOpen={isOpen}
        toggleOpen={setIsOpen}
        data={historyData}
        bomId={selectedBomId}
      />
    </React.Fragment >
  );
};

export default ChooseVersionModal;
