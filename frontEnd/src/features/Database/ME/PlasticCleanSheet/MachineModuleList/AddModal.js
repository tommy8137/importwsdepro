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
  const { isOpen, setAddModal, handleAddItem, productTypeList, category2List } = props;
  const [moduleName, setModuleName] = useState('');
  const [remark, setRemark] = useState('');
  const [productType, setProductType] = useState(null);
  const [category2, setCategory2] = useState([]);

  useEffect(() => {
    if (isOpen) {
      setModuleName('');
      setProductType(null);
      setCategory2([]);
      setRemark('');
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
              <Field.Label title="Module Name" isRequired />
              <Field.Input
                onChange={e => setModuleName(e.target.value)}
                value={moduleName}
              />
            </Field.Field>
          </Field.Row>
          <Field.Row>
            <Field.Field width="100%">
              <Field.Label title="Product Type" isRequired />
              <Select
                placeholder="Product Type"
                onChange={values => setProductType(values)}
                value={productType}
                options={productTypeList}
              />
            </Field.Field>
          </Field.Row>
          <Field.Row>
            <Field.Field width="100%">
              <Field.Label title="Module Name" isRequired />
              <Select
                isMulti
                placeholder="Part Category II"
                onChange={values => setCategory2(values)}
                value={category2}
                options={category2List}
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
          </Field.Row>
        </div>
      </Modal.ModalBody>
      <Modal.ModalFooter>
        <Button color="white" onClick={() => setAddModal(false)}>Cancel</Button>
        <Button color="black" onClick={() => handleAddItem(moduleName, productType, category2, remark)} disabled={!(moduleName && productType && category2.length > 0)}>Save</Button>
      </Modal.ModalFooter>
    </ModalWrap>
  );
};

export default AddModal;
