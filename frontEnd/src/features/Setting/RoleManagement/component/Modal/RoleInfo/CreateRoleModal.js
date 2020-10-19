import React, { Fragment, useState, useEffect } from 'react';
import styled from 'styled-components';
import _get from 'lodash/get';
import Alert from '~~elements/Alert';
import Button from '~~elements/Button';
import Field from '~~elements/Field';
import Modal from '~~elements/Modal';
import RoundButton from '~~elements/RoundButton';

const EditSection = styled.div`
  margin: 5px 0px;
`;

const ButtonGroup = styled.span`
  .btn {
    margin: 0 10px;
  }
`;

const CREATE_BY_TYPE = {
  EXISTING: 'EXISTING',
  NEW: 'NEW',
};

function getButtonStyle(isSelect) {
  return isSelect ? RoundButton.BlackButton : RoundButton.WhiteButton;
}

function getSelOpt(label, value, record = null) {
  return { label, value, record };
}

function rolesToOptions(roles = []) {
  return roles.map(roleGroup => getSelOpt(roleGroup.role_group, roleGroup.role_group, roleGroup));
}

function CreateRoleModal(props) {
  // === props ===
  const { isOpen, defaultSelectedGroup, roles } = props;
  // === state ===
  const [alert, setAlert] = useState(false);
  const [createByType, setCreateByType] = useState(CREATE_BY_TYPE.EXISTING);
  const [refRoleOptions, setRefRoleOptions] = useState([]);

  /* New Role Group */
  const [newGroupName, setNewGroupName] = useState('');
  /* Select Existing Role Group */
  const [selectedExistingGroup, setSelectedExistingGroup] = useState(null);
  /* Role Name */
  const [newRoleName, setNewRoleName] = useState('');
  /* Reference Permission from */
  const [selectedRefGroup, setSelectedRefGroup] = useState(null);
  const [selectedRefRole, setSelectedRefRole] = useState(null);

  useEffect(() => {
    if (isOpen && defaultSelectedGroup) {
      setSelectedExistingGroup(defaultSelectedGroup);
    }
  }, [isOpen, JSON.stringify(defaultSelectedGroup)]);


  const resetFormState = () => {
    setNewGroupName('');
    setNewRoleName('');
    setSelectedExistingGroup(null);
    setSelectedRefGroup(null);
    setSelectedRefRole(null);
  };

  // === alert control ====
  const handleAlertSure = (e) => {
    setAlert(false);
    props.onSureCancel();
  };

  const handleAlertCancel = (e) => {
    setAlert(false);
  };

  // === click button ===
  const handleClickCreate = () => {
    props.onCreate({
      groupName: newGroupName,
      roleName: newRoleName,
      refRole: (selectedRefRole && selectedRefRole.record) ? selectedRefRole.record.id : null
    });
  };

  const handleClickCancel = () => {
    setAlert(true);
  };

  const changeCreateBy = (type) => () => {
    setCreateByType(type);
    setNewGroupName('');
    setSelectedExistingGroup(null);
  };
  /* 決定按鈕樣式 */
  const ExistingButton = getButtonStyle(createByType === CREATE_BY_TYPE.EXISTING);
  const NewButton = getButtonStyle(createByType === CREATE_BY_TYPE.NEW);

  useEffect(() => {
    if (!isOpen) {
      resetFormState();
    }
  }, [isOpen]);

  return (
    <Fragment>
      <Modal.Modal isOpen={isOpen}>
        <Modal.ModalHeader tag="div">
          Create New Role
        </Modal.ModalHeader>
        <Modal.ModalBody>
          <EditSection>
            <Field.GreyTitle>Role Group</Field.GreyTitle>
            <Field.Row>
                  Create by
              <ButtonGroup>
                <ExistingButton
                  onClick={changeCreateBy(CREATE_BY_TYPE.EXISTING)}
                >
                      Existing Group
                </ExistingButton>
                <NewButton
                  onClick={changeCreateBy(CREATE_BY_TYPE.NEW)}
                >
                      New Group
                </NewButton>
              </ButtonGroup>
            </Field.Row>
            <Field.Row>
              {
                createByType === CREATE_BY_TYPE.EXISTING && (
                <Field.Field width="33%">
                  <Field.Label
                    isRequired
                    title="Select Existing Role Group"
                  />
                  <Field.Select
                    options={rolesToOptions(roles)}
                    value={selectedExistingGroup}
                    onChange={(option) => {
                      setSelectedExistingGroup(option);
                      setNewGroupName(option.value);
                    }}
                  />
                </Field.Field>
                    )
                  }
              {
                 createByType === CREATE_BY_TYPE.NEW && (
                 <Field.Field width="33%">
                   <Field.Label
                     isRequired
                     title="Create New Group Name"
                   />
                   <Field.Input
                     onChange={e => {
                      setNewGroupName(e.target.value);
                    }}
                     value={newGroupName}
                   />
                 </Field.Field>
                    )
                  }
            </Field.Row>
          </EditSection>
          <EditSection>
            <Field.GreyTitle>Role Name</Field.GreyTitle>
            <Field.Row>
              <Field.Field width="33%">
                <Field.Label
                  isRequired
                  title="Create new role name"
                />
                <Field.Input
                  onChange={e => {
                        setNewRoleName(e.target.value);
                      }}
                  value={newRoleName}
                />
              </Field.Field>
            </Field.Row>
          </EditSection>
          <EditSection>
            <Field.GreyTitle>Reference Permission from</Field.GreyTitle>
            <Field.Row>
              <Field.Field width="33%">
                <Field.Label
                  title="Role Group"
                />
                <Field.Select
                  options={rolesToOptions(roles)}
                  onChange={(option) => {
                    setSelectedRefGroup(option);
                    setRefRoleOptions(option.record.roles.map(role => getSelOpt(role.role_name, role.id, role)));
                    setSelectedRefRole(null);
                  }}
                  value={selectedRefGroup}
                />
              </Field.Field>
              <Field.Field width="33%">
                <Field.Label
                  title="Role Name"
                />
                <Field.Select
                  options={refRoleOptions}
                  onChange={(option) => {
                    setSelectedRefRole(option);
                  }}
                  value={selectedRefRole}
                  disabled={!selectedRefGroup}
                />
              </Field.Field>
            </Field.Row>
          </EditSection>

          <Alert isOpen={alert} type="alarm">
            <div className="row">請確認是否要離開?</div>
            <div className="row">
              <Button
                color="transparentInModal"
                border={false}
                onClick={handleAlertSure}
              >
                      確定
              </Button>
              <Button
                color="black"
                onClick={handleAlertCancel}
              >
                      取消
              </Button>
            </div>
          </Alert>
        </Modal.ModalBody>
        <Modal.ModalFooter>
          <Button color="white" onClick={handleClickCancel}>Cancel</Button>
          <Button disabled={!newGroupName || !newRoleName} color="black" onClick={handleClickCreate}>Create</Button>
        </Modal.ModalFooter>
      </Modal.Modal>
    </Fragment>
  );
}

export default CreateRoleModal;
