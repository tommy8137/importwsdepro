import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import _isEqual from 'lodash/isEqual';
import _sortBy from 'lodash/sortBy';

import Modal from '~~elements/Modal';
import Select from '~~elements/Select';
import Button from '~~elements/Button';
import Alert from '~~elements/Alert';
import Field from '~~elements/Field';
import Resource from '~~apis/resource';
import * as BomManagementActions from '~~features/BomManagement/BomManagementActions';
import { dispatchNotification, dispatchLoading } from '~~utils/CommonUtils';

function PorjectParametersModal(props) {
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [sourcerList, setSourcerList] = useState([]);
  const [sourcerOptions, setSourcerOptions] = useState([]);
  const [selectedSourcers, setSelectedSourcers] = useState([]);
  const [tempSelectedSourcers, setTempSelectedSourcers] = useState([]);

  const {
    isOpen,
    permissionModalBomId: bomId,
    togglePermissionModal = () => { }
  } = props;

  useEffect(() => {
    if (isOpen) {
      getSourcerOptions();
    } else {
      setIsAlertOpen(false);
      setSelectedSourcers([]);
      setSourcerOptions([]);
    }
  }, [isOpen]);

  useEffect(() => {
    if (bomId) {
      getSelectedSourcerOptions();
    }
  }, [bomId]);


  useEffect(() => {
    const newSourcerOptions = sourcerList.map(obj => ({ label: obj.name_a, value: obj.emplid }));
    setSourcerOptions(newSourcerOptions);
  }, [JSON.stringify(sourcerList)]);


  async function getSourcerOptions() {
    dispatchLoading(true);
    try {
      const res = await Resource.BomManagementResource.getUserList();
      const userList = res?.data?.userInfo?.userList || [];
      const newSourcerOptions = userList.map(obj => ({ label: obj.name_a, value: obj.emplid }));
      setSourcerList(userList);
      setSourcerOptions(newSourcerOptions);
    } catch (error) {
      dispatchNotification({ error });
    }
    dispatchLoading(false);
  }

  async function getSelectedSourcerOptions() {
    if (bomId) {
      try {
        const res = await Resource.BomManagementResource.getSourcerPermissionList(bomId);
        const { sourcer_permission: sourcerPermission = [] } = res?.data || {};
        const newSelectedOptions = sourcerPermission.map(obj => ({ label: obj.name_a, value: obj.emplid }));
        const sortedOptions = _sortBy(newSelectedOptions, obj => obj.label);
        setSelectedSourcers(sortedOptions);
        setTempSelectedSourcers(sortedOptions);
      } catch (e) {
        console.log(e);
      }
    }
  }

  function handleOnChange(opts) {
    const sortedOpts = _sortBy(opts, obj => obj.label);
    setSelectedSourcers(sortedOpts);
  }

  function handleCancel() {
    if (_isEqual(tempSelectedSourcers, selectedSourcers)) {
      togglePermissionModal(false);
    } else {
      setIsAlertOpen(true);
    }
  }

  async function handleSave() {
    dispatchLoading(true);
    try {
      const sourcerPermissionList = selectedSourcers.reduce((prev, opt) => {
        const sourcerObj = sourcerList.find(obj => obj.emplid === opt.value);
        if (sourcerObj) { return [...prev, sourcerObj]; }
        return prev;
      }, []);

      const data = {
        bom_id: bomId,
        sourcer_permission: sourcerPermissionList
      };
      const res = await Resource.BomManagementResource.setSourcerPermission(data);
      dispatchNotification({ level: 'success', message: '修改成功' });
      togglePermissionModal(false);
    } catch (error) {
      dispatchNotification({ error });
    }
    dispatchLoading(false);
  }

  return (
    <Fragment>
      <Modal.Modal isOpen={isOpen}>
        <Modal.ModalHeader>
          Permission Settings
        </Modal.ModalHeader>
        <Modal.ModalBody>
          <Field.Row>
            <Field.Field width="100%">
              <Field.Label
                title="Users of Sourcer"
              />
              <Select
                placeholder="Choose Sourcer"
                options={sourcerOptions}
                onChange={handleOnChange}
                value={selectedSourcers}
                isMulti
              />
            </Field.Field>
          </Field.Row>
        </Modal.ModalBody>
        <Modal.ModalFooter>
          <Button color="white" onClick={handleCancel}>
            Close
          </Button>
          <Button
            color="black"
            onClick={handleSave}
          // disabled={isSaveDisabled}
          >
            Save
          </Button>
        </Modal.ModalFooter>
      </Modal.Modal>
      <Alert isOpen={isAlertOpen} type="alarm">
        <div className="row">請確定是否要離開?</div>
        <div className="row">
          <Button
            color="transparentInModal"
            border={false}
            onClick={() => togglePermissionModal(false)}
          >
            確定
          </Button>
          <Button
            color="transparentInModal"
            border={true}
            onClick={() => setIsAlertOpen(false)}
          >
            取消
          </Button>
        </div>
      </Alert>
    </Fragment>
  );
}


const mapStateToProps = (state) => {
  return {
    permissionModalBomId: state.bomManagement.permissionModalBomId,
  };
};
const mapDispatchToProps = {
  togglePermissionModal: BomManagementActions.togglePermissionModal,
  putBomParameter: BomManagementActions.putBomParameter,
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
)(PorjectParametersModal);

