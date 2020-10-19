import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Modal from '~~elements/Modal';
import Button from '~~elements/Button';
import Field from '~~elements/Field';
import NumberInput from '~~features/Database/components/NumberInput';

const ModalWrap = styled(Modal.Modal)`
  .body-wrap {
    padding: 0 4rem;
  }
`;

const AddModal = (props) => {
  const { isOpen, setAddModal, handleAddItem } = props;
  const [label, setLabel] = useState('');
  const [value, setValue] = useState('');
  const [remark, setRemark] = useState('');


  useEffect(() => {
    if (isOpen) {
      setLabel('');
      setValue('');
      setRemark('');
    }
  }, [isOpen]);

  return (
    <ModalWrap isOpen={isOpen}>
      <Modal.ModalHeader>
        Add  噴漆類型
      </Modal.ModalHeader>
      <Modal.ModalBody>
        <div className="body-wrap">
          {/* <Field.Row>
            <Field.Field width="100%">
              <Field.Label title="Label" isRequired />
              <Field.Input
                onChange={e => setLabel(e.target.value)}
                value={label}
              />
            </Field.Field>
          </Field.Row>
          <Field.Row>
            <Field.Field width="100%">
              <Field.Label title="Value" isRequired />
              <NumberInput
                onChange={val => setValue(val)}
                value={value}
              />
            </Field.Field>
          </Field.Row>
          <Field.Row>
            <Field.Field width="100%">
              <Field.Label title="Remark" />
              <Field.Textarea
                onChange={e => setRemark(e.target.value)}
                value={remark}
              />
            </Field.Field>
          </Field.Row> */}
        </div>
      </Modal.ModalBody>
      <Modal.ModalFooter>
        <Button color="white" onClick={() => setAddModal(false)}>Cancel</Button>
        <Button color="black" onClick={() => handleAddItem(label, value, remark)} disabled={!(label && value)}>Save</Button>
      </Modal.ModalFooter>
    </ModalWrap>
  );
};

export default AddModal;
