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
  const [machineType, setMachineType] = useState('');
  const [price, setPrice] = useState('');

  useEffect(() => {
    if (isOpen) {
      setMachineType('');
      setPrice('');
    }
  }, [isOpen]);

  return (
    <ModalWrap isOpen={isOpen}>
      <Modal.ModalHeader>
        Add 噴漆機台價目
      </Modal.ModalHeader>
      <Modal.ModalBody>
        <div className="body-wrap">
          <Field.Row>
            <Field.Field width="100%">
              <Field.Label title="機台類型" isRequired />
              <Field.Input
                onChange={e => setMachineType(e.target.value)}
                value={machineType}
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
        <Button color="black" onClick={() => handleAddItem(machineType, price)} disabled={!(machineType && price)}>Save</Button>
      </Modal.ModalFooter>
    </ModalWrap>
  );
};

export default AddModal;
