import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Modal from '~~elements/Modal';
import Button from '~~elements/Button';
import Field from '~~elements/Field';

const ModalWrap = styled(Modal.Modal)`
  .body-wrap {
    padding: 0 4rem;
  }
`;

const AddModal = (props) => {
  const { isOpen, setAddModal, handleAddItem } = props;
  const [itemName, setItemName] = useState('');
  const [price, setPrice] = useState('');

  useEffect(() => {
    if (isOpen) {
      setItemName('');
      setPrice('');
    }
  }, [isOpen]);

  return (
    <ModalWrap isOpen={isOpen}>
      <Modal.ModalHeader>
        Add 項目
      </Modal.ModalHeader>
      <Modal.ModalBody>
        <div className="body-wrap">
          <Field.Row>
            <Field.Field width="100%">
              <Field.Label title="項目" isRequired />
              <Field.Input
                onChange={e => setItemName(e.target.value)}
                value={itemName}
              />
            </Field.Field>
          </Field.Row>
          <Field.Row>
            <Field.Field width="100%">
              <Field.Label title="Price" isRequired />
              <Field.Input
                onChange={e => setPrice(e.target.value)}
                value={price}
              />
            </Field.Field>
          </Field.Row>
        </div>
      </Modal.ModalBody>
      <Modal.ModalFooter>
        <Button color="white" onClick={() => setAddModal(false)}>Cancel</Button>
        <Button color="black" onClick={() => handleAddItem(itemName, price)} disabled={!(price && itemName)}>Save</Button>
      </Modal.ModalFooter>
    </ModalWrap>
  );
};

export default AddModal;
