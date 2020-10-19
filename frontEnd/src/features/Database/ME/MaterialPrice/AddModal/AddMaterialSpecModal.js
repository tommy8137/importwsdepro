import React, { Fragment, useState, useEffect } from 'react';
import Modal from '~~elements/Modal';
import Button from '~~elements/Button';
import Field from '~~elements/Field';

const LeftAddModal = (props) => {
  const { isOpen, setAddModal, onAdd, isSaveBtnInvalid } = props;
  const [itemName, setItemName] = useState(null);
  const [remark, setRemark] = useState(null);
  const data = { itemName, remark };

  useEffect(() => {
    if (isOpen) {
      setItemName(null);
      setRemark(null);
    }
  }, [isOpen]);


  const isSaveDisabled = !itemName;
  return (
    <Fragment>
      <Modal.ModalHeader>
        Add Material Spec
      </Modal.ModalHeader>
      <Modal.ModalBody>
        <Field.Row>
          <Field.Field width="50%">
            <Field.Label title="Material Spec Name" isRequired />
            <Field.ConvertInput
              maxLength={200}
              onChange={val => setItemName(val)}
              value={itemName}
              dataType="string"
            />
          </Field.Field>
          <Field.Field width="100%">
            <Field.Label title="Remark" />
            <Field.ConvertInput
              maxLength={400}
              onChange={(val) => setRemark(val)}
              value={remark}
              dataType="string"
            />
          </Field.Field>
        </Field.Row>
      </Modal.ModalBody>
      <Modal.ModalFooter>
        <Button color="white" onClick={() => setAddModal(false)}>Cancel</Button>
        <Button color="black" onClick={() => onAdd(data)} disabled={isSaveDisabled}>Save</Button>
      </Modal.ModalFooter>
    </Fragment>
  );
};

export default LeftAddModal;
