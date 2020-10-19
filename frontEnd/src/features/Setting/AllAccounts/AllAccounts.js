import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import Pagination from '~~elements/Pagination';
import Table from '~~elements/Table';
import * as R from 'ramda';
import _difference from 'lodash/difference';
import CommonUtils from '~~utils/CommonUtils';
import checkingRbac from '~~hoc/CheckingRbac';
import Button from '~~elements/Button';
import RoundButton from '~~elements/RoundButton';
import Icon from '~~elements/Icon';
import Alert from '~~elements/Alert';
import * as AllAccountsActions from './AllAccountsActions';
import RoleFilter from '../components/RoleFilter';
import SearchBar from './components/SearchBar';
import ClickTooltip from '../components/ClickTooltip';

import UserModal from './components/UserModal';


const Div = styled.div`
margin: 20px 5rem;
border: 1px solid rgba(0, 0, 0, 0.1);
border-bottom: none;
background: white;

.addUser-btn {
  height: auto;
  border-radius: 5rem;
  position: absolute;
  right: 1rem;
  letter-spacing: 1px;
  padding: 0.4rem 0.6rem;
  font-size: 0.8rem;
  .icon {
    display: inline-block;
    vertical-align: middle;
  }
  &:hover{
    background-color: #333333;
   }
}

.top-area{
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  .pageTitle {
    width: 50%;
    color: rgba(0,0,0,0.75);
    font-weight: 600;
    letter-spacing: 1px;
    font-size: 1.2rem;
  }
  .viewBy{
    width: 50%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    button{
      border-radius: 5rem;
      font-size: 0.8rem;
      margin-left: 0.8rem;
      letter-spacing: 1px;
      height: auto;
      padding: 0.4rem 0.6rem;
    }
  }
}
.filterBarArea{
  display: flex;
  align-items: center;
  margin: 1rem;
  position: relative;
  .searchResult{
    align-self: flex-end;
    opacity: 0.7;
    font-size: 0.9rem;
    margin: 0 0.5rem;
  }
}
.table-area {
  padding-bottom: 1rem;
  .icon{
    margin: 0 0.5rem;

    &.action{
      width: 1.5rem;
      margin: 0rem 0.2rem;
      cursor: pointer;
    }
  }
}

.pagination{
  margin: 1.5rem 0rem 1rem;
  display: flex;
  justify-content: center;
}

`;

const allowList = [
  ['List', 'allow', 'permission.all'],
];

