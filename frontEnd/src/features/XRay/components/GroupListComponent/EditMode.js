import React, { useState, useEffect, useRef } from 'react';
import _ from 'lodash';
import moment from 'moment';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import * as Yup from 'yup';
import Resource from '~~apis/resource';
import Portal from '~~elements/Portal';
import Button from '~~elements/Button';
import Icon from '~~elements/Icon';
import Alert from '~~elements/Alert';
import { EnhanceTooltip } from '~~elements/Tooltip';
import { toggleLoadingStatus } from '~~redux/Loading/LoadingActions';
import { pushNotification } from '~~hoc/NotificationSystem/NotificationSystemActions';

import * as XrayActions from '../../XrayActions';

const FieldGroup = styled.div`
  position: relative;
  margin-right: 1rem;
  display: inline-block;
  vertical-align: middle;
  .field-input {
    width: 300px;
    max-width: 100%;
    display: block;
    border: none;
    border-bottom: 1px solid #333;
    box-shadow: none;
    margin-bottom: 8px;
    padding: 6px 12px;
    &.unValid {
      border-bottom: 1px solid red;
    }
  }
  .error {
    position: absolute;
    font-size: 0.6rem;
    color: red;
    left: 0;
    top: 100%;
    width: 100%;
    text-align: left;
    line-height: 1;
  }
`;
const SpecGroupContainer = styled.div`
  .field-group,
  .option-dropdown,
  .btn {
    display: inline-block;
    vertical-align: middle;
  }
  .field-group {
    position: relative;
    margin-right: 1rem;
    .field-input {
      width: 300px;
      max-width: 100%;
      display: block;
      border: none;
      border-bottom: 1px solid #333;
      box-shadow: none;
      margin-bottom: 8px;
      padding: 6px 12px;
      &.unValid {
        border-bottom: 1px solid red;
      }
    }
    .error {
      position: absolute;
      font-size: 0.6rem;
      color: red;
      left: 0;
      top: 100%;
      width: 100%;
      text-align: left;
      line-height: 1;
    }
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
  box-shadow: none;
  cursor: pointer;
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

const DeleteTitle = styled.div`
  font-size: 0.9rem;
  text-align: center;
  color: white;
  > span {
    color: #f5c910;
  }
`;

const EditButton = styled.button`
  height: 40px;
  border-radius: 20px;
  background-color: transparent;
  color: black;
  border: none;
  margin-right: 0.6rem;
  transition: 0.3s ease all;
  padding: 0px 16px;
  &:hover,
  &:focus,
  &:disabled {
    box-shadow: none;
    outline: 0;
    border: none !important;
    background-color: transparent;
  }
  &:hover {
    background-color:#e6e6e6;
    color: #333333;
  }
  &:disabled {
    color: #333333;
    opacity: 0.2;
    background-color: transparent;
  }
`;


const GroupListComponent = (props) => {
  const { selected, specGroupList, roleType, specItem, specItem: { specGroup, specGroupName, specGroupID }, edit } = props;
  const initSpecGroupName = `Spec_Goup_${moment(new Date()).format('YYMMDD')}`;

  const [isOpen, setIsOpen] = useState(false);
  const [errors, setErrors] = useState([]);
  const [groupName, setGroupName] = useState(initSpecGroupName);

  useEffect(() => {
    setGroupName(specGroupName);
  }, [specGroupName]);

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


  const putGroup = async () => {
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
    const result = await Resource.XrayResource.putSpecGroup(specGroupID, data)
      .then(async (res) => {
        const { data: { specGroupID: newSpecGroupID } } = res;
        handleEditChange(false);
        props.pushNotification({
          message: '修改Group成功',
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

  const deleteGroup = async () => {
    props.toggleLoadingStatus(true);
    const result = await Resource.XrayResource.deleteSpecGroup(specGroupID)
      .then(async (res) => {
        setIsOpen(false);
        props.pushNotification({
          message: '刪除group成功',
          level: 'success'
        });
        props.resetSpecItemAction();
        props.getSpecGroupListAction(roleType);
      })
      .catch(async (error) => {
        props.pushNotification({
          message: '取得資料有誤，請稍後再試',
          level: 'error'
        });
      });

    props.toggleLoadingStatus(false);
  };

  const handleSave = async () => {
    const errs = await schema.validate({ groupName })
      .then(async (val) => [])
      .catch(async (err) => err.errors);

    setErrors(errs);
    if (errs.length <= 0) {
      const result = await putGroup();
    }
  };

  const handleDelete = async () => {
    const result = await deleteGroup();
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

  const saveEl = useRef(null);

  return (
    <SpecGroupContainer className="spec-group-add-mode">
      <EditButton onClick={() => handleEditChange(false)}>
        取消
      </EditButton>
      <EditButton onClick={() => setIsOpen(true)} className="e2e_del_specgroup_btn">
        刪除
      </EditButton>
      <FieldGroup>
        <input className="field-input e2e_edit_spec_group_input" value={groupName} onChange={handleInputChange} />
        <div className="error">
          {errors.toString()}
        </div>
      </FieldGroup>
      <IconButton innerRef={saveEl}>
        <Icon icon="BtnSaveGroup" size="2rem" onClick={handleSave} />
      </IconButton>
      <EnhanceTooltip
        color="black"
        textColor="white"
        placement="top"
        target={saveEl}
      >
        儲存
      </EnhanceTooltip>
      <IconButton >
        <Icon icon="BtnAddGroup" size="2rem" disabled />
      </IconButton>
      <Portal id="xray-delete-modal-alert">
        <Alert isOpen={isOpen} type="alarm">
          <div className="row">
            <DeleteTitle>請確認是否要刪除 &quot;<span>{specGroupName}</span>&quot; ?</DeleteTitle>
          </div>
          <div className="row">
            <Button
              color="transparentInModal"
              className="e2e_del_specgroup_btn_confirm"
              border={false}
              onClick={(e) => {
                e.stopPropagation();
                handleDelete();
              }}
            >
              確定
            </Button>
            <Button
              color="black"
              onClick={(e) => {
                e.stopPropagation();
                setIsOpen(false);
              }}
            >
              取消
            </Button>
          </div>
        </Alert>
      </Portal>
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
    resetSpecItemAction: XrayActions.resetSpecItem,
    getSpecGroupListAction: XrayActions.getSpecGroupList,
    deleteSpecGroupAction: XrayActions.deleteSpecGroup,
    setEditAction: XrayActions.setEdit,
    getGroupItemAction: XrayActions.getGroupItem,
    getMeSpecItemsListAction: XrayActions.getMeSpecItemsList,
    setSpecItemAction: XrayActions.setSpecItem,

  }
)(GroupListComponent);
