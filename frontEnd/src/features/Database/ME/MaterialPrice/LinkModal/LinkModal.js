import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import styled from 'styled-components';
import Modal from '~~elements/Modal';
import Field from '~~elements/Field';
import Button from '~~elements/Button';
import * as DatabaseActions from '~~features/Database/DatabaseActions';
import PartCategory from './PartCategory';

const FormContainer = styled.div`
  display: block;
  margin: 0 auto;
  /* width: 24rem; */
  max-width: 100%;
`;

function LinkModal(props) {
  const [partCategory, setPartCategory] = useState([]);

  const {
    // state
    isLinkModalOpen,
    linkItem: {
      materialName,
      materialId
    },
    // actions
    setMaterialPriceLinkModal,
    putMaterialPricePartCategory,
  } = props;

  useEffect(() => {
    setPartCategory(props.partCategory);
  }, [JSON.stringify(props.partCategory)]);

  useEffect(() => {
    if (!isLinkModalOpen) {
      setPartCategory([]);
    } else {
      setPartCategory(props.partCategory);
    }
  }, [isLinkModalOpen]);


  /**
   * 關閉modal
   */
  function handleCancel() {
    setMaterialPriceLinkModal(false);
  }

  /**
   * 儲存partCategory
   */
  function handleSave() {
    const partCateData = partCategory.map(cate1 => {
      return {
        category1Id: cate1.id,
        category1Name: cate1.name,
        category2:
          cate1.items.reduce((prev, cate2) => {
            if (cate2.isSelected) {
              prev.push({ category2Id: cate2.id, category2Name: cate2.name });
            }
            return prev;
          }, []
          )
      };
    });
    props.onSave(partCateData);
  }


  /**
   * 當勾選checkbox的時候
   * @param {*} newPartCategory 新的partCategory
   */
  function handleOnCheck(newPartCategory) {
    setPartCategory(newPartCategory);
  }

  return (
    <Modal.Modal isOpen={isLinkModalOpen}>
      <Modal.ModalHeader>Link to Part Category</Modal.ModalHeader>
      <Modal.ModalBody>
        <FormContainer>
          <Field.Row>
            <Field.Field width="50%">
              <Field.Label>Selected Material</Field.Label>
              <Field.Input
                value={materialName}
                readOnly
              />
            </Field.Field>
          </Field.Row>
        </FormContainer>
        <PartCategory
          data={partCategory}
          onCheck={handleOnCheck}
        />
      </Modal.ModalBody>
      <Modal.ModalFooter>
        <Button color="white" onClick={handleCancel}>Cancel</Button>
        <Button color="black" onClick={handleSave}>Save</Button>
      </Modal.ModalFooter>
    </Modal.Modal >
  );
}

LinkModal.defaultProps = {
  onSave: () => { }
};

const mapStateToProps = (state) => {
  return {
    linkItem: state.dataBase.materialPrice.linkItem,
    partCategory: state.dataBase.materialPrice.partCategory,
    isLinkModalOpen: state.dataBase.materialPrice.isLinkModalOpen,
  };
};

const mapDispatchToProps = {
  putMaterialPricePartCategory: DatabaseActions.putMaterialPricePartCategory,
  setMaterialPriceLinkModal: DatabaseActions.setMaterialPriceLinkModal,
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
)(LinkModal);
