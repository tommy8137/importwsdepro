import React, { Fragment, useState, useEffect } from 'react';
import Modal from '~~elements/Modal';
import Button from '~~elements/Button';
import Field from '~~elements/Field';

const RightAddModal = (props) => {
  const { isOpen, setAddModal, onAdd, isSaveBtnInvalid } = props;
  const [thinkness, setThinkness] = useState(null);
  const [price, setPrice] = useState(null);
  const data = { thinkness, price };

  useEffect(() => {
    if (isOpen) {
      setThinkness(null);
      setPrice(null);
    }
  }, [isOpen]);

  return (
    <Fragment>
      <Modal.ModalHeader>
        Add Thinkness
      </Modal.ModalHeader>
      <Modal.ModalBody>
        <Field.Row>
          <Field.Field width="50%">
            <Field.Label title="Thinkness" isRequired />
            <Field.ConvertInput
              onChange={val => setThinkness(val)}
              value={thinkness}
              dataType="float"
            />
          </Field.Field>
          <Field.Field width="50%">
            <Field.Label title="Price" isRequired />
            <Field.ConvertInput
              onChange={val => setPrice(val)}
              value={price}
              dataType="float"
            />
          </Field.Field>
        </Field.Row>
      </Modal.ModalBody>
      <Modal.ModalFooter>
        <Button color="white" onClick={() => setAddModal(false)}>Cancel</Button>
        <Button color="black" onClick={() => onAdd(data)} disabled={isSaveBtnInvalid(data)}>Save</Button>
      </Modal.ModalFooter>
    </Fragment>
  );
};

export default RightAddModal;
