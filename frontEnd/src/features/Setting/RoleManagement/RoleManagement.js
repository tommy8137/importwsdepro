import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Select from 'react-select';
import Checkbox from '~~elements/Checkbox';
import Icon, { IconName } from '~~elements/Icon';
import RoundButton from '~~elements/RoundButton';
import checkingRbac from '~~hoc/CheckingRbac';
import Alert from '~~elements/Alert';
import Button from '~~elements/Button';
import Table from '~~elements/Table';
import { Input } from 'reactstrap';
import _fpSet from 'lodash/fp/set';

import * as RoleManagementActions from '~~features/Setting/RoleManagement/RoleManagementActions';
import { CreateRoleModal } from './component/Modal';
import RoleFilter from '../components/RoleFilter';

// 定義 每筆資料列的型態 常數
const ROW_TYPE = {
  GROUP: 'GROUP',
  ROLE: 'ROLE',
};

const TABLE_MARGIN_TOP = 300;
/* 以下 style component */
const Content = styled.div`
  padding: 20px 5rem;
  height: calc(100vh - 3.875rem);
  width: 100%;

  .button-group .btn {
    margin: 0px 2.5px;
  }

  .row_role, .row_group {
    height: 46px;
    td {
      padding: 8px 4px;
    }
  }

  .row_group {
    background-color: #d7dde5;

    .group-no-border-right {
      border-right: none;
    }
  }
  .no-border-right.no-border-right {
    border-right: none;
  }
  .bold-border-right.bold-border-right {
    border-right: 1.5px solid;
  }
  .bold-border-left.bold-border-left {
    border-left: 1.5px solid;
  }
`;

const IconGroup = styled.div`
  width: 90%;
  display: flex;
  justify-content: flex-end;

  .icon{
    margin: 0px 5px;
    cursor: pointer;
  }
`;

const FunctionSection = styled.div`
  background-color: #fff;
  border: 1px solid #E0E0E0;
  border-bottom: none;
  padding: 1rem 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 65px;

  .title {
    font-size: 1.25rem;
    font-weight: 600;
  }

  .resources-select {
    width: 300px;
    display: flex;
    align-items: center;

    &-title {
      width: 75px;
      font-weight: 500;
    }

    &-field {
      flex: 1;
    }
  }

  .filter {
    width: 500px;
  }

`;

const PolicyHeader = styled.div`
  word-break: break-word;
`;
/* 以上 style component */

const allowList = [
  ['List', 'allow', 'permission.all'],
];

const DEFAULT_EDIT_ROW_INFO = {
  rowIds: [],
  groupInfo: {},
  roleInfo: {}
};


function getUpdateRolePayload(roleInfo, groupInfo) {
  return Object.keys(roleInfo)
    .filter(roleId => roleInfo[roleId].isEditable)
    .map((roleId) => {
      const role = roleInfo[roleId];
      return {
        roleId,
        groupName: groupInfo.roleGroup,
        roleName: role.roleName,
      };
    });
}


function getPolicyObj(roleInfo) {
  const result = Object.keys(roleInfo)
    .filter(key => key.startsWith('policy_'))
    .reduce((acc, key) => {
      const policyId = key.split('_')[1];
      return Object.assign(acc, { [policyId]: roleInfo[key] });
    }, {});
  return result;
}

function getUpdatePolicyRolePayload(roleInfo, editPolicy, policies) {
  // 比較新舊policy前，先把兩個合併起來
  const combinedPolicy = Object.keys(roleInfo)
    .reduce((acc, roleId) => {
      return Object.assign(acc, {
        [roleId]: {
          origin: getPolicyObj(roleInfo[roleId]),
          edited: getPolicyObj(editPolicy[roleId]),
        }
      });
    }, {});

  const result = Object.keys(combinedPolicy)
    .map(roleId => {
      const originPolicies = combinedPolicy[roleId].origin;
      const editedPolicies = combinedPolicy[roleId].edited;

      const mergedPolicy = policies.reduce((acc, policy) => {
        const policyId = policy.id;
        const originPolicy = originPolicies[policyId];
        const editedPolicy = editedPolicies[policyId];
        const addedPloicy = acc.add;
        const removedPloicy = acc.remove;

        // 如果原本是 ture 變成 false, 要進入 remove 清單
        if (originPolicy && !editedPolicy) {
          return Object.assign(acc, { remove: removedPloicy.concat(policyId) });
        }

        // 如果原本是 false 變成 true, 要進入 add 清單
        if (!originPolicy && editedPolicy) {
          return Object.assign(acc, { add: addedPloicy.concat(policyId) });
        }

        return acc;
      }, {
        roleId,
        add: [],
        remove: []
      });
      return mergedPolicy;
    });
  return result;
}

