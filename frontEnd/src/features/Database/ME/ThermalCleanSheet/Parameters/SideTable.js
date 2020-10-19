import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import * as R from 'ramda';
import _ from 'lodash';
import _find from 'lodash/find';

import Icon, { IconName } from '~~elements/Icon';
import Button from '~~elements/Button';
import Table from '~~elements/Table';
import { InlineBtns, InnerContainer } from '~~features/Database/DatabaseStyles';
import SearchBar from '~~features/Database/components/SearchBar';
import ArchiveSwitch from '~~features/Database/components/ArchiveSwitch';

const SideTable = (props) => {
  const {
    csdb,
    onSave,
    columns,
    showEdit,
    placeholder,
  } = props;

  const {
    // For table
    isEditMode,
    setEditMode,
    mainTableList,
    editModeList,
    handleTableChange,
    handleSetEditMode,
    differenceList,
    // For search bar
    keyword,
    setKeyword,
    handleSearch,
    handleResetSearchBar,
    // For add modal
    isAddModalOpen,
    setAddModal,
    // For checkbox
    showArchive,
    setShowArchive,
    checkboxColumn,
    // For selected row
    setSelectedRowId,

  } =  csdb;


  /**
  * 點擊table row時，取得該material spec裡面的material list
  */
  function handleRowClick(event, record) {
    if (!isEditMode) {
      setSelectedRowId(record.id);
    }
  }

  /**
   * 更新table的api
   */
  function handleSave() {
    setEditMode(false);
    onSave(differenceList);
  }

  return (
    <InnerContainer isSubContainer>
      <div className="inner-content">
        <div className="content-row">
          <InlineBtns>
            <SearchBar
              width="22rem"
              placeholder={placeholder}
              value={keyword}
              onInputChange={setKeyword}
              onSearch={() => {
                handleSearch();
                setSelectedRowId('');
              }}
              onReset={handleResetSearchBar}
              disabled={isEditMode}
            />
            {/* <ArchiveSwitch
              isChecked={showArchive}
              onChange={() => setShowArchive(!showArchive)}
            /> */}
          </InlineBtns>
          {isEditMode ?
            /* 編輯狀態的Btns */
            <InlineBtns>
              <Button
                round
                color="black"
                onClick={() => handleSetEditMode(false)}
              >
                Cancel
              </Button>
              <Button
                round
                color="green"
                onClick={handleSave}
              >
                Save
              </Button>
            </InlineBtns> :
            /* 非編輯狀態的Btns */
            <InlineBtns>
              {/* 新增 */}
              {/* <Icon
                icon={IconName.BtnAddGroup}
                size="2rem"
                // onClick={() => setAddModal(true)}
              /> */}
              {/* 修改 */}
              {showEdit &&
                <Icon
                  icon={IconName.BtnEditGroup}
                  size="2rem"
                  onClick={() => handleSetEditMode(true)}
                  disabled={mainTableList.length === 0}
                />}
              {/* 封存 */}
              {/* <Icon
                icon={IconName.BtnArchive}
                size="2rem"
                // onClick={() => handleArchive()}
                // disabled={selectedIdList.length === 0}
              /> */}
            </InlineBtns>
          }
        </div>
        <Table
          headerColor="blue"
          hoverColor="blue"
          columns={columns}
          dataSource={isEditMode ? editModeList : mainTableList}
          pagination={false}
          onChange={handleTableChange}
          scroll={{ y: 500 }}
          onRow={(record) => {
            return {
              onClick: event => handleRowClick(event, record),
            };
          }}
        />
      </div>
      {/* Modal  */}

    </InnerContainer>
  );
};

SideTable.defaultProps = {
  onSave: () => { },
  showEdit: false
};


const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = {};


export default compose(
  connect(mapStateToProps, mapDispatchToProps),
)(SideTable);

