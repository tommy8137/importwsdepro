import React, { Fragment, useState, useEffect } from 'react';
import Modal from '~~elements/Modal';
import Button from '~~elements/Button';
import Field from '~~elements/Field';

const RightAddModal = (props) => {
  const { isOpen, setAddModal, onAdd, isSaveBtnInvalid } = props;
  const [itemName, setItemName] = useState(null);
  const [price, setPrice] = useState(null);
  const data = { itemName, price };

  useEffect(() => {
    if (isOpen) {
      setItemName(null);
      setPrice(null);
    }
  }, [isOpen]);


  return (
    <Fragment>
      <Modal.ModalHeader>
        Add Material
      </Modal.ModalHeader>
      <Modal.ModalBody>
        <Field.Row>
          <Field.Field width="50%">
            <Field.Label title="Material Name" isRequired />
            <Field.ConvertInput
              onChange={val => setItemName(val)}
              value={itemName}
              dataType="string"
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
