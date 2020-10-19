import React, { useState } from 'react';
import styled from 'styled-components';
import Modal from '~~elements/Modal';

import Button from '~~elements/Button';
import Checkbox from '~~elements/Checkbox';

const Title = styled.div`
  background-color: #7c90a9;
  color: #fff;
  padding: 10px 5px;
`;

const SelectAll = styled.div`
  padding: 10px 5px;
  border: 1px solid #d7d7d7;
`;

const Items = styled.div`
  border: 1px solid #d7d7d7;
  padding: 10px 5px;
  height: 300px;
  overflow: auto;
`;

const ItemRow = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 5px;
`;

const ItemLabel = styled.div`

`;


function ExportModal(props) {
  const { isOpen, onClickExport, onCancelExport, avaiableFormat, isSingleChoose, itemList } = props;
  const [selectedItems, setSelectedItems] = useState([]);

  const handleClickCancel = (e) => {
    onCancelExport();
  };

  const handleClickExport = (e) => {
    onClickExport(selectedItems.map(item => item).join(','));
  };

  return (
    <Modal.Modal isOpen={isOpen}>
      <Modal.ModalHeader>
        Choose Partlist / Cleansheet to Export
      </Modal.ModalHeader>
      <Modal.ModalBody>

        <Title>Partlist / Cleansheet</Title>
        {!isSingleChoose &&
          <SelectAll>
            <ItemRow>
              <Checkbox
                indeterminate={selectedItems.length !== itemList.length}
                checked={selectedItems.length > 0}
                onChange={handleClickAll}
              />
              <ItemLabel>Select All</ItemLabel>
            </ItemRow>
          </SelectAll>}
        <Items>
          {
            itemList.map(item => (
              <ItemRow>
                <Checkbox
                  value={item.format}
                  checked={selectedItems.findIndex(selectItem => selectItem === item.format) !== -1}
                  onChange={handleClickItem}
                  disabled={!avaiableFormat.includes(item.format)}
                />
                <ItemLabel>{item.label}</ItemLabel>
              </ItemRow>
            ))
          }
        </Items>
      </Modal.ModalBody>
      <Modal.ModalFooter>
        <Button color="white" onClick={handleClickCancel}>Cancel</Button>
        <Button color="black" onClick={handleClickExport} disabled={!selectedItems.length}>Export</Button>
      </Modal.ModalFooter>
    </Modal.Modal>
  );
  function handleClickAll(e) {
    if (!e.target.checked) {
      setSelectedItems([]);
    } else {
      setSelectedItems(itemList.filter(item => avaiableFormat.includes(item.format)).map(item => item.format));
    }
  }

  function handleClickItem(e) {
    if (!e.target.checked) {
      const itemIndex = selectedItems.findIndex(item => item === e.target.value);
      setSelectedItems([
        ...selectedItems.slice(0, itemIndex),
        ...selectedItems.slice(itemIndex + 1, selectedItems.length)
      ]);
    } else if (isSingleChoose) {
      setSelectedItems([e.target.value]);
    } else {
      setSelectedItems(selectedItems.concat(e.target.value));
    }
  }
}


export default ExportModal;