const RoleManagement = (props) => {
  const {
    getRoles, getPolicy, getResources, getPolicyRole,
    setSelectedResource, updateRole, deleteRoles, updateSorter,
    isAddRoleShow, toggleCreateRoleModal, doCreateRole, // add role
    policies, roles, resources, policyRole,
    selectedResource, selectedGroupOpt,
  } = props;

  /* 編輯中的資料 */
  const [editRowInfo, setEditRowInfo] = useState(DEFAULT_EDIT_ROW_INFO);
  const [editPolicy, setEditPolicy] = useState({});

  /* 刪除警告訊息 */
  const [deleteGroupAlert, setDeleteGroupAlert] = useState(false);
  const [deleteRoleAlert, setDeleteRoleAlert] = useState(false);
  /* 要被刪除的名稱 */
  const [deletedGroupName, setDeletedGroupName] = useState('');
  const [deletedRoleName, setDeletedRoleName] = useState('');
  const [deleteRoleIds, setDeleteRoleIds] = useState([]);
  const [tableHeight, setTableHeight] = useState(document.documentElement.clientHeight - TABLE_MARGIN_TOP);

  const isEditMode = editRowInfo.rowIds.length > 0;


  const setTableInfo = async (rsId) => {
    await getPolicy(rsId);
    await getPolicyRole(rsId);
  };

  function handleResourceChange(option) {
    setSelectedResource(option.record);
  }

  async function handleUpdateRoleAndPloicy() {
    await updateRole(getUpdateRolePayload(editRowInfo.roleInfo, editRowInfo.groupInfo), getUpdatePolicyRolePayload(editRowInfo.roleInfo, editPolicy, policies));
    setEditRowInfo(DEFAULT_EDIT_ROW_INFO);
    setDeleteRoleIds([]);
  }

  async function handleDeleteGroup() {
    await deleteRoles(deleteRoleIds);
    setDeleteGroupAlert(false);
  }

  async function handleDeleteRole() {
    await deleteRoles(deleteRoleIds);
    setDeleteRoleAlert(false);
  }

  function handlePolicyChange(roleId, policyId) {
    return (e) => {
      setEditPolicy(_fpSet(`${roleId}.policy_${policyId}`, e.target.checked)(editPolicy));
    };
  }

  function getActionColumn() {
    if (isEditMode) return [];
    return [
      {
        title: 'Action',
        dataIndex: 'rowId',
        align: 'center',
        key: 'actions',
        width: 140,
        fixed: 'right',
        className: 'bold-border-left',
        render: (rowId, record) =>  {
          /* 編輯模式 */
          if (isEditMode && editRowInfo.rowIds.includes(rowId)) return null;

          if (record.rowType === ROW_TYPE.ROLE) {
            return (
              <IconGroup>
                <Icon
                  icon="BtnDelPCB"
                  type={!record.isEditable ? 'disable' : 'normal'}
                  onClick={() => {
                    setDeleteRoleAlert(true);
                    setDeleteRoleIds([record.roleId.toString()]);
                    setDeletedRoleName(`${record.groupName} ${record.roleName}`);
                  }}
                />
              </IconGroup>
            );
          }

          if (record.rowType === ROW_TYPE.GROUP) {
            return (
              <IconGroup>
                <Icon
                  icon="IcoAddBlack"
                  type={isEditMode ? 'disable' : 'normal'}
                  onClick={e => toggleCreateRoleModal(true, { label: record.roleGroup, value: record.roleGroup })}
                />
                <Icon
                  icon="BtnEditPCB"
                  type={isEditMode ? 'disable' : 'normal'}
                  onClick={() => {
                    setEditRowInfo({
                      rowIds: record.editableRowIds,
                      groupInfo: record,
                      roleInfo: record.editableRow,
                    });

                    setEditPolicy(record.editableRow);
                  }}
                />
                <Icon
                  icon="BtnDelPCB"
                  type={(!record.isEditable) ? 'disable' : 'normal'}
                  onClick={() => {
                    setDeleteGroupAlert(true);
                    setDeleteRoleIds(Object.keys(record.editableRow));
                    setDeletedGroupName(record.roleGroup);
                  }}
                />
              </IconGroup>
            );
          }

          return null;
        },
      },
    ];
  }

  function toggleSelectAllPolicy(roleId) {
    return (e) => {
      const rolePolicy = { ...editPolicy[roleId] };
      const newRolePolicy = Object.keys(rolePolicy)
        .reduce((acc, key) => {
          if (!key.startsWith('policy_')) return acc;
          return Object.assign(acc, { [key]: e.target.checked });
        }, rolePolicy);
      setEditPolicy(_fpSet(roleId, newRolePolicy)(editPolicy));
    };
  }

  function handleTableChange(pagination, filters, changedSorter) {
    updateSorter(changedSorter);
  }

  /**
   * 取得表頭中 policy 的格式
   */
  function getPolicyHeader() {
    const selectAllColumn = {
      title: 'Select All',
      dataIndex: 'rowId',
      key: 'selectAll',
      width: 120,
      className: 'group-no-border-right',
      align: 'center',
      render: (rowId, record) =>  {
        if (record.rowType === ROW_TYPE.GROUP || (isEditMode && !editRowInfo.rowIds.includes(rowId))) return null;
        const policy = getPolicyObj(editPolicy[record.roleId]);
        const isAllSelectd = Object.keys(policy).findIndex(policyId => !policy[policyId]) === -1;
        return (
          <Checkbox checked={isAllSelectd} onChange={toggleSelectAllPolicy(record.roleId)} />
        );
      },
    };

    const policyColumns = policies.map(item => ({
      title: <PolicyHeader>{item.description || item.action}</PolicyHeader>,
      dataIndex: `policy_${item.id}`,
      key: `policy_${item.id}`,
      className: 'group-no-border-right',
      width: 85,
      render: (val, record) =>  {
        if (record.rowType === ROW_TYPE.GROUP) return null;

        if (isEditMode && editRowInfo.rowIds.includes(record.rowId)) {
          const policy = editPolicy[record.roleId];
          return (
            <Checkbox checked={policy[`policy_${item.id}`]} onChange={handlePolicyChange(record.roleId, item.id)} value={item.id} />
          );
        }

        return (val ? <Icon icon={IconName.Checked} /> : '');
      },
      align: 'center',
    }));

    const result = isEditMode ? [selectAllColumn] : [];
    return result.concat(policyColumns);
  }

  /**
   * 取得表頭格式 for antd table
  */
  function getTableHeader() {
    return [
      {
        title: 'Role Group',
        dataIndex: 'roleGroup',
        key: 'roleGroup',
        width: 135,
        sorter: true,
        className: 'no-border-right',
        fixed: 'left',
        render: (roleGroup, record) =>  {
          /* 編輯模式 */
          if (record.rowType === ROW_TYPE.GROUP && isEditMode && editRowInfo.rowIds.includes(record.rowId) && record.isEditable) {
            const group = editRowInfo.groupInfo;
            return (
              <Input
                value={group.roleGroup}
                onChange={e => {
                 setEditRowInfo(_fpSet('groupInfo.roleGroup', e.target.value)(editRowInfo));
                }}
              />
            );
          }
          return roleGroup;
        },
      },
      {
        title: 'Role Name',
        dataIndex: 'roleName',
        key: 'roleName',
        width: 140,
        className: 'bold-border-right',
        fixed: 'left',
        render: (roleName, record) =>  {
          /* 編輯模式 */
          if (record.rowType === ROW_TYPE.ROLE && isEditMode && editRowInfo.rowIds.includes(record.rowId) && record.isEditable) {
            const role = editRowInfo.roleInfo[record.roleId];
            return (
              <Input
                value={role.roleName}
                onChange={e => {
                  setEditRowInfo(_fpSet(`roleInfo.${record.roleId}.roleName`, e.target.value)(editRowInfo));
                }}
              />
            );
          }
          return roleName;
        },
      },
      ...getPolicyHeader(),
      {
        title: '',
        key: 'rowId',
      },
      ...getActionColumn(),
    ];
  }

  /**
   * 取得權限資料格式
   */
  function getPolicyDataFormat(role) {
    return policies.reduce((acc, item) => {
      if (!Array.isArray(policyRole[item.id])) return acc;

      return {
        ...acc,
        [`policy_${item.id}`]: policyRole[item.id].findIndex(pr => pr.role_id === role.id) !== -1,
      };
    }, {});
  }

  /**
   * 取得表格資料 for antd table
   */
  function getTableData() {
    return roles.reduce((acc, roleGroup) => {
      // @TODO: isDefaultRole 改成用 editable 來判斷，需等待後端格式
      const roleData = roleGroup.roles.map((role) => ({
        rowId: `${roleGroup.role_group}_${role.role_name}_${role.id}`,
        rowType: ROW_TYPE.ROLE,
        roleId: role.id,
        roleName: role.role_name,
        groupName: roleGroup.role_group,
        ...getPolicyDataFormat(role),
        isEditable: role.is_editable,
      }));

      // @TODO: isDefaultGroup 改成用 editable 來判斷，需等待後端格式
      const group = {
        rowId: roleGroup.role_group,
        rowType: ROW_TYPE.GROUP,
        roleGroup: roleGroup.role_group,
        editableRowIds: [roleGroup.role_group, ...roleData.map(r => r.rowId)],
        editableRow: roleData.reduce((acc2, role) => Object.assign(acc2, { [role.roleId]: role }), {}),
        isEditable: roleData.every(role => role.isEditable)
      };

      return acc.concat(group).concat(roleData);
    }, []);
  }
  /* 載入 resource 下拉選單 */
  useEffect(() => {
    getResources();
    getRoles();
  }, []);

  /* 當選擇的 resource有變，重新載入表格內的資料 */
  useEffect(() => {
    if (!selectedResource.value) return;
    setTableInfo(selectedResource.value);
  }, [selectedResource.value]);

  useEffect(() => {
    const onResize = () => {
      setTableHeight(document.documentElement.clientHeight - TABLE_MARGIN_TOP);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return (
    <React.Fragment>
      <Content>
        <FunctionSection>
          <div className="title">
            Role Management
          </div>

          <div className="resources-select">
            <span className="resources-select-title">View by</span>
            <Select
              isDisabled={isEditMode}
              className="resources-select-field"
              options={resources}
              onChange={handleResourceChange}
              value={selectedResource}
            />
          </div>
        </FunctionSection>
        <FunctionSection>
          <div className="filter">
            <RoleFilter
              onFilter={getRoles}
              showRoleDropdown={false}
              showSearch={false}
            />
          </div>

          {/* 建立角色按鈕 */}
          {
            isEditMode ? (
              <div className="button-group">
                <RoundButton.WhiteButton
                  onClick={() => {
                    setDeleteRoleIds([]);
                    setEditRowInfo(DEFAULT_EDIT_ROW_INFO);
                  }}
                >
                  Cancel
                </RoundButton.WhiteButton>
                <RoundButton.GreenButton
                  onClick={handleUpdateRoleAndPloicy}
                >
                  Save
                </RoundButton.GreenButton>
              </div>
            ) : (
              <div>
                <Button round onClick={e => toggleCreateRoleModal(true)}><Icon icon={IconName.IcoAddWhite} size="1rem" />Create New Role</Button>
              </div>
            )
          }
        </FunctionSection>
        <Table
          rowKey="rowId"
          headerColor="blue"
          dataSource={getTableData()}
          columns={getTableHeader()}
          /* 計算最大表格高度、寬度 */
          scroll={{ y: tableHeight, x: 550 + (120 * (policies.length + editRowInfo.rowIds.length)) }}
          rowClassName={(record) => `row_${ROW_TYPE[record.rowType].toLowerCase()}`}
          bordered
          pagination={false}
          onChange={handleTableChange}
        />
        {/* 建立角色的modal */}
        <CreateRoleModal
          isOpen={isAddRoleShow}
          onSureCancel={e => toggleCreateRoleModal(false)}
          onCreate={info => doCreateRole(info)}
          roles={roles}
          onChange={handleTableChange}
          defaultSelectedGroup={selectedGroupOpt}
        />

      </Content>

      <Alert isOpen={deleteGroupAlert} type="alarm">
        <div className="row">
          刪除 {deletedGroupName} 群組將連帶刪除該群組的所有角色,<br />
          您是否仍要刪除 {deletedGroupName} 群組
        </div>
        <div className="row">
          <Button
            color="transparentInModal"
            border={false}
            onClick={() => handleDeleteGroup()}
          >
            刪除
          </Button>
          <Button
            color="black"
            onClick={() => setDeleteGroupAlert(false)}
          >
            取消
          </Button>
        </div>
      </Alert>

      <Alert isOpen={deleteRoleAlert} type="alarm">
        <div className="row">
          您是否要刪除 {deletedRoleName} 角色
        </div>
        <div className="row">
          <Button
            color="transparentInModal"
            border={false}
            onClick={() => handleDeleteRole()}
          >
            刪除
          </Button>
          <Button
            color="black"
            onClick={() => setDeleteRoleAlert(false)}
          >
            取消
          </Button>
        </div>
      </Alert>
    </React.Fragment>
  );
};

export default checkingRbac(allowList)(connect(
  (state) => {
    return {
      isAddRoleShow: state.roleManagement.isAddRoleShow,
      roles: state.roleManagement.roles,
      policies: state.roleManagement.policies,
      resources: state.roleManagement.resources,
      policyRole: state.roleManagement.policyRole,
      selectedResource: state.roleManagement.selectedResource,
      selectedGroupOpt: state.roleManagement.selectedGroupOpt,
    };
  },
  {
    toggleCreateRoleModal: RoleManagementActions.toggleCreateRoleModal,
    doCreateRole: RoleManagementActions.doCreateRole,
    updateRole: RoleManagementActions.updateRole,
    deleteRoles: RoleManagementActions.deleteRoles,
    getPolicy: RoleManagementActions.getPolicy,
    getRoles: RoleManagementActions.getRoles,
    getResources: RoleManagementActions.getResources,
    getPolicyRole: RoleManagementActions.getPolicyRole,
    setSelectedResource: RoleManagementActions.setSelectedResource,
    updateSorter: RoleManagementActions.updateSorter,
  }
)(RoleManagement));

