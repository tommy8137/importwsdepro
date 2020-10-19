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
  const [syringeName, setSyringeName] = useState('');
  const [innerDiameter, setInnerDiameter] = useState('');

  useEffect(() => {
    if (isOpen) {
      setSyringeName('');
      setInnerDiameter('');
    }
  }, [isOpen]);

  return (
    <ModalWrap isOpen={isOpen}>
      <Modal.ModalHeader>
        Add 噴漆類型
      </Modal.ModalHeader>
      <Modal.ModalBody>
        <div className="body-wrap">
          <Field.Row>
            <Field.Field width="100%">
              <Field.Label title="針筒內徑" isRequired />
              <Field.Input
                onChange={e => setSyringeName(e.target.value)}
                value={syringeName}
              />
            </Field.Field>
          </Field.Row>
          <Field.Row>
            <Field.Field width="100%">
              <Field.Label title="Price" isRequired />
              <Field.Input
                onChange={e => setInnerDiameter(e.target.value)}
                value={innerDiameter}
              />
            </Field.Field>
          </Field.Row>
        </div>
      </Modal.ModalBody>
      <Modal.ModalFooter>
        <Button color="white" onClick={() => setAddModal(false)}>Cancel</Button>
        <Button color="black" onClick={() => handleAddItem(syringeName, innerDiameter)} disabled={!syringeName || !innerDiameter}>Save</Button>
      </Modal.ModalFooter>
    </ModalWrap>
  );
};

export default AddModal;
