import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import _get from 'lodash/get';
import Button from '~~elements/Button';
import Table from '~~elements/Table';
import Icon, { IconName } from '~~elements/Icon';
import useCSDB from '~~features/Database/components/useCSDB';
import { InnerContainer, InlineBtns } from '~~features/Database/DatabaseStyles';
import SearchBar from '~~features/Database/components/SearchBar';
import ArchiveSwitch from '~~features/Database/components/ArchiveSwitch';
import * as ThermalCleanSheetActions from '~~features/Database/ME/ThermalCleanSheet/ThermalCleanSheetActions';
import getColumns from './ColumnSetting';
import AddModal from './AddModal';

const GreasePrice = (props) => {
  const {
    date,
    greasePriceList,
    getGreasePrice,
    updateGreasePrice,
  } = props;

  // 一開始進來的時候先call api取得列表
  useEffect(() => {
    getGreasePrice();
  }, []);

  // 需要丟給useCSDB的props
  const extendsCSDBPorps = {
    mainTable: greasePriceList,
    initialSortInfo: { dataIndex: '', sortOrder: 'ascend' },
    initialFilterInfo: { keyword: '', dataIndex: 'greaseName' },
  };
  const {
    // For table
    isEditMode,
    setEditMode,
    mainTableList,
    editModeList,
    handleTableChange,
    handleSetEditMode,
    handleOnEditItem,
    differenceList,
    // For search bar
    keyword,
    setKeyword,
    handleSearch,
    handleResetSearchBar,
    // For checkbox
    showArchive,
    setShowArchive,
    checkboxColumn,
    // For add modal
    isAddModalOpen,
    setAddModal,
    // 流水號
    idColumn,
  } =  useCSDB(extendsCSDBPorps);


  // 需要丟給ColumnSetting的props
  const extendsColumnPorps = {
    ...props,
    isEditMode,
    date,
    checkboxColumn,
    handleOnEditItem,
    idColumn,
  };
  return (
    <InnerContainer>
      <div className="inner-content">
        <div className="content-header">
          <div className="title">Grease 價目表</div>
        </div>
        <div className="content-row">
          <InlineBtns>
            <SearchBar
              width="28rem"
              placeholder="Enter Item"
              onInputChange={setKeyword}
              value={keyword}
              onSearch={handleSearch}
              onReset={handleResetSearchBar}
              disabled={isEditMode}
            />
            {/* <ArchiveSwitch
              isChecked={showArchive}
              onChange={() => setShowArchive(!showArchive)}
            /> */}
          </InlineBtns>
          {
            isEditMode ?
              <InlineBtns>
                <Button
                  color="black"
                  border={false}
                  round
                  onClick={() => handleSetEditMode(false)}
                >Cancel
                </Button>
                <Button
                  color="green"
                  border={false}
                  round
                  onClick={handleSave}
                >Save
                </Button>
              </InlineBtns> :
              <InlineBtns>
                {/* 新增 */}
                {/* <Icon
                  icon={IconName.BtnAddGroup}
                  size="2rem"
                  onClick={() => setAddModal(true)}
                /> */}
                {/* 修改 */}
                <Icon
                  icon={IconName.BtnEditGroup}
                  size="2rem"
                  onClick={() => handleSetEditMode(true)}
                  disabled={mainTableList.length === 0 || !date.nextId}
                />
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
          columns={getColumns(extendsColumnPorps)}
          dataSource={isEditMode ? editModeList : mainTableList}
          pagination={false}
          onChange={handleTableChange}
          scroll={{ y: 500 }}
        />
      </div>

      {/* Add Modal  */}
      <AddModal
        isOpen={isAddModalOpen}
        setAddModal={setAddModal}
      />
    </InnerContainer>
  );

  function handleSave() {
    const data = {
      nextId: _get(date, 'nextId', false),
      greaseList: differenceList.map(item => ({ id: item.id,  next: item.next }))
    };
    setEditMode(false);
    updateGreasePrice(data);
  }
};


const mapStateToProps = (state) => {
  return {
    greasePriceList: state.thermalCleanSheet.greasePrice.greasePriceList,
    date: state.thermalCleanSheet.greasePrice.date,
  };
};

const mapDispatchToProps = {
  getGreasePrice: ThermalCleanSheetActions.getGreasePrice,
  updateGreasePrice: ThermalCleanSheetActions.updateGreasePrice,
};


export default compose(
  connect(mapStateToProps, mapDispatchToProps),
)(GreasePrice);
