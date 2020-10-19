import React, { useState, useEffect, useRef } from 'react';
import * as R from 'ramda';
import _ from 'lodash';
import moment from 'moment';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import Modal from '~~elements/Modal';
import * as Yup from 'yup';
import Button from '~~elements/Button';
import Icon from '~~elements/Icon';
import { EnhanceTooltip } from '~~elements/Tooltip';
import Resource from '~~apis/resource';
import { toggleLoadingStatus } from '~~redux/Loading/LoadingActions';
import { pushNotification } from '~~hoc/NotificationSystem/NotificationSystemActions';

import * as XrayActions from '../../XrayActions';

import GroupListDropdown from './GroupListDropdown';


const SpecGroupContainer = styled.div`
  .field-group,
  .option-dropdown,
  .btn {
    display: inline-block;
    vertical-align: middle;
  }
`;
const IconButton = styled.div`
  display: inline-block;
  border-radius: 100%;
  padding: 0;
  background-color: transparent;
  box-shadow:0;
  outline:0;
  border:0;
  width: 36px;
  margin-right: 0.6rem;
  cursor: pointer;
  box-shadow: none;
  &:disabled {
    pointer-events: none;
    opacity: 0.6;
  }
  &:focus {
    box-shadow: none;
    outline: 0;
  }
  &:hover {
    background-color:transparent;
    color: transparent;
  }
  &:last-child{
    margin-right: 0;
  }
`;

const FieldInput = styled.div`
  input{
    width: 100%;
    display: block;
    border: none;
    border-bottom: 1px solid #333;
    box-shadow: none;
    margin-bottom: 6px;
    &:focus{
      outline: none;
      border-bottom: 1px solid rgb(0, 150, 136);
    }
    &.unValid {
      border-bottom: 1px solid red;
    }
  }
  .error {
  display: block;
  font-size: 0.6rem;
  margin: 0;
  margin-bottom: 1rem;
  color: red;
  }
`;


const GroupListComponent = (props) => {
  const { selected, specGroupList, roleType, specItem, specItem: { specGroup, specGroupName }, edit } = props;
  const initSpecGroupName = `Spec_Goup_${moment(new Date()).format('YYMMDD')}`;

  const [isOpen, setIsOpen] = useState(false);
  const [errors, setErrors] = useState([]);
  const [groupName, setGroupName] = useState(initSpecGroupName);

  // useEffect(() => {
  //   setGroupName(specGroupName);
  // }, [specGroupName]);

  const onDropdownChange = (s) => {
    if (s.specGroupID) {
      props.getGroupItemAction(roleType, s.specGroupID);
    }
  };
  const handleEditChange = (val) => {
    props.setEditAction(val);
  };

  const schema = Yup.object().shape({
    groupName:
      Yup
        .string()
        .required('請輸入spec group名稱')
        .max(30, 'spec group名稱長度不可超過30個字')
        .matches(/^[\u4e00-\u9fa5_a-zA-Z0-9]+$/, {
          message: '格式錯誤，不可輸入特殊字元如：@#$%!&*()^~”+|',
        })
  });


  const postAddGroup = async () => {
    const { type1, type2, sourcer, productType } = selected;
    const spec = _.mapValues(specGroup, sp => sp.filter(o => o.value).map(o => o.item_name));
    const data = {
      role: roleType,
      specGroupName: groupName,
      productType,
      type1: type1[0],
      type2: type2[0],
      sourcerList: sourcer,
      specGroup: spec,
    };
    props.toggleLoadingStatus(true);
    const result = await Resource.XrayResource.postAddSpecGroup(data)
      .then(async (res) => {
        const { data: { specGroupID: newSpecGroupID } } = res;
        setIsOpen(false);
        props.pushNotification({
          message: '新增Group成功',
          level: 'success'
        });
        props.getSpecGroupListAction(roleType);
        props.getGroupItemAction(roleType, newSpecGroupID);
      })
      .catch(async (error) => {
        if (error.response && error.response.status === 400) {
          setErrors(['specGroup名稱重複']);
        } else {
          props.pushNotification({
            message: '取得資料有誤，請稍後再試',
            level: 'error'
          });
        }
      });
    props.toggleLoadingStatus(false);
  };

  const handleAddGroup = async () => {
    const errs = await schema.validate({ groupName })
      .then(async (val) => [])
      .catch(async (err) => err.errors);

    setErrors(errs);
    if (errs.length <= 0) {
      const result = await postAddGroup();
    }
  };

  const handleInputChange = async (e) => {
    const val = e.target.value;
    setGroupName(val);
    const errs =
      await schema.validate({ groupName: val })
        .then(async () => [])
        .catch(async (err) => err.errors);
    setErrors(errs);
  };

  const specCount = _.sum(_.keys(specGroup).map(k => R.path([k], specGroup).filter(s => s.value).length));
  const disabledEdit = !specItem.owner;
  const disabledAdd = specCount <= 0;
  const editEl = useRef(null);
  const addEl = useRef(null);
  return (
    <SpecGroupContainer className="spec-group-add-mode">
      <GroupListDropdown
        value={specItem}
        options={specGroupList}
        onChange={onDropdownChange}
      />
      <IconButton
        innerRef={editEl}

      >
        <Icon
          icon="BtnEditGroup"
          size="2rem"
          onClick={() => handleEditChange(true)}
          disabled={disabledEdit}
        />
      </IconButton>
      <EnhanceTooltip
        color="black"
        textColor="white"
        placement="top"
        target={editEl}
      >
        修改
      </EnhanceTooltip>
      <IconButton
        innerRef={addEl}

      >
        <Icon
          icon="BtnAddGroup"
          size="2rem"
          onClick={() => setIsOpen(true)}
          disabled={disabledAdd}
        />
      </IconButton>
      <EnhanceTooltip
        color="black"
        textColor="white"
        placement="top"
        target={addEl}
      >
        新增 Group
      </EnhanceTooltip>
      <Modal.Modal moreSpace isOpen={isOpen}>
        <Modal.ModalHeader >
          新增新的Spec Group
        </Modal.ModalHeader>
        <Modal.ModalBody>
          <FieldInput>
            <input value={groupName} onChange={handleInputChange} className="add_spec_group_input" />
            <div className="error">
              {errors.toString()}
            </div>
          </FieldInput>
        </Modal.ModalBody>
        <Modal.ModalFooter>
          <Button
            color="white"
            onClick={() => setIsOpen(false)}
            disabled={false}
          >取消
          </Button>
          <Button
            className="add_spec_group_btn"
            color="black"
            disabled={errors.length}
            onClick={handleAddGroup}
          >新增
          </Button>
        </Modal.ModalFooter>
      </Modal.Modal>
    </SpecGroupContainer>
  );
};

GroupListComponent.defaultProps = {};

export default connect(
  (state) => {
    return {
      selected: state.xray.selected,
      edit: state.xray.edit,
      specGroupList: state.xray.specGroupList,
      specItem: state.xray.specItem,
      roleType: state.xray.roleType,
      specTitle: state.xray.specTitle,
    };
  },
  {
    goToRouter: push,
    toggleLoadingStatus,
    pushNotification,
    getSpecGroupListAction: XrayActions.getSpecGroupList,
    setEditAction: XrayActions.setEdit,
    getGroupItemAction: XrayActions.getGroupItem,
    getMeSpecItemsListAction: XrayActions.getMeSpecItemsList,
    setSpecItemAction: XrayActions.setSpecItem,
  }
)(GroupListComponent);
