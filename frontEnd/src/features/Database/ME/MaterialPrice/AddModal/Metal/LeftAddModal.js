import React, { Fragment, useState, useEffect } from 'react';
import Modal from '~~elements/Modal';
import Button from '~~elements/Button';
import Field from '~~elements/Field';

const LeftAddModal = (props) => {
  const { isOpen, setAddModal, onAdd, isSaveBtnInvalid } = props;
  const [itemName, setItemName] = useState(null);
  const [density, setDensity] = useState(null);
  const data = { itemName, density };

  const isDisabled = !(itemName && density);

  useEffect(() => {
    if (isOpen) {
      setItemName(null);
      setDensity(null);
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
            <Field.Label title="Density" isRequired />
            <Field.ConvertInput
              onChange={val => setDensity(val)}
              value={density}
              dataType="float"
            />
          </Field.Field>
        </Field.Row>
      </Modal.ModalBody>
      <Modal.ModalFooter>
        <Button color="white" onClick={() => setAddModal(false)}>Cancel</Button>
        <Button color="black" onClick={() => onAdd(data)} disabled={isDisabled}>Save</Button>
      </Modal.ModalFooter>
    </Fragment>
  );
};

export default LeftAddModal;
