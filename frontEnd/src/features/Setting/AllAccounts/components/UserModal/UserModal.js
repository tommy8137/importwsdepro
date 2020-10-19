import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import _ from 'lodash';
import * as R from 'ramda';
import _fpDifferenceWith from 'lodash/fp/differenceWith';
import _fpIsEqual from 'lodash/fp/isEqual';
import Modal from '~~elements/Modal';
import Button from '~~elements/Button';
import Alert from '~~elements/Alert';
import UserForm from './UserForm';
import TypeForm from './TypeForm';
import ProductForm from './ProductForm';
import * as AllAccountsActions from '../../AllAccountsActions';
import { USER_MODAL_STEP, USER_MODAL_HEADER_TEXT, USER_MODAL_MODE } from '../../AllAccountConst';


const UserModal = props => {
  const { isOpen } = props;
  const [isLeavingAlert, setIsLeavingAlert] = useState(false);
  const {
    // state
    userModalMode,
    modalStep,
    userInfo,
    selected,
    selectPT,
    isUserModalOpen,
    // action
    setModalStep,
    toggleUserModal,
    createUser,
    updateUserInfo,
    resetUserInfo
  } = props;

  useEffect(() => {
    if (isOpen === false) {
      resetUserInfo();
    }
  }, [isOpen]);

  const handleClickBack = () => {
    setModalStep(USER_MODAL_STEP.USER);
  };

  const onSubmit = () => {
    const { emplid, name, phone, email, isContactWindow, roleGroup, roleName } = userInfo;

    const addFormData = {
      emplid,
      name,
      phone,
      email,
      is_contact_window: isContactWindow,
      role_name: roleName,
      role_group: roleGroup,
      add_type1: selected,
      add_product_type: selectPT,
    };

    const editFormData = {
      emplid,
      data: {
        is_contact_window: isContactWindow,
        role_name: roleName,
        role_group: roleGroup,
        add_type1: selected,
        add_product_type: selectPT,
      }
    };

    switch (userModalMode) {
      case USER_MODAL_MODE.ADD:
        createUser(addFormData);
        break;
      case USER_MODAL_MODE.EDIT:
        updateUserInfo(editFormData);
        break;
      default:
    }
  };


  // const checkValid = Object.values(userInfo).every(val => val !== null);
  const checkValid = userInfo.roleName && userInfo.roleGroup && userInfo.emplid;
  // get modal header
  const modalHeader = R.path([modalStep, userModalMode], USER_MODAL_HEADER_TEXT) || '';

  return (
    <Modal.Modal isOpen={isOpen}>
      <Modal.ModalHeader hasBack={modalStep !== USER_MODAL_STEP.USER} onClickBack={handleClickBack}>
        {modalHeader}
      </Modal.ModalHeader>
      <Modal.ModalBody>
        {modalStep === USER_MODAL_STEP.USER && <UserForm />}
        {modalStep === USER_MODAL_STEP.PRODUCTTYPE && <ProductForm />}
        {modalStep === USER_MODAL_STEP.TYPE1 && <TypeForm />}
      </Modal.ModalBody>
      <Modal.ModalFooter>
        <Button color="white" onClick={() => setIsLeavingAlert(true)}>Cancel</Button>
        <Button color="black" onClick={onSubmit} disabled={!checkValid}>Save</Button>
      </Modal.ModalFooter>
      {/* 關閉時的警告 */}
      <Alert isOpen={isLeavingAlert} type="alarm">
        <div className="row">您是否要在未儲存的情況下離開?</div>
        <div className="row">
          <Button
            color="transparentInModal"
            border={false}
            onClick={(e) => {
              setIsLeavingAlert(false);
              toggleUserModal(false);
            }}
          >
            離開
          </Button>
          <Button
            color="black"
            onClick={() => setIsLeavingAlert(false)}
          >
            取消
          </Button>
        </div>
      </Alert>
    </Modal.Modal>
  );
};

UserModal.defaultProps = {
  toggleModal: () => { },
};

const mapStateToProps = state => {
  return {
    isUserModalOpen: state.allAccount.isUserModalOpen,
    userModalMode: state.allAccount.userModalMode,
    selected: state.allAccount.selected,
    selectPT: state.allAccount.selectPT,
    beforeSelected: state.allAccount.beforeSelected,
    beforeSelectPT: state.allAccount.beforeSelectPT,
    modalStep: state.allAccount.modalStep,
    userInfo: state.allAccount.userInfo,
  };
};

const mapDispatchToProps = {
  createUser: AllAccountsActions.createUser,
  setModalStep: AllAccountsActions.setModalStep,
  toggleUserModal: AllAccountsActions.toggleUserModal,
  updateUserInfo: AllAccountsActions.updateUserInfo,
  resetUserInfo: AllAccountsActions.resetUserInfo
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserModal);
