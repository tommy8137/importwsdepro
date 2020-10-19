import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import _get from 'lodash/get';
import Icon, { IconName } from '~~elements/Icon';
import Button from '~~elements/Button';
import Table from '~~elements/Table';
import { InlineBtns, InnerContainer } from '~~features/Database/DatabaseStyles';
import useCSDB from '~~features/Database/components/useCSDB';
import SearchBar from '~~features/Database/components/SearchBar';
import ArchiveSwitch from '~~features/Database/components/ArchiveSwitch';
import * as DieCutCleanSheetActions from '~~features/Database/ME/DieCutCleanSheet/DieCutCleanSheetActions';
import getColumns from './ColumnSetting';
import AddModal from './AddModal';

const TypePrice = (props) => {
  const {
    date,
    typePriceList,
    getTypePrice,
    updateTypePrice,
  } = props;

  // 一開始進來的時候先call api取得列表
  useState(() => {
    getTypePrice();
  }, []);

  // 需要丟給useCSDB的props
  const extendsCSDBProps = {
    mainTable: typePriceList,
    initialSortInfo: { dataIndex: '', sortOrder: 'ascend' },
    initialFilterInfo: { keyword: '', dataIndex: 'name' }
  };

  const {
    // For Table
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
  } = useCSDB(extendsCSDBProps);

    // 需要丟給ColumnSetting的props
  const extendsColumnProps = {
    isEditMode,
    date,
    checkboxColumn,
    handleOnEditItem,
    idColumn,
  };

  function handleSave() {
    const data = {
      nextId: _get(date, 'nextId', false),
      typePrice: differenceList.map(item => ({ id: item.id, next: item.next }))
    };
    setEditMode(false);
    updateTypePrice(data);
  }

  return (
    <InnerContainer>
      <div className="inner-content">
        <div className="content-header">
          <div className="title">沖工費 清單</div>
        </div>
        <div className="content-row">
          <InlineBtns>
            {/* Search bar */}
            <SearchBar
              width="28rem"
              placeholder="Enter Item"
              onInputChange={setKeyword}
              value={keyword}
              onSearch={handleSearch}
              onReset={handleResetSearchBar}
              disable={isEditMode}
            />
            {/* 封存的鈕 */}
            {/* <ArchiveSwitch
              isCheck={showArchive}
              onChange={() => setShowArchive(!showArchive)}
            /> */}
          </InlineBtns>
          {/* 按鈕們 */}
          {
            isEditMode ?
              <InlineBtns>
                <Button
                  round
                  color="black"
                  border={false}
                  onClick={() => handleSetEditMode(false)}
                >Cabcle
                </Button>
                <Button
                  round
                  color="green"
                  border={false}
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
                /> */}
              </InlineBtns>
          }
        </div>
        {/* Table放這 */}
        <Table
          headerColor="blue"
          columns={getColumns(extendsColumnProps)}
          dataSource={isEditMode ? editModeList : mainTableList}
          pagination={false}
          onChange={handleTableChange}
          scroll={{ y: 500 }}
        />
      </div>
      {/* Add Modal */}
      <AddModal
        isOpen={isAddModalOpen}
        setAddModal={setAddModal}
      />
    </InnerContainer>
  );
};


const mapStateToProps = (state) => {
  return {
    typePriceList: state.diecutCleanSheet.typePrice.typePriceList,
    date: state.diecutCleanSheet.typePrice.date,
  };
};

const mapDispatchToProps = {
  getTypePrice: DieCutCleanSheetActions.getTypePrice,
  updateTypePrice: DieCutCleanSheetActions.updateTypePrice,
};


export default compose(
  connect(mapStateToProps, mapDispatchToProps),
)(TypePrice);