const AllAccounts = (props) => {
  const {
    // states
    type1DefIds,
    productTypeDefIds,
    userList,
    numberOfUser,
    currentPage,
    pageSize,
    sortInfo,
    keyword,
    // actions
    getUserList,
    updateSortInfo,
    updateKeyword,
    updatePageInfo,
    //  by rex
    isUserModalOpen,
    userInfo,
    // actions
    getUserInfo,
    toggleUserModal,
    openEditModal,
    openAddModal,
    removeUser
  } = props;

  const [column, setColumn] = useState('PersonalInfo');
  const [isDelUserAlert, setDelUserAlert] = useState(false);
  const [userToDelete, setUserToDelete] = useState({ name_a: '', emplid: '' });
  const [isShowNum, setIsShowNum] = useState(false);

  const PersonalButton = column === 'PersonalInfo' ? RoundButton.BlackButton : RoundButton.TransparentButton;
  const XrayButton = column === 'XrayCategory' ? RoundButton.BlackButton : RoundButton.TransparentButton;
  const ProductTypeButton = column === 'ProductType' ? RoundButton.BlackButton : RoundButton.TransparentButton;
  useEffect(() => {
    getUserList();
  }, []);

  function handleSwitchColumn(newColumn) {
    setColumn(newColumn);
  }

  function handleAddNewAccount() {
    openAddModal(true);
  }

  function handleFilterChange(filterInfo) {
    // 篩選時，回到第一頁
    updatePageInfo(1, pageSize);
    getUserList({
      page: 1,
      ...filterInfo,
      keyword
    });
    // 篩選時顯示篩選結果
    setIsShowNum(true);
  }

  function handleResetFilterBar(filterInfo) {
    // 篩選時，回到第一頁
    updatePageInfo(1, pageSize);
    updateKeyword('');
    getUserList({
      page: 1,
      ...filterInfo,
    });
    // Reset時隱藏結果
    setIsShowNum(false);
  }

  /**
 * @param {*} dataIndex 欄位的key
 * @param {*} sortOrder 欄位的排序方法
 */
  function onSortChange(dataIndex, sortOrder) {
    const updatedSortedInfo = [{ dataIndex, sortOrder }];
    updateSortInfo(updatedSortedInfo);
    getUserList({
      orderBy: CommonUtils.genOrderByFormat(updatedSortedInfo),
    });
  }

  function handleTableChange(pagination, filters, sorter) {
    // 沒有指定排序(同一個欄位連續按三下)，使用最後一次排序的欄位和'ascend'排序的方法
    if (sorter.columnKey) {
      onSortChange(sorter.columnKey, sorter.order);
    } else onSortChange(sortInfo[0].dataIndex, 'ascend');
  }

  function handlePageChange(current, pagesize) {
    updatePageInfo(current, pagesize);
    getUserList({
      pages: current,
      items: pagesize,
    });
  }

  const handeOpenEditModal = (user) => {
    openEditModal(user.emplid);
  };

  function handleRemoveUser(user) {
    setUserToDelete(user);
    setDelUserAlert(true);
  }


  const ColumnAction = ({ user, isAdmin }) => {
    return (
      <div>
        <Icon icon="BtnEditPCB" onClick={() => handeOpenEditModal(user)} size="1.5rem" />
        {!isAdmin && <Icon icon="BtnDelPCB" onClick={() => handleRemoveUser(user)} size="1.5rem" />}
      </div>
    );
  };

  const columns = {
    PersonalInfo: [
      {
        title: 'Name',
        dataIndex: 'name_a',
        key: 'name_a',
        width: '12rem',
        defaultSortOrder: 'ascend',
        sorter: true
      },
      {
        title: 'Employee Number',
        dataIndex: 'emplid',
        key: 'emplid',
        sorter: true
      },
      {
        title: 'E-mail',
        dataIndex: 'email_address',
        key: 'email_address',
        sorter: true
      },
      {
        title: 'Extension',
        dataIndex: 'phone',
        key: 'phone',
        sorter: true
      },
      {
        title: 'Role Group',
        dataIndex: 'role_group',
        key: 'role_group',
        sorter: true
      },
      {
        title: 'Role Name',
        dataIndex: 'role_name',
        key: 'role_name',
        sorter: true
      },
      {
        title: 'Contact Window',
        dataIndex: 'is_contact_window',
        key: 'is_contact_window',
        align: 'center',
        sorter: true,
        render: (val, record) => {
          return val ? <Icon icon="IcoGreenCheck" size="1.5rem" /> : null;
        }
      },
      {
        title: 'Action',
        dataIndex: 'action',
        key: 'action',
        align: 'center',
        width: '7rem',
        render: (val, record) => {
          return <ColumnAction user={record} isAdmin={record.emplid === '10700001'} />;
        }
      },
    ],
    ProductType: [
      {
        title: 'Name',
        dataIndex: 'name_a',
        key: 'name_a',
        width: '12rem',
        sorter: true
      },
      {
        title: 'Permission for ME Product Type',
        dataIndex: 'product_type',
        key: 'product_type_me',
        render: (val) => {
          const productTypeId = val.me.map(v => v.id);
          const productType = val.me.map(v => v.product_type).join(', ');
          const isAll = _difference(productTypeDefIds['all_me'], productTypeId).length === 0;
          if (isAll) return (<div>ME All</div>);
          return (
            <ClickTooltip
              value={productType}
            >
              <div className="cell-tooltip-inner--label">ME Product Type</div>
              <div className="cell-tooltip-inner--content">
                {productType}
              </div>
            </ClickTooltip>);
        }
      },
      {
        title: 'Permission for EE Product Type',
        dataIndex: 'product_type',
        key: 'product_type_ee',
        render: (val) => {
          const productTypeId = val.ee.map(v => v.id);
          const productType = val.ee.map(v => v.product_type).join(', ');
          const isAll = _difference(productTypeDefIds['all_ee'], productTypeId).length === 0;
          if (isAll) return (<div>EE All</div>);
          return (
            <ClickTooltip
              value={productType}
            >
              <div className="cell-tooltip-inner--label">EE Product Type</div>
              <div className="cell-tooltip-inner--content">
                {productType}
              </div>
            </ClickTooltip>);
        }
      },
      {
        title: 'Action',
        dataIndex: 'action',
        key: 'action',
        align: 'center',
        width: '7rem',
        render: (val, record) => {
          return <ColumnAction  user={record} isAdmin={record.emplid === '10700001'} />;
        }
      },
    ],
    XrayCategory: [
      {
        title: 'Name',
        dataIndex: 'name_a',
        key: 'name_a',
        width: '12rem',
        sorter: true
      },
      {
        title: 'Permission for Type I',
        dataIndex: 'type1',
        key: 'type1',
        render: (val) => {
          // 此人的所有type1 id
          const type1ID = val.map(v => v.id);
          // 此人的所有type1
          const typeI = val.map(v => v.type1).join(', ');
          // 檢查是不是 TypeI All
          const isAll = _difference(type1DefIds['all'], type1ID).length === 0;
          // 檢查是不是ME All & 還有沒有其他EE TypeI
          const isAllMe = !isAll && _difference(type1DefIds['all_me'], type1ID).length === 0;
          const isSomeEe =  !isAll && _difference(type1ID, type1DefIds['all_me']).length > 0;
          // 檢查是不是EE All & 還有沒有其他ME TypeI
          const isAllEe = !isAll && _difference(type1DefIds['all_ee'], type1ID).length === 0;
          const isSomeMe =  !isAll && _difference(type1ID, type1DefIds['all_ee']).length > 0;
          if (isAll) return (<div>All Type I</div>);
          if (isAllMe && !isSomeEe) return (<div>ME All</div>);
          if (isAllEe && !isSomeMe) return (<div>EE All</div>);
          return (
            <ClickTooltip
              value={typeI}
            >
              <div className="cell-tooltip-inner--label">Type I</div>
              <div className="cell-tooltip-inner--content">
                {typeI}
              </div>
            </ClickTooltip>);
        }
      },
      {
        title: 'Action',
        dataIndex: 'action',
        key: 'action',
        align: 'center',
        width: '7rem',
        render: (val, record) => {
          return <ColumnAction  user={record} isAdmin={record.emplid === '10700001'} />;
        }
      },
    ]
  };

  return (
    <Div>
      <div className="top-area">
        <div className="pageTitle">
          All Accounts
        </div>
        <div className="viewBy">
          View By
          <PersonalButton onClick={() => handleSwitchColumn('PersonalInfo')}>Personal Info</PersonalButton>
          <XrayButton onClick={() => handleSwitchColumn('XrayCategory')}>Xray Category</XrayButton>
          <ProductTypeButton onClick={() => handleSwitchColumn('ProductType')}>Product Type</ProductTypeButton>
        </div>
      </div>
      <div className="filterBarArea">
        <RoleFilter
          width="60%"
          onFilter={handleFilterChange}
          keyword={keyword}
          updateKeyword={updateKeyword}
          handleResetFilterBar={handleResetFilterBar}
        />
        {isShowNum && <div className="searchResult">{`(有${numberOfUser}筆符合結果)`}</div>}
        <RoundButton.BlackButton
          className="addUser-btn"
          onClick={handleAddNewAccount}
        >
          <Icon
            icon="BtnAddGroup"
          />
          <span>Add New Account</span>
        </RoundButton.BlackButton>
      </div>
      <div className="table-area">
        <Table
          rowKey="rowId"
          columns={columns[column]}
          dataSource={userList}
          onChange={handleTableChange}
          pagination={false}
          headerColor="blue"
        />
        <div className="pagination">
          <Pagination
            currentPage={currentPage}
            total={numberOfUser}
            pageSize={pageSize}
            onChange={handlePageChange}
          />
        </div>
      </div>
      <UserModal
        userInfo={userInfo}
        isOpen={isUserModalOpen}
        toggleModal={status => toggleUserModal(status)}
      />
      {/* 關閉時的警告 */}
      <Alert isOpen={isDelUserAlert} type="alarm">
        <div className="row">{`您是否要刪除 ${userToDelete.name_a} 帳號？`}</div>
        <div className="row">
          <Button
            color="transparentInModal"
            border={false}
            onClick={(e) => {
              setDelUserAlert(false);
              removeUser(userToDelete.emplid);
            }}
          >
            刪除
          </Button>
          <Button
            color="black"
            onClick={() => setDelUserAlert(false)}
          >
            取消
          </Button>
        </div>
      </Alert>

    </Div >
  );
};

export default checkingRbac(allowList)(connect(
  (state) => {
    return {
      type1DefIds: state.allAccount.type1DefIds,
      productTypeDefIds: state.allAccount.productTypeDefIds,
      userList: state.allAccount.userList,
      numberOfUser: state.allAccount.numberOfUser,
      currentPage: state.allAccount.currentPage,
      pageSize: state.allAccount.pageSize,
      sortInfo: state.allAccount.sortInfo,
      keyword: state.allAccount.keyword,

      // Modal
      isUserModalOpen: state.allAccount.isUserModalOpen,
      userInfo: state.allAccount.userInfo,
    };
  },
  {
    getUserInfo: AllAccountsActions.getUserInfo,
    getUserList: AllAccountsActions.getUserList,
    updateSortInfo: AllAccountsActions.updateSortInfo,
    updateKeyword: AllAccountsActions.updateKeyword,
    updatePageInfo: AllAccountsActions.updatePageInfo,
    toggleUserModal: AllAccountsActions.toggleUserModal,
    openEditModal: AllAccountsActions.openEditModal,
    openAddModal: AllAccountsActions.openAddModal,
    removeUser: AllAccountsActions.removeUser
  }
)(AllAccounts));
