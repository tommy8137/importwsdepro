import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import * as R from 'ramda';
import _ from 'lodash';
import _find from 'lodash/find';
import _get from 'lodash/get';
import Icon, { IconName } from '~~elements/Icon';
import Button from '~~elements/Button';
import Table from '~~elements/Table';
import { InlineBtns, InnerContainer } from '~~features/Database/DatabaseStyles';
import SearchBar from '~~features/Database/components/SearchBar';
import ArchiveSwitch from '~~features/Database/components/ArchiveSwitch';
import AddModalWrap from '~~features/Database/ME/MaterialPrice/AddModal/AddModalWrap';


function checkOtherFillMeRemark(item) {
  return _get(item, ['materialSpec'], false) === 'Other_Fill_ME_Remark' || _get(item, ['material'], false) === 'Other_Fill_ME_Remark';
}

const MaterialTable = (props) => {
  const {
    placeholder = '',
    linkDisabled,
    showLink,
    showEdit,
    csdb,
    addModalPath,
    // func
    onAdd,
    onSave,
    onArchive,
    onOpenLink,
    columns,
    dieCutType2List,
  } = props;

  /**
 * 打開link modal 連結
 */
  function handleOpenLinkModal() {
    onOpenLink();
  }

  /**
  * 點擊table row時，取得該material spec裡面的material list
  */
  function handleRowClick(event, record) {
    // 如果是other fill me remark的話就不能點
    const isOtherFillMeRemark = checkOtherFillMeRemark(record);
    if (isOtherFillMeRemark) { return; }
    if (!csdb.isEditMode) {
      csdb.setSelectedRowId(record.id);
    }
  }

  /**
   * 編輯
   */
  function handleSave() {
    csdb.setEditMode(false);
    onSave(csdb.differenceList);
  }

  /**
   * 新增
   */
  function handleAddNewItem(data) {
    csdb.setAddModal(false);
    onAdd(data);
  }

  /**
  * 封存
  */
  function handleArchive() {
    onArchive(csdb.checkedList);
  }

  return (
    <InnerContainer isSubContainer>
      <div className="inner-content">
        <div className="content-row">
          <InlineBtns>
            <SearchBar
              width="22rem"
              placeholder={placeholder}
              value={csdb.keyword}
              onInputChange={csdb.setKeyword}
              onSearch={() => {
                csdb.handleSearch();
                csdb.setSelectedRowId('');
              }}
              onReset={csdb.handleResetSearchBar}
              disabled={csdb.isEditMode}
            />
            <ArchiveSwitch
              isChecked={csdb.showArchive}
              onChange={() => csdb.setShowArchive(!csdb.showArchive)}
              disabled={csdb.isEditMode}
            />
          </InlineBtns>
          {csdb.isEditMode ?
            /* 編輯狀態的Btns */
            <InlineBtns>
              <Button
                round
                color="black"
                onClick={() => csdb.handleSetEditMode(false)}
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
              {
                onAdd &&
                <Icon
                  icon={IconName.BtnAddGroup}
                  size="2rem"
                  onClick={() => csdb.setAddModal(true)}
                />
              }
              {/* 修改 */}
              {showEdit &&
                <Icon
                  icon={IconName.BtnEditGroup}
                  size="2rem"
                  onClick={() => csdb.handleSetEditMode(true)}
                  disabled={!csdb.mainTableList.length}
                />}
              {/* Link */}
              {
                showLink &&
                <Icon
                  icon={IconName.BtnLink}
                  size="2rem"
                  onClick={handleOpenLinkModal}
                  disabled={csdb.checkedList.length !== 1 || linkDisabled}
                />
              }
              {/* 封存 */}
              {
                onArchive &&
                <Icon
                  icon={IconName.BtnArchive}
                  size="2rem"
                  onClick={handleArchive}
                  disabled={csdb.checkedList.length === 0}
                />}
            </InlineBtns>
          }
        </div>
        <Table
          headerColor="blue"
          hoverColor="blue"
          columns={columns}
          dataSource={csdb.isEditMode ? csdb.editModeList : csdb.mainTableList}
          pagination={false}
          onChange={csdb.handleTableChange}
          scroll={{ y: 500 }}
          rowClassName={record => {
            const isOtherFillMeRemark = checkOtherFillMeRemark(record);
            return isOtherFillMeRemark && 'ant-disabled-row';
          }}
          onRow={(record) => {
            return {
              onClick: event => handleRowClick(event, record),
            };
          }}
        />
      </div>
      {/* Modal  */}
      <AddModalWrap
        isOpen={csdb.isAddModalOpen}
        addModalPath={addModalPath}
        setAddModal={csdb.setAddModal}
        onAdd={handleAddNewItem}
        isSaveBtnInvalid={csdb.isSaveBtnInvalid}
        dieCutType2List={dieCutType2List}
      />
    </InnerContainer>
  );
};

MaterialTable.defaultProps = {
  linkDisabled: false,
  disabledLink: false,
  onSave: () => { },
  onOpenLink: () => { },
  placeholder: '',
};


const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = {};


export default compose(
  connect(mapStateToProps, mapDispatchToProps),
)(MaterialTable);

