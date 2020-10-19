import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import styled from 'styled-components';
import Button from '~~elements/Button';
import Modal from '~~elements/Modal';
import Field from '~~elements/Field';
import Icon, { IconName } from '~~elements/Icon';
import * as R from 'ramda';
import * as DatabaseActions from '~~features/Database/DatabaseActions';


const FormContainer = styled.div`
  display: block;
  margin: 0 auto;
  width: 24rem;
  max-width: 100%;
`;


function AddProductTypeModal(props) {
  const [itemName, setItemName] = useState('');
  const [remark, setRemark] = useState('');

  const {
    // state
    addModalOpen,
    // actions
    postProductTypeList,
    setProductTypeAddModal
  } = props;

  useEffect(() => {
    if (!addModalOpen) {
      setItemName('');
      setRemark('');
    }
  }, []);

  /**
   * 改變itemName時
   * @param {} e evnet
   */
  function handleChangeItemName(e) {
    const { value } = e.target;
    setItemName(value);
  }

  /**
   * 改變remark時
   * @param {} e evnet
   */
  function handleChangeRemark(e) {
    const { value } = e.target;
    setRemark(value);
  }


  // 關閉Modal
  function handleCancel() {
    setProductTypeAddModal(false);
  }
  // 儲存
  function handleSave() {
    const data = {
      remark,
      item: itemName
    };
    postProductTypeList(data);
  }

  const isSaveDisabled = !itemName.length;

  return (
    <Modal.Modal isOpen={addModalOpen}>
      <Modal.ModalHeader>Add Product Type</Modal.ModalHeader>
      {/* Body */}
      <Modal.ModalBody>
        <FormContainer>
          <Field.Row>
            <Field.Field>
              <Field.Label>Product Type Name</Field.Label>
              <Field.Input onChange={handleChangeItemName} value={itemName} />
            </Field.Field>
          </Field.Row>
          <Field.Row>
            <Field.Field>
              <Field.Label>Remark</Field.Label>
              <Field.Textarea onChange={handleChangeRemark} value={remark} />
            </Field.Field>
          </Field.Row>
        </FormContainer>
      </Modal.ModalBody>
      {/* Footer */}
      <Modal.ModalFooter>
        <Button color="white" onClick={handleCancel}>Cancel</Button>
        <Button color="black" onClick={handleSave} disabled={isSaveDisabled}>Save</Button>
      </Modal.ModalFooter>
    </Modal.Modal >
  );
}

AddProductTypeModal.defaultProps = {
  productTypeList: []
};

const mapStateToProps = (state) => {
  return {
    addModalOpen: state.dataBase.productType.addModalOpen
  };
};

const mapDispatchToProps = {
  postProductTypeList: DatabaseActions.postProductTypeList,
  setProductTypeAddModal: DatabaseActions.setProductTypeAddModal,
};


export default compose(
  connect(mapStateToProps, mapDispatchToProps),
)(AddProductTypeModal);
