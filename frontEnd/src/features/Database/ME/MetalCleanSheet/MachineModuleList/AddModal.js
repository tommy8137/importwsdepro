import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Modal from '~~elements/Modal';
import Button from '~~elements/Button';
import Field from '~~elements/Field';
import Select from '~~elements/Select';

const ModalWrap = styled(Modal.Modal)`
  .body-wrap {
    padding: 0 4rem;
  }
`;

const AddModal = (props) => {
  const { isOpen, setAddModal, handleAddItem, productTypeOptions } = props;
  const [productType, setProductType] = useState(null);
  const [moduleName, setModuleName] = useState('');

  useEffect(() => {
    if (isOpen) {
      setProductType(null);
      setModuleName('');
    }
  }, [isOpen]);

  return (
    <ModalWrap isOpen={isOpen}>
      <Modal.ModalHeader>
        Add Module
      </Modal.ModalHeader>
      <Modal.ModalBody>
        <div className="body-wrap">
          <Field.Row>
            <Field.Field width="100%">
              <Field.Label title="Product Type" isRequired />
              <Select
                placeholder=""
                options={productTypeOptions}
                value={productType}
                onChange={setProductType}
                onClose={() => {}}
              />
            </Field.Field>
          </Field.Row>
          <Field.Row>
            <Field.Field width="100%">
              <Field.Label title="Module" isRequired />
              <Field.Input
                onChange={e => setModuleName(e.target.value)}
                value={moduleName}
              />
            </Field.Field>
          </Field.Row>
        </div>
      </Modal.ModalBody>
      <Modal.ModalFooter>
        <Button color="white" onClick={() => setAddModal(false)}>Cancel</Button>
        <Button color="black" onClick={() => handleAddItem(productType.value, moduleName)} disabled={!(productType && moduleName)}>Save</Button>
      </Modal.ModalFooter>
    </ModalWrap>
  );
};

export default AddModal;
